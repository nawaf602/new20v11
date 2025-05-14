import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfitChart = () => {
  // Sample data for the profit chart
  const data = [
    { date: '2025-04-13', profit: 0.8 },
    { date: '2025-04-14', profit: 1.2 },
    { date: '2025-04-15', profit: 0.9 },
    { date: '2025-04-16', profit: 1.5 },
    { date: '2025-04-17', profit: 2.1 },
    { date: '2025-04-18', profit: 1.8 },
    { date: '2025-04-19', profit: 2.3 },
  ];

  return (
    <div className="card h-80">
      <h3 className="text-lg font-medium leading-6 text-secondary-900 mb-4">Profit History</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" ETH" />
          <Tooltip formatter={(value) => [`${value} ETH`, 'Profit']} />
          <Area type="monotone" dataKey="profit" stroke="#6366f1" fill="#c7d2fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;
