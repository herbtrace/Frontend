'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Farmer Registration</CardTitle>
            <CardDescription className="text-center">
              Register your farm in the Herbtrace network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name *</Label>
                  <Input
                    id="farmName"
                    value={formData.farmName}
                    onChange={(e) => handleChange('farmName', e.target.value)}
                    placeholder="Enter farm name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder="Enter owner name"
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
                  <Label htmlFor="farmSize">Farm Size (acres) *</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => handleChange('farmSize', e.target.value)}
                    placeholder="Enter farm size"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingType">Farming Type *</Label>
                  <Select onValueChange={(value) => handleChange('farmingType', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="experience">Experience (years) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="Years of experience"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Farm Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete farm address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryCrops">Primary Herbs/Crops *</Label>
                <Textarea
                  id="primaryCrops"
                  value={formData.primaryCrops}
                  onChange={(e) => handleChange('primaryCrops', e.target.value)}
                  placeholder="List the primary herbs and crops you grow"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (Optional)</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  placeholder="List any organic, quality, or other certifications"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Register Farm</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};