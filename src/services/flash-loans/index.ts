import { FlashLoanServiceImpl } from './FlashLoanService';
import { AaveFlashLoanProvider } from './providers/AaveProvider';
import { UniswapV3FlashSwapProvider } from './providers/UniswapV3Provider';
import { BalancerFlashLoanProvider } from './providers/BalancerProvider';
import { DydxFlashLoanProvider } from './providers/DydxProvider';
import { logger } from '../../utils/logger';

/**
 * Initialize the Flash Loan Service with all providers
 */
export const initializeFlashLoanService = (): FlashLoanServiceImpl => {
  try {
    logger.info('Initializing Flash Loan Service with all providers');
    
    // Create the Flash Loan Service
    const flashLoanService = new FlashLoanServiceImpl();
    
    // Register all providers
    const aaveProvider = new AaveFlashLoanProvider();
    flashLoanService.registerProvider(aaveProvider);
    
    const uniswapProvider = new UniswapV3FlashSwapProvider();
    flashLoanService.registerProvider(uniswapProvider);
    
    const balancerProvider = new BalancerFlashLoanProvider();
    flashLoanService.registerProvider(balancerProvider);
    
    const dydxProvider = new DydxFlashLoanProvider();
    flashLoanService.registerProvider(dydxProvider);
    
    logger.info(`Flash Loan Service initialized with ${flashLoanService.getProviders().length} providers`);
    
    return flashLoanService;
  } catch (error) {
    logger.error('Error initializing Flash Loan Service:', error);
    throw error;
  }
};

// Export a singleton instance
export const flashLoanService = initializeFlashLoanService();
