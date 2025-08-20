// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge/index";
import queueCache from "@opennextjs/cloudflare/overrides/queue/queue-cache";

export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
    shouldLazilyUpdateOnCacheHit: false,
  }),
  queue: queueCache(doQueue, {
    regionalCacheTtlSec: 5, // The TTL for the regional cache, defaults to 5 seconds
    // // Whether to wait for the queue to acknowledge the request before returning
    // // When set to false, the cache will be populated asap and the queue will be called after.
    // // When set to true, the cache will be populated only after the queue ack is received.
    // waitForQueueAck: true,
  }),
  tagCache: doShardedTagCache({
    regionalCache: true,
    regionalCacheTtlSec: 60 * 15, // 15 mins
    // shardReplication: {
    //   numberOfSoftReplicas: 1,
    //   numberOfHardReplicas: 1,
    //   regionalReplication: {
    //     defaultRegion: "apac",
    //   },
    // },
  }),
  cachePurge: purgeCache({ type: "direct" }),
});
