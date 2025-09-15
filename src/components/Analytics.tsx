'use client';

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Plus,
} from "lucide-react";

import { ChartLineInteractive } from "@/components/charts/ChartLineInteractive";
import { ChartLineDefault } from "@/components/charts/ChartLineDefault";
import { ChartLineLinear } from "@/components/charts/ChartLineLinear";
import { ChartLineStep } from "@/components/charts/ChartLineStep";
import { ChartLineMultiple } from "@/components/charts/ChartLineMultiple";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AnalyticsProps {
  onBack: () => void;
  onLogout: () => void;
  onRegisterNew: () => void;
  user: User | null;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, active: false },
  { id: 'farmers', label: 'Farmers', icon: Users, active: false },
  { id: 'labs', label: 'Quality Labs', icon: FlaskConical, active: false },
  { id: 'registrations', label: 'Registrations', icon: FileCheck, active: false },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, active: true },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

export const Analytics = ({ onBack, onLogout, onRegisterNew, user }: AnalyticsProps) => {
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
              onClick={() => {
                if (item.id === 'dashboard') {
                  onBack();
                }
              }}
              className={`w-full h-9 text-sm ${
                sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'justify-start px-3'
              } ${
                item.active
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
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
              <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5">Supply chain insights and performance metrics</p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={onRegisterNew}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm h-8 text-xs px-3"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Register Entity
              </Button>

              <Badge variant="outline" className="text-xs font-medium">
                Live Data
              </Badge>
              <Avatar className="w-7 h-7 ring-1 ring-gray-200">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Analytics Content */}
        <main className="flex-1 p-6 bg-gray-50/40 overflow-y-auto">
          <div className="space-y-6">
            {/* Interactive Chart */}
            <ChartLineInteractive />
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartLineDefault />
              <ChartLineLinear />
              <ChartLineStep />
              <ChartLineMultiple />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
