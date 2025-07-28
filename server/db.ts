import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// High-performance connection pool for enterprise-scale traffic
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 50, // Maximum 50 database connections (optimal for Replit PostgreSQL)
  min: 5,  // Minimum 5 connections always ready
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  allowExitOnIdle: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
export const db = drizzle(pool, { schema });
