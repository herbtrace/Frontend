'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileCreation } from '@/components/profile-creation/ProfileCreation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Image from 'next/image';
import {
  LogOut,
  Home,
  Plus,
  Bell,
  Search,
  ChevronRight,
  Menu,
} from 'lucide-react';

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    href: '/dashboard/overview',
  },
  {
    id: 'create-profile',
    label: 'Create Profile',
    icon: Plus,
    href: '/dashboard/create-profile',
  },
];

export default function CreateProfilePage() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleBack = () => {
    router.push('/dashboard/overview');
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4'></div>
          <p className='text-gray-500 text-sm'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-sm border-r'>
        <div className='p-6'>
          <div className='flex items-center space-x-3'>
            <Image
              src='/logo.png'
              alt='Herbtrace Logo'
              width={32}
              height={32}
              className='rounded-lg'
            />
            <span className='font-semibold text-gray-900'>Herbtrace</span>
          </div>
        </div>

        <nav className='px-4 space-y-1'>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = item.id === 'create-profile';

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className='w-5 h-5' />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className='absolute bottom-0 left-0 right-0 w-64 p-4 border-t bg-white'>
          <div className='flex items-center space-x-3'>
            <Avatar className='w-8 h-8'>
              <AvatarFallback className='bg-green-100 text-green-700 text-sm'>
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate'>
                {user?.name || user?.email}
              </p>
              <p className='text-xs text-gray-500 truncate'>Manager</p>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleLogout}
              className='p-2 hover:bg-gray-100'
            >
              <LogOut className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-white border-b px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-center space-x-4 mb-2'>
                <h1 className='text-2xl font-bold text-gray-900'>
                  Create Profile
                </h1>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowBreadcrumbs(!showBreadcrumbs)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <Menu className='w-4 h-4' />
                  <span className='sr-only'>Toggle breadcrumbs</span>
                </Button>
              </div>
              {showBreadcrumbs && (
                <Breadcrumb className='mb-2'>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href='/dashboard'
                        className='text-gray-500 hover:text-gray-700'
                      >
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className='w-4 h-4' />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className='text-gray-900 font-medium'>
                        Create Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}
              <p className='text-sm text-gray-500'>
                Add new entities to the supply chain
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              <Button variant='outline' size='sm'>
                <Search className='w-4 h-4 mr-2' />
                Search
              </Button>
              <Button variant='outline' size='sm'>
                <Bell className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 p-6'>
          <div className='max-w-4xl mx-auto'>
            <ProfileCreation onBack={handleBack} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
