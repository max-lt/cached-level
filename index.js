const Cache = require('./lib/transform/cache');
const promisify = require('./lib/transform/promisify');

const Revel = require('./lib/revel');
const Redis = require('./lib/redis');

const CacheOnly = require('./lib/cache-only');
const CachedRevel = Cache.factory(Revel);
const CachedRedis = Cache.factory(Redis);

module.exports = {Cache, Revel, Redis, CacheOnly, CachedRevel, CachedRedis, promisify};