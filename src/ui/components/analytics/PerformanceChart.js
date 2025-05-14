import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  // Sample data for performance metrics
  const performanceData = [
    { date: '2025-04-13', profit: 0.8, trades: 12, successRate: 91.7 },
    { date: '2025-04-14', profit: 1.2, trades: 15, successRate: 93.3 },
    { date: '2025-04-15', profit: 0.9, trades: 10, successRate: 90.0 },
    { date: '2025-04-16', profit: 1.5, trades: 18, successRate: 94.4 },
    { date: '2025-04-17', profit: 2.1, trades: 22, successRate: 95.5 },
    { date: '2025-04-18', profit: 1.8, trades: 20, successRate: 95.0 },
    { date: '2025-04-19', profit: 2.3, trades: 25, successRate: 96.0 },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Performance Analytics</h2>
      
      <div className="space-y-8">
        {/* Profit Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2">Daily Profit (ETH)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit=" ETH" />
                <Tooltip formatter={(value) => [`${value} ETH`, 'Profit']} />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#6366f1" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Trades Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2">Daily Trades</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trades" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Success Rate Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2">Success Rate (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[80, 100]} unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                <Legend />
                <Line type="monotone" dataKey="successRate" stroke="#f59e0b" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
