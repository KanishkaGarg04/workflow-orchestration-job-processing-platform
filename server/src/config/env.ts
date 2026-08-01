import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/task-platform",

  JWT_SECRET:
    process.env.JWT_SECRET || "super-secret-key",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "super-refresh-secret",

  REDIS_URL:
    process.env.REDIS_URL || "redis://localhost:6379",

  NODE_ENV:
    process.env.NODE_ENV || "development",

    REDIS_HOST: process.env.REDIS_HOST!,

    REDIS_PORT: process.env.REDIS_PORT!,

    REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
};