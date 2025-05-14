import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ExchangeDistribution = () => {
  // Sample data for exchange distribution
  const exchangeData = [
    { name: 'Uniswap V3', value: 42, color: '#6366f1' },
    { name: 'SushiSwap', value: 28, color: '#f59e0b' },
    { name: 'Curve', value: 15, color: '#10b981' },
    { name: 'Balancer', value: 10, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#64748b' },
  ];

  // Sample data for token distribution
  const tokenData = [
    { name: 'WETH', value: 35, color: '#6366f1' },
    { name: 'USDC', value: 25, color: '#10b981' },
    { name: 'DAI', value: 20, color: '#f59e0b' },
    { name: 'WBTC', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#64748b' },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Trading Distribution</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exchange Distribution */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center">Exchange Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exchangeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {exchangeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Token Distribution */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center">Token Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tokenData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDistribution;
