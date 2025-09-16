import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LaboratoryData, FormProps } from '../types';

export const LaboratoryForm = ({ data, onUpdate }: FormProps<LaboratoryData>) => {
  return (
    <div className="space-y-2">
      {/* Laboratory Information */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-800 border-b border-slate-200 pb-1">
          Laboratory Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="lab-id" className="text-xs font-medium text-slate-700">
              Lab ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lab-id"
              value={data.lab_id}
              onChange={(e) => onUpdate({ ...data, lab_id: e.target.value })}
              placeholder="Unique laboratory identifier"
              className="h-7 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="lab-name" className="text-xs font-medium text-slate-700">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lab-name"
              value={data.company_name}
              onChange={(e) => onUpdate({ ...data, company_name: e.target.value })}
              placeholder="Laboratory company name"
              className="h-7 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="lab-phone" className="text-xs font-medium text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lab-phone"
              value={data.phone_number}
              onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="h-7 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="lab-accreditation" className="text-xs font-medium text-slate-700">
              Accreditation Number <span className="text-xs text-slate-500">(Optional)</span>
            </Label>
            <Input
              id="lab-accreditation"
              value={data.accreditation_no}
              onChange={(e) => onUpdate({ ...data, accreditation_no: e.target.value })}
              placeholder="NABL or other accreditation"
              className="h-7 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-800 border-b border-slate-200 pb-1">
          Location
        </h3>

        <div className="space-y-1">
          <Label htmlFor="lab-location" className="text-xs font-medium text-slate-700">
            Laboratory Location <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="lab-location"
            value={data.location}
            onChange={(e) => onUpdate({ ...data, location: e.target.value })}
            placeholder="Complete laboratory address with city, state"
            className="min-h-[30px] text-sm resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};