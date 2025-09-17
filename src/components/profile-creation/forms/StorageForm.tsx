import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StorageData, FormProps } from '../types';

export const StorageForm = ({ data, onUpdate }: FormProps<StorageData>) => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='storage-id'>Storage ID *</Label>
          <Input
            id='storage-id'
            value={data.storage_id}
            onChange={e => onUpdate({ ...data, storage_id: e.target.value })}
            placeholder='Storage ID'
          />
        </div>
        <div>
          <Label htmlFor='storage-name'>Facility Name *</Label>
          <Input
            id='storage-name'
            value={data.facility_name}
            onChange={e => onUpdate({ ...data, facility_name: e.target.value })}
            placeholder='Storage facility name'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='storage-location'>Location *</Label>
        <Input
          id='storage-location'
          value={data.location}
          onChange={e => onUpdate({ ...data, location: e.target.value })}
          placeholder='Storage facility location'
        />
      </div>
      <div>
        <Label htmlFor='storage-cert'>Certification Status</Label>
        <Input
          id='storage-cert'
          value={data.cert_status}
          onChange={e => onUpdate({ ...data, cert_status: e.target.value })}
          placeholder='Certification status'
        />
      </div>
    </div>
  );
};
