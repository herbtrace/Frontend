'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'create-profile',
      label: 'Create Profile',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="19" y1="8" x2="19" y2="14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="22" y1="11" x2="16" y2="11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light text-black mb-2">Supply Chain Overview</h2>
              <p className="text-gray-600 font-light">
                Monitor your medicinal herb supply chain operations in real-time
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Batches</p>
                    <p className="text-3xl font-light text-black">284</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">🌿</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quality Score</p>
                    <p className="text-3xl font-light text-black">97.2%</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+0.3% this week</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Suppliers</p>
                    <p className="text-3xl font-light text-black">47</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">👥</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">2 new this month</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blockchain Blocks</p>
                    <p className="text-3xl font-light text-black">847K</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">⛓️</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">Network synced</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-black mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 border border-gray-100 rounded">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Ashwagandha Lot #AS-2024-847</p>
                    <p className="text-xs text-gray-600">Quality verification completed by Lab-Mumbai</p>
                  </div>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-gray-100 rounded">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Turmeric Lot #TU-2024-293</p>
                    <p className="text-xs text-gray-600">En route to processing facility in Kerala</p>
                  </div>
                  <span className="text-xs text-gray-500">8m ago</span>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-gray-100 rounded">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Ginseng Lot #GS-2024-142</p>
                    <p className="text-xs text-gray-600">Blockchain verification successful</p>
                  </div>
                  <span className="text-xs text-gray-500">15m ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-profile':
        const roles = [
          { id: 'farmer', name: 'Farmer', icon: '🌱', desc: 'Agricultural producers' },
          { id: 'wild_collector', name: 'Wild Collector', icon: '🌿', desc: 'Wild plant collectors' },
          { id: 'processor', name: 'Processor', icon: '🏭', desc: 'Processing facilities' },
          { id: 'laboratory', name: 'Laboratory', icon: '🔬', desc: 'Testing laboratories' },
          { id: 'manufacturer', name: 'Manufacturer', icon: '⚙️', desc: 'Manufacturing units' },
          { id: 'packer', name: 'Packer', icon: '📦', desc: 'Packaging facilities' },
          { id: 'storage', name: 'Storage', icon: '🏪', desc: 'Storage facilities' }
        ];

        if (currentStep === 1) {
          return (
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl font-light text-black mb-2">Create Profile</h2>
                <p className="text-gray-600 font-light">
                  Join the Herbtrace supply chain network
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-4xl">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-medium text-black mb-2">Select Your Role</h3>
                    <p className="text-gray-600 font-light">Choose the role that best describes your organization</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRole(role.id);
                          setCurrentStep(2);
                        }}
                        className={`p-6 bg-white border-2 rounded-lg transition-all hover:border-green-600 hover:shadow-md ${
                          selectedRole === role.id ? 'border-green-600 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="text-4xl mb-3">{role.icon}</div>
                        <h4 className="font-medium text-black mb-1">{role.name}</h4>
                        <p className="text-sm text-gray-600 font-light">{role.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (currentStep === 2 && selectedRole) {
          const getRoleForm = () => {
            switch (selectedRole) {
              case 'farmer':
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Full Name</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Phone Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Aadhar Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Enter Aadhar number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Land Records</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Land record details" />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <Label className="text-sm font-medium text-black">Address</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Complete address" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Latitude</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="0.0000" type="number" step="any" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Longitude</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="0.0000" type="number" step="any" />
                    </div>
                  </div>
                );

              case 'wild_collector':
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Full Name</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Phone Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Company Email</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="company@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">License Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="License number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Area Assigned</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Assigned collection area" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Address</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Complete address" />
                    </div>
                  </div>
                );

              case 'laboratory':
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Company Name</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Laboratory name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Phone Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Company Email</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="lab@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Accreditation Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Accreditation number" />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <Label className="text-sm font-medium text-black">Location</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Laboratory location" />
                    </div>
                  </div>
                );

              default:
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Company Name</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Phone Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">Company Email</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="company@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-black">License Number</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="License number" />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <Label className="text-sm font-medium text-black">Address</Label>
                      <Input className="border-gray-200 focus:border-green-600 focus:ring-green-600" placeholder="Complete address" />
                    </div>
                  </div>
                );
            }
          };

          const selectedRoleData = roles.find(r => r.id === selectedRole);

          return (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center text-gray-600 hover:text-black transition-colors mb-4"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Role Selection
                </button>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl">{selectedRoleData?.icon}</div>
                  <div>
                    <h2 className="text-2xl font-light text-black">{selectedRoleData?.name} Profile</h2>
                    <p className="text-gray-600 font-light">{selectedRoleData?.desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg p-8">
                  <form className="space-y-6">
                    {getRoleForm()}

                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="border-gray-300 hover:bg-gray-50 px-6"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-8"
                      >
                        Create {selectedRoleData?.name} Profile
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        }

        return null;

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-black">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h3>
              <p className="text-gray-600 font-light">This section is coming soon</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full relative text-gray-900">
      {/* Dashed Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
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
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-out will-change-[width]`}>
          {/* Logo & Toggle */}
          <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'} border-b border-gray-100 transition-all duration-200 ease-out`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
              {sidebarCollapsed ? (
                <div className="flex flex-col items-center space-y-2">
                  <Image
                    src="/logo.png"
                    alt="Herbtrace"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600 transition-transform duration-200 rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/logo.png"
                      alt="Herbtrace"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="text-xl font-semibold text-black">
                      Herbtrace
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${
                  sidebarCollapsed
                    ? 'justify-center px-2 py-3'
                    : 'space-x-3 px-3 py-2'
                } rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200 ease-out flex-shrink-0`}>
                  {item.icon}
                </div>
                <span className={`transition-opacity duration-200 ease-out ${
                  sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-100">
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 text-xs"
                    title="Sign Out"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                  <div className={`flex-1 transition-opacity duration-200 ease-out ${
                    sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  }`}>
                    <p className="text-sm font-medium text-black">Supply Chain Manager</p>
                    <p className="text-xs text-gray-500">scm@example.com</p>
                  </div>
                </div>
                <Link href="/" className={`mt-3 block transition-opacity duration-200 ease-out ${
                  sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-light"
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}