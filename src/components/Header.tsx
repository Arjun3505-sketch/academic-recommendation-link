
import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user?: {
    name: string;
    role: string;
  };
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-800">LOR Connect</h1>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-slate-600" />
                <div className="text-sm">
                  <div className="font-medium text-slate-900">{user.name}</div>
                  <div className="text-slate-500">{user.role}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="outline">Login</Button>
              <Button>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
