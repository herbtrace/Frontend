'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  LayoutGrid,
  Users,
  UserPlus,
  ChevronLeft,
  LogOut,
  ArrowLeft,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { ApiService, type ProfileData } from '@/services/api';

export default function ProfileCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ProfileData['role'] | ''>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    phone_number: '',
    aadhar_number: '',
    profile_id: '',
    address: '',
    latitude: '',
    longitude: '',
    land_records: '',
    certifications: '',
    registered_crops: '',
    company_email: '',
    company_name: '',
    authority_name: '',
    license_no: '',
    responsible_person: '',
    certification_status: '',
    facilities: '',
    location: '',
    accreditation_no: '',
    test_capabilities: '',
    ayush_certificate: '',
    gmp_certified: '',
    facility_name: '',
    area_assigned: '',
    registered_species: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize state from URL parameters on component mount
  useEffect(() => {
    const role = searchParams.get('role') as ProfileData['role'] | null;
    const step = searchParams.get('step');

    if (role) {
      setSelectedRole(role);
    }
    if (step) {
      setCurrentStep(parseInt(step));
    }
  }, [searchParams]);

  // Debounced URL update to prevent flickering
  const updateURL = useCallback((newRole?: string, newStep?: number) => {
    const params = new URLSearchParams();

    const role = newRole || selectedRole;
    const step = newStep || currentStep;

    if (role) {
      params.set('role', role);
    }
    if (step && step > 1) {
      params.set('step', step.toString());
    }

    const queryString = params.toString();
    const newURL = queryString
      ? `/dashboard/profile-creation?${queryString}`
      : '/dashboard/profile-creation';

    // Use requestAnimationFrame to prevent flickering
    requestAnimationFrame(() => {
      router.replace(newURL, { scroll: false });
    });
  }, [selectedRole, currentStep, router]);

  // Enhanced state setters with smooth transitions
  const setSelectedRoleWithURL = useCallback((role: ProfileData['role']) => {
    setSelectedRole(role);
    updateURL(role);
  }, [updateURL]);

  const setCurrentStepWithURL = useCallback((step: number) => {
    setCurrentStep(step);
    updateURL(undefined, step);
  }, [updateURL]);

  // Select role and step atomically to avoid URL race conditions
  const selectRoleAndProceed = useCallback((roleId: ProfileData['role']) => {
    setSelectedRole(roleId);
    setCurrentStep(2);
    updateURL(roleId, 2);
  }, [updateURL]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || '' // Ensure value is never undefined
    }));
  }, []);

  // Helper function to get safe input value
  const getInputValue = (field: string) => formData[field] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform form data to match API format
      const profileData = transformFormDataToAPI(
        formData,
        selectedRole as ProfileData['role']
      );

      // Create profile via API
      const response = await ApiService.createProfile(profileData);

      // Show success toast
      toast.success('Profile Created Successfully!', {
        description: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} profile has been created and is pending approval.`,
        duration: 4000,
        action: {
          label: 'View Profiles',
          onClick: () => router.push('/dashboard/profiles')
        }
      });

      // Reset form and redirect
      setFormData({});
      setSelectedRole('');
      setCurrentStep(1);

      // Redirect to profiles page after a short delay
      setTimeout(() => {
        router.push('/dashboard/profiles');
      }, 2000);

    } catch (error) {
      console.error('Profile creation failed:', error);
      toast.error('Profile Creation Failed', {
        description: 'There was an error creating your profile. Please try again.',
        duration: 4000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const transformFormDataToAPI = (
    data: Record<string, any>,
    role: ProfileData['role']
  ): ProfileData => {
    // Transform based on exact backend API schema requirements
    switch (role) {
      case 'farmer':
        return {
          role: 'farmer',
          profile_id: data.profile_id || `FARMER-${Date.now()}`,
          name: data.name || '',
          phone_number: data.phone_number || '',
          location: {
            lat: parseFloat(data.latitude || '0'),
            long: parseFloat(data.longitude || '0'),
            address: data.address || ''
          },
          land_records: data.land_records || '',
          certifications: data.certifications ? data.certifications.split(',').map((s: string) => s.trim()) : [],
          registered_crops: data.registered_crops ? data.registered_crops.split(',').map((s: string) => s.trim()) : [],
          aadhar_number: data.aadhar_number || ''
        };

      case 'wild_collector':
        return {
          role: 'wild_collector',
          profile_id: data.profile_id || `WC-${Date.now()}`,
          name: data.name || '',
          phone_number: data.phone_number || '',
          location: {
            lat: parseFloat(data.latitude || '0'),
            long: parseFloat(data.longitude || '0'),
            address: data.address || ''
          },
          license_no: data.license_no || '',
          area_assigned: data.area_assigned || '',
          certifications: data.certifications ? data.certifications.split(',').map((s: string) => s.trim()) : [],
          company_email: data.company_email || '',
          registered_species: data.registered_species ? data.registered_species.split(',').map((s: string) => s.trim()) : []
        };

      case 'processor':
        return {
          role: 'processor',
          profile_id: data.profile_id || `PR-${Date.now()}`,
          company_name: data.company_name || '',
          authority_name: data.authority_name || '',
          address: data.address || '',
          license_no: data.license_no || '',
          responsible_person: data.responsible_person || '',
          certification_status: data.certification_status ? data.certification_status.split(',').map((s: string) => s.trim()) : [],
          facilities: data.facilities ? data.facilities.split(',').map((s: string) => s.trim()) : [],
          company_email: data.company_email || '',
          phone_number: data.phone_number || ''
        };

      case 'laboratory':
        return {
          role: 'laboratory',
          profile_id: data.profile_id || `LAB-${Date.now()}`,
          company_name: data.company_name || '',
          location: data.location || '',
          accreditation_no: data.accreditation_no || '',
          test_capabilities: data.test_capabilities ? data.test_capabilities.split(',').map((s: string) => s.trim()) : [],
          company_email: data.company_email || '',
          ayush_certificate: data.ayush_certificate ? data.ayush_certificate.split(',').map((s: string) => s.trim()) : [],
          phone_number: data.phone_number || ''
        };

      case 'manufacturer':
        return {
          role: 'manufacturer',
          profile_id: data.profile_id || `MFG-${Date.now()}`,
          name: data.name || '',
          address: data.address || '',
          license_no: data.license_no || '',
          GMP_certified: data.gmp_certified === 'true',
          company_email: data.company_email || '',
          phone_number: data.phone_number || ''
        };

      case 'packer':
        return {
          role: 'packer',
          profile_id: data.profile_id || `PKR-${Date.now()}`,
          name: data.name || '',
          lic_no: data.license_no || '',
          location: data.location || '',
          phone_number: data.phone_number || '',
          company_email: data.company_email || ''
        };

      case 'storage':
        return {
          role: 'storage',
          profile_id: data.profile_id || `STR-${Date.now()}`,
          facility_name: data.facility_name || '',
          location: data.location || '',
          cert_status: data.certification_status || '',
          company_email: data.company_email || ''
        };

      default:
        throw new Error('Unsupported role');
    }
  };

  const sidebarItems = useMemo(() => [
    {
      id: 'overview',
      label: 'Overview',
      href: '/dashboard/overview',
      icon: LayoutGrid,
    },
    {
      id: 'profiles',
      label: 'All Profiles',
      href: '/dashboard/profiles',
      icon: Users,
    },
    {
      id: 'create-profile',
      label: 'Create Profile',
      href: '/dashboard/profile-creation',
      icon: UserPlus,
    },
  ], []);

  const renderContent = () => {
    const roles = [
      {
        id: 'farmer',
        name: 'Farmer',
        icon: '🌱',
        desc: 'Agricultural producers',
      },
      {
        id: 'wild_collector',
        name: 'Wild Collector',
        icon: '🌿',
        desc: 'Wild plant collectors',
      },
      {
        id: 'processor',
        name: 'Processor',
        icon: '🏭',
        desc: 'Processing facilities',
      },
      {
        id: 'laboratory',
        name: 'Laboratory',
        icon: '🔬',
        desc: 'Testing laboratories',
      },
      {
        id: 'manufacturer',
        name: 'Manufacturer',
        icon: '⚙️',
        desc: 'Manufacturing units',
      },
      {
        id: 'packer',
        name: 'Packer',
        icon: '📦',
        desc: 'Packaging facilities',
      },
      {
        id: 'storage',
        name: 'Storage',
        icon: '🏪',
        desc: 'Storage facilities',
      },
    ];

    if (currentStep === 1) {
      return (
        <div className='h-full flex flex-col'>
          <div className='mb-8'>
            <h2 className='text-3xl font-light text-black mb-2'>
              Create Profile
            </h2>
            <p className='text-gray-600 font-light'>
              Join the Herbtrace supply chain network
            </p>
          </div>

          <div className='flex-1 flex items-center justify-center'>
            <div className='w-full max-w-4xl'>
              <div className='text-center mb-8'>
                <h3 className='text-xl font-medium text-black mb-2'>
                  Select Your Role
                </h3>
                <p className='text-gray-600 font-light'>
                  Choose the role that best describes your organization
                </p>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => selectRoleAndProceed(role.id as ProfileData['role'])}
                    className={`p-6 bg-white border-2 rounded-lg transition-all duration-200 hover:border-green-600 hover:shadow-md hover:scale-105 transform ${
                      selectedRole === role.id
                        ? 'border-green-600 bg-green-50 scale-105 shadow-md'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className='text-4xl mb-3 transition-transform duration-200'>{role.icon}</div>
                    <h4 className='font-medium text-black mb-1 transition-colors duration-200'>{role.name}</h4>
                    <p className='text-sm text-gray-600 font-light transition-colors duration-200'>
                      {role.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2 && selectedRole) {
      const getRoleForm = () => {
        switch (selectedRole) {
          case 'farmer':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
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

                {/* Optional Fields */}
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

          case 'wild_collector':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
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
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='company@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
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

                {/* Optional Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Optional Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        License Number
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='License number'
                        value={getInputValue('license_no')}
                        onChange={(e) => handleInputChange('license_no', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Area Assigned
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Assigned collection area'
                        value={getInputValue('area_assigned')}
                        onChange={(e) => handleInputChange('area_assigned', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Certifications
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., Forest Department License'
                        value={getInputValue('certifications')}
                        onChange={(e) => handleInputChange('certifications', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Registered Species
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., Ashwagandha, Brahmi'
                        value={getInputValue('registered_species')}
                        onChange={(e) => handleInputChange('registered_species', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

          case 'laboratory':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Laboratory name'
                        value={getInputValue('company_name')}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Phone Number *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Phone number'
                        value={formData.phone_number || ''}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='lab@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1 lg:col-span-2'>
                      <Label className='text-sm font-medium text-black'>
                        Location *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Laboratory location'
                        value={getInputValue('location')}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Optional Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Accreditation Number
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Accreditation number'
                        value={getInputValue('accreditation_no')}
                        onChange={(e) => handleInputChange('accreditation_no', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Test Capabilities
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., Heavy Metals, Pesticides'
                        value={getInputValue('test_capabilities')}
                        onChange={(e) => handleInputChange('test_capabilities', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                    <div className='space-y-1 lg:col-span-2'>
                      <Label className='text-sm font-medium text-black'>
                        AYUSH Certificate
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., AYUSH-001, AYUSH-002'
                        value={getInputValue('ayush_certificate')}
                        onChange={(e) => handleInputChange('ayush_certificate', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

          case 'processor':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Processing company name'
                        value={getInputValue('company_name')}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Authority Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Authorized person name'
                        value={getInputValue('authority_name')}
                        onChange={(e) => handleInputChange('authority_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Phone Number *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Phone number'
                        value={formData.phone_number || ''}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='company@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        License Number
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='License number'
                        value={getInputValue('license_no')}
                        onChange={(e) => handleInputChange('license_no', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1 lg:col-span-2'>
                      <Label className='text-sm font-medium text-black'>
                        Address *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Complete address'
                        value={getInputValue('address')}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Optional Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Responsible Person
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Responsible person name'
                        value={getInputValue('responsible_person')}
                        onChange={(e) => handleInputChange('responsible_person', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Certification Status
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., ISO 22000, HACCP'
                        value={getInputValue('certification_status')}
                        onChange={(e) => handleInputChange('certification_status', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                    <div className='space-y-1 lg:col-span-2'>
                      <Label className='text-sm font-medium text-black'>
                        Facilities
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., Drying, Grinding, Extraction'
                        value={getInputValue('facilities')}
                        onChange={(e) => handleInputChange('facilities', e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>
                        Separate with commas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

          case 'manufacturer':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Manufacturing company name'
                        value={getInputValue('company_name')}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Phone Number *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Phone number'
                        value={formData.phone_number || ''}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='company@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        License Number
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='License number'
                        value={getInputValue('license_no')}
                        onChange={(e) => handleInputChange('license_no', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        GMP Certified
                      </Label>
                      <select
                        className='w-full h-8 px-3 py-1 border border-gray-200 rounded-md focus:border-green-600 focus:ring-green-600 bg-transparent'
                        value={formData.gmp_certified || ''}
                        onChange={(e) => handleInputChange('gmp_certified', e.target.value)}
                      >
                        <option value=''>Select GMP Status</option>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                    <div className='space-y-1 lg:col-span-2'>
                      <Label className='text-sm font-medium text-black'>
                        Address *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Complete address'
                        value={getInputValue('address')}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            );

          case 'packer':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Packing company name'
                        value={getInputValue('company_name')}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Phone Number *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Phone number'
                        value={formData.phone_number || ''}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='company@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        License Number
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='License number'
                        value={getInputValue('license_no')}
                        onChange={(e) => handleInputChange('license_no', e.target.value)}
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Location
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Packing facility location'
                        value={getInputValue('location')}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );

          case 'storage':
            return (
              <div className='space-y-4'>
                {/* Required Fields */}
                <div className='space-y-3'>
                  <h4 className='text-base font-medium text-black border-b border-gray-200 pb-1'>
                    Required Information
                  </h4>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Profile ID *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Enter unique profile ID'
                        value={formData.profile_id || ''}
                        onChange={(e) => handleInputChange('profile_id', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Facility Name *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Storage facility name'
                        value={getInputValue('facility_name')}
                        onChange={(e) => handleInputChange('facility_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Location *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='Storage facility location'
                        value={getInputValue('location')}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Company Email *
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='company@example.com'
                        type='email'
                        value={formData.company_email || ''}
                        onChange={(e) => handleInputChange('company_email', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-sm font-medium text-black'>
                        Certification Status
                      </Label>
                      <Input
                        className='border-gray-200 focus:border-green-600 focus:ring-green-600 h-8'
                        placeholder='e.g., ISO 9001, FSSAI'
                        value={getInputValue('certification_status')}
                        onChange={(e) => handleInputChange('certification_status', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return (
              <div className='text-center py-8'>
                <p className='text-gray-600'>
                  Please select a valid role to continue.
                </p>
              </div>
            );
        }
      };

      const selectedRoleData = roles.find(r => r.id === selectedRole);

      return (
        <div className='h-full flex flex-col'>
          <div className='mb-6'>
            <button
              onClick={() => setCurrentStepWithURL(1)}
              className='flex items-center text-gray-600 hover:text-black transition-colors mb-4'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Role Selection
            </button>
            <div className='flex items-center space-x-4 mb-4'>
              <div className='text-3xl'>{selectedRoleData?.icon}</div>
              <div>
                <h2 className='text-2xl font-light text-black'>
                  {selectedRoleData?.name} Profile
                </h2>
                <p className='text-gray-600 font-light'>
                  {selectedRoleData?.desc}
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 flex items-center justify-center'>
            <div className='w-full max-w-4xl bg-white border border-gray-200 rounded-lg p-6'>
              <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                <div className='flex items-start space-x-2'>
                  <div className='w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-xs'>ℹ</span>
                  </div>
                  <div>
                    <h4 className='text-xs font-medium text-green-800 mb-1'>
                      Profile Creation Guidelines
                    </h4>
                    <p className='text-xs text-green-700'>
                      Fields marked with <span className='font-medium'>*</span>{' '}
                      are required. Optional fields can be filled later or left
                      blank. Array fields (like certifications) should be
                      separated by commas.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {getRoleForm()}

                <div className='flex justify-between pt-4 border-t border-gray-200'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setCurrentStepWithURL(1)}
                    className='border-gray-300 hover:bg-gray-50 px-6'
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-green-600 hover:bg-green-700 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Creating Profile...
                      </>
                    ) : (
                      <>
                        <CheckCircle className='w-4 h-4 mr-2' />
                        Create {selectedRoleData?.name} Profile
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='min-h-screen w-full relative text-gray-900'>
      {/* Simplified Background Pattern */}
      <div
        className='absolute inset-0 z-0 bg-gray-50/30'
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className='flex h-screen relative z-10'>
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-[width] duration-200 ease-out will-change-[width]`}
        >
          {/* Logo & Toggle */}
          <div
            className={`${sidebarCollapsed ? 'p-4' : 'p-6'} border-b border-gray-100 transition-all duration-200 ease-out`}
          >
            <div
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              {sidebarCollapsed ? (
                <div className='flex flex-col items-center space-y-2'>
                  <Image
                    src='/logo.png'
                    alt='Herbtrace'
                    width={32}
                    height={32}
                    className='w-8 h-8'
                  />
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className='p-1 rounded-md hover:bg-gray-100 transition-colors'
                  >
                    <ChevronLeft className='w-3 h-3 text-gray-600 transition-transform duration-200 rotate-180' />
                  </button>
                </div>
              ) : (
                <>
                  <div className='flex items-center space-x-3'>
                    <Image
                      src='/logo.png'
                      alt='Herbtrace'
                      width={32}
                      height={32}
                      className='w-8 h-8'
                    />
                    <span className='text-xl font-semibold text-black'>
                      Herbtrace
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'
                  >
                    <ChevronLeft className='w-4 h-4 text-gray-600 transition-transform duration-200' />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 space-y-2'>
            {sidebarItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center ${
                  sidebarCollapsed
                    ? 'justify-center px-2 py-3'
                    : 'space-x-3 px-3 py-2'
                } rounded-md text-sm font-medium transition-all duration-200 ${
                  item.id === 'create-profile'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200 ease-out flex-shrink-0`} />
                <span
                  className={`transition-opacity duration-200 ease-out ${
                    sidebarCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className='p-4 border-t border-gray-100'>
            {sidebarCollapsed ? (
              <div className='flex flex-col items-center space-y-3'>
                <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm font-medium'>U</span>
                </div>
                <Link href='/' className='block'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-8 h-8 p-0 text-xs'
                    title='Sign Out'
                  >
                    <LogOut className='w-4 h-4' />
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>U</span>
                  </div>
                  <div
                    className={`flex-1 transition-opacity duration-200 ease-out ${
                      sidebarCollapsed
                        ? 'opacity-0 w-0 overflow-hidden'
                        : 'opacity-100'
                    }`}
                  >
                    <p className='text-sm font-medium text-black'>
                      Supply Chain Manager
                    </p>
                    <p className='text-xs text-gray-500'>scm@example.com</p>
                  </div>
                </div>
                <Link
                  href='/'
                  className={`mt-3 block transition-opacity duration-200 ease-out ${
                    sidebarCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100'
                  }`}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full text-xs font-light'
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 overflow-auto'>
          <div className='p-8'>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
