import React from 'react';
import { LightningBoltIcon, CurrencyDollarIcon, ExclamationIcon } from '@heroicons/react/outline';

const ArbitrageOpportunityCard = ({ opportunity, onExecute }) => {
  const {
    id,
    type,
    sourceExchange,
    targetExchange,
    tokenPath,
    expectedProfit,
    expectedProfitPercentage,
    confidence
  } = opportunity;

  // Format the token path for display
  const formattedTokenPath = tokenPath.map(token => {
    // Extract token symbol from address (simplified)
    const symbols = {
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'WETH',
      '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
      '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'USDT',
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 'WBTC'
    };
    return symbols[token] || token.substring(0, 6) + '...' + token.substring(token.length - 4);
  }).join(' → ');

  // Determine confidence level color
  let confidenceColor = 'text-warning-500';
  if (confidence >= 0.9) {
    confidenceColor = 'text-success-500';
  } else if (confidence < 0.7) {
    confidenceColor = 'text-danger-500';
  }

  // Format profit for display
  const formattedProfit = parseFloat(expectedProfit) / 1e18; // Convert from wei to ETH
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <LightningBoltIcon className="h-6 w-6 text-primary-600 mr-2" />
          <h3 className="text-lg font-medium text-secondary-900 capitalize">{type} Arbitrage</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${confidenceColor} bg-opacity-10`}>
          {Math.round(confidence * 100)}% Confidence
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Route:</span>
          <span className="font-medium text-secondary-900">{sourceExchange} → {targetExchange}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Token Path:</span>
          <span className="font-medium text-secondary-900">{formattedTokenPath}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Expected Profit:</span>
          <span className="font-medium text-success-600">{formattedProfit.toFixed(4)} ETH ({expectedProfitPercentage}%)</span>
        </div>
      </div>
      
      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={() => onExecute(opportunity)}
          className="btn-primary flex items-center"
        >
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          Execute
        </button>
        
        <button className="btn-secondary flex items-center">
          <ExclamationIcon className="h-5 w-5 mr-1" />
          Details
        </button>
      </div>
    </div>
  );
};

export default ArbitrageOpportunityCard;
