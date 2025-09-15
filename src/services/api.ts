import { RegistrationFormData } from '@/types/registration';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class ApiService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Registration endpoints
  static async registerEntity(role: string, data: RegistrationFormData) {
    return this.makeRequest(`/register/${role}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard metrics endpoint
  static async getMetrics() {
    return this.makeRequest('/metrics');
  }

  // For development/testing - simulate API calls
  static async simulateRegistration(role: string, data: RegistrationFormData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful response
    return {
      success: true,
      message: `${role} registered successfully`,
      id: Math.random().toString(36).substr(2, 9),
      data
    };
  }

  static async simulateGetMetrics() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return dummy metrics
    return {
      farmers: 25,
      qualityLabs: 4,
      manufacturers: 12,
      distributors: 8,
      totalProducts: 150,
      activeTransactions: 45
    };
  }
}