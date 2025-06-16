
import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AcademicDetails } from '@/types/studentTypes';

interface AcademicDetailsFormProps {
  academicDetails: AcademicDetails;
  onInputChange: (field: string, value: string) => void;
}

const AcademicDetailsForm = ({ academicDetails, onInputChange }: AcademicDetailsFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Academic Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="targetUniversity">Target University</Label>
          <Input
            id="targetUniversity"
            value={academicDetails.targetUniversity}
            onChange={(e) => onInputChange('targetUniversity', e.target.value)}
            placeholder="Enter target university"
          />
        </div>
        <div>
          <Label htmlFor="programType">Program Type</Label>
          <Select onValueChange={(value) => onInputChange('programType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select program type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masters">Master's</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="research">Research Program</SelectItem>
              <SelectItem value="job">Job Application</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AcademicDetailsForm;
