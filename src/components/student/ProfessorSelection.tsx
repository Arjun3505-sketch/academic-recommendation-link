
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfessorSelectionProps {
  professorSelection: string;
  onSelectionChange: (value: string) => void;
}

const ProfessorSelection = ({ professorSelection, onSelectionChange }: ProfessorSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Professor Selection</h3>
      <Select onValueChange={onSelectionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select preferred professor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dr-sarah-johnson">Dr. Sarah Johnson - Computer Science</SelectItem>
          <SelectItem value="dr-michael-chen">Dr. Michael Chen - Electronics</SelectItem>
          <SelectItem value="dr-priya-sharma">Dr. Priya Sharma - Mechanical</SelectItem>
          <SelectItem value="dr-james-wilson">Dr. James Wilson - Civil</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfessorSelection;
