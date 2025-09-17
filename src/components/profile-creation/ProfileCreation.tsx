'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Plus,
  Users,
  CheckCircle,
  AlertCircle,
  Sprout,
  FlaskConical,
  Factory,
  Truck,
  Package2,
  Warehouse,
  TreePine,
  Settings2,
} from 'lucide-react';
import { ApiService, type ProfileData } from '@/services/api';
import { toast } from 'sonner';

import type { ProfileRole, ProfileCreationProps } from './types';
import { useProfileForms } from './hooks/useProfileForms';
import {
  FarmerForm,
  WildCollectorForm,
  ProcessorForm,
  LaboratoryForm,
  ManufacturerForm,
  PackerForm,
  StorageForm,
} from './forms';

export const ProfileCreation = ({ onBack, user }: ProfileCreationProps) => {
  const [selectedRole, setSelectedRole] = useState<ProfileRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    farmerData,
    setFarmerData,
    wildCollectorData,
    setWildCollectorData,
    processorData,
    setProcessorData,
    laboratoryData,
    setLaboratoryData,
    manufacturerData,
    setManufacturerData,
    packerData,
    setPackerData,
    storageData,
    setStorageData,
    resetAllForms,
  } = useProfileForms(user);

  const roleOptions = [
    {
      value: 'farmer' as ProfileRole,
      label: 'Farmer',
      description: 'Agricultural producer',
      icon: Sprout,
      color: 'bg-green-500',
    },
    {
      value: 'wild_collector' as ProfileRole,
      label: 'Wild Collector',
      description: 'Natural collector',
      icon: TreePine,
      color: 'bg-emerald-500',
    },
    {
      value: 'processor' as ProfileRole,
      label: 'Processor',
      description: 'Processing facility',
      icon: Settings2,
      color: 'bg-blue-500',
    },
    {
      value: 'laboratory' as ProfileRole,
      label: 'Laboratory',
      description: 'Testing & analysis',
      icon: FlaskConical,
      color: 'bg-purple-500',
    },
    {
      value: 'manufacturer' as ProfileRole,
      label: 'Manufacturer',
      description: 'Manufacturing unit',
      icon: Factory,
      color: 'bg-orange-500',
    },
    {
      value: 'packer' as ProfileRole,
      label: 'Packer',
      description: 'Packaging services',
      icon: Package2,
      color: 'bg-teal-500',
    },
    {
      value: 'storage' as ProfileRole,
      label: 'Storage',
      description: 'Storage facility',
      icon: Warehouse,
      color: 'bg-indigo-500',
    },
  ];

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error('Please select a profile type');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      let profileData: ProfileData;

      switch (selectedRole) {
        case 'farmer':
          profileData = { role: 'farmer', ...farmerData };
          break;
        case 'wild_collector':
          profileData = { role: 'wild_collector', ...wildCollectorData };
          break;
        case 'processor':
          profileData = { role: 'processor', ...processorData };
          break;
        case 'laboratory':
          profileData = { role: 'laboratory', ...laboratoryData };
          break;
        case 'manufacturer':
          profileData = { role: 'manufacturer', ...manufacturerData };
          break;
        case 'packer':
          profileData = { role: 'packer', ...packerData };
          break;
        case 'storage':
          profileData = { role: 'storage', ...storageData };
          break;
        default:
          throw new Error('Invalid role selected');
      }

      const response = await ApiService.createProfile(profileData);

      toast.success('Profile created successfully!', {
        description: `Profile ID: ${response.id}`,
        icon: <CheckCircle className='w-4 h-4' />,
        duration: 4000,
      });

      resetAllForms();
      setSelectedRole('');
      setMessage(null);
    } catch (error) {
      console.error('Profile creation failed:', error);

      let errorMessage = 'Failed to create profile';
      let errorDescription = '';

      if (error instanceof Error) {
        const errorText = error.message;

        if (
          errorText.includes('already exists') ||
          errorText.includes('duplicate')
        ) {
          errorMessage = 'Profile already exists';
          errorDescription = 'A profile with this ID already exists.';
        } else if (errorText.includes('422')) {
          errorMessage = 'Invalid data provided';
          errorDescription = 'Please check all required fields.';
        } else if (errorText.includes('400')) {
          errorMessage = 'Bad request';
          errorDescription = 'Please verify your input data.';
        } else if (errorText.includes('500')) {
          errorMessage = 'Server error';
          errorDescription = 'Please try again later.';
        } else {
          errorDescription = errorText;
        }
      }

      toast.error(errorMessage, {
        description: errorDescription,
        icon: <AlertCircle className='w-4 h-4' />,
        duration: 6000,
      });

      setMessage({
        type: 'error',
        text: errorMessage + (errorDescription ? ': ' + errorDescription : ''),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleForm = () => {
    switch (selectedRole) {
      case 'farmer':
        return <FarmerForm data={farmerData} onUpdate={setFarmerData} />;
      case 'laboratory':
        return (
          <LaboratoryForm data={laboratoryData} onUpdate={setLaboratoryData} />
        );
      case 'manufacturer':
        return (
          <ManufacturerForm
            data={manufacturerData}
            onUpdate={setManufacturerData}
          />
        );
      case 'wild_collector':
        return (
          <WildCollectorForm
            data={wildCollectorData}
            onUpdate={setWildCollectorData}
          />
        );
      case 'processor':
        return (
          <ProcessorForm data={processorData} onUpdate={setProcessorData} />
        );
      case 'packer':
        return <PackerForm data={packerData} onUpdate={setPackerData} />;
      case 'storage':
        return <StorageForm data={storageData} onUpdate={setStorageData} />;
      default:
        return null;
    }
  };

  return (
    <div className='h-screen bg-white flex flex-col'>
      {/* Compact Main Content */}
      <main className='flex-1 p-2 overflow-hidden'>
        <div className='h-full max-w-5xl mx-auto flex flex-col'>
          {/* Message Bar - Compact */}
          {message && (
            <div
              className={`mb-2 p-2 rounded border text-sm ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}
            >
              <div className='flex items-center space-x-2'>
                {message.type === 'success' ? (
                  <CheckCircle className='w-3 h-3' />
                ) : (
                  <AlertCircle className='w-3 h-3' />
                )}
                <span className='font-medium'>{message.text}</span>
              </div>
            </div>
          )}

          {!selectedRole ? (
            /* Role Selection - Optimized */
            <div className='flex flex-col justify-center min-h-0'>
              <div className='mb-4 text-center'>
                <h1 className='text-xl font-semibold text-slate-900 mb-1'>
                  Create Profile
                </h1>
                <p className='text-sm text-slate-600'>
                  Select your role in the herbal supply chain
                </p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 justify-items-center'>
                {roleOptions.map(role => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className='group p-3 bg-white rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 text-center w-full max-w-[140px] h-[100px] flex flex-col justify-center'
                    >
                      <div
                        className={`w-8 h-8 ${role.color} rounded-md flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform`}
                      >
                        <IconComponent className='w-4 h-4 text-white' />
                      </div>
                      <h3 className='font-medium text-slate-900 text-xs mb-1'>
                        {role.label}
                      </h3>
                      <p className='text-[10px] text-slate-500 line-clamp-1'>
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Form Layout - Compact */
            <div className='flex-1 flex flex-col min-h-0'>
              {/* Compact Header */}
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center space-x-2'>
                  {(() => {
                    const selectedRoleOption = roleOptions.find(
                      r => r.value === selectedRole
                    );
                    if (selectedRoleOption) {
                      const IconComponent = selectedRoleOption.icon;
                      return (
                        <>
                          <div
                            className={`w-7 h-7 ${selectedRoleOption.color} rounded-md flex items-center justify-center`}
                          >
                            <IconComponent className='w-3.5 h-3.5 text-white' />
                          </div>
                          <div>
                            <h2 className='text-base font-semibold capitalize text-slate-900'>
                              {selectedRole.replace('_', ' ')} Profile
                            </h2>
                          </div>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
                <Button
                  variant='outline'
                  onClick={() => setSelectedRole('')}
                  className='h-7 px-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-xs'
                >
                  <ArrowLeft className='w-3 h-3 mr-1' />
                  Back
                </Button>
              </div>

              {/* Form Content - Optimized Space */}
              <div className='flex-1 bg-white rounded-lg border border-slate-200 flex flex-col min-h-0'>
                <div className='flex-1 overflow-y-auto p-3'>
                  {renderRoleForm()}
                </div>

                {/* Action Bar - Minimal */}
                <div className='border-t border-slate-200 px-3 py-2 bg-white'>
                  <div className='flex justify-end'>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className='h-7 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium'
                    >
                      {isLoading ? (
                        <div className='flex items-center'>
                          <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2'></div>
                          Creating...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className='w-3 h-3 mr-2' />
                          Create Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
