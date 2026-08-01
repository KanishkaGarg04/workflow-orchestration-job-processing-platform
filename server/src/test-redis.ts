import redis from "./config/redis";

async function test() {
  await redis.set("hello", "kanishka");
  const value = await redis.get("hello");

  console.log(value);

  process.exit(0);
}

test();