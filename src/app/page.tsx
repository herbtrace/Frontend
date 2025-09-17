import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function HomeContent() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='border-b border-gray-100'>
        <div className='flex h-14 items-center px-6'>
          <div className='flex items-center space-x-2'>
            <Image
              src='/logo.png'
              alt='Herbtrace'
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span className='font-medium text-black'>Herbtrace</span>
          </div>
          <div className='ml-auto'>
            <span className='text-sm text-gray-500'>Medicinal Herb Supply Chain</span>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className='flex items-center justify-center min-h-[calc(100vh-3.5rem)]'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Content */}
            <div className='text-center lg:text-left space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl lg:text-5xl font-light tracking-tight text-black leading-tight'>
                  Monitor every herb
                  <span className='text-green-600 font-normal'> from seed to shelf</span>
                </h1>
                <p className='text-lg text-gray-600 font-light max-w-lg mx-auto lg:mx-0'>
                  Complete traceability for medicinal herbs. Track cultivation, processing, testing, and distribution with blockchain verification.
                </p>
              </div>

              <div className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-start space-x-3 text-left'>
                    <div className='w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0'></div>
                    <div className='space-y-1'>
                      <p className='font-medium text-black'>Farm-to-pharmacy tracking</p>
                      <p className='text-sm text-gray-600 font-light leading-relaxed'>
                        Monitor herbs through cultivation, harvest, processing, and distribution.
                        Track every batch from organic farms to certified processing facilities,
                        ensuring complete visibility across the entire supply chain journey.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3 text-left'>
                    <div className='w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0'></div>
                    <div className='space-y-1'>
                      <p className='font-medium text-black'>Quality assurance protocols</p>
                      <p className='text-sm text-gray-600 font-light leading-relaxed'>
                        Automated quality checks, lab integrations, and compliance reporting.
                        Real-time monitoring of temperature, humidity, contamination levels,
                        and active compound concentrations throughout the supply chain.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3 text-left'>
                    <div className='w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0'></div>
                    <div className='space-y-1'>
                      <p className='font-medium text-black'>Blockchain verification</p>
                      <p className='text-sm text-gray-600 font-light leading-relaxed'>
                        Immutable records with cryptographic proof of authenticity.
                        Every transaction, test result, and quality certificate is permanently
                        recorded on the blockchain, preventing fraud and ensuring transparency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-center lg:justify-start space-x-6 pt-4'>
                  <Link href='/login'>
                    <Button className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium border-0'>
                      Get Started
                    </Button>
                  </Link>
                  <div className='text-sm text-gray-500 font-light'>
                    Used by 200+ herb suppliers worldwide
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Demo */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm'>
              {/* Header */}
              <div className='px-5 py-4 border-b border-gray-100'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 rounded-full bg-green-600'></div>
                    <h3 className='font-medium text-black'>Supply Chain Dashboard</h3>
                  </div>
                  <div className='text-xs text-gray-500'>Live updates</div>
                </div>
              </div>

              {/* Content */}
              <div className='p-5 space-y-5'>
                {/* Stats Grid */}
                <div className='grid grid-cols-3 gap-3'>
                  <div className='border border-gray-200 rounded p-3 text-center'>
                    <div className='text-xl font-semibold text-black'>284</div>
                    <div className='text-xs text-gray-600'>Active Lots</div>
                  </div>
                  <div className='border border-gray-200 rounded p-3 text-center'>
                    <div className='text-xl font-semibold text-black'>96.8%</div>
                    <div className='text-xs text-gray-600'>Pass Rate</div>
                  </div>
                  <div className='border border-gray-200 rounded p-3 text-center'>
                    <div className='text-xl font-semibold text-black'>47</div>
                    <div className='text-xs text-gray-600'>Suppliers</div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className='space-y-3'>
                  <h4 className='text-sm font-medium text-black'>Recent Activity</h4>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-3 border border-gray-200 rounded p-3'>
                      <div className='w-2 h-2 rounded-full bg-green-600'></div>
                      <div className='flex-1'>
                        <div className='text-sm font-medium text-black'>Ashwagandha Lot #AS847</div>
                        <div className='text-xs text-gray-600'>Quality verification completed</div>
                      </div>
                      <div className='text-xs text-gray-500'>2m ago</div>
                    </div>

                    <div className='flex items-center space-x-3 border border-gray-200 rounded p-3'>
                      <div className='w-2 h-2 rounded-full bg-black'></div>
                      <div className='flex-1'>
                        <div className='text-sm font-medium text-black'>Turmeric Lot #TU293</div>
                        <div className='text-xs text-gray-600'>Shipped to processing facility</div>
                      </div>
                      <div className='text-xs text-gray-500'>8m ago</div>
                    </div>

                    <div className='flex items-center space-x-3 border border-gray-200 rounded p-3'>
                      <div className='w-2 h-2 rounded-full bg-green-600'></div>
                      <div className='flex-1'>
                        <div className='text-sm font-medium text-black'>Ginseng Lot #GS142</div>
                        <div className='text-xs text-gray-600'>Lab analysis in progress</div>
                      </div>
                      <div className='text-xs text-gray-500'>15m ago</div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-medium text-black'>Quality Score Trend</h4>
                    <div className='text-xs text-gray-500'>Past 30 days</div>
                  </div>
                  <div className='h-16 flex items-end space-x-1'>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '60%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '75%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '68%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '82%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '79%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '87%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '91%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '88%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '93%'}}></div>
                    <div className='bg-green-600 w-2 rounded-t' style={{height: '96%'}}></div>
                  </div>
                </div>

                {/* Footer */}
                <div className='pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between'>
                  <span>Last sync: 2 seconds ago</span>
                  <span>Block #847291</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
