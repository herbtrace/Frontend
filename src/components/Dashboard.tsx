'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProfileCreation } from '@/components/profile-creation/ProfileCreation';
import { ChartAreaInteractive } from '@/components/charts/ChartAreaInteractive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Menu,
  LogOut,
  Home,
  BarChart3,
  Users,
  FlaskConical,
  Settings,
  Plus,
  Activity,
  TrendingUp,
  Package,
  Shield,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface DashboardProps {
  onLogout: () => void;
  onShowAnalytics: () => void;
  user: User | null;
}

const menuItems = [
  { id: 'dashboard', label: 'Overview', icon: Home, href: '/dashboard' },
  {
    id: 'create-profile',
    label: 'Create Profile',
    icon: Plus,
    href: '/create-profile',
  },
];

const stats = [
  {
    label: 'Total Profiles',
    value: '2,847',
    change: '+12%',
    changeValue: 12,
    icon: Users,
    trend: 'up',
    description: 'vs last month',
    progress: 85,
  },
  {
    label: 'Active Transactions',
    value: '1,234',
    change: '+8%',
    changeValue: 8,
    icon: Activity,
    trend: 'up',
    description: 'vs last month',
    progress: 67,
  },
  {
    label: 'Verified Products',
    value: '5,678',
    change: '+15%',
    changeValue: 15,
    icon: Package,
    trend: 'up',
    description: 'vs last month',
    progress: 92,
  },
  {
    label: 'Quality Tests',
    value: '892',
    change: '+3%',
    changeValue: 3,
    icon: FlaskConical,
    trend: 'up',
    description: 'vs last month',
    progress: 45,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'profile',
    title: 'New farmer profile created',
    description: 'Rajesh Kumar from Punjab',
    time: '2 minutes ago',
    status: 'completed',
    icon: Users,
  },
  {
    id: 2,
    type: 'transaction',
    title: 'Transaction validated',
    description: 'Batch #TXN-2024-001 approved',
    time: '15 minutes ago',
    status: 'completed',
    icon: CheckCircle2,
  },
  {
    id: 3,
    type: 'quality',
    title: 'Quality test completed',
    description: 'Pesticide residue test passed',
    time: '1 hour ago',
    status: 'completed',
    icon: FlaskConical,
  },
  {
    id: 4,
    type: 'alert',
    title: 'System alert',
    description: 'Low inventory warning',
    time: '2 hours ago',
    status: 'warning',
    icon: AlertCircle,
  },
  {
    id: 5,
    type: 'transaction',
    title: 'New transaction initiated',
    description: 'Batch #TXN-2024-002 started',
    time: '3 hours ago',
    status: 'pending',
    icon: Activity,
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Quality inspection due',
    description: 'Lab test for Batch #PRD-001',
    dueDate: 'Today, 4:00 PM',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Profile verification',
    description: 'Review pending farmer applications',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Monthly report',
    description: 'Generate supply chain analytics',
    dueDate: 'Dec 30, 2024',
    priority: 'low',
    status: 'pending',
  },
];

