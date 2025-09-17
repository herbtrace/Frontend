'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApiService } from '@/services/api';

// Utility function to format dates consistently
const formatTime = (minutesAgo: number) => {
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  }
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
};

export default function DashboardOverview() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileStats, setProfileStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    byRole: {} as Record<string, number>
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Realistic dummy data based on profiles
  const dummyProfiles = [
    { id: 'PRF-2024-001', role: 'farmer', name: 'Rajesh Kumar', status: 'active', location: 'Himachal Pradesh' },
    { id: 'PRF-2024-002', role: 'wild_collector', name: 'Priya Sharma', status: 'active', location: 'Kerala' },
    { id: 'PRF-2024-003', role: 'processor', name: 'Ayurvedic Processing Ltd.', status: 'active', location: 'Gujarat' },
    { id: 'PRF-2024-004', role: 'laboratory', name: 'Herbal Testing Labs', status: 'active', location: 'Maharashtra' },
    { id: 'PRF-2024-005', role: 'manufacturer', name: "Nature's Medicine Co.", status: 'pending', location: 'Tamil Nadu' },
    { id: 'PRF-2024-006', role: 'packer', name: 'Eco Pack Solutions', status: 'active', location: 'Karnataka' },
    { id: 'PRF-2024-007', role: 'storage', name: 'ColdChain Storage Pvt Ltd', status: 'active', location: 'Punjab' },
    { id: 'PRF-2024-008', role: 'farmer', name: 'Green Valley Organics', status: 'active', location: 'Uttarakhand' }
  ];

  const roleConfig = {
    farmer: { name: 'Farmers', icon: '🌱', color: 'bg-green-100 text-green-600' },
    wild_collector: { name: 'Wild Collectors', icon: '🌿', color: 'bg-emerald-100 text-emerald-600' },
    processor: { name: 'Processors', icon: '⚙️', color: 'bg-blue-100 text-blue-600' },
    laboratory: { name: 'Laboratories', icon: '🔬', color: 'bg-purple-100 text-purple-600' },
    manufacturer: { name: 'Manufacturers', icon: '🏭', color: 'bg-orange-100 text-orange-600' },
    packer: { name: 'Packers', icon: '📦', color: 'bg-amber-100 text-amber-600' },
    storage: { name: 'Storage', icon: '🏪', color: 'bg-cyan-100 text-cyan-600' }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Try to load from API, fallback to dummy data
      try {
        const profiles = await ApiService.getAllProfiles();
        calculateStats(profiles.length > 0 ? profiles : dummyProfiles);
      } catch (error) {
        console.error('API failed, using dummy data:', error);
        calculateStats(dummyProfiles);
      }

      // Generate recent activities
      generateRecentActivities();
    } catch (error) {
      console.error('Dashboard data loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (profiles: any[]) => {
    const total = profiles.length;
    const active = profiles.filter(p => p.status === 'active').length;
    const pending = profiles.filter(p => p.status === 'pending').length;

    const byRole = profiles.reduce((acc, profile) => {
      acc[profile.role] = (acc[profile.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setProfileStats({ total, active, pending, byRole });
  };

  const generateRecentActivities = () => {
    const activities = [
      {
        id: 1,
        type: 'quality_check',
        title: 'Ashwagandha Batch #ASH-2024-847',
        description: 'Quality verification completed by Herbal Testing Labs',
        actor: 'Herbal Testing Labs',
        location: 'Maharashtra',
        time: '2 minutes ago',
        status: 'completed',
        icon: '🔬'
      },
      {
        id: 2,
        type: 'shipment',
        title: 'Turmeric Batch #TUR-2024-293',
        description: 'Shipped from Green Valley Organics to Ayurvedic Processing Ltd.',
        actor: 'Green Valley Organics',
        location: 'Uttarakhand → Gujarat',
        time: '8 minutes ago',
        status: 'in_transit',
        icon: '🚛'
      },
      {
        id: 3,
        type: 'processing',
        title: 'Brahmi Batch #BRA-2024-156',
        description: 'Processing started at Ayurvedic Processing Ltd.',
        actor: 'Ayurvedic Processing Ltd.',
        location: 'Gujarat',
        time: '15 minutes ago',
        status: 'processing',
        icon: '⚙️'
      },
      {
        id: 4,
        type: 'harvest',
        title: 'Tulsi Batch #TUL-2024-489',
        description: 'Fresh harvest completed by Rajesh Kumar',
        actor: 'Rajesh Kumar',
        location: 'Himachal Pradesh',
        time: '32 minutes ago',
        status: 'harvested',
        icon: '🌱'
      },
      {
        id: 5,
        type: 'storage',
        title: 'Amla Extract #AML-2024-672',
        description: 'Stored in controlled environment at ColdChain Storage',
        actor: 'ColdChain Storage Pvt Ltd',
        location: 'Punjab',
        time: '1 hour ago',
        status: 'stored',
        icon: '🏪'
      }
    ];

    setRecentActivities(activities);
  };

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/dashboard/overview',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <rect
            x='3'
            y='3'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='14'
            y='3'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='14'
            y='14'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='3'
            y='14'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      id: 'profiles',
      label: 'All Profiles',
      href: '/dashboard/profiles',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='9'
            cy='7'
            r='4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23 21v-2a4 4 0 0 0-3-3.87'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16 3.13a4 4 0 0 1 0 7.75'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      id: 'create-profile',
      label: 'Create Profile',
      href: '/dashboard/profile-creation',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='9'
            cy='7'
            r='4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <line
            x1='19'
            y1='8'
            x2='19'
            y2='14'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <line
            x1='22'
            y1='11'
            x2='16'
            y2='11'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
  ];

  return (
    <div className='min-h-screen w-full relative text-gray-900'>
      {/* Dashed Gradient */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <div className='flex h-screen relative z-10'>
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-out will-change-[width]`}
        >
          {/* Logo & Toggle */}
          <div
            className={`${sidebarCollapsed ? 'p-4' : 'p-6'} border-b border-gray-100 transition-all duration-200 ease-out`}
          >
            <div
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              {sidebarCollapsed ? (
                <div className='flex flex-col items-center space-y-2'>
                  <Image
                    src='/logo.png'
                    alt='Herbtrace'
                    width={32}
                    height={32}
                    className='w-8 h-8'
                  />
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className='p-1 rounded-md hover:bg-gray-100 transition-colors'
                  >
                    <svg
                      className='w-3 h-3 text-gray-600 transition-transform duration-200 rotate-180'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className='flex items-center space-x-3'>
                    <Image
                      src='/logo.png'
                      alt='Herbtrace'
                      width={32}
                      height={32}
                      className='w-8 h-8'
                    />
                    <span className='text-xl font-semibold text-black'>
                      Herbtrace
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'
                  >
                    <svg
                      className='w-4 h-4 text-gray-600 transition-transform duration-200'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 space-y-2'>
            {sidebarItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center ${
                  sidebarCollapsed
                    ? 'justify-center px-2 py-3'
                    : 'space-x-3 px-3 py-2'
                } rounded-md text-sm font-medium transition-all duration-200 ${
                  item.id === 'overview'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div
                  className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200 ease-out flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <span
                  className={`transition-opacity duration-200 ease-out ${
                    sidebarCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className='p-4 border-t border-gray-100'>
            {sidebarCollapsed ? (
              <div className='flex flex-col items-center space-y-3'>
                <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm font-medium'>U</span>
                </div>
                <Link href='/' className='block'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-8 h-8 p-0 text-xs'
                    title='Sign Out'
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>U</span>
                  </div>
                  <div
                    className={`flex-1 transition-opacity duration-200 ease-out ${
                      sidebarCollapsed
                        ? 'opacity-0 w-0 overflow-hidden'
                        : 'opacity-100'
                    }`}
                  >
                    <p className='text-sm font-medium text-black'>
                      Supply Chain Manager
                    </p>
                    <p className='text-xs text-gray-500'>scm@example.com</p>
                  </div>
                </div>
                <Link
                  href='/'
                  className={`mt-3 block transition-opacity duration-200 ease-out ${
                    sidebarCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100'
                  }`}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full text-xs font-light'
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 overflow-auto'>
          <div className='p-8'>
            <div className='space-y-6'>
              <div>
                <h2 className='text-2xl font-light text-black mb-2'>
                  Supply Chain Overview
                </h2>
                <p className='text-gray-600 font-light'>
                  Monitor your medicinal herb supply chain operations in
                  real-time
                </p>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Total Profiles
                      </p>
                      <p className='text-3xl font-light text-black'>
                        {loading ? '...' : profileStats.total}
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                      <span className='text-gray-600 text-sm'>👥</span>
                    </div>
                  </div>
                  <p className='text-xs text-green-600 mt-2'>
                    +{profileStats.pending} pending approval
                  </p>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Active Profiles
                      </p>
                      <p className='text-3xl font-light text-black'>
                        {loading ? '...' : profileStats.active}
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <span className='text-green-600 text-sm'>✓</span>
                    </div>
                  </div>
                  <p className='text-xs text-green-600 mt-2'>
                    {profileStats.total > 0 ? Math.round((profileStats.active / profileStats.total) * 100) : 0}% active rate
                  </p>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Active Batches
                      </p>
                      <p className='text-3xl font-light text-black'>284</p>
                    </div>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                      <span className='text-blue-600 text-sm'>📦</span>
                    </div>
                  </div>
                  <p className='text-xs text-blue-600 mt-2'>+12% from last month</p>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Quality Score
                      </p>
                      <p className='text-3xl font-light text-black'>97.2%</p>
                    </div>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <span className='text-green-600 text-sm'>🏆</span>
                    </div>
                  </div>
                  <p className='text-xs text-green-600 mt-2'>+0.3% this week</p>
                </div>
              </div>

              {/* Profile Distribution */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h3 className='text-lg font-medium text-black mb-4'>
                    Profile Distribution
                  </h3>
                  <div className='space-y-3'>
                    {Object.entries(roleConfig).map(([role, config]) => {
                      const count = profileStats.byRole[role] || 0;
                      const percentage = profileStats.total > 0 ? (count / profileStats.total) * 100 : 0;
                      return (
                        <div key={role} className='flex items-center justify-between'>
                          <div className='flex items-center space-x-3'>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}>
                              <span className='text-sm'>{config.icon}</span>
                            </div>
                            <span className='text-sm font-medium text-black'>{config.name}</span>
                          </div>
                          <div className='flex items-center space-x-3'>
                            <div className='w-20 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-green-600 h-2 rounded-full transition-all duration-300'
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-medium text-gray-900 w-8 text-right'>{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h3 className='text-lg font-medium text-black mb-4'>
                    Supply Chain Health
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                        <span className='text-sm font-medium text-black'>Quality Assurance</span>
                      </div>
                      <span className='text-sm font-medium text-green-600'>Excellent</span>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                        <span className='text-sm font-medium text-black'>Traceability</span>
                      </div>
                      <span className='text-sm font-medium text-green-600'>100%</span>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                        <span className='text-sm font-medium text-black'>Processing Time</span>
                      </div>
                      <span className='text-sm font-medium text-blue-600'>2.3 days avg</span>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-amber-50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-2 h-2 bg-amber-600 rounded-full'></div>
                        <span className='text-sm font-medium text-black'>Compliance</span>
                      </div>
                      <span className='text-sm font-medium text-amber-600'>Review Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className='bg-white border border-gray-200 rounded-lg p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-medium text-black'>
                    Recent Supply Chain Activity
                  </h3>
                  <Link href='/dashboard/profiles' className='text-sm text-green-600 hover:text-green-700 font-medium'>
                    View All →
                  </Link>
                </div>
                <div className='space-y-4'>
                  {recentActivities.map((activity) => {
                    const statusColor = {
                      completed: 'bg-green-600',
                      in_transit: 'bg-blue-600',
                      processing: 'bg-orange-600',
                      harvested: 'bg-green-500',
                      stored: 'bg-cyan-600'
                    }[activity.status] || 'bg-gray-600';

                    return (
                      <div key={activity.id} className='flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-colors'>
                        <div className='flex-shrink-0 flex items-center justify-center'>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                            <span className='text-sm'>{activity.icon}</span>
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center space-x-2 mb-1'>
                            <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
                            <p className='text-sm font-medium text-black truncate'>
                              {activity.title}
                            </p>
                          </div>
                          <p className='text-xs text-gray-600 mb-1'>
                            {activity.description}
                          </p>
                          <div className='flex items-center justify-between text-xs text-gray-500'>
                            <span>by {activity.actor}</span>
                            <span>{activity.location}</span>
                          </div>
                        </div>
                        <div className='flex-shrink-0'>
                          <span className='text-xs text-gray-500'>{activity.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className='mt-4 pt-4 border-t border-gray-100'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>System Status:</span>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <span className='text-green-600 font-medium'>All Systems Operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
