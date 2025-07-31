import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

// Create database connection
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/aaroham";

let db: any;

try {
  // Try to create connection
  const client = postgres(DATABASE_URL, { max: 1 });
  db = drizzle(client, { schema });
  console.log("Database connection established successfully");
} catch (error) {
  console.warn("Database connection failed, falling back to memory storage:", error);
  db = null;
}

export { db };