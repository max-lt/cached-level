declare module 'cached-level' {

    import EventEmitter = NodeJS.EventEmitter;
    import * as Level from "levelup";
    import * as LRU from "lru-cache";
    import {ClientOpts} from "redis";

    type Key = string
    type Value = any

    class RevelInterface {

        set(key: Key, value: Value): Promise<void, any>

        get(key: Key): Promise<Value>

        mset(kv: Array<Key | Value>): Promise<void, any>

        mget(keys: Array<Key>): Promise<Array<Value>>

        del(key: Key | Array<Key>): Promise<void, any>

        quit(): Promise<any, any>

    }

    class Revel extends RevelInterface {
        constructor(dbName: string, options?: Level.levelupOptions)
    }

    class Cache extends RevelInterface {
        constructor(db: RevelInterface, cache: LRU)
    }

    class CacheOnly extends RevelInterface {
        constructor(options: LRU.Options)
    }

    function cacheFactory(dbName: string, cacheOptions?: LRU.Options): Cache

    class Redis extends RevelInterface {

        constructor(port: number, host?: string, options?: ClientOpts);
        constructor(unix_socket: string, options?: ClientOpts);
        constructor(redis_url: string, options?: ClientOpts);
        constructor(options?: ClientOpts);

    }

}