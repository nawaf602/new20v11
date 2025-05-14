import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PortfolioAllocation = () => {
  // Sample portfolio allocation data
  const [allocation, setAllocation] = useState([
    { name: 'WETH', value: 17, color: '#6366f1' },
    { name: 'DAI', value: 27.5, color: '#f59e0b' },
    { name: 'USDC', value: 16.5, color: '#10b981' },
    { name: 'WBTC', value: 39, color: '#ef4444' }
  ]);

  // Total portfolio value in ETH
  const totalValue = allocation.reduce((sum, item) => sum + item.value, 0);

  // Rebalance form state
  const [targetAllocation, setTargetAllocation] = useState({
    WETH: 20,
    DAI: 25,
    USDC: 15,
    WBTC: 40
  });

  const handleRebalance = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would call the API to rebalance the portfolio
    console.log('Rebalancing portfolio with target allocation:', targetAllocation);
    
    // For demonstration, we'll update the allocation to match the target
    setAllocation(
      allocation.map(item => ({
        ...item,
        value: targetAllocation[item.name]
      }))
    );
  };

  const handleAllocationChange = (token, value) => {
    setTargetAllocation({
      ...targetAllocation,
      [token]: parseFloat(value)
    });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Portfolio Allocation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(2)} ETH (${(value / totalValue * 100).toFixed(2)}%)`, 'Value']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Rebalance Form */}
        <div>
          <h3 className="text-lg font-medium mb-3">Rebalance Portfolio</h3>
          <form onSubmit={handleRebalance}>
            <div className="space-y-4">
              {allocation.map(item => (
                <div key={item.name} className="flex items-center">
                  <label className="w-20 text-sm font-medium text-secondary-700">{item.name}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={targetAllocation[item.name]}
                    onChange={(e) => handleAllocationChange(item.name, e.target.value)}
                    className="input max-w-xs"
                  />
                  <span className="ml-2 text-sm text-secondary-500">%</span>
                </div>
              ))}
              
              <div className="flex items-center text-sm font-medium">
                <span className="w-20">Total:</span>
                <span className={`${
                  Object.values(targetAllocation).reduce((sum, val) => sum + val, 0) === 100
                    ? 'text-success-600'
                    : 'text-danger-600'
                }`}>
                  {Object.values(targetAllocation).reduce((sum, val) => sum + val, 0)}%
                </span>
                {Object.values(targetAllocation).reduce((sum, val) => sum + val, 0) !== 100 && (
                  <span className="ml-2 text-danger-600">(Must equal 100%)</span>
                )}
              </div>
              
              <button
                type="submit"
                className="btn-primary mt-4"
                disabled={Object.values(targetAllocation).reduce((sum, val) => sum + val, 0) !== 100}
              >
                Rebalance Portfolio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocation;
