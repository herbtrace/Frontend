'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to overview page with prefetch
    router.prefetch('/dashboard/overview');
    router.replace('/dashboard/overview');
  }, [router]);

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-white'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
