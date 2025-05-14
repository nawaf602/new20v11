import React from 'react';
import Layout from '../components/Layout';
import DashboardStats from '../components/dashboard/DashboardStats';
import ProfitChart from '../components/dashboard/ProfitChart';
import ArbitrageOpportunitiesList from '../components/arbitrage/ArbitrageOpportunitiesList';

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfitChart />
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { time: '19 Apr, 14:32', action: 'Executed arbitrage on Uniswap/SushiSwap', profit: '+0.12 ETH' },
                { time: '19 Apr, 13:15', action: 'Wallet balance updated', profit: '' },
                { time: '19 Apr, 12:47', action: 'Executed arbitrage on Curve/Balancer', profit: '+0.08 ETH' },
                { time: '19 Apr, 10:23', action: 'Portfolio rebalanced', profit: '' },
                { time: '19 Apr, 09:05', action: 'Executed arbitrage on Uniswap/Curve', profit: '+0.15 ETH' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-secondary-100 last:border-0">
                  <div>
                    <p className="text-sm text-secondary-500">{activity.time}</p>
                    <p className="font-medium">{activity.action}</p>
                  </div>
                  {activity.profit && (
                    <span className="text-success-600 font-medium">{activity.profit}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <ArbitrageOpportunitiesList />
      </div>
    </Layout>
  );
};

export default Dashboard;
