'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  BarChart3,
  Users,
  FlaskConical,
  FileCheck,
  Settings,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AnalyticsProps {
  onBack: () => void;
  onLogout: () => void;
  user: User | null;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, active: false },
  { id: 'farmers', label: 'Farmers', icon: Users, active: false },
  { id: 'labs', label: 'Labs', icon: FlaskConical, active: false },
  { id: 'verification', label: 'Verification', icon: FileCheck, active: false },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, active: true },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

export const Analytics = ({ onBack, onLogout, user }: AnalyticsProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className='min-h-screen bg-white flex'>
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-14' : 'w-60'} bg-white border-r border-gray-200/60 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}
      >
        {/* Sidebar Header */}
        <div className='p-4 border-b border-gray-200/60'>
          <div className='flex items-center justify-between'>
            {!sidebarCollapsed ? (
              <div className='flex items-center space-x-2.5'>
                <Image
                  src='/logo.png'
                  alt='Herbtrace Logo'
                  width={24}
                  height={24}
                  className='rounded-lg'
                />
                <span className='text-base font-medium text-gray-900'>
                  Herbtrace
                </span>
              </div>
            ) : (
              <Image
                src='/logo.png'
                alt='Herbtrace Logo'
                width={24}
                height={24}
                className='rounded-lg mx-auto'
              />
            )}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className='h-6 w-6 p-0 hover:bg-gray-100'
            >
              {sidebarCollapsed ? (
                <ChevronRight className='w-3.5 h-3.5' />
              ) : (
                <ChevronLeft className='w-3.5 h-3.5' />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex-1 py-3'>
          {menuItems.map(item => (
            <Button
              key={item.id}
              variant='ghost'
              onClick={item.id === 'dashboard' ? onBack : undefined}
              className={`w-full ${
                sidebarCollapsed ? 'justify-center px-0' : 'justify-start px-3'
              } mx-2 my-0.5 h-9 text-sm ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700'
                  : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
              }`}
            >
              <item.icon className='w-4 h-4 flex-shrink-0' />
              {!sidebarCollapsed && (
                <span className='ml-2.5 font-medium'>{item.label}</span>
              )}
            </Button>
          ))}
        </div>

        {/* Logout Button */}
        <div className='p-2 border-t border-gray-200/60'>
          <Button
            variant='ghost'
            onClick={onLogout}
            className={`w-full h-9 text-sm ${
              sidebarCollapsed ? 'justify-center px-0' : 'justify-start px-3'
            } hover:bg-red-50 hover:text-red-600 text-gray-700`}
          >
            <LogOut className='w-4 h-4 flex-shrink-0' />
            {!sidebarCollapsed && (
              <span className='ml-2.5 font-medium'>Logout</span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white border-b border-gray-200/60 px-5 py-3 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>
                Analytics Dashboard
              </h1>
              <p className='text-xs text-gray-500 mt-0.5'>
                Supply chain insights and performance metrics
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <Badge variant='outline' className='text-xs font-medium'>
                Real-time Data
              </Badge>
              <Avatar className='w-7 h-7 ring-1 ring-gray-200'>
                <AvatarFallback className='bg-emerald-100 text-emerald-700 font-medium text-sm'>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Analytics Content */}
        <main className='flex-1 p-5 bg-gray-50/40'>
          <div className='text-center py-20'>
            <div className='max-w-md mx-auto'>
              <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <BarChart3 className='w-8 h-8 text-emerald-600' />
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                Analytics Dashboard
              </h2>
              <p className='text-gray-600 mb-8'>
                Analytics features will be implemented when metrics endpoints
                are available. Currently integrating with your transaction and
                profile APIs.
              </p>
              <div className='space-y-3'>
                <Card className='p-4 text-left'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    Available Data Sources:
                  </h3>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Profile data from /profiles endpoints</li>
                    <li>• Transaction data from /transactions endpoints</li>
                    <li>• Real-time supply chain events</li>
                    <li>• Custom analytics (when implemented)</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
