import React from 'react';
import Layout from '../components/Layout';
import PortfolioWallets from '../components/portfolio/PortfolioWallets';
import PortfolioAllocation from '../components/portfolio/PortfolioAllocation';

const Portfolio = () => {
  return (
    <Layout title="Portfolio">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio Management</h1>
          
          <div className="flex space-x-4">
            <button className="btn-primary">Update All Balances</button>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Portfolio Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Total Value</p>
              <p className="text-2xl font-bold text-secondary-900">21.4 ETH</p>
              <p className="text-sm text-success-600">+2.3 ETH (12.1%) this week</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Active Wallets</p>
              <p className="text-2xl font-bold text-secondary-900">2</p>
              <p className="text-sm text-secondary-500">of 3 total wallets</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-500">Last Updated</p>
              <p className="text-2xl font-bold text-secondary-900">19 Apr, 13:15</p>
              <p className="text-sm text-secondary-500">Automatic update</p>
            </div>
          </div>
        </div>
        
        <PortfolioWallets />
        
        <PortfolioAllocation />
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Wallet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {[
                  { date: '19 Apr, 14:32', wallet: 'Main Trading Wallet', type: 'Arbitrage Profit', amount: '+0.12 ETH', status: 'Completed' },
                  { date: '19 Apr, 13:15', wallet: 'All Wallets', type: 'Balance Update', amount: '', status: 'Completed' },
                  { date: '19 Apr, 12:47', wallet: 'Flash Loans Wallet', type: 'Arbitrage Profit', amount: '+0.08 ETH', status: 'Completed' },
                  { date: '19 Apr, 10:23', wallet: 'Main Portfolio', type: 'Rebalance', amount: '', status: 'Completed' },
                  { date: '19 Apr, 09:05', wallet: 'Main Trading Wallet', type: 'Arbitrage Profit', amount: '+0.15 ETH', status: 'Completed' },
                ].map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {transaction.wallet}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success-600">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                        {transaction.status}
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

export default Portfolio;
