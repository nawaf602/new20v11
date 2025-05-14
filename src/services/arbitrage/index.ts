import { ArbitrageServiceImpl } from './ArbitrageService';
import { logger } from '../../utils/logger';

/**
 * Initialize the Arbitrage Service
 */
export const initializeArbitrageService = (): ArbitrageServiceImpl => {
  try {
    logger.info('Initializing Arbitrage Service');
    
    // Create the Arbitrage Service
    const arbitrageService = new ArbitrageServiceImpl();
    
    logger.info('Arbitrage Service initialized successfully');
    
    return arbitrageService;
  } catch (error) {
    logger.error('Error initializing Arbitrage Service:', error);
    throw error;
  }
};

// Export a singleton instance
export const arbitrageService = initializeArbitrageService();
