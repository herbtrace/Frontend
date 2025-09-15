'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";
import { Analytics } from "@/components/Analytics";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Automatically show dashboard if user is authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setShowDashboard(true);
      // Clean up URL parameter if present
      if (searchParams.get('showDashboard') === 'true') {
        router.replace('/');
      }
    } else if (!isLoading && !isAuthenticated) {
      setShowDashboard(false);
    }
  }, [isAuthenticated, isLoading, searchParams, router]);

  const handleLogin = () => {
    if (isAuthenticated) {
      setShowDashboard(true);
    } else {
      router.push('/login');
    }
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setShowAnalytics(false);
    logout();
  };

  const handleShowAnalytics = () => {
    setShowAnalytics(true);
    setShowDashboard(false);
  };

  const handleBackToDashboard = () => {
    setShowAnalytics(false);
    setShowDashboard(true);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show analytics page
  if (showAnalytics) {
    return <Analytics onBack={handleBackToDashboard} onLogout={handleLogout} onRegisterNew={handleRegisterClick} user={user} />;
  }

  // Show dashboard after login/registration
  if (showDashboard) {
    return <Dashboard onRegisterNew={handleRegisterClick} onLogout={handleLogout} onShowAnalytics={handleShowAnalytics} user={user} />;
  }

  return (
    <div className="min-h-screen bg-white">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium border-0 rounded-md transition-colors"
            >
              Log in
            </Button>
            <Button
              onClick={handleRegisterClick}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-medium rounded-md transition-colors"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
