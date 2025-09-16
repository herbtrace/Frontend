import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { WildCollectorData, FormProps } from '../types';

export const WildCollectorForm = ({ data, onUpdate }: FormProps<WildCollectorData>) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="wc-id">Wild Collector ID *</Label>
          <Input
            id="wc-id"
            value={data.wild_collector_id}
            onChange={(e) => onUpdate({ ...data, wild_collector_id: e.target.value })}
            placeholder="Wild Collector ID"
          />
        </div>
        <div>
          <Label htmlFor="wc-name">Name *</Label>
          <Input
            id="wc-name"
            value={data.name}
            onChange={(e) => onUpdate({ ...data, name: e.target.value })}
            placeholder="Collector name"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="wc-address">Address *</Label>
        <Input
          id="wc-address"
          value={data.location.address}
          onChange={(e) => onUpdate({
            ...data,
            location: { ...data.location, address: e.target.value }
          })}
          placeholder="Collection area address"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="wc-phone">Phone Number *</Label>
          <Input
            id="wc-phone"
            value={data.phone_number}
            onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
            placeholder="Phone number"
          />
        </div>
        <div>
          <Label htmlFor="wc-license">License No</Label>
          <Input
            id="wc-license"
            value={data.license_no}
            onChange={(e) => onUpdate({ ...data, license_no: e.target.value })}
            placeholder="License number"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="wc-area">Area Assigned</Label>
        <Input
          id="wc-area"
          value={data.area_assigned}
          onChange={(e) => onUpdate({ ...data, area_assigned: e.target.value })}
          placeholder="Assigned collection area"
        />
      </div>
    </div>
  );
};