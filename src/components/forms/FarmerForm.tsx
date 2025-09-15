'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ArrowLeft } from 'lucide-react';

interface FarmerFormData {
  farmName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  farmSize: string;
  primaryCrops: string;
  farmingType: string;
  certifications: string;
  experience: string;
}

interface FarmerFormProps {
  onSubmit: (data: FarmerFormData) => void;
  onCancel: () => void;
}

export const FarmerForm = ({ onSubmit, onCancel }: FarmerFormProps) => {
  const [formData, setFormData] = useState<FarmerFormData>({
    farmName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    farmSize: '',
    primaryCrops: '',
    farmingType: '',
    certifications: '',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FarmerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-xl border border-gray-100">
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
              <h2 className="text-xl font-semibold text-gray-900">Farmer Registration</h2>
              <p className="text-sm text-gray-500 mt-0.5">Register your farm in the Herbtrace network</p>
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
          <form id="farmer-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName" className="text-sm font-medium text-gray-700">
                    Farm Name *
                  </Label>
                  <Input
                    id="farmName"
                    value={formData.farmName}
                    onChange={(e) => handleChange('farmName', e.target.value)}
                    placeholder="Enter farm name"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
                    Owner Name *
                  </Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder="Enter owner name"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
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
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
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
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Farm Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Farm Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                    Farm Size (acres) *
                  </Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => handleChange('farmSize', e.target.value)}
                    placeholder="Enter farm size"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingType" className="text-sm font-medium text-gray-700">
                    Farming Type *
                  </Label>
                  <Select onValueChange={(value) => handleChange('farmingType', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                      <SelectValue placeholder="Select farming type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="conventional">Conventional</SelectItem>
                      <SelectItem value="sustainable">Sustainable</SelectItem>
                      <SelectItem value="biodynamic">Biodynamic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                    Experience (years) *
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="Years of experience"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Location & Crops */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Location & Crops
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Farm Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Enter complete farm address"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryCrops" className="text-sm font-medium text-gray-700">
                    Primary Herbs/Crops *
                  </Label>
                  <Textarea
                    id="primaryCrops"
                    value={formData.primaryCrops}
                    onChange={(e) => handleChange('primaryCrops', e.target.value)}
                    placeholder="List the primary herbs and crops you grow"
                    required
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications" className="text-sm font-medium text-gray-700">
                    Certifications (Optional)
                  </Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleChange('certifications', e.target.value)}
                    placeholder="List any organic, quality, or other certifications"
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[80px]"
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
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
              >
                Register Farm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};