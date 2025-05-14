import { Redis } from "ioredis";
export declare const connectToRedis: () => Promise<void>;
export declare const getRedisClient: () => Redis;
