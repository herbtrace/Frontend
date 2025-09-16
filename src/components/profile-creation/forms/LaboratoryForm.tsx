import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LaboratoryData, FormProps } from '../types';

export const LaboratoryForm = ({ data, onUpdate }: FormProps<LaboratoryData>) => {
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-black flex items-center">
          <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
          Laboratory Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lab-id" className="text-sm font-medium text-black">Lab ID *</Label>
            <Input
              id="lab-id"
              value={data.lab_id}
              onChange={(e) => onUpdate({ ...data, lab_id: e.target.value })}
              placeholder="Unique laboratory identifier"
              className="h-12 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lab-name" className="text-sm font-medium text-black">Company Name *</Label>
            <Input
              id="lab-name"
              value={data.company_name}
              onChange={(e) => onUpdate({ ...data, company_name: e.target.value })}
              placeholder="Laboratory company name"
              className="h-12 border-gray-200"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lab-phone" className="text-sm font-medium text-black">Phone Number *</Label>
          <Input
            id="lab-phone"
            value={data.phone_number}
            onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="h-12 max-w-md border-gray-200"
          />
        </div>
      </div>

      {/* Location & Credentials */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-black flex items-center">
          <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
          Location & Credentials
        </h3>
        <div className="space-y-2">
          <Label htmlFor="lab-location" className="text-sm font-medium text-black">Laboratory Location *</Label>
          <Textarea
            id="lab-location"
            value={data.location}
            onChange={(e) => onUpdate({ ...data, location: e.target.value })}
            placeholder="Complete laboratory address with city, state"
            className="min-h-[120px] border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lab-accreditation" className="text-sm font-medium text-black">Accreditation Number (Optional)</Label>
          <Input
            id="lab-accreditation"
            value={data.accreditation_no}
            onChange={(e) => onUpdate({ ...data, accreditation_no: e.target.value })}
            placeholder="NABL or other accreditation number"
            className="h-12 max-w-md border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};