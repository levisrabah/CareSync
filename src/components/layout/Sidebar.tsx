import React from 'react';
import { Home, Users, Calendar, Clock, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
  { id: 'patients', label: 'Patients', icon: <Users className="h-5 w-5" /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
  { id: 'reminders', label: 'Reminders', icon: <Clock className="h-5 w-5" /> },
  { id: 'templates', label: 'Templates', icon: <MessageSquare className="h-5 w-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  onNavigate,
  currentPage
}) => {
  const { handleSignOut } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white transform shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="bg-teal-600 text-white p-1.5 rounded">
                <Clock className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">HealthRemind</h1>
            </div>
            <button
              className="p-1 rounded-full hover:bg-gray-100 lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${currentPage === item.id 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              >
                <span className={currentPage === item.id ? 'text-teal-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {item.id === 'reminders' && (
                  <span className="ml-auto bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    4
                  </span>
                )}
              </button>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              fullWidth 
              className="justify-start"
              icon={<LogOut className="h-5 w-5" />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Toggle Button */}
      <button
        className="fixed bottom-4 right-4 p-3 bg-teal-600 text-white rounded-full shadow-lg z-20 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};