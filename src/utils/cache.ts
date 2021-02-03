import { injectable } from "inversify";
import { createNodeRedisClient } from 'handy-redis';

@injectable()
export class Cache {
    private redis: any = null;

    constructor() {
        this.redis = createNodeRedisClient();
    }

    /**
     * Fetch memory persisted data with key
     * @param key {string}
     */
    async get(key: string): Promise<any> {
        return this.redis.get(key);
    }

    /**
     * Persist key:value pair in redis
     * @param key {string}
     * @param value {object}
     */
    async set(key: string, value: any) {
        return this.redis.set(key, value);
    }

    /**
     * Fetch jsonfied data with key
     * @param key {string}
     */
    async getJson(key: string): Promise<any> {
        const value =  await this.redis.get(key);
        
        if(value) {
            return JSON.parse(value);
        }

        return null;
    }
}
