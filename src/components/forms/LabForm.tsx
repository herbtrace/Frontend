'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ArrowLeft } from 'lucide-react';

interface LabFormData {
  labName: string;
  directorName: string;
  email: string;
  phone: string;
  address: string;
  accreditation: string;
  testingCapabilities: string[];
  equipment: string;
  certifications: string;
  operatingHours: string;
  emergencyContact: string;
}

interface LabFormProps {
  onSubmit: (data: LabFormData) => void;
  onCancel: () => void;
}

const testingCapabilities = [
  'Heavy Metal Testing',
  'Pesticide Residue Analysis',
  'Microbial Testing',
  'Potency Testing',
  'Contamination Screening',
  'Moisture Content Analysis',
  'Ash Content Testing',
  'Foreign Matter Detection'
];

export const LabForm = ({ onSubmit, onCancel }: LabFormProps) => {
  const [formData, setFormData] = useState<LabFormData>({
    labName: '',
    directorName: '',
    email: '',
    phone: '',
    address: '',
    accreditation: '',
    testingCapabilities: [],
    equipment: '',
    certifications: '',
    operatingHours: '',
    emergencyContact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof LabFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCapabilityChange = (capability: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      testingCapabilities: checked
        ? [...prev.testingCapabilities, capability]
        : prev.testingCapabilities.filter(c => c !== capability)
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
              <h2 className="text-xl font-semibold text-gray-900">Quality Lab Registration</h2>
              <p className="text-sm text-gray-500 mt-0.5">Register your testing facility in the Herbtrace network</p>
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
          <form id="lab-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Laboratory Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Laboratory Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="labName" className="text-sm font-medium text-gray-700">
                    Laboratory Name *
                  </Label>
                  <Input
                    id="labName"
                    value={formData.labName}
                    onChange={(e) => handleChange('labName', e.target.value)}
                    placeholder="Enter laboratory name"
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="directorName" className="text-sm font-medium text-gray-700">
                    Lab Director *
                  </Label>
                  <Input
                    id="directorName"
                    value={formData.directorName}
                    onChange={(e) => handleChange('directorName', e.target.value)}
                    placeholder="Enter director name"
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Accreditation & Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Accreditation & Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accreditation" className="text-sm font-medium text-gray-700">
                    Accreditation *
                  </Label>
                  <Select onValueChange={(value) => handleChange('accreditation', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select accreditation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iso17025">ISO 17025</SelectItem>
                      <SelectItem value="nabl">NABL</SelectItem>
                      <SelectItem value="cap">CAP</SelectItem>
                      <SelectItem value="clia">CLIA</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                    Emergency Contact *
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact number"
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
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
                  Laboratory Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete laboratory address"
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[80px]"
                />
              </div>
            </div>

            {/* Testing Capabilities */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Testing Capabilities *
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                {testingCapabilities.map((capability) => (
                  <div key={capability} className="flex items-center space-x-2">
                    <Checkbox
                      id={capability}
                      checked={formData.testingCapabilities.includes(capability)}
                      onCheckedChange={(checked) =>
                        handleCapabilityChange(capability, checked as boolean)
                      }
                      className="border-gray-300"
                    />
                    <Label htmlFor={capability} className="text-sm font-medium text-gray-700">
                      {capability}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & Operations */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                Equipment & Operations
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment" className="text-sm font-medium text-gray-700">
                    Equipment & Technology *
                  </Label>
                  <Textarea
                    id="equipment"
                    value={formData.equipment}
                    onChange={(e) => handleChange('equipment', e.target.value)}
                    placeholder="Describe your laboratory equipment and technology"
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-700">
                    Operating Hours *
                  </Label>
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => handleChange('operatingHours', e.target.value)}
                    placeholder="e.g., Mon-Fri 9AM-6PM"
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications" className="text-sm font-medium text-gray-700">
                    Additional Certifications (Optional)
                  </Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleChange('certifications', e.target.value)}
                    placeholder="List any additional certifications or quality standards"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[80px]"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Register Laboratory
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};