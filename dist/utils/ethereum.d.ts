import { ethers } from 'ethers';
export declare const initializeEthereumProvider: () => void;
export declare const getEthereumProvider: () => ethers.providers.Provider;
export declare const createWallet: (privateKey: string) => ethers.Wallet;
export declare const getContract: (address: string, abi: ethers.ContractInterface, signerOrProvider?: ethers.Signer | ethers.providers.Provider) => ethers.Contract;
