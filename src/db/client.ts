import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
    var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL!;

const pool =
    global.pgPool ??
    new Pool({
        connectionString,
    });

if (process.env.NODE_ENV !== "production") {
    global.pgPool = pool;
}

export const db = drizzle(pool, { schema });
