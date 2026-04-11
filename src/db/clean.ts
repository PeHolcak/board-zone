import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./client";

async function main() {
    console.log("Čistím databázi...");

    try {
        await db.execute(sql`
            DO $$ DECLARE
                r RECORD;
            BEGIN
                FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                    EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE;';
                END LOOP;
            END $$;
        `);

        console.log("Databáze byla úspěšně pročištěna (všechna data byla smazána).");
    } catch (error) {
        console.error("Došlo k chybě při čištění databáze:", error);
    } finally {
        process.exit(0);
    }
}

main();
