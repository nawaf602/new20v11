import { MempoolServiceImpl } from './MempoolService';
import { logger } from '../../utils/logger';

/**
 * Initialize the Mempool Service
 */
export const initializeMempoolService = (): MempoolServiceImpl => {
  try {
    logger.info('Initializing Mempool Service');
    
    // Create the Mempool Service
    const mempoolService = new MempoolServiceImpl();
    
    logger.info('Mempool Service initialized successfully');
    
    return mempoolService;
  } catch (error) {
    logger.error('Error initializing Mempool Service:', error);
    throw error;
  }
};

// Export a singleton instance
export const mempoolService = initializeMempoolService();
