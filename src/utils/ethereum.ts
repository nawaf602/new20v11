import { ethers } from 'ethers';
import { logger } from '../utils/logger';

// Ethereum provider instance
let provider: ethers.providers.Provider;

// Initialize Ethereum provider
export const initializeEthereumProvider = (): void => {
  try {
    const rpcUrl = process.env.ETHEREUM_RPC_URL;
    const websocketUrl = process.env.ETHEREUM_WEBSOCKET;
    
    if (!rpcUrl) {
      throw new Error('ETHEREUM_RPC_URL environment variable is not set');
    }
    
    // Create provider based on available URLs
    if (websocketUrl) {
      provider = new ethers.providers.WebSocketProvider(websocketUrl);
      logger.info('Initialized Ethereum WebSocket provider');
    } else {
      provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      logger.info('Initialized Ethereum JSON-RPC provider');
    }
    
    // Set up event listeners for provider
    provider.on('error', (error) => {
      logger.error('Ethereum provider error:', error);
    });
    
  } catch (error) {
    logger.error('Failed to initialize Ethereum provider:', error);
    throw error;
  }
};

// Get Ethereum provider
export const getEthereumProvider = (): ethers.providers.Provider => {
  if (!provider) {
    throw new Error('Ethereum provider not initialized');
  }
  return provider;
};

// Create a wallet instance from private key
export const createWallet = (privateKey: string): ethers.Wallet => {
  const wallet = new ethers.Wallet(privateKey, getEthereumProvider());
  return wallet;
};

// Get contract instance
export const getContract = (
  address: string,
  abi: ethers.ContractInterface,
  signerOrProvider?: ethers.Signer | ethers.providers.Provider
): ethers.Contract => {
  return new ethers.Contract(
    address,
    abi,
    signerOrProvider || getEthereumProvider()
  );
};
