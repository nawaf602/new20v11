import React from 'react';
import Layout from '../components/Layout';
import PerformanceChart from '../components/analytics/PerformanceChart';
import ExchangeDistribution from '../components/analytics/ExchangeDistribution';

const Analytics = () => {
  return (
    <Layout title="Analytics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          
          <div className="flex space-x-4">
            <select className="input max-w-xs">
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>
            
            <button className="btn-secondary">Export Data</button>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Total Profit</p>
              <p className="text-2xl font-bold text-secondary-900">12.45 ETH</p>
              <p className="text-sm text-success-600">+3.2% from previous period</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Total Trades</p>
              <p className="text-2xl font-bold text-secondary-900">142</p>
              <p className="text-sm text-success-600">+12% from previous period</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Success Rate</p>
              <p className="text-2xl font-bold text-secondary-900">94.5%</p>
              <p className="text-sm text-success-600">+2.1% from previous period</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Avg. Profit per Trade</p>
              <p className="text-2xl font-bold text-secondary-900">0.088 ETH</p>
              <p className="text-sm text-danger-600">-0.5% from previous period</p>
            </div>
          </div>
        </div>
        
        <PerformanceChart />
        
        <ExchangeDistribution />
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Top Performing Arbitrage Routes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Trades
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Total Profit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Avg. Profit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {[
                  { route: 'Uniswap V3 → SushiSwap', type: 'Simple', trades: 42, successRate: '97.6%', totalProfit: '3.85 ETH', avgProfit: '0.092 ETH' },
                  { route: 'Curve → Balancer → Uniswap V3', type: 'Triangular', trades: 28, successRate: '92.9%', totalProfit: '2.64 ETH', avgProfit: '0.094 ETH' },
                  { route: 'Uniswap V3 → Curve', type: 'Simple', trades: 35, successRate: '94.3%', totalProfit: '2.45 ETH', avgProfit: '0.070 ETH' },
                  { route: 'Uniswap V3 → SushiSwap → Balancer', type: 'Multi-Step', trades: 18, successRate: '88.9%', totalProfit: '1.98 ETH', avgProfit: '0.110 ETH' },
                  { route: 'Balancer → SushiSwap', type: 'Simple', trades: 19, successRate: '94.7%', totalProfit: '1.53 ETH', avgProfit: '0.081 ETH' },
                ].map((route, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {route.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {route.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {route.trades}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {route.successRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success-600">
                      {route.totalProfit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success-600">
                      {route.avgProfit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
