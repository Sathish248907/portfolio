import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import v1Routes from './routes/v1/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/env.js';

const app = express();

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false, // allow flexible development testing
    crossOriginEmbedderPolicy: false,
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost, client dev port 5173, or server-to-server
      callback(null, true);
    },
    credentials: true,
  })
);

// Request body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Mount versioned and unversioned API routes for flexible client routing
app.use('/api/v1', v1Routes);
app.use('/api', v1Routes);

// Root SEO crawler endpoints
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`# Robots.txt for Peace Haven Technologies (https://peacehaven.tech)
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/
Disallow: /api/*
Crawl-delay: 1
Sitemap: https://peacehaven.tech/sitemap.xml
Host: https://peacehaven.tech
`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://peacehaven.tech/</loc><priority>1.0</priority></url>
  <url><loc>https://peacehaven.tech/services</loc><priority>0.9</priority></url>
  <url><loc>https://peacehaven.tech/industries</loc><priority>0.9</priority></url>
  <url><loc>https://peacehaven.tech/portfolio</loc><priority>0.9</priority></url>
  <url><loc>https://peacehaven.tech/start-a-project</loc><priority>0.9</priority></url>
  <url><loc>https://peacehaven.tech/contact</loc><priority>0.8</priority></url>
</urlset>`);
});

// Fallback unhandled API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint '${req.originalUrl}' does not exist on Peace Haven Gateway.`,
  });
});

// Structured error handling middleware
app.use(errorHandler);

export default app;
