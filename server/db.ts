import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Enterprise-scale connection pool for 7000+ concurrent users
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 100, // Maximum 100 database connections
  min: 10,  // Minimum 10 connections always ready
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  allowExitOnIdle: false
});
export const db = drizzle(pool, { schema });
