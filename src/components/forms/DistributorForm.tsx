'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Distributor Registration</CardTitle>
            <CardDescription className="text-center">
              Register your distribution company in the Herbtrace network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managerName">Manager Name *</Label>
                  <Input
                    id="managerName"
                    value={formData.managerName}
                    onChange={(e) => handleChange('managerName', e.target.value)}
                    placeholder="Enter manager name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Distribution License *</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageCapacity">Storage Capacity (sq ft) *</Label>
                  <Input
                    id="storageCapacity"
                    type="number"
                    value={formData.storageCapacity}
                    onChange={(e) => handleChange('storageCapacity', e.target.value)}
                    placeholder="Enter storage capacity"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                  <Select onValueChange={(value) => handleChange('yearsInBusiness', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="trackingSystem">Tracking System *</Label>
                  <Select onValueChange={(value) => handleChange('trackingSystem', value)}>
                    <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="address">Company Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete company address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Distribution Areas *</Label>
                <div className="grid grid-cols-2 gap-3 p-3 border rounded-md">
                  {distributionAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.distributionAreas.includes(area)}
                        onCheckedChange={(checked) =>
                          handleAreaChange(area, checked as boolean)
                        }
                      />
                      <Label htmlFor={area} className="text-sm">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportFleet">Transport Fleet Details *</Label>
                <Textarea
                  id="transportFleet"
                  value={formData.transportFleet}
                  onChange={(e) => handleChange('transportFleet', e.target.value)}
                  placeholder="Describe your transport vehicles and fleet capacity"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coldStorageAvailable"
                  checked={formData.coldStorageAvailable}
                  onCheckedChange={(checked) => handleChange('coldStorageAvailable', checked as boolean)}
                />
                <Label htmlFor="coldStorageAvailable">Cold Storage Available</Label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Register Distributor</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};