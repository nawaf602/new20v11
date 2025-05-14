import React from 'react';
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid';
import { CurrencyDollarIcon, LightningBoltIcon, ClockIcon, ScaleIcon } from '@heroicons/react/outline';

const StatCard = ({ title, value, change, changeType, icon: Icon }) => {
  return (
    <div className="card">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium leading-6 text-secondary-900">{title}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-secondary-900">{value}</p>
        {change && (
          <div className="flex items-center mt-1">
            {changeType === 'increase' ? (
              <ArrowSmUpIcon className="h-5 w-5 text-success-500" aria-hidden="true" />
            ) : (
              <ArrowSmDownIcon className="h-5 w-5 text-danger-500" aria-hidden="true" />
            )}
            <span className={`text-sm ${changeType === 'increase' ? 'text-success-600' : 'text-danger-600'}`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Profit',
      value: '12.45 ETH',
      change: '3.2%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Arbitrage Opportunities',
      value: '24',
      change: '12%',
      changeType: 'increase',
      icon: LightningBoltIcon,
    },
    {
      title: 'Average Execution Time',
      value: '1.2s',
      change: '0.3s',
      changeType: 'decrease',
      icon: ClockIcon,
    },
    {
      title: 'Success Rate',
      value: '94.5%',
      change: '2.1%',
      changeType: 'increase',
      icon: ScaleIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
