import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { ManufacturerData, FormProps } from '../types';

export const ManufacturerForm = ({
  data,
  onUpdate,
}: FormProps<ManufacturerData>) => {
  return (
    <div className='space-y-2'>
      {/* Company Information */}
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-slate-800 border-b border-slate-200 pb-1'>
          Company Information
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label
              htmlFor='mfg-id'
              className='text-xs font-medium text-slate-700'
            >
              Manufacturer ID <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='mfg-id'
              value={data.manufacturer_id}
              onChange={e =>
                onUpdate({ ...data, manufacturer_id: e.target.value })
              }
              placeholder='Enter unique ID'
              className='h-7 text-sm'
            />
          </div>

          <div className='space-y-1'>
            <Label
              htmlFor='mfg-name'
              className='text-xs font-medium text-slate-700'
            >
              Company Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='mfg-name'
              value={data.name}
              onChange={e => onUpdate({ ...data, name: e.target.value })}
              placeholder='Enter company name'
              className='h-7 text-sm'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label
              htmlFor='mfg-phone'
              className='text-xs font-medium text-slate-700'
            >
              Phone Number <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='mfg-phone'
              value={data.phone_number}
              onChange={e =>
                onUpdate({ ...data, phone_number: e.target.value })
              }
              placeholder='+91 XXXXX XXXXX'
              className='h-7 text-sm'
            />
          </div>

          <div className='space-y-1'>
            <Label
              htmlFor='mfg-license'
              className='text-xs font-medium text-slate-700'
            >
              License Number{' '}
              <span className='text-xs text-slate-500'>(Optional)</span>
            </Label>
            <Input
              id='mfg-license'
              value={data.license_no}
              onChange={e => onUpdate({ ...data, license_no: e.target.value })}
              placeholder='Manufacturing license'
              className='h-7 text-sm'
            />
          </div>
        </div>

        <div className='flex items-center space-x-2 pt-1'>
          <Checkbox
            id='gmp-certified'
            checked={data.GMP_certified}
            onCheckedChange={checked =>
              onUpdate({
                ...data,
                GMP_certified: checked === true,
              })
            }
          />
          <Label
            htmlFor='gmp-certified'
            className='text-xs font-medium text-slate-700'
          >
            GMP Certified
          </Label>
        </div>
      </div>

      {/* Location Information */}
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-slate-800 border-b border-slate-200 pb-1'>
          Location
        </h3>

        <div className='space-y-1'>
          <Label
            htmlFor='mfg-address'
            className='text-xs font-medium text-slate-700'
          >
            Manufacturing Address <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            id='mfg-address'
            value={data.address}
            onChange={e => onUpdate({ ...data, address: e.target.value })}
            placeholder='Complete manufacturing facility address'
            className='min-h-[30px] text-sm resize-none'
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
