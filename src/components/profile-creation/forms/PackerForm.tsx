import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PackerData, FormProps } from '../types';

export const PackerForm = ({ data, onUpdate }: FormProps<PackerData>) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pack-id">Packer ID *</Label>
          <Input
            id="pack-id"
            value={data.packer_id}
            onChange={(e) => onUpdate({ ...data, packer_id: e.target.value })}
            placeholder="Packer ID"
          />
        </div>
        <div>
          <Label htmlFor="pack-name">Name *</Label>
          <Input
            id="pack-name"
            value={data.name}
            onChange={(e) => onUpdate({ ...data, name: e.target.value })}
            placeholder="Packer name"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pack-phone">Phone Number *</Label>
          <Input
            id="pack-phone"
            value={data.phone_number}
            onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
            placeholder="Phone number"
          />
        </div>
        <div>
          <Label htmlFor="pack-license">License No</Label>
          <Input
            id="pack-license"
            value={data.lic_no}
            onChange={(e) => onUpdate({ ...data, lic_no: e.target.value })}
            placeholder="License number"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="pack-location">Location</Label>
        <Input
          id="pack-location"
          value={data.location}
          onChange={(e) => onUpdate({ ...data, location: e.target.value })}
          placeholder="Packing facility location"
        />
      </div>
    </div>
  );
};