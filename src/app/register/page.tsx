'use client';

import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RoleSelection } from "@/components/RoleSelection"
import { FarmerForm } from "@/components/forms/FarmerForm"
import { LabForm } from "@/components/forms/LabForm"
import { ManufacturerForm } from "@/components/forms/ManufacturerForm"
import { DistributorForm } from "@/components/forms/DistributorForm"
import { RegistrationFormData } from "@/types/registration"
import { ApiService } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

type RegistrationStep = 'auth' | 'role-selection' | 'form-filling' | 'completed';

export default function RegisterPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('auth')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // If already authenticated, skip auth step
  useState(() => {
    if (isAuthenticated && registrationStep === 'auth') {
      setRegistrationStep('role-selection')
    }
  })

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await login(email, password)
      setRegistrationStep('role-selection')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setRegistrationStep('form-filling')
  }

  const handleFormSubmit = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true)
      const response = await ApiService.simulateRegistration(selectedRole, data)

      if (response.success) {
        setRegistrationStep('completed')
        setTimeout(() => {
          router.push('/?showDashboard=true')
        }, 2000)
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (registrationStep === 'form-filling') {
      setRegistrationStep('role-selection')
    } else {
      router.push('/')
    }
  }

  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case 'farmer':
        return <FarmerForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      case 'lab':
        return <LabForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      case 'manufacturer':
        return <ManufacturerForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      case 'distributor':
        return <DistributorForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      default:
        return null
    }
  }

  // Step 1: Authentication
  if (registrationStep === 'auth') {
    return (
      <div className="bg-white flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm
            onLogin={handleLogin}
            onSignUp={handleBackToLogin}
            isLoading={isLoading}
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Sign in to continue with registration
            </p>
            <button
              onClick={handleBackToLogin}
              className="text-green-600 hover:text-green-700 text-sm underline underline-offset-4"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Role Selection
  if (registrationStep === 'role-selection') {
    return <RoleSelection onRoleSelect={handleRoleSelect} onCancel={handleCancel} />
  }

  // Step 3: Form Filling
  if (registrationStep === 'form-filling') {
    return renderRegistrationForm()
  }

  // Step 4: Completion
  if (registrationStep === 'completed') {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-light text-black mb-2 tracking-wide">Registration Complete!</h2>
          <p className="text-gray-600 font-light">
            Your {selectedRole} account has been created successfully.
          </p>
        </div>
      </div>
    )
  }

  return null
}