import React from 'react';
import Layout from '../components/Layout';
import ArbitrageOpportunitiesList from '../components/arbitrage/ArbitrageOpportunitiesList';

const Arbitrage = () => {
  return (
    <Layout title="Arbitrage">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Arbitrage Opportunities</h1>
          
          <div className="flex space-x-4">
            <select className="input max-w-xs">
              <option value="all">All Types</option>
              <option value="simple">Simple</option>
              <option value="triangular">Triangular</option>
              <option value="multi_step">Multi-Step</option>
            </select>
            
            <select className="input max-w-xs">
              <option value="all">All Exchanges</option>
              <option value="uniswap">Uniswap</option>
              <option value="sushiswap">SushiSwap</option>
              <option value="curve">Curve</option>
              <option value="balancer">Balancer</option>
            </select>
            
            <button className="btn-primary">Scan Now</button>
          </div>
        </div>
        
        <div className="card p-4">
          <h2 className="text-lg font-medium mb-3">Arbitrage Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label" htmlFor="minProfit">Minimum Profit (ETH)</label>
              <input
                id="minProfit"
                type="number"
                min="0.001"
                step="0.001"
                defaultValue="0.01"
                className="input"
              />
            </div>
            
            <div>
              <label className="label" htmlFor="maxGas">Maximum Gas (Gwei)</label>
              <input
                id="maxGas"
                type="number"
                min="10"
                defaultValue="50"
                className="input"
              />
            </div>
            
            <div>
              <label className="label" htmlFor="confidence">Minimum Confidence (%)</label>
              <input
                id="confidence"
                type="number"
                min="50"
                max="100"
                defaultValue="75"
                className="input"
              />
            </div>
          </div>
        </div>
        
        <ArbitrageOpportunitiesList />
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Arbitrage Executions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Profit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {[
                  { time: '19 Apr, 14:32', type: 'Simple', route: 'Uniswap V3 → SushiSwap', profit: '0.12 ETH', status: 'Success' },
                  { time: '19 Apr, 12:47', type: 'Triangular', route: 'Curve → Balancer → Uniswap V3', profit: '0.08 ETH', status: 'Success' },
                  { time: '19 Apr, 09:05', type: 'Simple', route: 'Uniswap V3 → Curve', profit: '0.15 ETH', status: 'Success' },
                  { time: '18 Apr, 22:18', type: 'Multi-Step', route: 'Uniswap V3 → SushiSwap → Balancer', profit: '0.22 ETH', status: 'Success' },
                  { time: '18 Apr, 16:45', type: 'Simple', route: 'Balancer → SushiSwap', profit: '0.05 ETH', status: 'Failed' },
                ].map((execution, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {execution.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {execution.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {execution.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success-600">
                      {execution.profit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        execution.status === 'Success' ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                      }`}>
                        {execution.status}
                      </span>
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

export default Arbitrage;
