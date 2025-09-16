import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FarmerData, FormProps } from '../types';

export const FarmerForm = ({ data, onUpdate }: FormProps<FarmerData>) => {
  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-normal text-black flex items-center">
          <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
          Basic Information
        </h3>
        <div className="space-y-1">
          <Label htmlFor="farmer-id" className="text-xs font-normal text-black">Farmer ID *</Label>
          <Input
            id="farmer-id"
            value={data.farmer_id}
            onChange={(e) => onUpdate({ ...data, farmer_id: e.target.value })}
            placeholder="Enter unique farmer ID"
            className="h-9 max-w-md border-gray-200 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="farmer-name" className="text-xs font-normal text-black">Full Name *</Label>
            <Input
              id="farmer-name"
              value={data.name}
              onChange={(e) => onUpdate({ ...data, name: e.target.value })}
              placeholder="Enter farmer's full name"
              className="h-9 border-gray-200 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="farmer-phone" className="text-xs font-normal text-black">Phone Number *</Label>
            <Input
              id="farmer-phone"
              value={data.phone_number}
              onChange={(e) => onUpdate({ ...data, phone_number: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="h-9 border-gray-200 text-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="farmer-aadhar" className="text-xs font-normal text-black">Aadhar Number (Optional)</Label>
          <Input
            id="farmer-aadhar"
            value={data.aadhar_number}
            onChange={(e) => onUpdate({ ...data, aadhar_number: e.target.value })}
            placeholder="XXXX XXXX XXXX"
            className="h-9 max-w-md border-gray-200 text-sm"
          />
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-normal text-black flex items-center">
          <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
          Farm Location
        </h3>
        <div className="space-y-1">
          <Label htmlFor="farmer-address" className="text-xs font-normal text-black">Farm Address *</Label>
          <Textarea
            id="farmer-address"
            value={data.location.address}
            onChange={(e) => onUpdate({
              ...data,
              location: { ...data.location, address: e.target.value }
            })}
            placeholder="Complete farm address with village, district, state"
            className="min-h-[80px] border-gray-200 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="farmer-lat" className="text-xs font-normal text-black">Latitude (Optional)</Label>
            <Input
              id="farmer-lat"
              type="number"
              step="any"
              value={data.location.lat}
              onChange={(e) => onUpdate({
                ...data,
                location: { ...data.location, lat: parseFloat(e.target.value) || 0 }
              })}
              placeholder="e.g., 12.9716"
              className="h-9 border-gray-200 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="farmer-long" className="text-xs font-normal text-black">Longitude (Optional)</Label>
            <Input
              id="farmer-long"
              type="number"
              step="any"
              value={data.location.long}
              onChange={(e) => onUpdate({
                ...data,
                location: { ...data.location, long: parseFloat(e.target.value) || 0 }
              })}
              placeholder="e.g., 77.5946"
              className="h-9 border-gray-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-normal text-black flex items-center">
          <div className="w-1 h-1 bg-teal-600 rounded-full mr-2"></div>
          Additional Details
        </h3>
        <div className="space-y-1">
          <Label htmlFor="farmer-land" className="text-xs font-normal text-black">Land Records (Optional)</Label>
          <Textarea
            id="farmer-land"
            value={data.land_records}
            onChange={(e) => onUpdate({ ...data, land_records: e.target.value })}
            placeholder="Land ownership documents, survey numbers, etc."
            className="min-h-[80px] border-gray-200 text-sm"
          />
        </div>
      </div>
    </div>
  );
};