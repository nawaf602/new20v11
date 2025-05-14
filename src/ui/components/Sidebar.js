import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeIcon, ChartBarIcon, CogIcon, CurrencyDollarIcon, LightningBoltIcon, UserIcon } from '@heroicons/react/outline';

const Sidebar = ({ active }) => {
  const router = useRouter();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Arbitrage', href: '/arbitrage', icon: LightningBoltIcon },
    { name: 'Portfolio', href: '/portfolio', icon: CurrencyDollarIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Account', href: '/account', icon: UserIcon },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-secondary-200 pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-2xl font-bold text-primary-600">Flash Loans Bot</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${router.pathname === item.href
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'}
                `}
              >
                <item.icon
                  className={`
                    mr-3 flex-shrink-0 h-6 w-6
                    ${router.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-secondary-400 group-hover:text-secondary-500'}
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-secondary-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-500">
                <span className="text-lg font-medium leading-none text-white">FL</span>
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-secondary-700">Flash Loans Bot</p>
              <p className="text-xs font-medium text-secondary-500">v0.1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
