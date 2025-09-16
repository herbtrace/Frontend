'use client';

import Image from "next/image";
import { useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Automatically redirect to dashboard if user is authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogin = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
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

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-medium border-0 rounded-md transition-colors"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
