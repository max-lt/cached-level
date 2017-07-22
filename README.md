###cached-level

level interfaced as redis (promised).

available methods are:
    set, set, mset, mget, quit.

Example usage:
```
const instance = new Revel('db');
/*OR*/
const instance = new Redis();
/*OR*/
const instance = new CacheOnly({max: cacheSize});
/*OR*/
const instance = new CachedRevel('db-cached', {max: 500});
/*OR*/
const instance = new CachedRedis(null, {max: 500});

instance.get(key).then((val) => ...)
instance.set(key, value).then(() => ...)
instance.mset([keyA, valueA, keyB, valueB]).then(() => ...)
instance.mget([keyA, keyB]).then(([valueA, valueB]) => ...)

instance.quit().then(() => ...)
```

Classes exposed:

Revel parameters: dbName, levelOptions (see [level]([level-link]))
Redis parameters: redisOptions (see [redis]([redis-link]))
CacheOnly parameters: cacheOptions (see [lru]([lru-link]))

```
const Revel = require('cached-level').Revel;
const Redis = require('cached-level').Redis;
const CacheOnly = require('cached-level').CacheOnly;
```

Possibility to add a cache layer (from [lru-cache]([lru-link])):

CachedRevel parameters: dbName, cacheOptions (see [lru]([lru-link])), levelOptions (see [level]([level-link]))
CachedRedis parameters: null  , cacheOptions (see [lru]([lru-link])), redisOptions (see [redis]([redis-link]))


```
const CachedRevel = require('cached-level').CachedRevel;
const CachedRedis = require('cached-level').CachedRedis;
```

or
```
const Cache = require('cached-level').Cache; // params: dbInstance, lruInstance
const CachedRevel = Cache.factory(Revel);
const CachedRedis = Cache.factory(Redis);
```

[lru-link]: https://www.npmjs.com/package/lru-cache
[level-link]: https://www.npmjs.com/package/level
[redis-link]: https://www.npmjs.com/package/redis