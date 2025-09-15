'use client';

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  FlaskConical,
  Factory,
  Truck,
  Wheat,
  Warehouse,
  BarChart3,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  FileCheck,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface DashboardProps {
  onRegisterNew: () => void;
  onLogout: () => void;
  user: User | null;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
  { id: 'farmers', label: 'Farmers', icon: Users, active: false },
  { id: 'labs', label: 'Quality Labs', icon: FlaskConical, active: false },
  { id: 'registrations', label: 'Registrations', icon: FileCheck, active: false },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

const metrics = [
  {
    id: 'farmers',
    icon: Users,
    value: '1,247',
    label: 'Registered Farmers',
    change: '+18% this month',
    trend: 'up'
  },
  {
    id: 'labs',
    icon: FlaskConical,
    value: '23',
    label: 'Certified Labs',
    change: '100% verified',
    trend: 'stable'
  },
  {
    id: 'chains',
    icon: Factory,
    value: '156',
    label: 'Active Chains',
    change: '+24% growth',
    trend: 'up'
  },
  {
    id: 'deliveries',
    icon: Truck,
    value: '3,842',
    label: 'Deliveries',
    change: '+12% this week',
    trend: 'up'
  },
  {
    id: 'crops',
    icon: Wheat,
    value: '67',
    label: 'Crop Varieties',
    change: '8 new this month',
    trend: 'stable'
  },
  {
    id: 'warehouses',
    icon: Warehouse,
    value: '31',
    label: 'Storage Centers',
    change: '28 online',
    trend: 'stable'
  }
];

const recentRegistrations = [
  { id: 'HT-2024-001', name: 'Ashwagandha Organics Pvt Ltd', type: 'Farmer', location: 'Rajasthan, India', status: 'Approved', date: '23 minutes ago' },
  { id: 'HT-2024-002', name: 'BioTest Herbal Analytics', type: 'Quality Lab', location: 'Bangalore, Karnataka', status: 'Under Review', date: '1 hour ago' },
  { id: 'HT-2024-003', name: 'Himalayan Herbs Processing', type: 'Manufacturer', location: 'Uttarakhand, India', status: 'Approved', date: '3 hours ago' },
  { id: 'HT-2024-004', name: 'Green Supply Chain Solutions', type: 'Distributor', location: 'Mumbai, Maharashtra', status: 'Approved', date: '6 hours ago' },
  { id: 'HT-2024-005', name: 'Tulsi Valley Farm Collective', type: 'Farmer', location: 'Kerala, India', status: 'Pending Verification', date: '1 day ago' },
  { id: 'HT-2024-006', name: 'AyurLab Testing Services', type: 'Quality Lab', location: 'Chennai, Tamil Nadu', status: 'Documentation Required', date: '2 days ago' }
];

export const Dashboard = ({ onRegisterNew, onLogout, user }: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-60'} bg-white border-r border-gray-200/60 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200/60">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-2.5">
                <Image
                  src="/logo.png"
                  alt="Herbtrace Logo"
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
                <span className="text-base font-medium text-gray-900">Herbtrace</span>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <Image
                  src="/logo.png"
                  alt="Herbtrace Logo"
                  width={20}
                  height={20}
                  className="rounded-lg"
                />
              </div>
            )}
            {!sidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-gray-100 p-1 h-7 w-7 flex-shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
          {sidebarCollapsed && (
            <div className="flex justify-center mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-gray-100 p-1 h-7 w-7"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-3 space-y-0.5">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={item.active ? "default" : "ghost"}
              className={`w-full h-9 text-sm ${
                sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'justify-start px-3'
              } ${
                item.active
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                  : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="ml-2.5 font-medium">{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-200/60">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={`w-full h-9 text-sm ${
              sidebarCollapsed
                ? 'justify-center px-0'
                : 'justify-start px-3'
            } hover:bg-red-50 hover:text-red-600 text-gray-700`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="ml-2.5 font-medium">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/60 px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={onRegisterNew}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm h-8 text-xs px-3"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Register Entity
              </Button>

              <Avatar className="w-7 h-7 ring-1 ring-gray-200">
                <AvatarFallback className="bg-green-100 text-green-700 font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-5 bg-gray-50/40">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {metrics.map((metric) => (
              <Card
                key={metric.id}
                className="group bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 rounded-lg overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1.5">{metric.label}</p>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 text-xs px-1.5 py-0.5 font-medium"
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <metric.icon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Registrations Table */}
          <Card className="bg-white border border-gray-200/60 shadow-sm rounded-lg">
            <CardHeader className="border-b border-gray-200/60 px-5 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Recent Registrations</CardTitle>
                <Badge variant="outline" className="text-xs font-medium">
                  {recentRegistrations.length} new
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200/60">
                    <TableHead className="font-medium text-gray-600 px-5 py-2.5 text-xs">Registration ID</TableHead>
                    <TableHead className="font-medium text-gray-600 py-2.5 text-xs">Organization</TableHead>
                    <TableHead className="font-medium text-gray-600 py-2.5 text-xs">Type</TableHead>
                    <TableHead className="font-medium text-gray-600 py-2.5 text-xs">Location</TableHead>
                    <TableHead className="font-medium text-gray-600 py-2.5 text-xs">Status</TableHead>
                    <TableHead className="font-medium text-gray-600 px-5 py-2.5 text-xs">Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRegistrations.map((reg) => (
                    <TableRow key={reg.id} className="border-gray-200/60 hover:bg-gray-50/30">
                      <TableCell className="font-mono text-xs text-gray-600 px-5 py-3">{reg.id}</TableCell>
                      <TableCell className="font-medium text-sm text-gray-900 py-3">{reg.name}</TableCell>
                      <TableCell className="text-sm text-gray-600 py-3">{reg.type}</TableCell>
                      <TableCell className="text-sm text-gray-600 py-3">{reg.location}</TableCell>
                      <TableCell className="py-3">
                        <Badge
                          variant={reg.status === 'Approved' ? 'default' : reg.status.includes('Pending') ? 'secondary' : 'outline'}
                          className={
                            reg.status === 'Approved'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium'
                              : reg.status.includes('Pending') || reg.status.includes('Review')
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-medium'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-medium'
                          }
                        >
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500 px-5 py-3">{reg.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};