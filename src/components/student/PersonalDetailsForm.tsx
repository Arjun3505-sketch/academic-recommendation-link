
import React from 'react';
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersonalDetails } from '@/types/studentTypes';

interface PersonalDetailsFormProps {
  personalDetails: PersonalDetails;
  onInputChange: (field: string, value: string) => void;
}

const PersonalDetailsForm = ({ personalDetails, onInputChange }: PersonalDetailsFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={personalDetails.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalDetails.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={personalDetails.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            value={personalDetails.studentId}
            onChange={(e) => onInputChange('studentId', e.target.value)}
            placeholder="Enter your student ID"
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value) => onInputChange('department', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cse">Computer Science</SelectItem>
              <SelectItem value="ece">Electronics & Communication</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
              <SelectItem value="ce">Civil Engineering</SelectItem>
              <SelectItem value="ee">Electrical Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Select onValueChange={(value) => onInputChange('year', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
