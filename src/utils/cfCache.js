// Cloudflare Workers subrequest caching helper
// Uses cf: { cacheEverything: true } for GET requests (shows in subrequest metrics)
// Uses synthetic GET key with Cache API for POST/GraphQL requests
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Creates a stable cache key for POST requests using URL + body hash
 */
function createSyntheticCacheKey(url, method, body, headers = {}) {
  const bodyString = typeof body === "string" ? body : JSON.stringify(body || "");
  const headerKeys = ["x-api-key", "content-type"].filter(k => headers[k]);
  const headerString = headerKeys.map(k => `${k}:${headers[k]}`).join("|");
  
  // Create a simple hash (for demo - in production, use crypto.subtle)
  let hash = 0;
  const str = `${method}:${url}:${bodyString}:${headerString}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `/__cfcache/${Math.abs(hash).toString(36)}`;
}

/**
 * cachedFetch: Optimized for Cloudflare Workers subrequest caching
 * - GET requests: Use cf: { cacheEverything: true } for proper subrequest metrics
 * - POST requests: Use synthetic GET key with Cache API
 *
 * @param {RequestInfo} url
 * @param {RequestInit} init
 * @param {{ ttl?: number, cacheTtl?: number }} options
 */
export async function cachedFetch(url, init = {}, options = {}) {
  const ttl = options.ttl ?? options.cacheTtl ?? 300; // default 5 minutes
  const method = init.method || "GET";
  
  // Normalize body to string for consistent caching
  const initNormalized = { ...init };
  if (initNormalized?.body && typeof initNormalized.body !== "string") {
    try {
      initNormalized.body = JSON.stringify(initNormalized.body);
    } catch (_) {
      // leave as is if not serializable
    }
  }

  // For GET requests: Use Cloudflare's native subrequest caching
  if (method.toUpperCase() === "GET") {
    const cfOptions = {
      ...initNormalized,
      cf: {
        cacheEverything: true,
        cacheTtl: ttl,
        // Add cache key based on URL for better cache control
        cacheKey: url,
      }
    };
    
    console.log("GET SUBREQUEST:", url);
    return fetch(url, cfOptions);
  }

  // For POST/GraphQL requests: Use Cache API with synthetic GET key
  const cache = globalThis.caches?.default;
  if (!cache) {
    // Fallback for non-Workers environments
    return fetch(url, initNormalized);
  }

  // Create synthetic cache key
  const cacheKeyUrl = createSyntheticCacheKey(
    url, 
    method, 
    initNormalized.body, 
    initNormalized.headers || {}
  );
  const cacheRequest = new Request(cacheKeyUrl, { method: "GET" });

  // Try cache first
  let response = await cache.match(cacheRequest);
  if (response) {
    console.log("CACHE HIT (POST):", url);
    return response;
  }

  console.log("CACHE MISS (POST):", url);
  
  // Fetch from origin
  response = await fetch(url, initNormalized);
  
  // Cache successful responses (avoid Set-Cookie)
  if (response.ok && !response.headers.get("Set-Cookie")) {
    const cached = new Response(response.body, response);
    cached.headers.set("Cache-Control", `public, max-age=${ttl}, s-maxage=${ttl * 2}`);
    
    try {
      const { ctx } = getCloudflareContext();
      if (ctx) {
        ctx.waitUntil(cache.put(cacheRequest, cached.clone()));
      } else {
        await cache.put(cacheRequest, cached.clone());
      }
      console.log("CACHED (POST):", url);
    } catch (error) {
      console.log("CACHE PUT ERROR:", error);
    }
    
    return cached;
  }
  
  return response;
}
