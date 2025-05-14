import { PortfolioServiceImpl } from './PortfolioService';
import { logger } from '../../utils/logger';

/**
 * Initialize the Portfolio Service
 */
export const initializePortfolioService = (): PortfolioServiceImpl => {
  try {
    logger.info('Initializing Portfolio Service');
    
    // Create the Portfolio Service
    const portfolioService = new PortfolioServiceImpl();
    
    logger.info('Portfolio Service initialized successfully');
    
    return portfolioService;
  } catch (error) {
    logger.error('Error initializing Portfolio Service:', error);
    throw error;
  }
};

// Export a singleton instance
export const portfolioService = initializePortfolioService();
