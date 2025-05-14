import mongoose from 'mongoose';
import { logger } from '../utils/logger';

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

// Connect to MongoDB
export const connectToDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/flash_loans_bot';
    
    await mongoose.connect(uri);
    
    logger.info('Successfully connected to MongoDB');
    
    // Handle connection events
    mongoose.connection.on('error', (error: Error) => { // Added type annotation here
      logger.error('MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed due to application termination');
      process.exit(0);
    });
    
  } catch (error: unknown) { // Added type annotation here
    logger.error('Failed to connect to MongoDB:', error);
    // Rethrow or handle appropriately
    if (error instanceof Error) {
        throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    } else {
        throw new Error('Failed to connect to MongoDB due to an unknown error.');
    }
  }
};

