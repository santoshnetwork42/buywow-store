// Cloudflare Cache helper for subrequests made from the Worker/Edge runtime
// Safe fallback to plain fetch during local dev or non-Workers environments
import { getCloudflareContext } from "@opennextjs/cloudflare";
/**
 * cachedFetch: Wraps fetch with Cloudflare Cache API (caches.default).
 * - Works for GET and POST (Cache API allows any method as key).
 * - Adds Cache-Control header with the provided TTL.
 * - Uses ctx.waitUntil when available to avoid blocking response.
 *
 * @param {RequestInfo} url
 * @param {RequestInit} init
 * @param {{ ttl?: number, cacheTtl?: number }} options
 */
export async function cachedFetch(url, init = {}, options = {}) {
  const ttl = options.ttl ?? options.cacheTtl ?? 60; // default 1 minutes
  // Ensure body is a string for stable cache keys on POST requests
  const initNormalized = { ...init };
  if (initNormalized?.body && typeof initNormalized.body !== "string") {
    try {
      initNormalized.body = JSON.stringify(initNormalized.body);
    } catch (_) {
      // leave as is if not serializable
    }
  }
  const request = new Request(url, initNormalized);
  // If not on Workers/Pages or cache unavailable, just fetch
  const cache = globalThis.caches?.default;
  if (!cache) {
    return fetch(request);
  }
  let response = await cache.match(request);
  if (response) return response;
  response = await fetch(request);
  // Only cache successful, cacheable responses (avoid Set-Cookie)
  if (response.ok && !response.headers.get("Set-Cookie")) {
    const cached = new Response(response.body, response);
    cached.headers.set("Cache-Control", `public, max-age=${ttl}`);
    try {
      const { ctx } = getCloudflareContext();
      if (ctx) {
        ctx.waitUntil(cache.put(request, cached.clone()));
      } else {
        await cache.put(request, cached.clone());
      }
    } catch (_) {
      console.log("ERROR IN CACHE", _);
      // If context isn't available or put fails, proceed without caching
    }

    console.log("CACHE", cached);
    return cached;
  }
  return response;
}
