import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FarmerData, FormProps } from '../types';

export const FarmerForm = ({ data, onUpdate }: FormProps<FarmerData>) => {
  return (
    <div className='space-y-2'>
      {/* Basic Information */}
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-slate-800 border-b border-slate-200 pb-1'>
          Basic Information
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <div className='space-y-1'>
            <Label
              htmlFor='farmer-id'
              className='text-xs font-medium text-slate-700'
            >
              Farmer ID <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='farmer-id'
              value={data.farmer_id}
              onChange={e => onUpdate({ ...data, farmer_id: e.target.value })}
              placeholder='Enter unique ID'
              className='h-7 text-sm'
            />
          </div>

          <div className='space-y-1'>
            <Label
              htmlFor='farmer-name'
              className='text-xs font-medium text-slate-700'
            >
              Full Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='farmer-name'
              value={data.name}
              onChange={e => onUpdate({ ...data, name: e.target.value })}
              placeholder='Enter full name'
              className='h-7 text-sm'
            />
          </div>

          <div className='space-y-1'>
            <Label
              htmlFor='farmer-phone'
              className='text-xs font-medium text-slate-700'
            >
              Phone Number <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='farmer-phone'
              value={data.phone_number}
              onChange={e =>
                onUpdate({ ...data, phone_number: e.target.value })
              }
              placeholder='+91 XXXXX XXXXX'
              className='h-7 text-sm'
            />
          </div>
        </div>

        <div className='w-full md:w-1/3'>
          <div className='space-y-1'>
            <Label
              htmlFor='farmer-aadhar'
              className='text-xs font-medium text-slate-700'
            >
              Aadhar Number{' '}
              <span className='text-xs text-slate-500'>(Optional)</span>
            </Label>
            <Input
              id='farmer-aadhar'
              value={data.aadhar_number}
              onChange={e =>
                onUpdate({ ...data, aadhar_number: e.target.value })
              }
              placeholder='XXXX XXXX XXXX'
              className='h-7 text-sm'
            />
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-slate-800 border-b border-slate-200 pb-1'>
          Farm Location
        </h3>

        <div className='space-y-1'>
          <Label
            htmlFor='farmer-address'
            className='text-xs font-medium text-slate-700'
          >
            Farm Address <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            id='farmer-address'
            value={data.location.address}
            onChange={e =>
              onUpdate({
                ...data,
                location: { ...data.location, address: e.target.value },
              })
            }
            placeholder='Complete farm address with village, district, state'
            className='min-h-[35px] text-sm resize-none'
            rows={2}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label
              htmlFor='farmer-lat'
              className='text-xs font-medium text-slate-700'
            >
              Latitude{' '}
              <span className='text-xs text-slate-500'>(Optional)</span>
            </Label>
            <Input
              id='farmer-lat'
              type='number'
              step='any'
              value={data.location.lat}
              onChange={e =>
                onUpdate({
                  ...data,
                  location: {
                    ...data.location,
                    lat: parseFloat(e.target.value) || 0,
                  },
                })
              }
              placeholder='e.g., 12.9716'
              className='h-7 text-sm'
            />
          </div>

          <div className='space-y-1'>
            <Label
              htmlFor='farmer-long'
              className='text-xs font-medium text-slate-700'
            >
              Longitude{' '}
              <span className='text-xs text-slate-500'>(Optional)</span>
            </Label>
            <Input
              id='farmer-long'
              type='number'
              step='any'
              value={data.location.long}
              onChange={e =>
                onUpdate({
                  ...data,
                  location: {
                    ...data.location,
                    long: parseFloat(e.target.value) || 0,
                  },
                })
              }
              placeholder='e.g., 77.5946'
              className='h-7 text-sm'
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-slate-800 border-b border-slate-200 pb-1'>
          Additional Details
        </h3>

        <div className='space-y-1'>
          <Label
            htmlFor='farmer-land'
            className='text-xs font-medium text-slate-700'
          >
            Land Records{' '}
            <span className='text-xs text-slate-500'>(Optional)</span>
          </Label>
          <Textarea
            id='farmer-land'
            value={data.land_records}
            onChange={e => onUpdate({ ...data, land_records: e.target.value })}
            placeholder='Land ownership documents, survey numbers, etc.'
            className='min-h-[30px] text-sm resize-none'
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
