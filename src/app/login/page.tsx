'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'scm@example.com',
    password: 'scm@123',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className='bg-white flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      {/* Back to Home Button */}
      <div className='w-full max-w-sm md:max-w-3xl mb-6'>
        <Link
          href='/'
          className='inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium group'
        >
          <svg
            className='w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className='w-full max-w-sm md:max-w-3xl'>
        <Card className='overflow-hidden p-0 border-0 shadow-xl'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <form onSubmit={handleSubmit} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <div className='mb-6'>
                    <Image
                      src='/logo.png'
                      alt='Herbtrace Logo'
                      width={60}
                      height={60}
                      className='mx-auto mb-3'
                    />
                    <div className='w-12 h-px bg-green-600 mx-auto'></div>
                  </div>
                  <h1 className='text-2xl font-light tracking-wide text-black'>
                    Supply Chain Manager
                  </h1>
                  <p className='text-gray-600 text-balance font-light'>
                    Sign in to your Herbtrace dashboard
                  </p>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='email' className='text-gray-700 font-medium'>
                    Company Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='scm@example.com'
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className='border-gray-200 focus:border-green-500 focus:ring-green-500'
                    required
                  />
                </div>
                <div className='grid gap-3'>
                  <Label
                    htmlFor='password'
                    className='text-gray-700 font-medium'
                  >
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    className='border-gray-200 focus:border-green-500 focus:ring-green-500'
                    required
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md border-0'
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>
            <div className='bg-gradient-to-br from-green-50 to-green-100 relative hidden md:block'>
              <div className='absolute inset-0 flex items-center justify-center p-8'>
                <div className='text-center'>
                  <div className='text-green-600 text-6xl mb-6'>🌿</div>
                  <h3 className='text-xl font-light text-gray-800 mb-4'>
                    Supply Chain Transparency
                  </h3>
                  <p className='text-gray-600 font-light leading-relaxed'>
                    Track herbs from farm to pharmacy with complete visibility
                    and trust
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='text-gray-500 text-center text-xs text-balance mt-6'>
          <div className='bg-gray-50 p-3 rounded border'>
            <strong>Default Login:</strong> scm@example.com / scm@123
          </div>
        </div>
      </div>
    </div>
  );
}
