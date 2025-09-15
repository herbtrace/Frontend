'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ArrowLeft } from 'lucide-react';

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
              <h2 className="text-xl font-semibold text-gray-900">Manufacturing Unit Registration</h2>
              <p className="text-sm text-gray-500 mt-0.5">Register your manufacturing facility in the Herbtrace network</p>
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
          <form id="manufacturer-form" onSubmit={handleSubmit} className="p-6 space-y-6">
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
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ceoName" className="text-sm font-medium text-gray-700">
                    CEO/Director Name *
                  </Label>
                  <Input
                    id="ceoName"
                    value={formData.ceoName}
                    onChange={(e) => handleChange('ceoName', e.target.value)}
                    placeholder="Enter CEO/Director name"
                    required
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
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
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
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
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Manufacturing Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Manufacturing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                    Manufacturing License *
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number"
                    required
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-sm font-medium text-gray-700">
                    Production Capacity (tons/month) *
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange('capacity', e.target.value)}
                    placeholder="Enter monthly capacity"
                    required
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-700">
                    Employee Count *
                  </Label>
                  <Select onValueChange={(value) => handleChange('employeeCount', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20">
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
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Location
              </h3>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Manufacturing Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete manufacturing facility address"
                  required
                  className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 min-h-[80px]"
                />
              </div>
            </div>

            {/* Product Types */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Product Types *
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                {productTypes.map((productType) => (
                  <div key={productType} className="flex items-center space-x-2">
                    <Checkbox
                      id={productType}
                      checked={formData.productTypes.includes(productType)}
                      onCheckedChange={(checked) =>
                        handleProductTypeChange(productType, checked as boolean)
                      }
                      className="border-gray-300"
                    />
                    <Label htmlFor={productType} className="text-sm font-medium text-gray-700">
                      {productType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Standards */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Quality & Standards
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qualityStandards" className="text-sm font-medium text-gray-700">
                    Quality Standards *
                  </Label>
                  <Textarea
                    id="qualityStandards"
                    value={formData.qualityStandards}
                    onChange={(e) => handleChange('qualityStandards', e.target.value)}
                    placeholder="Describe your quality control standards and processes"
                    required
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 min-h-[80px]"
                  />
                </div>

                <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg bg-gray-50/30">
                  <Checkbox
                    id="exportCapability"
                    checked={formData.exportCapability}
                    onCheckedChange={(checked) => handleChange('exportCapability', checked as boolean)}
                    className="border-gray-300"
                  />
                  <Label htmlFor="exportCapability" className="text-sm font-medium text-gray-700">
                    Export Capability
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications" className="text-sm font-medium text-gray-700">
                    Certifications (Optional)
                  </Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleChange('certifications', e.target.value)}
                    placeholder="List any GMP, ISO, FDA, or other certifications"
                    className="border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 min-h-[80px]"
                  />
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
                className="bg-violet-600 hover:bg-violet-700 text-white px-6"
              >
                Register Manufacturing Unit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};