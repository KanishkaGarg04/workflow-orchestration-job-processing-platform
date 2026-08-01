import IORedis from "ioredis";
import { env } from "./env";

const connection = new IORedis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});

export default connection;