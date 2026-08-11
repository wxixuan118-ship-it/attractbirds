import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required to connect to the local PostgreSQL database.");
  // Vinext runs server components in a Cloudflare request context. A socket
  // created in one request cannot be reused by another, so the client must be
  // request-scoped rather than a module singleton.
  const client = postgres(url, { max: 1, idle_timeout: 2, connect_timeout: 10, prepare: false });
  return drizzle(client, { schema });
}
