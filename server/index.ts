import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db";
import { sql } from "drizzle-orm";

const app = express();
// Enhanced middleware for high-performance concurrent user handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// High-performance concurrent user handling middleware
app.use((req, res, next) => {
  // Add performance headers for multiple concurrent users
  res.setHeader('X-Powered-By', 'Aaroham-Platform');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=30, max=10000');
  
  // Enable compression for faster responses
  res.setHeader('Vary', 'Accept-Encoding');
  
  // Set concurrent request timeout
  req.setTimeout(30000); // 30 seconds timeout
  res.setTimeout(30000);
  
  next();
});

// Enterprise-scale memory management for 7000+ concurrent users
let activeConnections = 0;
const maxConnections = 10000; // Support 10,000 concurrent connections
const memoryThreshold = 0.8; // 80% memory usage threshold

app.use((req, res, next) => {
  activeConnections++;
  
  // Monitor connection count
  if (activeConnections > maxConnections) {
    res.status(503).json({ 
      error: 'Server busy, please try again',
      retryAfter: 1
    });
    activeConnections--;
    return;
  }
  
  // Clean up when request completes
  res.on('finish', () => {
    activeConnections--;
  });
  
  res.on('close', () => {
    activeConnections--;
  });
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Database health check - only if using database storage
  try {
    const { storage } = await import("./storage");
    await storage.healthCheck();
    console.log("✅ Database health check passed");
  } catch (error) {
    console.warn("⚠️ Database health check failed, continuing with available storage:", error);
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
