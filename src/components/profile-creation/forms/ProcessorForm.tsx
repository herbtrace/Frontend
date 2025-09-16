import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProcessorData, FormProps } from '../types';

export const ProcessorForm = ({ data, onUpdate }: FormProps<ProcessorData>) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="proc-id">Processor ID *</Label>
          <Input
            id="proc-id"
            value={data.processor_id}
            onChange={(e) => onUpdate({ ...data, processor_id: e.target.value })}
            placeholder="Processor ID"
          />
        </div>
        <div>
          <Label htmlFor="proc-company">Company Name *</Label>
          <Input
            id="proc-company"
            value={data.company_name}
            onChange={(e) => onUpdate({ ...data, company_name: e.target.value })}
            placeholder="Processing company name"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="proc-authority">Authority Name *</Label>
          <Input
            id="proc-authority"
            value={data.authority_name}
            onChange={(e) => onUpdate({ ...data, authority_name: e.target.value })}
            placeholder="Authority name"
          />
        </div>
        <div>
          <Label htmlFor="proc-phone">Phone Number *</Label>
          <Input
            id="proc-phone"
            value={data.phone_number}
            onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
            placeholder="Phone number"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="proc-address">Address *</Label>
        <Input
          id="proc-address"
          value={data.address}
          onChange={(e) => onUpdate({ ...data, address: e.target.value })}
          placeholder="Processing facility address"
        />
      </div>
      <div>
        <Label htmlFor="proc-responsible">Responsible Person</Label>
        <Input
          id="proc-responsible"
          value={data.responsible_person}
          onChange={(e) => onUpdate({ ...data, responsible_person: e.target.value })}
          placeholder="Responsible person name"
        />
      </div>
    </div>
  );
};