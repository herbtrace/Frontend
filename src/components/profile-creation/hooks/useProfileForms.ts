import { useState } from 'react';
import type {
  FarmerData,
  WildCollectorData,
  ProcessorData,
  LaboratoryData,
  ManufacturerData,
  PackerData,
  StorageData,
  User
} from '../types';

export const useProfileForms = (user: User | null) => {
  const [farmerData, setFarmerData] = useState<FarmerData>({
    farmer_id: '',
    name: '',
    phone_number: '',
    location: { lat: 0, long: 0, address: '' },
    land_records: '',
    certifications: [],
    registered_crops: [],
    aadhar_number: ''
  });

  const [wildCollectorData, setWildCollectorData] = useState<WildCollectorData>({
    wild_collector_id: '',
    name: '',
    phone_number: '',
    location: { lat: 0, long: 0, address: '' },
    license_no: '',
    area_assigned: '',
    certifications: [],
    company_email: user?.email || '',
    registered_species: []
  });

  const [processorData, setProcessorData] = useState<ProcessorData>({
    processor_id: '',
    company_name: '',
    authority_name: '',
    address: '',
    license_no: '',
    responsible_person: '',
    certification_status: [],
    facilities: [],
    company_email: user?.email || '',
    phone_number: ''
  });

  const [laboratoryData, setLaboratoryData] = useState<LaboratoryData>({
    lab_id: '',
    company_name: '',
    location: '',
    accreditation_no: '',
    test_capabilities: [],
    company_email: user?.email || '',
    ayush_certificate: [],
    phone_number: ''
  });

  const [manufacturerData, setManufacturerData] = useState<ManufacturerData>({
    manufacturer_id: '',
    name: '',
    address: '',
    license_no: '',
    GMP_certified: false,
    company_email: user?.email || '',
    phone_number: ''
  });

  const [packerData, setPackerData] = useState<PackerData>({
    packer_id: '',
    name: '',
    lic_no: '',
    location: '',
    phone_number: '',
    company_email: user?.email || ''
  });

  const [storageData, setStorageData] = useState<StorageData>({
    storage_id: '',
    facility_name: '',
    location: '',
    cert_status: '',
    company_email: user?.email || ''
  });

  const resetAllForms = () => {
    setFarmerData({
      farmer_id: '',
      name: '',
      phone_number: '',
      location: { lat: 0, long: 0, address: '' },
      land_records: '',
      certifications: [],
      registered_crops: [],
      aadhar_number: ''
    });

    setWildCollectorData({
      wild_collector_id: '',
      name: '',
      phone_number: '',
      location: { lat: 0, long: 0, address: '' },
      license_no: '',
      area_assigned: '',
      certifications: [],
      company_email: user?.email || '',
      registered_species: []
    });

    setProcessorData({
      processor_id: '',
      company_name: '',
      authority_name: '',
      address: '',
      license_no: '',
      responsible_person: '',
      certification_status: [],
      facilities: [],
      company_email: user?.email || '',
      phone_number: ''
    });

    setLaboratoryData({
      lab_id: '',
      company_name: '',
      location: '',
      accreditation_no: '',
      test_capabilities: [],
      company_email: user?.email || '',
      ayush_certificate: [],
      phone_number: ''
    });

    setManufacturerData({
      manufacturer_id: '',
      name: '',
      address: '',
      license_no: '',
      GMP_certified: false,
      company_email: user?.email || '',
      phone_number: ''
    });

    setPackerData({
      packer_id: '',
      name: '',
      lic_no: '',
      location: '',
      phone_number: '',
      company_email: user?.email || ''
    });

    setStorageData({
      storage_id: '',
      facility_name: '',
      location: '',
      cert_status: '',
      company_email: user?.email || ''
    });
  };

  return {
    farmerData,
    setFarmerData,
    wildCollectorData,
    setWildCollectorData,
    processorData,
    setProcessorData,
    laboratoryData,
    setLaboratoryData,
    manufacturerData,
    setManufacturerData,
    packerData,
    setPackerData,
    storageData,
    setStorageData,
    resetAllForms
  };
};