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
  profile_id?: string;
  name: string;
  phone_number: string;
  location: Location;
  land_records?: string;
  certifications?: string[];
  registered_crops?: string[];
  aadhar_number: string;
}

interface WildCollectorProfile {
  role: 'wild_collector';
  profile_id: string;
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
  profile_id: string;
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
  profile_id: string;
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
  profile_id: string;
  name: string;
  address: string;
  license_no?: string;
  GMP_certified?: boolean;
  company_email: string;
  phone_number: string;
}

interface PackerProfile {
  role: 'packer';
  profile_id: string;
  name: string;
  lic_no?: string;
  location?: string;
  phone_number: string;
  company_email: string;
}

interface StorageProfile {
  role: 'storage';
  profile_id: string;
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

  static async getAllProfiles(): Promise<ProfileData[]> {
    return this.makeRequest<ProfileData[]>('/profiles/get', {
      method: 'GET',
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
  LoginResponse,
  ProfileCreateResponse,
};
