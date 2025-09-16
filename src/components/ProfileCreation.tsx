'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Users } from 'lucide-react';
import { ApiService, type ProfileData } from '@/services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface ProfileCreationProps {
  onBack: () => void;
  user: User | null;
}

type ProfileRole = 'farmer' | 'wild_collector' | 'processor' | 'laboratory' | 'manufacturer' | 'packer' | 'storage';

export const ProfileCreation = ({ onBack, user }: ProfileCreationProps) => {
  const [selectedRole, setSelectedRole] = useState<ProfileRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form states for different roles
  const [farmerData, setFarmerData] = useState({
    name: '',
    phone_number: '',
    location: { lat: 0, long: 0, address: '' },
    land_records: '',
    certifications: [] as string[],
    registered_crops: [] as string[],
    aadhar_number: ''
  });

  const [wildCollectorData, setWildCollectorData] = useState({
    wild_collector_id: '',
    name: '',
    phone_number: '',
    location: { lat: 0, long: 0, address: '' },
    license_no: '',
    area_assigned: '',
    certifications: [] as string[],
    company_email: user?.email || '',
    registered_species: [] as string[]
  });

  const [processorData, setProcessorData] = useState({
    processor_id: '',
    company_name: '',
    authority_name: '',
    address: '',
    license_no: '',
    responsible_person: '',
    certification_status: [] as string[],
    facilities: [] as string[],
    company_email: user?.email || '',
    phone_number: ''
  });

  const [laboratoryData, setLaboratoryData] = useState({
    lab_id: '',
    company_name: '',
    location: '',
    accreditation_no: '',
    test_capabilities: [] as string[],
    company_email: user?.email || '',
    ayush_certificate: [] as string[],
    phone_number: ''
  });

  const [manufacturerData, setManufacturerData] = useState({
    manufacturer_id: '',
    name: '',
    address: '',
    license_no: '',
    GMP_certified: false,
    company_email: user?.email || '',
    phone_number: ''
  });

  const [packerData, setPackerData] = useState({
    packer_id: '',
    name: '',
    lic_no: '',
    location: '',
    phone_number: '',
    company_email: user?.email || ''
  });

  const [storageData, setStorageData] = useState({
    storage_id: '',
    facility_name: '',
    location: '',
    cert_status: '',
    company_email: user?.email || ''
  });

  const handleSubmit = async () => {
    if (!selectedRole) return;

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
      setMessage({ type: 'success', text: `Profile created successfully! ID: ${response.id}` });

      // Reset form after successful creation
      setTimeout(() => {
        setSelectedRole('');
        setMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Profile creation failed:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create profile'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleForm = () => {
    switch (selectedRole) {
      case 'farmer':
        return (
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-normal text-black flex items-center">
                <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="farmer-name" className="text-xs font-normal text-black">Full Name *</Label>
                  <Input
                    id="farmer-name"
                    value={farmerData.name}
                    onChange={(e) => setFarmerData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter farmer's full name"
                    className="h-9 border-gray-200 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="farmer-phone" className="text-xs font-normal text-black">Phone Number *</Label>
                  <Input
                    id="farmer-phone"
                    value={farmerData.phone_number}
                    onChange={(e) => setFarmerData(prev => ({ ...prev, phone_number: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-9 border-gray-200 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="farmer-aadhar" className="text-xs font-normal text-black">Aadhar Number *</Label>
                <Input
                  id="farmer-aadhar"
                  value={farmerData.aadhar_number}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, aadhar_number: e.target.value }))}
                  placeholder="XXXX XXXX XXXX"
                  className="h-9 max-w-md border-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-normal text-black flex items-center">
                <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
                Farm Location
              </h3>
              <div className="space-y-1">
                <Label htmlFor="farmer-address" className="text-xs font-normal text-black">Farm Address *</Label>
                <Textarea
                  id="farmer-address"
                  value={farmerData.location.address}
                  onChange={(e) => setFarmerData(prev => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value }
                  }))}
                  placeholder="Complete farm address with village, district, state"
                  className="min-h-[80px] border-gray-200 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="farmer-lat" className="text-xs font-normal text-black">Latitude (Optional)</Label>
                  <Input
                    id="farmer-lat"
                    type="number"
                    step="any"
                    value={farmerData.location.lat}
                    onChange={(e) => setFarmerData(prev => ({
                      ...prev,
                      location: { ...prev.location, lat: parseFloat(e.target.value) || 0 }
                    }))}
                    placeholder="e.g., 12.9716"
                    className="h-9 border-gray-200 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="farmer-long" className="text-xs font-normal text-black">Longitude (Optional)</Label>
                  <Input
                    id="farmer-long"
                    type="number"
                    step="any"
                    value={farmerData.location.long}
                    onChange={(e) => setFarmerData(prev => ({
                      ...prev,
                      location: { ...prev.location, long: parseFloat(e.target.value) || 0 }
                    }))}
                    placeholder="e.g., 77.5946"
                    className="h-9 border-gray-200 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-normal text-black flex items-center">
                <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
                Additional Details
              </h3>
              <div className="space-y-1">
                <Label htmlFor="farmer-land" className="text-xs font-normal text-black">Land Records (Optional)</Label>
                <Textarea
                  id="farmer-land"
                  value={farmerData.land_records}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, land_records: e.target.value }))}
                  placeholder="Land ownership documents, survey numbers, etc."
                  className="min-h-[80px] border-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        );

      case 'laboratory':
        return (
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-black flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Laboratory Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lab-id" className="text-sm font-medium text-black">Lab ID *</Label>
                  <Input
                    id="lab-id"
                    value={laboratoryData.lab_id}
                    onChange={(e) => setLaboratoryData(prev => ({ ...prev, lab_id: e.target.value }))}
                    placeholder="Unique laboratory identifier"
                    className="h-12 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lab-name" className="text-sm font-medium text-black">Company Name *</Label>
                  <Input
                    id="lab-name"
                    value={laboratoryData.company_name}
                    onChange={(e) => setLaboratoryData(prev => ({ ...prev, company_name: e.target.value }))}
                    placeholder="Laboratory company name"
                    className="h-12 border-gray-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lab-phone" className="text-sm font-medium text-black">Phone Number *</Label>
                <Input
                  id="lab-phone"
                  value={laboratoryData.phone_number}
                  onChange={(e) => setLaboratoryData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="h-12 max-w-md border-gray-200"
                />
              </div>
            </div>

            {/* Location & Credentials */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-black flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Location & Credentials
              </h3>
              <div className="space-y-2">
                <Label htmlFor="lab-location" className="text-sm font-medium text-black">Laboratory Location *</Label>
                <Textarea
                  id="lab-location"
                  value={laboratoryData.location}
                  onChange={(e) => setLaboratoryData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Complete laboratory address with city, state"
                  className="min-h-[120px] border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lab-accreditation" className="text-sm font-medium text-black">Accreditation Number (Optional)</Label>
                <Input
                  id="lab-accreditation"
                  value={laboratoryData.accreditation_no}
                  onChange={(e) => setLaboratoryData(prev => ({ ...prev, accreditation_no: e.target.value }))}
                  placeholder="NABL or other accreditation number"
                  className="h-12 max-w-md border-gray-200"
                />
              </div>
            </div>
          </div>
        );

      case 'manufacturer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mfg-id">Manufacturer ID *</Label>
                <Input
                  id="mfg-id"
                  value={manufacturerData.manufacturer_id}
                  onChange={(e) => setManufacturerData(prev => ({ ...prev, manufacturer_id: e.target.value }))}
                  placeholder="Manufacturer ID"
                />
              </div>
              <div>
                <Label htmlFor="mfg-name">Name *</Label>
                <Input
                  id="mfg-name"
                  value={manufacturerData.name}
                  onChange={(e) => setManufacturerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Manufacturer name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mfg-address">Address *</Label>
              <Input
                id="mfg-address"
                value={manufacturerData.address}
                onChange={(e) => setManufacturerData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Manufacturing address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mfg-phone">Phone Number *</Label>
                <Input
                  id="mfg-phone"
                  value={manufacturerData.phone_number}
                  onChange={(e) => setManufacturerData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="mfg-license">License No</Label>
                <Input
                  id="mfg-license"
                  value={manufacturerData.license_no}
                  onChange={(e) => setManufacturerData(prev => ({ ...prev, license_no: e.target.value }))}
                  placeholder="License number"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gmp-certified"
                checked={manufacturerData.GMP_certified}
                onCheckedChange={(checked) => setManufacturerData(prev => ({
                  ...prev,
                  GMP_certified: checked === true
                }))}
              />
              <Label htmlFor="gmp-certified">GMP Certified</Label>
            </div>
          </div>
        );

      case 'wild_collector':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wc-id">Wild Collector ID *</Label>
                <Input
                  id="wc-id"
                  value={wildCollectorData.wild_collector_id}
                  onChange={(e) => setWildCollectorData(prev => ({ ...prev, wild_collector_id: e.target.value }))}
                  placeholder="Wild Collector ID"
                />
              </div>
              <div>
                <Label htmlFor="wc-name">Name *</Label>
                <Input
                  id="wc-name"
                  value={wildCollectorData.name}
                  onChange={(e) => setWildCollectorData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Collector name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="wc-address">Address *</Label>
              <Input
                id="wc-address"
                value={wildCollectorData.location.address}
                onChange={(e) => setWildCollectorData(prev => ({
                  ...prev,
                  location: { ...prev.location, address: e.target.value }
                }))}
                placeholder="Collection area address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wc-phone">Phone Number *</Label>
                <Input
                  id="wc-phone"
                  value={wildCollectorData.phone_number}
                  onChange={(e) => setWildCollectorData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="wc-license">License No</Label>
                <Input
                  id="wc-license"
                  value={wildCollectorData.license_no}
                  onChange={(e) => setWildCollectorData(prev => ({ ...prev, license_no: e.target.value }))}
                  placeholder="License number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="wc-area">Area Assigned</Label>
              <Input
                id="wc-area"
                value={wildCollectorData.area_assigned}
                onChange={(e) => setWildCollectorData(prev => ({ ...prev, area_assigned: e.target.value }))}
                placeholder="Assigned collection area"
              />
            </div>
          </div>
        );

      case 'processor':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proc-id">Processor ID *</Label>
                <Input
                  id="proc-id"
                  value={processorData.processor_id}
                  onChange={(e) => setProcessorData(prev => ({ ...prev, processor_id: e.target.value }))}
                  placeholder="Processor ID"
                />
              </div>
              <div>
                <Label htmlFor="proc-company">Company Name *</Label>
                <Input
                  id="proc-company"
                  value={processorData.company_name}
                  onChange={(e) => setProcessorData(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="Processing company name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proc-authority">Authority Name *</Label>
                <Input
                  id="proc-authority"
                  value={processorData.authority_name}
                  onChange={(e) => setProcessorData(prev => ({ ...prev, authority_name: e.target.value }))}
                  placeholder="Authority name"
                />
              </div>
              <div>
                <Label htmlFor="proc-phone">Phone Number *</Label>
                <Input
                  id="proc-phone"
                  value={processorData.phone_number}
                  onChange={(e) => setProcessorData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proc-address">Address *</Label>
              <Input
                id="proc-address"
                value={processorData.address}
                onChange={(e) => setProcessorData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Processing facility address"
              />
            </div>
            <div>
              <Label htmlFor="proc-responsible">Responsible Person</Label>
              <Input
                id="proc-responsible"
                value={processorData.responsible_person}
                onChange={(e) => setProcessorData(prev => ({ ...prev, responsible_person: e.target.value }))}
                placeholder="Responsible person name"
              />
            </div>
          </div>
        );

      case 'packer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pack-id">Packer ID *</Label>
                <Input
                  id="pack-id"
                  value={packerData.packer_id}
                  onChange={(e) => setPackerData(prev => ({ ...prev, packer_id: e.target.value }))}
                  placeholder="Packer ID"
                />
              </div>
              <div>
                <Label htmlFor="pack-name">Name *</Label>
                <Input
                  id="pack-name"
                  value={packerData.name}
                  onChange={(e) => setPackerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Packer name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pack-phone">Phone Number *</Label>
                <Input
                  id="pack-phone"
                  value={packerData.phone_number}
                  onChange={(e) => setPackerData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="pack-license">License No</Label>
                <Input
                  id="pack-license"
                  value={packerData.lic_no}
                  onChange={(e) => setPackerData(prev => ({ ...prev, lic_no: e.target.value }))}
                  placeholder="License number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pack-location">Location</Label>
              <Input
                id="pack-location"
                value={packerData.location}
                onChange={(e) => setPackerData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Packing facility location"
              />
            </div>
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storage-id">Storage ID *</Label>
                <Input
                  id="storage-id"
                  value={storageData.storage_id}
                  onChange={(e) => setStorageData(prev => ({ ...prev, storage_id: e.target.value }))}
                  placeholder="Storage ID"
                />
              </div>
              <div>
                <Label htmlFor="storage-name">Facility Name *</Label>
                <Input
                  id="storage-name"
                  value={storageData.facility_name}
                  onChange={(e) => setStorageData(prev => ({ ...prev, facility_name: e.target.value }))}
                  placeholder="Storage facility name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="storage-location">Location *</Label>
              <Input
                id="storage-location"
                value={storageData.location}
                onChange={(e) => setStorageData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Storage facility location"
              />
            </div>
            <div>
              <Label htmlFor="storage-cert">Certification Status</Label>
              <Input
                id="storage-cert"
                value={storageData.cert_status}
                onChange={(e) => setStorageData(prev => ({ ...prev, cert_status: e.target.value }))}
                placeholder="Certification status"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Minimalist Header */}
      <header className="h-12 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="hover:bg-gray-50 text-black h-8 text-sm font-normal">
            <ArrowLeft className="w-3 h-3 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-lg font-normal text-black">Create New Profile</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {selectedRole && (
            <Badge variant="secondary" className="capitalize bg-teal-100 text-teal-700 border-0 text-xs">
              {selectedRole.replace('_', ' ')}
            </Badge>
          )}
        </div>
      </header>

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