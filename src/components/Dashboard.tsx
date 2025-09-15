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
    value: '25',
    label: 'Farmers',
    change: '+12%',
    trend: 'up'
  },
  {
    id: 'labs',
    icon: FlaskConical,
    value: '4',
    label: 'Quality Labs',
    change: 'Certified',
    trend: 'stable'
  },
  {
    id: 'chains',
    icon: Factory,
    value: '12',
    label: 'Supply Chains',
    change: 'Active',
    trend: 'up'
  },
  {
    id: 'deliveries',
    icon: Truck,
    value: '30',
    label: 'Deliveries',
    change: '+8%',
    trend: 'up'
  },
  {
    id: 'crops',
    icon: Wheat,
    value: '8',
    label: 'Crops Registered',
    change: 'This month',
    trend: 'stable'
  },
  {
    id: 'warehouses',
    icon: Warehouse,
    value: '3',
    label: 'Warehouses',
    change: 'Online',
    trend: 'stable'
  }
];

const recentRegistrations = [
  { id: 'REG-001', name: 'Green Valley Herbs', type: 'Farmer', location: 'Maharashtra', status: 'Approved', date: '2 hours ago' },
  { id: 'REG-002', name: 'Herbal Lab Solutions', type: 'Quality Lab', location: 'Gujarat', status: 'Pending', date: '5 hours ago' },
  { id: 'REG-003', name: 'Natural Processing Co.', type: 'Manufacturer', location: 'Karnataka', status: 'Approved', date: '1 day ago' },
  { id: 'REG-004', name: 'Supply Chain Logistics', type: 'Distributor', location: 'Tamil Nadu', status: 'Approved', date: '2 days ago' },
  { id: 'REG-005', name: 'Organic Farms Ltd.', type: 'Farmer', location: 'Punjab', status: 'Review', date: '3 days ago' }
];

export const Dashboard = ({ onRegisterNew, onLogout, user }: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sexy Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="Herbtrace Logo"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
                <span className="text-lg font-semibold text-black">Herbtrace</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-gray-100 p-1.5"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start h-11 ${
                item.active
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start h-11 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={onRegisterNew}
                className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Register Entity
              </Button>

              <Avatar className="w-9 h-9 ring-2 ring-gray-100">
                <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-8 bg-gray-50/30">
          {/* Sexy Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric) => (
              <Card
                key={metric.id}
                className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 rounded-xl overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">{metric.label}</p>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-3xl font-bold text-black">{metric.value}</h3>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 text-xs px-2 py-0.5"
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                      <metric.icon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Registrations Table */}
          <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
            <CardHeader className="border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-black">Recent Registrations</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {recentRegistrations.length} new
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="font-medium text-gray-600 px-6">ID</TableHead>
                    <TableHead className="font-medium text-gray-600">Name</TableHead>
                    <TableHead className="font-medium text-gray-600">Type</TableHead>
                    <TableHead className="font-medium text-gray-600">Location</TableHead>
                    <TableHead className="font-medium text-gray-600">Status</TableHead>
                    <TableHead className="font-medium text-gray-600 px-6">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRegistrations.map((reg) => (
                    <TableRow key={reg.id} className="border-gray-100 hover:bg-gray-50/50">
                      <TableCell className="font-mono text-sm text-gray-600 px-6">{reg.id}</TableCell>
                      <TableCell className="font-medium text-black">{reg.name}</TableCell>
                      <TableCell className="text-gray-600">{reg.type}</TableCell>
                      <TableCell className="text-gray-600">{reg.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant={reg.status === 'Approved' ? 'default' : reg.status === 'Pending' ? 'secondary' : 'outline'}
                          className={
                            reg.status === 'Approved'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : reg.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }
                        >
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 px-6">{reg.date}</TableCell>
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