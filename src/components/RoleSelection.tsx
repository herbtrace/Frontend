'use client';

import { Button } from '@/components/ui/button';
import { Users, FlaskConical, Factory, ShoppingCart, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const roles: Role[] = [
  {
    id: 'farmer',
    name: 'Farmer',
    description: 'Herb cultivators and growers',
    icon: <Users className="w-5 h-5" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'lab',
    name: 'Quality Lab',
    description: 'Testing and certification facilities',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'manufacturer',
    name: 'Manufacturing Unit',
    description: 'Processing and packaging facilities',
    icon: <Factory className="w-5 h-5" />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50'
  },
  {
    id: 'distributor',
    name: 'Distributor',
    description: 'Supply chain and logistics partners',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  }
];

interface RoleSelectionProps {
  onRoleSelect: (roleId: string) => void;
  onCancel: () => void;
}

export const RoleSelection = ({ onRoleSelect, onCancel }: RoleSelectionProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Registration Type
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select the type of entity you want to register
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Role Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group relative p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${role.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <div className={role.color}>
                      {role.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {role.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-100">
          <Button variant="ghost" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};