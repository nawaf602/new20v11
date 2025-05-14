import React from 'react';
import { BellIcon, MenuIcon } from '@heroicons/react/outline';

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="md:hidden px-4 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="p-1 rounded-full text-secondary-400 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  id="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100">
                    <span className="text-sm font-medium leading-none text-primary-700">FL</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
