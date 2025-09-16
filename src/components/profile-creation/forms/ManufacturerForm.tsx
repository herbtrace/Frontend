import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { ManufacturerData, FormProps } from '../types';

export const ManufacturerForm = ({ data, onUpdate }: FormProps<ManufacturerData>) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mfg-id">Manufacturer ID *</Label>
          <Input
            id="mfg-id"
            value={data.manufacturer_id}
            onChange={(e) => onUpdate({ ...data, manufacturer_id: e.target.value })}
            placeholder="Manufacturer ID"
          />
        </div>
        <div>
          <Label htmlFor="mfg-name">Name *</Label>
          <Input
            id="mfg-name"
            value={data.name}
            onChange={(e) => onUpdate({ ...data, name: e.target.value })}
            placeholder="Manufacturer name"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="mfg-address">Address *</Label>
        <Input
          id="mfg-address"
          value={data.address}
          onChange={(e) => onUpdate({ ...data, address: e.target.value })}
          placeholder="Manufacturing address"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mfg-phone">Phone Number *</Label>
          <Input
            id="mfg-phone"
            value={data.phone_number}
            onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
            placeholder="Phone number"
          />
        </div>
        <div>
          <Label htmlFor="mfg-license">License No</Label>
          <Input
            id="mfg-license"
            value={data.license_no}
            onChange={(e) => onUpdate({ ...data, license_no: e.target.value })}
            placeholder="License number"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="gmp-certified"
          checked={data.GMP_certified}
          onCheckedChange={(checked) => onUpdate({
            ...data,
            GMP_certified: checked === true
          })}
        />
        <Label htmlFor="gmp-certified">GMP Certified</Label>
      </div>
    </div>
  );
};