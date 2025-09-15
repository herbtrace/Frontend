'use client';

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await login(email, password)
      router.push('/?showDashboard=true')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    router.push('/register')
  }

  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
