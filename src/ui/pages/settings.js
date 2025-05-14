import React from 'react';
import Layout from '../components/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';

const Settings = () => {
  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bot Settings</h1>
          
          <div className="flex space-x-4">
            <button className="btn-secondary">Reset to Defaults</button>
            <button className="btn-primary">Save All Changes</button>
          </div>
        </div>
        
        <SettingsTabs />
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Bot Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-secondary-500">Status:</span>
                  <span className="font-medium text-success-600">Running</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Version:</span>
                  <span className="font-medium">0.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Uptime:</span>
                  <span className="font-medium">3 days, 7 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Last Restart:</span>
                  <span className="font-medium">16 Apr, 12:23</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Network Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-secondary-500">Network:</span>
                  <span className="font-medium">Ethereum Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Gas Price:</span>
                  <span className="font-medium">32 Gwei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Block Height:</span>
                  <span className="font-medium">18,245,632</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">API Status:</span>
                  <span className="font-medium text-success-600">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">System Logs</h3>
            <div className="bg-secondary-900 text-secondary-100 p-4 rounded-md font-mono text-sm h-48 overflow-y-auto">
              <p>[2025-04-19 19:32:15] INFO: Arbitrage opportunity detected on Uniswap/SushiSwap</p>
              <p>[2025-04-19 19:32:16] INFO: Executing arbitrage transaction</p>
              <p>[2025-04-19 19:32:18] INFO: Transaction successful: 0x7a8f...3e2d</p>
              <p>[2025-04-19 19:32:18] INFO: Profit: 0.12 ETH</p>
              <p>[2025-04-19 19:30:05] INFO: Scanning for arbitrage opportunities</p>
              <p>[2025-04-19 19:25:12] INFO: Updated wallet balances</p>
              <p>[2025-04-19 19:20:45] INFO: Mempool monitoring active</p>
              <p>[2025-04-19 19:15:30] INFO: Connected to Ethereum node</p>
              <p>[2025-04-19 19:15:28] INFO: Starting Flash Loans Arbitrage Bot</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <button className="btn-secondary">Download Logs</button>
            <button className="btn-primary">Restart Bot</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
