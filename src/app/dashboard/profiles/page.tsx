'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiService, type ProfileData } from '@/services/api';

// Utility function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}/${year}`;
};

const formatDateLong = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

// Extended interface for our UI profile data
interface UIProfile {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'pending';
  joinDate: string;
  details: Record<string, string | boolean | string[] | number>;
}

// Realistic dummy profile data
const dummyProfiles = [
  {
    id: 'PRF-2024-001',
    role: 'farmer',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@farm.com',
    phone: '+91 98765 43210',
    location: 'Himachal Pradesh, India',
    status: 'active',
    joinDate: '2024-01-15',
    details: {
      farmSize: '25 acres',
      crops: ['Ashwagandha', 'Turmeric', 'Brahmi'],
      organicCertified: true,
      aadharNumber: '****-****-8547',
    },
  },
  {
    id: 'PRF-2024-002',
    role: 'wild_collector',
    name: 'Priya Sharma',
    email: 'priya.sharma@collector.com',
    phone: '+91 87654 32109',
    location: 'Kerala, India',
    status: 'active',
    joinDate: '2024-02-08',
    details: {
      collectionAreas: ['Western Ghats', 'Silent Valley'],
      specializations: ['Rare Herbs', 'Medicinal Roots'],
      licenseNumber: 'WC-KL-2024-0089',
      experience: '8 years',
    },
  },
  {
    id: 'PRF-2024-003',
    role: 'processor',
    name: 'Ayurvedic Processing Ltd.',
    email: 'contact@ayuprocess.com',
    phone: '+91 76543 21098',
    location: 'Gujarat, India',
    status: 'active',
    joinDate: '2024-01-22',
    details: {
      facilitySize: '50,000 sq ft',
      certifications: ['ISO 22000', 'HACCP', 'Organic India'],
      capacity: '500 tons/month',
      specialties: ['Powder Processing', 'Extract Manufacturing'],
    },
  },
  {
    id: 'PRF-2024-004',
    role: 'laboratory',
    name: 'Herbal Testing Labs',
    email: 'admin@herbaltesting.com',
    phone: '+91 65432 10987',
    location: 'Maharashtra, India',
    status: 'active',
    joinDate: '2024-02-14',
    details: {
      accreditation: 'NABL Accredited',
      testTypes: ['Potency', 'Contamination', 'Authenticity'],
      equipmentLevel: 'Advanced HPLC/MS',
      turnaroundTime: '3-5 days',
    },
  },
  {
    id: 'PRF-2024-005',
    role: 'manufacturer',
    name: "Nature's Medicine Co.",
    email: 'info@naturesmedicine.com',
    phone: '+91 54321 09876',
    location: 'Tamil Nadu, India',
    status: 'pending',
    joinDate: '2024-03-01',
    details: {
      productLines: ['Tablets', 'Capsules', 'Liquid Extracts'],
      gmpCertified: true,
      capacity: '1M units/month',
      exportMarkets: ['USA', 'Europe', 'Canada'],
    },
  },
  {
    id: 'PRF-2024-006',
    role: 'packer',
    name: 'Eco Pack Solutions',
    email: 'orders@ecopack.com',
    phone: '+91 43210 98765',
    location: 'Karnataka, India',
    status: 'active',
    joinDate: '2024-02-25',
    details: {
      packagingTypes: ['Eco-friendly', 'Vacuum Sealed', 'Bulk'],
      certifications: ['Food Grade', 'Export Quality'],
      capacity: '10,000 units/day',
      sustainabilityScore: '95%',
    },
  },
  {
    id: 'PRF-2024-007',
    role: 'storage',
    name: 'ColdChain Storage Pvt Ltd',
    email: 'admin@coldchain.com',
    phone: '+91 32109 87654',
    location: 'Punjab, India',
    status: 'active',
    joinDate: '2024-01-30',
    details: {
      storageCapacity: '10,000 cubic meters',
      temperatureControl: '2°C to 25°C',
      certifications: ['FSSAI', 'APEDA'],
      facilities: ['Cold Storage', 'Controlled Atmosphere', 'Dry Storage'],
    },
  },
  {
    id: 'PRF-2024-008',
    role: 'farmer',
    name: 'Green Valley Organics',
    email: 'info@greenvalley.com',
    phone: '+91 21098 76543',
    location: 'Uttarakhand, India',
    status: 'active',
    joinDate: '2024-02-18',
    details: {
      farmSize: '45 acres',
      crops: ['Tulsi', 'Neem', 'Amla', 'Moringa'],
      organicCertified: true,
      irrigation: 'Drip Irrigation',
    },
  },
];

