import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Ultra-high performance connection pool for 2000+ concurrent users
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 2000, // Maximum 2000 database connections for massive scale
  min: 50,   // Minimum 50 connections always ready
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  allowExitOnIdle: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
export const db = drizzle(pool, { schema });
