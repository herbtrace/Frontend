'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Users, CheckCircle, AlertCircle } from 'lucide-react';
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
  StorageForm
} from './forms';

export const ProfileCreation = ({ onBack, user }: ProfileCreationProps) => {
  const [selectedRole, setSelectedRole] = useState<ProfileRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
    resetAllForms
  } = useProfileForms(user);

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

      // Show success toast
      toast.success('Profile created successfully!', {
        description: `Profile ID: ${response.id}`,
        icon: <CheckCircle className="w-4 h-4" />,
        duration: 4000,
      });

      // Reset form immediately after successful creation
      resetAllForms();
      setSelectedRole('');
      setMessage(null);

    } catch (error) {
      console.error('Profile creation failed:', error);

      // Parse error message for better user feedback
      let errorMessage = 'Failed to create profile';
      let errorDescription = '';

      if (error instanceof Error) {
        const errorText = error.message;

        // Check for specific error patterns
        if (errorText.includes('already exists') || errorText.includes('duplicate')) {
          errorMessage = 'Profile already exists';
          errorDescription = 'A profile with this ID already exists. Please use a different ID.';
        } else if (errorText.includes('422')) {
          errorMessage = 'Invalid data provided';
          errorDescription = 'Please check all required fields and try again.';
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

      // Show error toast
      toast.error(errorMessage, {
        description: errorDescription,
        icon: <AlertCircle className="w-4 h-4" />,
        duration: 6000,
      });

      setMessage({
        type: 'error',
        text: errorMessage + (errorDescription ? ': ' + errorDescription : '')
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
        return <LaboratoryForm data={laboratoryData} onUpdate={setLaboratoryData} />;
      case 'manufacturer':
        return <ManufacturerForm data={manufacturerData} onUpdate={setManufacturerData} />;
      case 'wild_collector':
        return <WildCollectorForm data={wildCollectorData} onUpdate={setWildCollectorData} />;
      case 'processor':
        return <ProcessorForm data={processorData} onUpdate={setProcessorData} />;
      case 'packer':
        return <PackerForm data={packerData} onUpdate={setPackerData} />;
      case 'storage':
        return <StorageForm data={storageData} onUpdate={setStorageData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Message */}
          {message && (
            <Card className={`border shadow-sm ${message.type === 'success' ? 'bg-teal-50 border-teal-200' : 'bg-red-50 border-red-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-teal-600' : 'bg-red-500'}`}></div>
                  <p className={`text-sm font-medium ${message.type === 'success' ? 'text-teal-800' : 'text-red-800'}`}>
                    {message.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Role Selection */}
          <Card className="border border-gray-100 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-normal text-black">
                <Users className="w-4 h-4 mr-2 text-teal-600" />
                Select Profile Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedRole} onValueChange={(value: ProfileRole) => setSelectedRole(value)}>
                <SelectTrigger className="h-9 text-sm border-gray-200">
                  <SelectValue placeholder="Choose a profile type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="wild_collector">Wild Collector</SelectItem>
                  <SelectItem value="processor">Processor</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="packer">Packer</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Profile Form */}
          {selectedRole && (
            <Card className="border border-gray-100 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm font-normal capitalize text-black">
                  <Plus className="w-4 h-4 mr-2 text-teal-600" />
                  {selectedRole.replace('_', ' ')} Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderRoleForm()}

                <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRole('')}
                    className="h-9 px-4 border-gray-200 text-black hover:bg-gray-50 text-sm font-normal"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="h-9 px-6 bg-teal-600 hover:bg-teal-700 text-white border-0 text-sm font-normal"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-2" />
                        Create Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};