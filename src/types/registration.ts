export interface FarmerFormData {
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

export interface LabFormData {
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

export interface ManufacturerFormData {
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

export interface DistributorFormData {
  companyName: string;
  managerName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  distributionAreas: string[];
  storageCapacity: string;
  transportFleet: string;
  coldStorageAvailable: boolean;
  trackingSystem: string;
  yearsInBusiness: string;
}

export type RegistrationFormData =
  | FarmerFormData
  | LabFormData
  | ManufacturerFormData
  | DistributorFormData;