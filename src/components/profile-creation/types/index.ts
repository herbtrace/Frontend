export type ProfileRole =
  | 'farmer'
  | 'wild_collector'
  | 'processor'
  | 'laboratory'
  | 'manufacturer'
  | 'packer'
  | 'storage';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ProfileCreationProps {
  onBack: () => void;
  user: User | null;
}

export interface Location {
  lat: number;
  long: number;
  address: string;
}

export interface FarmerData {
  farmer_id: string;
  name: string;
  phone_number: string;
  location: Location;
  land_records: string;
  certifications: string[];
  registered_crops: string[];
  aadhar_number: string;
}

export interface WildCollectorData {
  wild_collector_id: string;
  name: string;
  phone_number: string;
  location: Location;
  license_no: string;
  area_assigned: string;
  certifications: string[];
  company_email: string;
  registered_species: string[];
}

export interface ProcessorData {
  processor_id: string;
  company_name: string;
  authority_name: string;
  address: string;
  license_no: string;
  responsible_person: string;
  certification_status: string[];
  facilities: string[];
  company_email: string;
  phone_number: string;
}

export interface LaboratoryData {
  lab_id: string;
  company_name: string;
  location: string;
  accreditation_no: string;
  test_capabilities: string[];
  company_email: string;
  ayush_certificate: string[];
  phone_number: string;
}

export interface ManufacturerData {
  manufacturer_id: string;
  name: string;
  address: string;
  license_no: string;
  GMP_certified: boolean;
  company_email: string;
  phone_number: string;
}

export interface PackerData {
  packer_id: string;
  name: string;
  lic_no: string;
  location: string;
  phone_number: string;
  company_email: string;
}

export interface StorageData {
  storage_id: string;
  facility_name: string;
  location: string;
  cert_status: string;
  company_email: string;
}

export interface FormProps<T> {
  data: T;
  onUpdate: (data: T) => void;
}
