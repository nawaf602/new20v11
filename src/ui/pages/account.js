import React, { useState } from 'react';
import Layout from '../components/Layout';
import { UserIcon, KeyIcon, ShieldCheckIcon, CogIcon } from '@heroicons/react/outline';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    name: 'Flash Loans User',
    email: 'user@flashloans.example',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    joinDate: 'April 15, 2025',
    apiKeys: [
      { name: 'Main API Key', key: 'fl_api_xxxxxxxxxxxx', created: 'April 16, 2025' }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      emailNotifications: true,
      loginAlerts: true
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow-card rounded-lg p-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Name</label>
                  <input type="text" className="input" defaultValue={userData.name} />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" defaultValue={userData.email} />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Wallet Address</label>
                  <input type="text" className="input" defaultValue={userData.walletAddress} readOnly />
                </div>
              </div>
              <div className="mt-6">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
            
            <div className="bg-white shadow-card rounded-lg p-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">Account Information</h3>
              <div className="text-sm text-secondary-500">
                <p>Member since: {userData.joinDate}</p>
                <p className="mt-2">Account type: Premium</p>
              </div>
            </div>
          </div>
        );
      
      case 'api':
        return (
          <div className="bg-white shadow-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-secondary-900">API Keys</h3>
              <button className="btn-primary">Generate New Key</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Key</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {userData.apiKeys.map((apiKey, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{apiKey.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">{apiKey.key}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">{apiKey.created}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Revoke</button>
                        <button className="text-primary-600 hover:text-primary-900">Rename</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="bg-white shadow-card rounded-lg p-6">
            <h3 className="text-lg font-medium text-secondary-900 mb-6">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                <div>
                  <h4 className="text-sm font-medium text-secondary-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-secondary-500">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-secondary-500">
                    {userData.securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button className="btn-secondary text-sm">
                    {userData.securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                <div>
                  <h4 className="text-sm font-medium text-secondary-900">Email Notifications</h4>
                  <p className="text-sm text-secondary-500">Receive email alerts for important account activities</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-secondary-500">
                    {userData.securitySettings.emailNotifications ? 'Enabled' : 'Disabled'}
                  </span>
                  <button className="btn-secondary text-sm">
                    {userData.securitySettings.emailNotifications ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                <div>
                  <h4 className="text-sm font-medium text-secondary-900">Login Alerts</h4>
                  <p className="text-sm text-secondary-500">Get notified when someone logs into your account</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-secondary-500">
                    {userData.securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}
                  </span>
                  <button className="btn-secondary text-sm">
                    {userData.securitySettings.loginAlerts ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="bg-white shadow-card rounded-lg p-6">
            <h3 className="text-lg font-medium text-secondary-900 mb-6">Account Preferences</h3>
            
            <div className="space-y-6">
              <div>
                <label className="label">Default Currency</label>
                <select className="input">
                  <option>ETH</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>BTC</option>
                </select>
              </div>
              
              <div>
                <label className="label">Time Zone</label>
                <select className="input">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                  <option>GMT (Greenwich Mean Time)</option>
                </select>
              </div>
              
              <div>
                <label className="label">Theme</label>
                <div className="flex space-x-4 mt-2">
                  <button className="h-10 w-10 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center">
                    <span className="h-6 w-6 rounded-full bg-white"></span>
                  </button>
                  <button className="h-10 w-10 rounded-full bg-secondary-900 border-2 border-transparent flex items-center justify-center">
                    <span className="h-6 w-6 rounded-full bg-secondary-900"></span>
                  </button>
                  <button className="h-10 w-10 rounded-full bg-primary-100 border-2 border-transparent flex items-center justify-center">
                    <span className="h-6 w-6 rounded-full bg-primary-100"></span>
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="btn-primary">Save Preferences</button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout title="Account">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white shadow-card rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 mb-4">
                  <UserIcon className="h-10 w-10 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium text-secondary-900">{userData.name}</h3>
                <p className="text-sm text-secondary-500 mt-1">{userData.email}</p>
              </div>
              
              <div className="border-t border-secondary-200">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === 'profile'
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <UserIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                    Profile
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === 'api'
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <KeyIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                    API Keys
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === 'security'
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <ShieldCheckIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                    Security
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === 'preferences'
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <CogIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                    Preferences
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="mt-5 md:mt-0 md:col-span-9">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
