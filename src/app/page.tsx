'use client';

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/LoginModal";
import { RoleSelection } from "@/components/RoleSelection";
import { FarmerForm } from "@/components/forms/FarmerForm";
import { LabForm } from "@/components/forms/LabForm";
import { ManufacturerForm } from "@/components/forms/ManufacturerForm";
import { DistributorForm } from "@/components/forms/DistributorForm";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { RegistrationFormData } from "@/types/registration";
import { ApiService } from "@/services/api";

type RegistrationStep = 'role-selection' | 'form-filling' | 'completed';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterFlow, setShowRegisterFlow] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setShowDashboard(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterFlow(true);
    setRegistrationStep('role-selection');
  };

  const handleLoginSuccess = () => {
    setShowDashboard(true);
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setRegistrationStep('form-filling');
  };

  const handleFormSubmit = async (data: RegistrationFormData) => {
    try {
      console.log('Form submitted:', { role: selectedRole, data });

      // Use simulated API for now - replace with real API call later
      const response = await ApiService.simulateRegistration(selectedRole, data);

      if (response.success) {
        setRegistrationStep('completed');
        setTimeout(() => {
          setShowRegisterFlow(false);
          setRegistrationStep('role-selection');
          setSelectedRole('');
          setShowDashboard(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowRegisterFlow(false);
    setRegistrationStep('role-selection');
    setSelectedRole('');
  };

  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case 'farmer':
        return <FarmerForm onSubmit={handleFormSubmit} onCancel={handleCancel} />;
      case 'lab':
        return <LabForm onSubmit={handleFormSubmit} onCancel={handleCancel} />;
      case 'manufacturer':
        return <ManufacturerForm onSubmit={handleFormSubmit} onCancel={handleCancel} />;
      case 'distributor':
        return <DistributorForm onSubmit={handleFormSubmit} onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  // Show dashboard after login/registration
  if (showDashboard) {
    return <Dashboard onRegisterNew={handleRegisterClick} onLogout={logout} user={user} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Modals and Registration Flows */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {showRegisterFlow && registrationStep === 'role-selection' && (
        <RoleSelection
          onRoleSelect={handleRoleSelect}
          onCancel={handleCancel}
        />
      )}

      {showRegisterFlow && registrationStep === 'form-filling' && renderRegistrationForm()}

      {showRegisterFlow && registrationStep === 'completed' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 text-center border">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-black mb-2">Registration Successful!</h2>
            <p className="text-gray-600">
              Your {selectedRole} registration has been submitted successfully.
            </p>
          </div>
        </div>
      )}

      {/* Clean Minimal Landing Page */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-2xl">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Herbtrace Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-light text-black tracking-wide">
              Herbtrace
            </h1>
            <div className="w-20 h-px bg-green-600 mx-auto mt-4"></div>
          </div>

          {/* Tagline */}
          <p className="text-lg text-gray-600 mb-12 font-light leading-relaxed">
            Supply chain transparency from farm to pharmacy
          </p>

          {/* Get Started Button */}
          <Button
            onClick={handleGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium border-0 rounded-md transition-colors"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
