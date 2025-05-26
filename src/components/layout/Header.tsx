import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  pageName: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  pageName,
  userName = 'Dr. Amanda Chen'
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageName}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <User className="h-5 w-5 text-teal-700" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">Cardiology</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};