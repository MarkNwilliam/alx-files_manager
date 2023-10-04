import { promisify } from 'util';
import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.isClientConnected = false;

        this.client.on('error', (err) => {
            console.error('Redis client error:', err.message || err.toString());
            this.isClientConnected = false;
        });

        this.client.on('connect', () => {
            this.isClientConnected = true;
        });
    }

    isAlive() {
        return this.isClientConnected;
    }

    async get(key) {
        const asyncGet = promisify(this.client.get).bind(this.client);
        return await asyncGet(key);
    }

    async set(key, value, duration) {
        const asyncSetEx = promisify(this.client.setex).bind(this.client);
        await asyncSetEx(key, duration, value);
    }

    async del(key) {
        const asyncDel = promisify(this.client.del).bind(this.client);
        await asyncDel(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
