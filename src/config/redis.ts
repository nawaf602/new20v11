import IORedis, { Redis } from "ioredis"; // Import both default and Redis type
import { logger } from "@/utils/logger"; // Corrected path

// Redis client instance
let redisClient: Redis;

// Connect to Redis
export const connectToRedis = async (): Promise<void> => {
  try {
    const host = process.env.REDIS_HOST || "localhost";
    const port = parseInt(process.env.REDIS_PORT || "6379", 10);
    const password = process.env.REDIS_PASSWORD || undefined;

    redisClient = new IORedis({
      host,
      port,
      password,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        logger.info(`Redis connection retry attempt ${times}, delaying for ${delay}ms`);
        return delay;
      },
      maxRetriesPerRequest: null, // Allow infinite retries
    });

    // Test connection
    await redisClient.ping();
    logger.info("Successfully connected to Redis");

    // Handle connection events
    redisClient.on("error", (error: Error) => {
      logger.error("Redis connection error:", error);
    });

    redisClient.on("close", () => {
      logger.warn("Redis connection closed");
    });

    // Handle process termination
    process.on("SIGINT", () => {
      redisClient.quit();
      logger.info("Redis connection closed due to application termination");
    });

  } catch (error: unknown) {
    logger.error("Failed to connect to Redis:", error);
    // Rethrow or handle appropriately
    if (error instanceof Error) {
        throw new Error(`Failed to connect to Redis: ${error.message}`);
    } else {
        throw new Error("Failed to connect to Redis due to an unknown error.");
    }
  }
};

// Get Redis client
export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error("Redis client not initialized. Call connectToRedis first.");
  }
  return redisClient;
};

