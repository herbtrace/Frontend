'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ManufacturerFormData {
  companyName: string;
  ceoName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  productTypes: string[];
  capacity: string;
  qualityStandards: string;
  certifications: string;
  exportCapability: boolean;
  employeeCount: string;
}

interface ManufacturerFormProps {
  onSubmit: (data: ManufacturerFormData) => void;
  onCancel: () => void;
}

const productTypes = [
  'Herbal Extracts',
  'Dried Herbs',
  'Powdered Herbs',
  'Essential Oils',
  'Herbal Capsules',
  'Herbal Tablets',
  'Herbal Teas',
  'Herbal Tinctures'
];

export const ManufacturerForm = ({ onSubmit, onCancel }: ManufacturerFormProps) => {
  const [formData, setFormData] = useState<ManufacturerFormData>({
    companyName: '',
    ceoName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    productTypes: [],
    capacity: '',
    qualityStandards: '',
    certifications: '',
    exportCapability: false,
    employeeCount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ManufacturerFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductTypeChange = (productType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      productTypes: checked
        ? [...prev.productTypes, productType]
        : prev.productTypes.filter(p => p !== productType)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Manufacturing Unit Registration</CardTitle>
            <CardDescription className="text-center">
              Register your manufacturing facility in the Herbtrace network
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
                  <Label htmlFor="ceoName">CEO/Director Name *</Label>
                  <Input
                    id="ceoName"
                    value={formData.ceoName}
                    onChange={(e) => handleChange('ceoName', e.target.value)}
                    placeholder="Enter CEO/Director name"
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
                  <Label htmlFor="licenseNumber">Manufacturing License *</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Production Capacity (tons/month) *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange('capacity', e.target.value)}
                    placeholder="Enter monthly capacity"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Employee Count *</Label>
                  <Select onValueChange={(value) => handleChange('employeeCount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="101-500">101-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Manufacturing Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete manufacturing facility address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Product Types *</Label>
                <div className="grid grid-cols-2 gap-3 p-3 border rounded-md">
                  {productTypes.map((productType) => (
                    <div key={productType} className="flex items-center space-x-2">
                      <Checkbox
                        id={productType}
                        checked={formData.productTypes.includes(productType)}
                        onCheckedChange={(checked) =>
                          handleProductTypeChange(productType, checked as boolean)
                        }
                      />
                      <Label htmlFor={productType} className="text-sm">
                        {productType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualityStandards">Quality Standards *</Label>
                <Textarea
                  id="qualityStandards"
                  value={formData.qualityStandards}
                  onChange={(e) => handleChange('qualityStandards', e.target.value)}
                  placeholder="Describe your quality control standards and processes"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exportCapability"
                  checked={formData.exportCapability}
                  onCheckedChange={(checked) => handleChange('exportCapability', checked as boolean)}
                />
                <Label htmlFor="exportCapability">Export Capability</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  placeholder="List any GMP, ISO, FDA, or other certifications"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Register Manufacturing Unit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};