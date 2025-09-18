'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RoleFormProps {
  formData: Record<string, any>;
  getInputValue: (field: string) => any;
  handleInputChange: (field: string, value: any) => void;
}

export default function FarmerForm({ formData, getInputValue, handleInputChange }: RoleFormProps) {
  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
          Required Information
        </h4>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Full Name *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Enter full name'
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Phone Number *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Enter phone number'
              value={formData.phone_number || ''}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              required
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Aadhar Number *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Enter Aadhar number'
              value={formData.aadhar_number || ''}
              onChange={(e) => handleInputChange('aadhar_number', e.target.value)}
              required
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Profile ID
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Optional profile ID'
              value={formData.profile_id || ''}
              onChange={(e) => handleInputChange('profile_id', e.target.value)}
            />
          </div>
          <div className='space-y-1 lg:col-span-2'>
            <Label className='text-sm font-medium text-black'>
              Address *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Complete address'
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Latitude *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='0.0000'
              type='number'
              step='any'
              value={formData.latitude || ''}
              onChange={(e) => handleInputChange('latitude', e.target.value)}
              required
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Longitude *
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='0.0000'
              type='number'
              step='any'
              value={formData.longitude || ''}
              onChange={(e) => handleInputChange('longitude', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
          Optional Information
        </h4>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Land Records
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='Land record details'
              value={formData.land_records || ''}
              onChange={(e) => handleInputChange('land_records', e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label className='text-sm font-medium text-black'>
              Certifications
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='e.g., Organic, GAP'
              value={formData.certifications || ''}
              onChange={(e) => handleInputChange('certifications', e.target.value)}
            />
            <p className='text-xs text-gray-500'>
              Separate with commas
            </p>
          </div>
          <div className='space-y-1 lg:col-span-2'>
            <Label className='text-sm font-medium text-black'>
              Registered Crops
            </Label>
            <Input
              className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
              placeholder='e.g., Ashwagandha, Turmeric, Tulsi'
              value={formData.registered_crops || ''}
              onChange={(e) => handleInputChange('registered_crops', e.target.value)}
            />
            <p className='text-xs text-gray-500'>
              Separate with commas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



