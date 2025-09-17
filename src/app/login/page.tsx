'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <div className='min-h-screen w-full bg-white relative text-gray-800'>
      {/* Zigzag Lightning - Light Pattern */}
      <div
        className='absolute inset-0 z-0 pointer-events-none'
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
            repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
            repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
          `,
        }}
      />

      {/* Navigation */}
      <nav className='relative z-10'>
        <div className='flex h-16 items-center px-6 justify-between'>
          <div className='flex items-center space-x-3'>
            <Image
              src='/logo.png'
              alt='Herbtrace'
              width={32}
              height={32}
              className='w-8 h-8'
            />
            <span className='text-xl font-semibold text-black'>Herbtrace</span>
          </div>
          <Link
            href='/'
            className='text-sm font-light text-gray-600 hover:text-black transition-colors'
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] relative z-10'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left - Login Form */}
            <div className='max-w-md mx-auto lg:mx-0 space-y-8'>
              <div className='text-center lg:text-left space-y-4'>
                <h1 className='text-3xl lg:text-4xl font-light tracking-tight text-black'>
                  Welcome back to
                  <span className='text-green-600 font-normal'> Herbtrace</span>
                </h1>
                <p className='text-lg text-gray-600 font-light'>
                  Sign in to access your medicinal herb supply chain dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-sm font-medium text-black'>
                    Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className='h-12 border-gray-200 focus:border-green-600 focus:ring-green-600 font-light'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-sm font-medium text-black'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    className='h-12 border-gray-200 focus:border-green-600 focus:ring-green-600 font-light'
                    required
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium border-0'
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
                </Button>
              </form>

              <div className='text-center'>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                  <p className='text-sm text-gray-600 font-light mb-2'>Demo Credentials:</p>
                  <p className='text-xs text-black font-medium'>
                    Email: scm@example.com<br />
                    Password: scm@123
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className='flex items-center justify-center p-8 lg:p-12'>
              <div className='text-center space-y-6'>
                {/* SVG Illustration */}
                <div className='w-80 h-80 mx-auto'>
                  <svg viewBox="0 0 400 400" className='w-full h-full'>
                    {/* Background Circle */}
                    <circle cx="200" cy="200" r="180" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" opacity="0.3"/>

                    {/* Main Plant */}
                    <g transform="translate(200,320)">
                      {/* Stem */}
                      <line x1="0" y1="0" x2="0" y2="-80" stroke="#16a34a" strokeWidth="6" strokeLinecap="round"/>

                      {/* Leaves */}
                      <ellipse cx="-20" cy="-40" rx="15" ry="25" fill="#22c55e" transform="rotate(-30)"/>
                      <ellipse cx="20" cy="-40" rx="15" ry="25" fill="#16a34a" transform="rotate(30)"/>
                      <ellipse cx="-15" cy="-65" rx="12" ry="20" fill="#15803d" transform="rotate(-20)"/>
                      <ellipse cx="15" cy="-65" rx="12" ry="20" fill="#22c55e" transform="rotate(20)"/>
                    </g>

                    {/* Side Plants */}
                    <g transform="translate(130,300)">
                      <line x1="0" y1="0" x2="0" y2="-50" stroke="#16a34a" strokeWidth="4"/>
                      <ellipse cx="-10" cy="-25" rx="8" ry="15" fill="#22c55e" transform="rotate(-25)"/>
                      <ellipse cx="10" cy="-25" rx="8" ry="15" fill="#16a34a" transform="rotate(25)"/>
                    </g>

                    <g transform="translate(270,310)">
                      <line x1="0" y1="0" x2="0" y2="-60" stroke="#16a34a" strokeWidth="4"/>
                      <ellipse cx="-12" cy="-30" rx="10" ry="18" fill="#15803d" transform="rotate(-30)"/>
                      <ellipse cx="12" cy="-30" rx="10" ry="18" fill="#22c55e" transform="rotate(30)"/>
                    </g>

                    {/* Blockchain Network Lines */}
                    <g opacity="0.6">
                      <line x1="100" y1="150" x2="300" y2="150" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,5"/>
                      <line x1="120" y1="120" x2="280" y2="180" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,5"/>
                      <line x1="120" y1="180" x2="280" y2="120" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,5"/>
                    </g>

                    {/* Network Nodes */}
                    <circle cx="100" cy="120" r="8" fill="#16a34a"/>
                    <circle cx="300" cy="120" r="8" fill="#16a34a"/>
                    <circle cx="100" cy="180" r="8" fill="#16a34a"/>
                    <circle cx="300" cy="180" r="8" fill="#16a34a"/>
                    <circle cx="200" cy="100" r="10" fill="#22c55e"/>

                    {/* Icons */}
                    <g transform="translate(90,110)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="2"/>
                      <text x="0" y="3" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">🌱</text>
                    </g>

                    <g transform="translate(290,110)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="2"/>
                      <text x="0" y="3" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">🏭</text>
                    </g>

                    <g transform="translate(90,170)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="2"/>
                      <text x="0" y="3" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">🔬</text>
                    </g>

                    <g transform="translate(290,170)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="2"/>
                      <text x="0" y="3" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">🏥</text>
                    </g>

                    {/* Central Blockchain Symbol */}
                    <g transform="translate(190,90)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#22c55e" strokeWidth="2" rx="2"/>
                      <text x="0" y="3" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">⛓️</text>
                    </g>
                  </svg>
                </div>

                {/* Illustration Text */}
                <div className='space-y-4'>
                  <h3 className='text-2xl font-light text-black'>
                    Secure Supply Chain
                  </h3>
                  <p className='text-gray-600 font-light leading-relaxed max-w-sm mx-auto'>
                    Track medicinal herbs through every stage from organic farms to processing facilities,
                    laboratories, and healthcare providers all secured by blockchain technology.
                  </p>

                  <div className='flex items-center justify-center space-x-6 pt-4'>
                    <div className='text-center'>
                      <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1'>
                        <span className='text-green-600 text-sm'>🌱</span>
                      </div>
                      <div className='text-xs text-gray-600 font-light'>Farm</div>
                    </div>
                    <div className='w-4 h-px bg-gray-300'></div>
                    <div className='text-center'>
                      <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1'>
                        <span className='text-green-600 text-sm'>🔬</span>
                      </div>
                      <div className='text-xs text-gray-600 font-light'>Lab</div>
                    </div>
                    <div className='w-4 h-px bg-gray-300'></div>
                    <div className='text-center'>
                      <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1'>
                        <span className='text-green-600 text-sm'>🏥</span>
                      </div>
                      <div className='text-xs text-gray-600 font-light'>Pharmacy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