export const Dashboard = ({
  onLogout,
  onShowAnalytics,
  user,
  initialView = 'dashboard',
}: DashboardProps & { initialView?: 'dashboard' | 'create-profile' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState(initialView);
  const router = useRouter();

  return (
    <div className='h-screen bg-white flex overflow-hidden'>
      {/* Minimalist Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col relative`}
      >
        {/* Sidebar Header */}
        <div className='h-16 px-4 border-b border-gray-100 flex items-center justify-between'>
          <div
            className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center w-full'}`}
          >
            <Image
              src='/logo.png'
              alt='Herbtrace Logo'
              width={sidebarOpen ? 32 : 24}
              height={sidebarOpen ? 32 : 24}
              className='object-contain'
            />
            {sidebarOpen && (
              <span className='text-lg font-normal text-black'>Herbtrace</span>
            )}
          </div>
          {sidebarOpen && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='h-8 w-8 p-0 hover:bg-gray-50 flex-shrink-0'
            >
              <Menu className='w-4 h-4 text-black' />
            </Button>
          )}
        </div>

        {/* Toggle Button When Collapsed */}
        {!sidebarOpen && (
          <div className='absolute top-4 -right-3 z-10'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='h-6 w-6 p-0 hover:bg-gray-50 bg-white border border-gray-200 rounded-full shadow-sm'
            >
              <Menu className='w-3 h-3 text-black' />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={`flex-1 py-3 space-y-1 ${sidebarOpen ? 'px-3' : 'px-2'}`}
        >
          {menuItems.map(item => (
            <Button
              key={item.id}
              variant='ghost'
              onClick={() => {
                if (item.id === 'analytics') {
                  onShowAnalytics();
                } else {
                  router.push(item.href as string);
                }
              }}
              className={`w-full ${
                sidebarOpen ? 'justify-start px-3' : 'justify-center px-0'
              } h-9 text-sm font-normal transition-colors ${
                currentView === item.id
                  ? 'bg-green-50 text-green-600 hover:bg-green-50'
                  : 'text-black hover:bg-gray-50'
              }`}
            >
              <item.icon className='w-4 h-4 flex-shrink-0' />
              {sidebarOpen && (
                <span className='ml-2 text-sm'>{item.label}</span>
              )}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className='p-2 border-t border-gray-100'>
          <div
            className={`flex items-center p-2 rounded hover:bg-gray-50 transition-colors ${
              sidebarOpen ? 'space-x-2' : 'justify-center'
            }`}
          >
            <Avatar className='w-6 h-6'>
              <AvatarFallback className='bg-green-100 text-green-600 font-normal text-xs'>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className='flex-1 min-w-0'>
                <p className='text-xs font-normal text-black truncate'>
                  {user?.name}
                </p>
                <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
              </div>
            )}
          </div>
          <Button
            variant='ghost'
            onClick={onLogout}
            className={`w-full mt-1 h-8 text-xs font-normal transition-colors text-black hover:bg-gray-50 ${
              sidebarOpen ? 'justify-start px-3' : 'justify-center px-0'
            }`}
          >
            <LogOut className='w-3 h-3 flex-shrink-0' />
            {sidebarOpen && <span className='ml-2'>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Minimalist Header */}
        <header className='h-10 bg-white border-b border-gray-100 px-6 flex items-center justify-between'>
          <div>
            <h1 className='text-base font-normal text-black'>
              {currentView === 'create-profile'
                ? 'Create Profile'
                : 'Dashboard'}
            </h1>
          </div>
          <div />
        </header>

        {/* Dashboard Content */}
        <main className='flex-1 overflow-auto p-3'>
          {currentView === 'create-profile' ? (
            <ProfileCreation
              onBack={() => setCurrentView('dashboard')}
              user={user}
            />
          ) : (
            <>
              {/* Stats Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4'>
                {stats.map((stat, index) => (
                  <Card key={index} className='border border-gray-100 bg-white'>
                    <CardContent className='p-3'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-xs font-normal text-gray-600'>
                            {stat.label}
                          </p>
                          <p className='text-lg font-normal text-black mt-1'>
                            {stat.value}
                          </p>
                          <div className='flex items-center mt-1'>
                            <TrendingUp className='w-3 h-3 text-green-600 mr-1' />
                            <span className='text-xs text-green-600 font-normal'>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className='w-8 h-8 rounded bg-green-50 flex items-center justify-center'>
                          <stat.icon className='w-4 h-4 text-green-600' />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Cards */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4'>
                <Card className='border border-gray-100 bg-white'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center text-black text-sm font-normal'>
                      <Plus className='w-4 h-4 mr-2 text-green-600' />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <Button
                      onClick={() => router.push('/create-profile')}
                      className='w-full justify-start h-9 bg-green-600 hover:bg-green-700 text-white border-0 text-sm font-normal'
                    >
                      <Plus className='w-3 h-3 mr-2' />
                      Create New Profile
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start h-9 border-gray-200 text-black hover:bg-gray-50 text-sm font-normal'
                    >
                      <Activity className='w-3 h-3 mr-2' />
                      Start Transaction
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start h-9 border-gray-200 text-black hover:bg-gray-50 text-sm font-normal'
                    >
                      <Shield className='w-3 h-3 mr-2' />
                      Verify Product
                    </Button>
                  </CardContent>
                </Card>

                <Card className='border border-gray-100 bg-white'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center text-black text-sm font-normal'>
                      <Activity className='w-4 h-4 mr-2 text-green-600' />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2 p-2 rounded bg-gray-50'>
                        <div className='w-1 h-1 bg-green-600 rounded-full'></div>
                        <div className='flex-1'>
                          <p className='text-xs font-normal text-black'>
                            New farmer profile created
                          </p>
                          <p className='text-xs text-gray-500'>2 minutes ago</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2 p-2 rounded bg-gray-50'>
                        <div className='w-1 h-1 bg-green-600 rounded-full'></div>
                        <div className='flex-1'>
                          <p className='text-xs font-normal text-black'>
                            Transaction validated
                          </p>
                          <p className='text-xs text-gray-500'>
                            15 minutes ago
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2 p-2 rounded bg-gray-50'>
                        <div className='w-1 h-1 bg-green-600 rounded-full'></div>
                        <div className='flex-1'>
                          <p className='text-xs font-normal text-black'>
                            Quality test completed
                          </p>
                          <p className='text-xs text-gray-500'>1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Supply Chain Analytics Chart */}
              <ChartAreaInteractive />
            </>
          )}
        </main>
      </div>
    </div>
  );
};
