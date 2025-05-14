import React, { useState } from 'react';
import { CogIcon, ShieldCheckIcon, CurrencyDollarIcon, ChipIcon } from '@heroicons/react/outline';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'trading', name: 'Trading', icon: CurrencyDollarIcon },
    { id: 'advanced', name: 'Advanced', icon: ChipIcon },
  ];

  return (
    <div className="card">
      <div className="border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'}
              `}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'trading' && <TradingSettings />}
        {activeTab === 'advanced' && <AdvancedSettings />}
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
    language: 'en',
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-secondary-900">General Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="theme">Theme</label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="input"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        
        <div>
          <label className="label" htmlFor="language">Language</label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="input"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            id="notifications"
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => handleChange('notifications', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="notifications" className="ml-2 block text-sm text-secondary-700">
            Enable notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="autoRefresh"
            type="checkbox"
            checked={settings.autoRefresh}
            onChange={(e) => handleChange('autoRefresh', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="autoRefresh" className="ml-2 block text-sm text-secondary-700">
            Auto-refresh data
          </label>
        </div>
        
        {settings.autoRefresh && (
          <div>
            <label className="label" htmlFor="refreshInterval">Refresh interval (seconds)</label>
            <input
              id="refreshInterval"
              type="number"
              min="5"
              max="300"
              value={settings.refreshInterval}
              onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
              className="input max-w-xs"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button type="button" className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    apiKeyRestrictions: true,
    ipWhitelist: '',
    sessionTimeout: 30,
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-secondary-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="twoFactorEnabled"
            type="checkbox"
            checked={settings.twoFactorEnabled}
            onChange={(e) => handleChange('twoFactorEnabled', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="twoFactorEnabled" className="ml-2 block text-sm text-secondary-700">
            Enable two-factor authentication
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="apiKeyRestrictions"
            type="checkbox"
            checked={settings.apiKeyRestrictions}
            onChange={(e) => handleChange('apiKeyRestrictions', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="apiKeyRestrictions" className="ml-2 block text-sm text-secondary-700">
            Enable API key restrictions
          </label>
        </div>
        
        <div>
          <label className="label" htmlFor="ipWhitelist">IP Whitelist (comma separated)</label>
          <input
            id="ipWhitelist"
            type="text"
            value={settings.ipWhitelist}
            onChange={(e) => handleChange('ipWhitelist', e.target.value)}
            placeholder="e.g., 192.168.1.1, 10.0.0.1"
            className="input"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="sessionTimeout">Session Timeout (minutes)</label>
          <input
            id="sessionTimeout"
            type="number"
            min="5"
            max="120"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
            className="input max-w-xs"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="button" className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const TradingSettings = () => {
  const [settings, setSettings] = useState({
    maxGasPrice: 50,
    slippageTolerance: 0.5,
    minProfitThreshold: 0.01,
    maxTradeSize: 5,
    autoExecute: true,
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-secondary-900">Trading Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="maxGasPrice">Maximum Gas Price (Gwei)</label>
          <input
            id="maxGasPrice"
            type="number"
            min="10"
            max="500"
            value={settings.maxGasPrice}
            onChange={(e) => handleChange('maxGasPrice', parseInt(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="slippageTolerance">Slippage Tolerance (%)</label>
          <input
            id="slippageTolerance"
            type="number"
            min="0.1"
            max="5"
            step="0.1"
            value={settings.slippageTolerance}
            onChange={(e) => handleChange('slippageTolerance', parseFloat(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="minProfitThreshold">Minimum Profit Threshold (ETH)</label>
          <input
            id="minProfitThreshold"
            type="number"
            min="0.001"
            max="1"
            step="0.001"
            value={settings.minProfitThreshold}
            onChange={(e) => handleChange('minProfitThreshold', parseFloat(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="maxTradeSize">Maximum Trade Size (ETH)</label>
          <input
            id="maxTradeSize"
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={settings.maxTradeSize}
            onChange={(e) => handleChange('maxTradeSize', parseFloat(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="autoExecute"
            type="checkbox"
            checked={settings.autoExecute}
            onChange={(e) => handleChange('autoExecute', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="autoExecute" className="ml-2 block text-sm text-secondary-700">
            Auto-execute profitable arbitrage opportunities
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="button" className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AdvancedSettings = () => {
  const [settings, setSettings] = useState({
    enableMempoolMonitoring: true,
    enableSandwichAttacks: false,
    enableAIPredictions: true,
    maxConcurrentRequests: 50,
    scanInterval: 5,
    logLevel: 'info',
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-secondary-900">Advanced Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="enableMempoolMonitoring"
            type="checkbox"
            checked={settings.enableMempoolMonitoring}
            onChange={(e) => handleChange('enableMempoolMonitoring', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="enableMempoolMonitoring" className="ml-2 block text-sm text-secondary-700">
            Enable mempool monitoring
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="enableSandwichAttacks"
            type="checkbox"
            checked={settings.enableSandwichAttacks}
            onChange={(e) => handleChange('enableSandwichAttacks', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="enableSandwichAttacks" className="ml-2 block text-sm text-secondary-700">
            Enable sandwich attack detection
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="enableAIPredictions"
            type="checkbox"
            checked={settings.enableAIPredictions}
            onChange={(e) => handleChange('enableAIPredictions', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label htmlFor="enableAIPredictions" className="ml-2 block text-sm text-secondary-700">
            Enable AI predictions
          </label>
        </div>
        
        <div>
          <label className="label" htmlFor="maxConcurrentRequests">Maximum Concurrent Requests</label>
          <input
            id="maxConcurrentRequests"
            type="number"
            min="10"
            max="200"
            value={settings.maxConcurrentRequests}
            onChange={(e) => handleChange('maxConcurrentRequests', parseInt(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="scanInterval">Scan Interval (seconds)</label>
          <input
            id="scanInterval"
            type="number"
            min="1"
            max="60"
            value={settings.scanInterval}
            onChange={(e) => handleChange('scanInterval', parseInt(e.target.value))}
            className="input max-w-xs"
          />
        </div>
        
        <div>
          <label className="label" htmlFor="logLevel">Log Level</label>
          <select
            id="logLevel"
            value={settings.logLevel}
            onChange={(e) => handleChange('logLevel', e.target.value)}
            className="input"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="button" className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsTabs;
