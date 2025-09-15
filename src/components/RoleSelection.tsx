'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FlaskConical, Factory, ShoppingCart } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const roles: Role[] = [
  {
    id: 'farmer',
    name: 'Farmer',
    description: 'Herb cultivators and growers',
    icon: <Users className="w-8 h-8" />,
    color: 'text-green-600'
  },
  {
    id: 'lab',
    name: 'Quality Lab',
    description: 'Testing and certification facilities',
    icon: <FlaskConical className="w-8 h-8" />,
    color: 'text-blue-600'
  },
  {
    id: 'manufacturer',
    name: 'Manufacturing Unit',
    description: 'Processing and packaging facilities',
    icon: <Factory className="w-8 h-8" />,
    color: 'text-purple-600'
  },
  {
    id: 'distributor',
    name: 'Distributor',
    description: 'Supply chain and logistics partners',
    icon: <ShoppingCart className="w-8 h-8" />,
    color: 'text-orange-600'
  }
];

interface RoleSelectionProps {
  onRoleSelect: (roleId: string) => void;
  onCancel: () => void;
}

export const RoleSelection = ({ onRoleSelect, onCancel }: RoleSelectionProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Select Role Type
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose the type of entity you want to register
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary"
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-3 ${role.color}`}>
                    {role.icon}
                  </div>
                  <CardTitle className="text-xl">{role.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full" variant="outline">
                    Select {role.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};