'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quality Lab Registration</CardTitle>
            <CardDescription className="text-center">
              Register your testing facility in the Herbtrace network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="labName">Laboratory Name *</Label>
                  <Input
                    id="labName"
                    value={formData.labName}
                    onChange={(e) => handleChange('labName', e.target.value)}
                    placeholder="Enter laboratory name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="directorName">Lab Director *</Label>
                  <Input
                    id="directorName"
                    value={formData.directorName}
                    onChange={(e) => handleChange('directorName', e.target.value)}
                    placeholder="Enter director name"
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
                  <Label htmlFor="accreditation">Accreditation *</Label>
                  <Select onValueChange={(value) => handleChange('accreditation', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Laboratory Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete laboratory address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Testing Capabilities *</Label>
                <div className="grid grid-cols-2 gap-3 p-3 border rounded-md">
                  {testingCapabilities.map((capability) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox
                        id={capability}
                        checked={formData.testingCapabilities.includes(capability)}
                        onCheckedChange={(checked) =>
                          handleCapabilityChange(capability, checked as boolean)
                        }
                      />
                      <Label htmlFor={capability} className="text-sm">
                        {capability}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment & Technology *</Label>
                <Textarea
                  id="equipment"
                  value={formData.equipment}
                  onChange={(e) => handleChange('equipment', e.target.value)}
                  placeholder="Describe your laboratory equipment and technology"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHours">Operating Hours *</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => handleChange('operatingHours', e.target.value)}
                  placeholder="e.g., Mon-Fri 9AM-6PM"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Additional Certifications</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  placeholder="List any additional certifications or quality standards"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Register Laboratory</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};