const setGet = require('./set-get-factory');
const msetMget = require('./mset-mget-factory');
const quit = require('./quit-factory');

const Cache = require('../lib/transform/cache');

const Revel = require('../lib/revel');
const Redis = require('../lib/redis');
const CacheOnly = require('../lib/cache-only');

const CachedRevel = Cache.factory(Revel);
const CachedRedis = Cache.factory(Redis);

const revel = new Revel('../db-test-set-get');
const redis = new Redis();
const cache_only = new CacheOnly({max: 100});
const cached_revel = new CachedRevel('../db-test-cached', {max: 100});
const cached_redis = new CachedRedis(null, {max: 100});

describe('GET/SET:', () => {
    setGet('revel', revel);
    setGet('redis', redis);
    setGet('cache-only', cache_only);
    setGet('cached-revel', cached_revel);
    setGet('cached-redis', cached_redis);
});

describe('MGET/MSET:', () => {
    msetMget('revel', revel);
    msetMget('redis', redis);
    msetMget('cache-only', cache_only);
    msetMget('cached-revel', cached_revel);
    msetMget('cached-redis', cached_redis);
});

describe('QUIT:', () => {
    quit('revel', revel);
    quit('redis', redis);
    quit('cache-only', cache_only);
    quit('cached-revel', cached_revel);
    quit('cached-redis', cached_redis);
});