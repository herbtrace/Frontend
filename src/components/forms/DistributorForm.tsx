'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ArrowLeft } from 'lucide-react';

interface DistributorFormData {
  companyName: string;
  managerName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  distributionAreas: string[];
  storageCapacity: string;
  transportFleet: string;
  coldStorageAvailable: boolean;
  trackingSystem: string;
  yearsInBusiness: string;
}

interface DistributorFormProps {
  onSubmit: (data: DistributorFormData) => void;
  onCancel: () => void;
}

const distributionAreas = [
  'Local (City)',
  'State-wide',
  'Regional (Multi-state)',
  'National',
  'International',
  'Rural Areas',
  'Urban Areas',
  'Pharmaceutical Chains'
];

export const DistributorForm = ({ onSubmit, onCancel }: DistributorFormProps) => {
  const [formData, setFormData] = useState<DistributorFormData>({
    companyName: '',
    managerName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    distributionAreas: [],
    storageCapacity: '',
    transportFleet: '',
    coldStorageAvailable: false,
    trackingSystem: '',
    yearsInBusiness: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof DistributorFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      distributionAreas: checked
        ? [...prev.distributionAreas, area]
        : prev.distributionAreas.filter(a => a !== area)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Distributor Registration</h2>
              <p className="text-sm text-gray-500 mt-0.5">Register your distribution company in the Herbtrace network</p>
            </div>
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

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          <form id="distributor-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managerName" className="text-sm font-medium text-gray-700">
                    Manager Name *
                  </Label>
                  <Input
                    id="managerName"
                    value={formData.managerName}
                    onChange={(e) => handleChange('managerName', e.target.value)}
                    placeholder="Enter manager name"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                    Distribution License *
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageCapacity" className="text-sm font-medium text-gray-700">
                    Storage Capacity (sq ft) *
                  </Label>
                  <Input
                    id="storageCapacity"
                    type="number"
                    value={formData.storageCapacity}
                    onChange={(e) => handleChange('storageCapacity', e.target.value)}
                    placeholder="Enter storage capacity"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsInBusiness" className="text-sm font-medium text-gray-700">
                    Years in Business *
                  </Label>
                  <Select onValueChange={(value) => handleChange('yearsInBusiness', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trackingSystem" className="text-sm font-medium text-gray-700">
                    Tracking System *
                  </Label>
                  <Select onValueChange={(value) => handleChange('trackingSystem', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20">
                      <SelectValue placeholder="Select tracking system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="barcode">Barcode System</SelectItem>
                      <SelectItem value="rfid">RFID System</SelectItem>
                      <SelectItem value="gps">GPS Tracking</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="manual">Manual Tracking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Location
              </h3>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Company Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete company address"
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 min-h-[80px]"
                />
              </div>
            </div>

            {/* Distribution Areas */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Distribution Areas *
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                {distributionAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.distributionAreas.includes(area)}
                      onCheckedChange={(checked) =>
                        handleAreaChange(area, checked as boolean)
                      }
                      className="border-gray-300"
                    />
                    <Label htmlFor={area} className="text-sm font-medium text-gray-700">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport & Storage */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Transport & Storage
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transportFleet" className="text-sm font-medium text-gray-700">
                    Transport Fleet Details *
                  </Label>
                  <Textarea
                    id="transportFleet"
                    value={formData.transportFleet}
                    onChange={(e) => handleChange('transportFleet', e.target.value)}
                    placeholder="Describe your transport vehicles and fleet capacity"
                    required
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 min-h-[80px]"
                  />
                </div>

                <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg bg-gray-50/30">
                  <Checkbox
                    id="coldStorageAvailable"
                    checked={formData.coldStorageAvailable}
                    onCheckedChange={(checked) => handleChange('coldStorageAvailable', checked as boolean)}
                    className="border-gray-300"
                  />
                  <Label htmlFor="coldStorageAvailable" className="text-sm font-medium text-gray-700">
                    Cold Storage Available
                  </Label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6"
              >
                Register Distributor
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};