import React, { useState } from 'react';
import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/outline';

const WalletCard = ({ wallet, onUpdate }) => {
  const { id, address, name, balance, totalValue, isActive } = wallet;
  
  // Format address for display
  const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
  // Format total value
  const formattedTotalValue = parseFloat(totalValue) / 1e18; // Convert from wei to ETH
  
  return (
    <div className={`card ${!isActive ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-secondary-900">{name}</h3>
          <p className="text-sm text-secondary-500">{formattedAddress}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-success-100 text-success-800' : 'bg-secondary-100 text-secondary-800'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-secondary-500">Total Value:</span>
          <span className="text-secondary-900">{formattedTotalValue.toFixed(4)} ETH</span>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        {balance.map((token) => {
          // Format token balance
          const tokenBalance = token.symbol === 'USDC' 
            ? parseFloat(token.balance) / 1e6 
            : parseFloat(token.balance) / 1e18;
          
          return (
            <div key={token.token} className="flex justify-between text-sm">
              <span className="text-secondary-500">{token.symbol}:</span>
              <span className="font-medium">{tokenBalance.toFixed(token.symbol === 'WETH' ? 4 : 2)}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-5 flex justify-between">
        <button
          onClick={() => onUpdate(id)}
          className="btn-secondary flex items-center text-sm"
        >
          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
          Update Balance
        </button>
        
        <button className={`text-sm px-3 py-1 rounded-md font-medium ${isActive ? 'text-danger-600 hover:bg-danger-50' : 'text-success-600 hover:bg-success-50'}`}>
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

const PortfolioWallets = () => {
  // Sample wallet data
  const [wallets, setWallets] = useState([
    {
      id: '1',
      address: '0x1234567890123456789012345678901234567890',
      name: 'Main Trading Wallet',
      balance: [
        {
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'WETH',
          balance: '10000000000000000000', // 10 ETH
          value: '10000000000000000000'    // 10 ETH
        },
        {
          token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'DAI',
          balance: '5000000000000000000000', // 5000 DAI
          value: '2750000000000000000'      // 2.75 ETH
        }
      ],
      totalValue: '12750000000000000000', // 12.75 ETH
      isActive: true
    },
    {
      id: '2',
      address: '0x0987654321098765432109876543210987654321',
      name: 'Flash Loans Wallet',
      balance: [
        {
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'WETH',
          balance: '5000000000000000000', // 5 ETH
          value: '5000000000000000000'    // 5 ETH
        },
        {
          token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'USDC',
          balance: '3000000000', // 3000 USDC (6 decimals)
          value: '1650000000000000000'  // 1.65 ETH
        }
      ],
      totalValue: '6650000000000000000', // 6.65 ETH
      isActive: true
    },
    {
      id: '3',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      name: 'Reserve Wallet',
      balance: [
        {
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'WETH',
          balance: '2000000000000000000', // 2 ETH
          value: '2000000000000000000'    // 2 ETH
        }
      ],
      totalValue: '2000000000000000000', // 2 ETH
      isActive: false
    }
  ]);

  const handleUpdateWallet = (walletId) => {
    // In a real implementation, this would call the API to update wallet balances
    console.log(`Updating wallet ${walletId}`);
    
    // For demonstration, we'll simulate a balance update with random variations
    setWallets(wallets.map(wallet => {
      if (wallet.id === walletId) {
        // Apply random variations to balances
        const updatedBalance = wallet.balance.map(token => {
          const variation = 1 + (Math.random() * 0.1 - 0.05); // -5% to +5%
          const newBalance = Math.floor(parseFloat(token.balance) * variation).toString();
          const newValue = Math.floor(parseFloat(token.value) * variation).toString();
          return { ...token, balance: newBalance, value: newValue };
        });
        
        // Calculate new total value
        const newTotalValue = updatedBalance.reduce(
          (sum, token) => sum + BigInt(token.value), 
          BigInt(0)
        ).toString();
        
        return { ...wallet, balance: updatedBalance, totalValue: newTotalValue };
      }
      return wallet;
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Wallets</h2>
        <button className="btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Wallet
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map(wallet => (
          <WalletCard 
            key={wallet.id} 
            wallet={wallet} 
            onUpdate={handleUpdateWallet} 
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioWallets;