const roleConfig = {
  farmer: { name: 'Farmer', icon: '🌱', color: 'bg-green-100 text-green-600' },
  wild_collector: {
    name: 'Wild Collector',
    icon: '🌿',
    color: 'bg-emerald-100 text-emerald-600',
  },
  processor: {
    name: 'Processor',
    icon: '⚙️',
    color: 'bg-blue-100 text-blue-600',
  },
  laboratory: {
    name: 'Laboratory',
    icon: '🔬',
    color: 'bg-purple-100 text-purple-600',
  },
  manufacturer: {
    name: 'Manufacturer',
    icon: '🏭',
    color: 'bg-orange-100 text-orange-600',
  },
  packer: { name: 'Packer', icon: '📦', color: 'bg-amber-100 text-amber-600' },
  storage: { name: 'Storage', icon: '🏪', color: 'bg-cyan-100 text-cyan-600' },
};

export default function ProfilesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [profiles, setProfiles] = useState<UIProfile[]>(dummyProfiles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UIProfile | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UIProfile>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  useEffect(() => {
    loadProfiles();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from API first
      const apiProfiles = await ApiService.getAllProfiles();

      // Transform API profiles to match our UI format
      const transformedProfiles = apiProfiles.map(
        (profile: ProfileData, index: number) => {
          const baseProfile = {
            id: `PRF-2024-${String(index + 1).padStart(3, '0')}`,
            role: profile.role,
            status: 'active' as const,
            joinDate: '2024-01-15',
          };

          switch (profile.role) {
            case 'farmer':
              return {
                ...baseProfile,
                name: profile.name,
                email: 'farmer@example.com',
                phone: profile.phone_number,
                location: profile.location.address,
                details: {
                  farmSize: '25 acres',
                  crops: profile.registered_crops || [],
                  organicCertified: true,
                  aadharNumber: profile.aadhar_number
                    ? `****-****-${profile.aadhar_number.slice(-4)}`
                    : 'N/A',
                },
              };
            case 'wild_collector':
              return {
                ...baseProfile,
                name: profile.name,
                email: profile.company_email,
                phone: profile.phone_number,
                location: profile.location.address,
                details: {
                  collectionAreas: [profile.area_assigned || 'Not specified'],
                  specializations: profile.registered_species || [],
                  licenseNumber: profile.license_no || 'N/A',
                  experience: '8 years',
                },
              };
            case 'processor':
              return {
                ...baseProfile,
                name: profile.company_name,
                email: profile.company_email,
                phone: profile.phone_number,
                location: profile.address,
                details: {
                  facilitySize: '50,000 sq ft',
                  certifications: profile.certification_status || [],
                  capacity: '500 tons/month',
                  specialties: profile.facilities || [],
                },
              };
            case 'laboratory':
              return {
                ...baseProfile,
                name: profile.company_name,
                email: profile.company_email,
                phone: profile.phone_number,
                location: profile.location,
                details: {
                  accreditation: profile.accreditation_no || 'NABL Accredited',
                  testTypes: profile.test_capabilities || [],
                  equipmentLevel: 'Advanced HPLC/MS',
                  turnaroundTime: '3-5 days',
                },
              };
            case 'manufacturer':
              return {
                ...baseProfile,
                name: profile.name,
                email: profile.company_email,
                phone: profile.phone_number,
                location: profile.address,
                details: {
                  productLines: ['Tablets', 'Capsules', 'Liquid Extracts'],
                  gmpCertified: profile.GMP_certified || false,
                  capacity: '1M units/month',
                  exportMarkets: ['USA', 'Europe', 'Canada'],
                },
              };
            case 'packer':
              return {
                ...baseProfile,
                name: profile.name,
                email: profile.company_email,
                phone: profile.phone_number,
                location: profile.location || 'Not specified',
                details: {
                  packagingTypes: ['Eco-friendly', 'Vacuum Sealed', 'Bulk'],
                  certifications: ['Food Grade', 'Export Quality'],
                  capacity: '10,000 units/day',
                  sustainabilityScore: '95%',
                },
              };
            case 'storage':
              return {
                ...baseProfile,
                name: profile.facility_name,
                email: profile.company_email,
                phone: 'Not provided',
                location: profile.location,
                details: {
                  storageCapacity: '10,000 cubic meters',
                  temperatureControl: '2°C to 25°C',
                  certifications: [profile.cert_status || 'FSSAI'],
                  facilities: [
                    'Cold Storage',
                    'Controlled Atmosphere',
                    'Dry Storage',
                  ],
                },
              };
            default:
              return baseProfile;
          }
        }
      );

      setProfiles(transformedProfiles);
    } catch (error) {
      console.error('Failed to load profiles from API:', error);
      setError('Failed to load profiles from server. Using sample data.');
      // Use dummy data as fallback
      setProfiles(dummyProfiles);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (profile: UIProfile) => {
    setSelectedProfile(profile);
    setEditFormData({ ...profile });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      setActionLoading(true);
      setError(null);

      // Try to update via API first
      try {
        await ApiService.updateProfile(selectedProfile.id, editFormData);

        // Update local state
        setProfiles(prevProfiles =>
          prevProfiles.map(p =>
            p.id === selectedProfile.id ? { ...editFormData } : p
          )
        );

        setSelectedProfile({ ...editFormData });
        setIsEditing(false);

        // Show success message
        setError(null);
      } catch (apiError) {
        console.error('API update failed:', apiError);

        // Update local state anyway for demo purposes
        setProfiles(prevProfiles =>
          prevProfiles.map(p =>
            p.id === selectedProfile.id ? { ...editFormData } : p
          )
        );

        setSelectedProfile({ ...editFormData });
        setIsEditing(false);
        setError('Profile updated locally (API not available)');
      }
    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save profile changes');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (profileId: string) => {
    try {
      setActionLoading(true);
      setError(null);

      // Find the profile and toggle its status
      const profileToUpdate = profiles.find(p => p.id === profileId);
      if (!profileToUpdate) return;

      const newStatus = profileToUpdate.status === 'active' ? 'pending' : 'active';
      const updatedProfile = { ...profileToUpdate, status: newStatus };

      // Try to update via API first
      try {
        await ApiService.updateProfile(profileId, { status: newStatus });

        // Update local state
        setProfiles(prevProfiles =>
          prevProfiles.map(p => p.id === profileId ? updatedProfile : p)
        );

        // Update selected profile if it's the same
        if (selectedProfile?.id === profileId) {
          setSelectedProfile(updatedProfile);
        }

        // Add audit log entry
        const auditEntry = {
          id: Date.now().toString(),
          action: 'Status Changed',
          description: `Profile status changed from ${profileToUpdate.status} to ${newStatus}`,
          timestamp: new Date().toISOString(),
          user: 'Supply Chain Manager'
        };
        setAuditLogs(prev => [auditEntry, ...prev]);

        setError(null);
      } catch (apiError) {
        console.error('API update failed:', apiError);

        // Update local state anyway for demo purposes
        setProfiles(prevProfiles =>
          prevProfiles.map(p => p.id === profileId ? updatedProfile : p)
        );

        if (selectedProfile?.id === profileId) {
          setSelectedProfile(updatedProfile);
        }

        setError('Status updated locally (API not available)');
      }
    } catch (error) {
      console.error('Toggle status failed:', error);
      setError('Failed to update profile status');
    } finally {
      setActionLoading(false);
      setIsDropdownOpen(null);
    }
  };

  const handleDuplicateProfile = async (profileId: string) => {
    try {
      setActionLoading(true);
      setError(null);

      const originalProfile = profiles.find(p => p.id === profileId);
      if (!originalProfile) return;

      // Create a duplicate with modified ID and name
      const duplicateProfile = {
        ...originalProfile,
        id: `${originalProfile.id}-COPY-${Date.now()}`,
        name: `${originalProfile.name} (Copy)`,
        email: originalProfile.email.replace('@', '+copy@'),
        status: 'pending' as const,
        joinDate: new Date().toISOString().split('T')[0]
      };

      // Try to create via API first
      try {
        // Note: In real implementation, you'd transform back to ProfileData format
        // For now, we'll just update local state
        setProfiles(prevProfiles => [duplicateProfile, ...prevProfiles]);

        // Add audit log entry
        const auditEntry = {
          id: Date.now().toString(),
          action: 'Profile Duplicated',
          description: `Profile duplicated with new ID: ${duplicateProfile.id}`,
          timestamp: new Date().toISOString(),
          user: 'Supply Chain Manager'
        };
        setAuditLogs(prev => [auditEntry, ...prev]);

        setError('Profile duplicated successfully');
      } catch (apiError) {
        console.error('API creation failed:', apiError);

        // Update local state anyway for demo purposes
        setProfiles(prevProfiles => [duplicateProfile, ...prevProfiles]);
        setError('Profile duplicated locally (API not available)');
      }
    } catch (error) {
      console.error('Duplicate failed:', error);
      setError('Failed to duplicate profile');
    } finally {
      setActionLoading(false);
      setIsDropdownOpen(null);
    }
  };

  const handleExportProfile = (profileId: string, format: 'json' | 'csv') => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      if (!profile) return;

      let content: string;
      let filename: string;
      let mimeType: string;

      if (format === 'json') {
        content = JSON.stringify(profile, null, 2);
        filename = `profile-${profile.id}.json`;
        mimeType = 'application/json';
      } else {
        // CSV format
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Location', 'Role', 'Status', 'Join Date'];
        const values = [
          profile.id,
          profile.name,
          profile.email,
          profile.phone,
          profile.location,
          profile.role,
          profile.status,
          profile.joinDate
        ];

        // Add details as additional columns
        if (profile.details) {
          Object.entries(profile.details).forEach(([key, value]) => {
            headers.push(key);
            values.push(Array.isArray(value) ? value.join('; ') : String(value));
          });
        }

        content = [headers.join(','), values.map(v => `"${v}"`).join(',')].join('\n');
        filename = `profile-${profile.id}.csv`;
        mimeType = 'text/csv';
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Add audit log entry
      const auditEntry = {
        id: Date.now().toString(),
        action: 'Profile Exported',
        description: `Profile exported as ${format.toUpperCase()} format`,
        timestamp: new Date().toISOString(),
        user: 'Supply Chain Manager'
      };
      setAuditLogs(prev => [auditEntry, ...prev]);

      setError(`Profile exported successfully as ${filename}`);
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export profile');
    } finally {
      setIsDropdownOpen(null);
      setShowExportModal(false);
    }
  };

  const handleViewAuditLog = (profileId: string) => {
    // In a real implementation, you'd fetch audit logs for this specific profile
    // For now, we'll show the general audit logs
    const profileAuditLogs = auditLogs.filter(log =>
      log.description.includes(profileId) || log.description.includes('profile')
    );

    if (profileAuditLogs.length === 0) {
      // Add some sample audit logs
      const sampleLogs = [
        {
          id: `${Date.now()}-1`,
          action: 'Profile Created',
          description: `Profile ${profileId} was created`,
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          user: 'System'
        },
        {
          id: `${Date.now()}-2`,
          action: 'Profile Viewed',
          description: `Profile ${profileId} details viewed`,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          user: 'Supply Chain Manager'
        }
      ];
      setAuditLogs(prev => [...sampleLogs, ...prev]);
    }

    setShowAuditLog(true);
    setIsDropdownOpen(null);
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this profile? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      // Try to delete via API first
      try {
        await ApiService.deleteProfile(profileId);

        // Remove from local state
        setProfiles(prevProfiles =>
          prevProfiles.filter(p => p.id !== profileId)
        );

        // Close modal if deleting currently viewed profile
        if (selectedProfile?.id === profileId) {
          setIsModalOpen(false);
          setSelectedProfile(null);
        }

        // Add audit log entry
        const auditEntry = {
          id: Date.now().toString(),
          action: 'Profile Deleted',
          description: `Profile ${profileId} was permanently deleted`,
          timestamp: new Date().toISOString(),
          user: 'Supply Chain Manager'
        };
        setAuditLogs(prev => [auditEntry, ...prev]);

        setError(null);
      } catch (apiError) {
        console.error('API delete failed:', apiError);

        // Remove from local state anyway for demo purposes
        setProfiles(prevProfiles =>
          prevProfiles.filter(p => p.id !== profileId)
        );

        if (selectedProfile?.id === profileId) {
          setIsModalOpen(false);
          setSelectedProfile(null);
        }

        setError('Profile deleted locally (API not available)');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      setError('Failed to delete profile');
    } finally {
      setActionLoading(false);
      setIsDropdownOpen(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDetailInputChange = (
    section: string,
    field: string,
    value: string | boolean | string[]
  ) => {
    setEditFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value,
      },
    }));
  };

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/dashboard/overview',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <rect
            x='3'
            y='3'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='14'
            y='3'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='14'
            y='14'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='3'
            y='14'
            width='7'
            height='7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      id: 'profiles',
      label: 'All Profiles',
      href: '/dashboard/profiles',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='9'
            cy='7'
            r='4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23 21v-2a4 4 0 0 0-3-3.87'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16 3.13a4 4 0 0 1 0 7.75'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      id: 'create-profile',
      label: 'Create Profile',
      href: '/dashboard/profile-creation',
      icon: (
        <svg
          className='w-full h-full'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='9'
            cy='7'
            r='4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <line
            x1='19'
            y1='8'
            x2='19'
            y2='14'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <line
            x1='22'
            y1='11'
            x2='16'
            y2='11'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
  ];

  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || profile.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' || profile.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: profiles.length,
    active: profiles.filter(p => p.status === 'active').length,
    pending: profiles.filter(p => p.status === 'pending').length,
    byRole: Object.keys(roleConfig).reduce(
      (acc, role) => {
        acc[role] = profiles.filter(p => p.role === role).length;
        return acc;
      },
      {} as Record<string, number>
    ),
  };

  return (
    <div className='min-h-screen w-full relative text-gray-900'>
      {/* Dashed Gradient Background */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <div className='flex h-screen relative z-10'>
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-out will-change-[width]`}
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
                    <svg
                      className='w-3 h-3 text-gray-600 transition-transform duration-200 rotate-180'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                      />
                    </svg>
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
                    <svg
                      className='w-4 h-4 text-gray-600 transition-transform duration-200'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                      />
                    </svg>
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
                  item.id === 'profiles'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div
                  className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200 ease-out flex-shrink-0`}
                >
                  {item.icon}
                </div>
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
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
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
          <div className='p-8'>
            <div className='space-y-6'>
              {/* Header */}
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-light text-black mb-2'>
                    All Profiles
                  </h2>
                  <p className='text-gray-600 font-light'>
                    Manage all registered supply chain participants
                  </p>
                  {error && (
                    <div className='mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-700 text-sm'>
                      ⚠️ {error}
                    </div>
                  )}
                </div>
                <div className='flex items-center space-x-3'>
                  <Button
                    variant='outline'
                    onClick={loadProfiles}
                    disabled={loading}
                    className='text-sm'
                  >
                    {loading ? (
                      <div className='w-4 h-4 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin mr-2' />
                    ) : (
                      <svg
                        className='w-4 h-4 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        />
                      </svg>
                    )}
                    Refresh
                  </Button>
                  <Link href='/dashboard/profile-creation'>
                    <Button className='bg-green-600 hover:bg-green-700 text-white border-0'>
                      <svg
                        className='w-4 h-4 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                      Create Profile
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='bg-white border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Total Profiles
                      </p>
                      <p className='text-2xl font-light text-black'>
                        {stats.total}
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                      <span className='text-gray-600 text-sm'>👥</span>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Active
                      </p>
                      <p className='text-2xl font-light text-black'>
                        {stats.active}
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <span className='text-green-600 text-sm'>✓</span>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Pending
                      </p>
                      <p className='text-2xl font-light text-black'>
                        {stats.pending}
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center'>
                      <span className='text-amber-600 text-sm'>⏳</span>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        This Month
                      </p>
                      <p className='text-2xl font-light text-black'>3</p>
                    </div>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                      <span className='text-blue-600 text-sm'>📈</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className='bg-white border border-gray-200 rounded-lg p-6'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <Input
                      placeholder='Search profiles by name, email, or ID...'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='border-gray-200 focus:border-green-600 focus:ring-green-600'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <select
                      value={filterRole}
                      onChange={e => setFilterRole(e.target.value)}
                      className='px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-green-600 focus:ring-green-600'
                    >
                      <option value='all'>All Roles</option>
                      {Object.entries(roleConfig).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className='px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-green-600 focus:ring-green-600'
                    >
                      <option value='all'>All Status</option>
                      <option value='active'>Active</option>
                      <option value='pending'>Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Profiles Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredProfiles.map(profile => {
                  const roleInfo =
                    roleConfig[profile.role as keyof typeof roleConfig];
                  return (
                    <div
                      key={profile.id}
                      className='bg-white border border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors'
                    >
                      <div className='flex items-start justify-between mb-4'>
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${roleInfo.color}`}
                          >
                            <span className='text-lg'>{roleInfo.icon}</span>
                          </div>
                          <div>
                            <h3 className='font-medium text-black'>
                              {profile.name}
                            </h3>
                            <p className='text-xs text-gray-500'>
                              {profile.id}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            profile.status === 'active'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-amber-100 text-amber-600'
                          }`}
                        >
                          {profile.status}
                        </span>
                      </div>

                      <div className='space-y-2 mb-4'>
                        <div className='flex items-center space-x-2 text-sm'>
                          <span className='text-gray-500'>Role:</span>
                          <span className='text-black font-medium'>
                            {roleInfo.name}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm'>
                          <span className='text-gray-500'>Email:</span>
                          <span className='text-black'>{profile.email}</span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm'>
                          <span className='text-gray-500'>Phone:</span>
                          <span className='text-black'>{profile.phone}</span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm'>
                          <span className='text-gray-500'>Location:</span>
                          <span className='text-black'>{profile.location}</span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm'>
                          <span className='text-gray-500'>Joined:</span>
                          <span className='text-black'>
                            {formatDate(profile.joinDate)}
                          </span>
                        </div>
                      </div>

                      <div className='pt-4 border-t border-gray-100'>
                        <div className='flex justify-between items-center'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-xs'
                            onClick={() => handleViewDetails(profile)}
                          >
                            View Details
                          </Button>
                          <div className='flex space-x-1'>
                            <button
                              className='p-1 hover:bg-gray-100 rounded'
                              onClick={() => handleViewDetails(profile)}
                              title='Edit Profile'
                            >
                              <svg
                                className='w-4 h-4 text-gray-500'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                />
                              </svg>
                            </button>
                            <div className='relative'>
                              <button
                                className='p-1 hover:bg-gray-100 rounded'
                                onClick={() =>
                                  setIsDropdownOpen(
                                    isDropdownOpen === profile.id
                                      ? null
                                      : profile.id
                                  )
                                }
                                title='More Actions'
                              >
                                <svg
                                  className='w-4 h-4 text-gray-500'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                  />
                                </svg>
                              </button>

                              {isDropdownOpen === profile.id && (
                                <div className='absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                  <div className='py-1'>
                                    <button
                                      onClick={() => {
                                        handleViewDetails(profile);
                                        setIsDropdownOpen(null);
                                      }}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/>
                                      </svg>
                                      <span>View Details</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleViewDetails(profile);
                                        setTimeout(() => setIsEditing(true), 100);
                                        setIsDropdownOpen(null);
                                      }}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'/>
                                      </svg>
                                      <span>Edit Profile</span>
                                    </button>

                                    <div className='border-t border-gray-100 my-1'></div>

                                    <button
                                      onClick={() => handleToggleStatus(profile.id)}
                                      disabled={actionLoading}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'/>
                                      </svg>
                                      <span>Toggle Status ({profile.status === 'active' ? 'Set Pending' : 'Set Active'})</span>
                                    </button>

                                    <button
                                      onClick={() => handleDuplicateProfile(profile.id)}
                                      disabled={actionLoading}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'/>
                                      </svg>
                                      <span>Duplicate Profile</span>
                                    </button>

                                    <button
                                      onClick={() => {
                                        setShowExportModal(true);
                                        setIsDropdownOpen(null);
                                      }}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/>
                                      </svg>
                                      <span>Export Profile</span>
                                    </button>

                                    <button
                                      onClick={() => handleViewAuditLog(profile.id)}
                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/>
                                      </svg>
                                      <span>View Audit Log</span>
                                    </button>

                                    <div className='border-t border-gray-100 my-1'></div>

                                    <button
                                      onClick={() => handleDeleteProfile(profile.id)}
                                      disabled={actionLoading}
                                      className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50'
                                    >
                                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/>
                                      </svg>
                                      <span>{actionLoading ? 'Deleting...' : 'Delete Profile'}</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProfiles.length === 0 && (
                <div className='text-center py-12'>
                  <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-gray-400 text-2xl'>👥</span>
                  </div>
                  <h3 className='text-lg font-medium text-black mb-2'>
                    No profiles found
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    Try adjusting your search or filter criteria.
                  </p>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSearchTerm('');
                      setFilterRole('all');
                      setFilterStatus('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-black'>Export Profile</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12'/>
                </svg>
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <Label className='text-sm font-medium text-gray-700'>Export Format</Label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                >
                  <option value='json'>JSON (.json)</option>
                  <option value='csv'>CSV (.csv)</option>
                </select>
              </div>

              <div className='bg-gray-50 rounded-lg p-3'>
                <p className='text-sm text-gray-600'>
                  {exportFormat === 'json'
                    ? 'Export as JSON file with complete profile data structure.'
                    : 'Export as CSV file suitable for spreadsheet applications.'}
                </p>
              </div>

              <div className='flex space-x-3'>
                <Button
                  variant='outline'
                  onClick={() => setShowExportModal(false)}
                  className='flex-1'
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const profileId = profiles.find(p => isDropdownOpen === p.id)?.id || profiles[0]?.id;
                    if (profileId) handleExportProfile(profileId, exportFormat);
                  }}
                  className='flex-1 bg-green-600 hover:bg-green-700 text-white'
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {showAuditLog && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
              <h3 className='text-lg font-medium text-black'>Audit Log</h3>
              <button
                onClick={() => setShowAuditLog(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12'/>
                </svg>
              </button>
            </div>

            <div className='p-6 overflow-y-auto max-h-[60vh]'>
              {auditLogs.length === 0 ? (
                <div className='text-center py-8'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/>
                    </svg>
                  </div>
                  <p className='text-gray-500'>No audit logs available</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {auditLogs.map((log) => (
                    <div key={log.id} className='border border-gray-200 rounded-lg p-4'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm font-medium text-black'>{log.action}</span>
                        <span className='text-xs text-gray-500'>
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 mb-2'>{log.description}</p>
                      <p className='text-xs text-gray-500'>by {log.user}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      {isModalOpen && selectedProfile && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${roleConfig[selectedProfile.role as keyof typeof roleConfig]?.color}`}
                >
                  <span className='text-2xl'>
                    {
                      roleConfig[
                        selectedProfile.role as keyof typeof roleConfig
                      ]?.icon
                    }
                  </span>
                </div>
                <div>
                  <h2 className='text-xl font-medium text-black'>
                    {selectedProfile.name}
                  </h2>
                  <p className='text-sm text-gray-600'>
                    {
                      roleConfig[
                        selectedProfile.role as keyof typeof roleConfig
                      ]?.name
                    }{' '}
                    • {selectedProfile.id}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                {!isEditing ? (
                  <Button
                    onClick={handleEditProfile}
                    className='bg-green-600 hover:bg-green-700 text-white'
                  >
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                    Edit Profile
                  </Button>
                ) : (
                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      onClick={() => setIsEditing(false)}
                      disabled={actionLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={actionLoading}
                      className='bg-green-600 hover:bg-green-700 text-white'
                    >
                      {actionLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProfile(null);
                    setIsEditing(false);
                  }}
                  className='p-2 hover:bg-gray-100 rounded-full'
                >
                  <svg
                    className='w-5 h-5 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className='p-6 space-y-6'>
              {/* Basic Information */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-black mb-4'>
                  Basic Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Name
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editFormData.name || ''}
                        onChange={e =>
                          handleInputChange('name', e.target.value)
                        }
                        className='mt-1'
                      />
                    ) : (
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedProfile.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editFormData.email || ''}
                        onChange={e =>
                          handleInputChange('email', e.target.value)
                        }
                        className='mt-1'
                        type='email'
                      />
                    ) : (
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedProfile.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editFormData.phone || ''}
                        onChange={e =>
                          handleInputChange('phone', e.target.value)
                        }
                        className='mt-1'
                      />
                    ) : (
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedProfile.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editFormData.location || ''}
                        onChange={e =>
                          handleInputChange('location', e.target.value)
                        }
                        className='mt-1'
                      />
                    ) : (
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedProfile.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Role
                    </Label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {
                        roleConfig[
                          selectedProfile.role as keyof typeof roleConfig
                        ]?.name
                      }
                    </p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Status
                    </Label>
                    <div className='mt-1'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedProfile.status === 'active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        {selectedProfile.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-Specific Details */}
              {selectedProfile.details && (
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='text-lg font-medium text-black mb-4'>
                    {
                      roleConfig[
                        selectedProfile.role as keyof typeof roleConfig
                      ]?.name
                    }{' '}
                    Details
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {Object.entries(selectedProfile.details).map(
                      ([key, value]) => (
                        <div key={key}>
                          <Label className='text-sm font-medium text-gray-700 capitalize'>
                            {key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, str => str.toUpperCase())}
                          </Label>
                          {isEditing ? (
                            Array.isArray(value) ? (
                              <Input
                                value={
                                  editFormData.details?.[key]?.join(', ') || ''
                                }
                                onChange={e =>
                                  handleDetailInputChange(
                                    'details',
                                    key,
                                    e.target.value.split(', ').filter(Boolean)
                                  )
                                }
                                className='mt-1'
                                placeholder='Separate with commas'
                              />
                            ) : typeof value === 'boolean' ? (
                              <select
                                value={
                                  editFormData.details?.[key]?.toString() || ''
                                }
                                onChange={e =>
                                  handleDetailInputChange(
                                    'details',
                                    key,
                                    e.target.value === 'true'
                                  )
                                }
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                              >
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                              </select>
                            ) : (
                              <Input
                                value={editFormData.details?.[key] || ''}
                                onChange={e =>
                                  handleDetailInputChange(
                                    'details',
                                    key,
                                    e.target.value
                                  )
                                }
                                className='mt-1'
                              />
                            )
                          ) : (
                            <p className='mt-1 text-sm text-gray-900'>
                              {Array.isArray(value)
                                ? value.join(', ')
                                : typeof value === 'boolean'
                                  ? value
                                    ? 'Yes'
                                    : 'No'
                                  : value}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-black mb-4'>
                  System Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Profile ID
                    </Label>
                    <p className='mt-1 text-sm text-gray-900 font-mono'>
                      {selectedProfile.id}
                    </p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Join Date
                    </Label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {formatDateLong(selectedProfile.joinDate)}
                    </p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>
                      Last Updated
                    </Label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {formatDateLong(new Date().toISOString())}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
