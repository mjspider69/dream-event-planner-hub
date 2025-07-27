import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

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
  maxUses: 7500, // Each connection handles up to 7500 requests
  allowExitOnIdle: false
});
export const db = drizzle({ client: pool, schema });
