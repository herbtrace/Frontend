const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Response interfaces matching your backend
interface LoginResponse {
  company_email: string;
  role: string;
  msg: string;
  auth_token: string;
}

interface ProfileCreateResponse {
  id: string;
  role: string;
  msg: string;
}

interface TransactionGetResponse {
  // Will contain the specific role data for the given profile ID
  [key: string]: unknown;
}

interface TransactionValidateResponse {
  message: string;
}

interface TransactionStartResponse {
  message: string;
}

// Profile types matching your backend schema
interface Location {
  lat: number;
  long: number;
  address: string;
}

interface FarmerProfile {
  role: 'farmer';
  farmer_id: string;
  name: string;
  phone_number: string;
  location: Location;
  land_records?: string;
  certifications?: string[];
  registered_crops?: string[];
  aadhar_number?: string;
}

interface WildCollectorProfile {
  role: 'wild_collector';
  wild_collector_id: string;
  name: string;
  phone_number: string;
  location: Location;
  license_no?: string;
  area_assigned?: string;
  certifications?: string[];
  company_email: string;
  registered_species?: string[];
}

interface ProcessorProfile {
  role: 'processor';
  processor_id: string;
  company_name: string;
  authority_name: string;
  address: string;
  license_no?: string;
  responsible_person?: string;
  certification_status?: string[];
  facilities?: string[];
  company_email: string;
  phone_number: string;
}

interface LaboratoryProfile {
  role: 'laboratory';
  lab_id: string;
  company_name: string;
  location: string;
  accreditation_no?: string;
  test_capabilities?: string[];
  company_email: string;
  ayush_certificate?: string[];
  phone_number: string;
}

interface ManufacturerProfile {
  role: 'manufacturer';
  manufacturer_id: string;
  name: string;
  address: string;
  license_no?: string;
  GMP_certified?: boolean;
  company_email: string;
  phone_number: string;
}

interface PackerProfile {
  role: 'packer';
  packer_id: string;
  name: string;
  lic_no?: string;
  location?: string;
  phone_number: string;
  company_email: string;
}

interface StorageProfile {
  role: 'storage';
  storage_id: string;
  facility_name: string;
  location: string;
  cert_status?: string;
  company_email: string;
}

type ProfileData =
  | FarmerProfile
  | WildCollectorProfile
  | ProcessorProfile
  | LaboratoryProfile
  | ManufacturerProfile
  | PackerProfile
  | StorageProfile;

// Transaction interfaces
interface TransactionGetRequest {
  profile_id: string;
  role: string;
}

interface TransactionValidateRequest {
  from_id: string;
  to_id: string;
  crops: number;
  from_role: string;
  to_role: string;
  start_time: string;
  event: {
    batch_id: string;
    crop_id: string;
    start_time: string;
  };
}

interface TransactionStartRequest {
  batch_id: string;
  actor_id: string;
  crop_id: string;
  location: Location;
  start_date: string;
  harvest_date: string;
  environment: {
    soil_quality: string;
    moisture: number;
    temperature: number;
    humidity: number;
    weather_conditions: string;
    irrigation_method: string;
  };
  inputs: {
    fertilizers: string;
    pesticides_used: string;
    organic_certified: boolean;
  };
  permits: Array<{
    permit_id: string;
    permit_type: string;
    issuer: string;
    valid_until: string;
  }>;
}

export class ApiService {
  private static getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('herbtrace_auth_token');
    }
    return null;
  }

  private static setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('herbtrace_auth_token', token);
    }
  }

  private static removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('herbtrace_auth_token');
    }
  }

  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const authToken = this.getAuthToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.removeAuthToken();
        }
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // 🏠 Root endpoint
  static async getWelcome(): Promise<{ msg: string }> {
    return this.makeRequest<{ msg: string }>('/');
  }

  // 🔐 Profile Management Endpoints
  static async createProfile(
    profileData: ProfileData
  ): Promise<ProfileCreateResponse> {
    return this.makeRequest<ProfileCreateResponse>('/profiles/create', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  static async loginSCM(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const response = await this.makeRequest<LoginResponse>('/profiles/login', {
      method: 'POST',
      body: JSON.stringify({
        company_email: email,
        password: password,
      }),
    });

    if (response.auth_token) {
      this.setAuthToken(response.auth_token);
    }

    return response;
  }

  // 📊 Transaction Management Endpoints
  static async getTransaction(
    data: TransactionGetRequest
  ): Promise<TransactionGetResponse> {
    return this.makeRequest<TransactionGetResponse>('/transactions/get', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async validateTransaction(
    data: TransactionValidateRequest
  ): Promise<TransactionValidateResponse> {
    return this.makeRequest<TransactionValidateResponse>(
      '/transactions/validate',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  static async startTransaction(
    data: TransactionStartRequest
  ): Promise<TransactionStartResponse> {
    return this.makeRequest<TransactionStartResponse>('/transactions/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Auth utilities
  static logout(): void {
    this.removeAuthToken();
  }

  static isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  static getCurrentToken(): string | null {
    return this.getAuthToken();
  }
}

// Export types for use in components
export type {
  ProfileData,
  FarmerProfile,
  WildCollectorProfile,
  ProcessorProfile,
  LaboratoryProfile,
  ManufacturerProfile,
  PackerProfile,
  StorageProfile,
  Location,
  TransactionGetRequest,
  TransactionValidateRequest,
  TransactionStartRequest,
  LoginResponse,
  ProfileCreateResponse,
  TransactionGetResponse,
  TransactionValidateResponse,
  TransactionStartResponse,
};
