import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { logger } from './utils/logger';
import { connectToDatabase } from './config/database';
import { connectToRedis } from './config/redis';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create HTTP server
const server = createServer(app);

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Connect to Redis
    await connectToRedis();
    
    // Start listening
    server.listen(PORT, () => {
      logger.info(`Server running at http://${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

export default server;
