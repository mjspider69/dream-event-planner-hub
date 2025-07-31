import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

// Temporarily disable database connection during migration
// Use memory storage for immediate functionality
console.log("Using memory storage during migration - database connection disabled");

// Placeholder for drizzle instance (not used when memory storage is active)
export const db = null as any;