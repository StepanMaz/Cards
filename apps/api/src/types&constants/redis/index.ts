import type { createClient } from "redis";

export type RedisConnection = ReturnType<typeof createClient>;
