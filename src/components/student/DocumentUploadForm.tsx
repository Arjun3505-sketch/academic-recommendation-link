
import React from 'react';
import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Documents } from '@/types/studentTypes';

interface DocumentUploadFormProps {
  documents: Documents;
  onFileUpload: (field: keyof Documents, file: File | null) => void;
}

const DocumentUploadForm = ({ documents, onFileUpload }: DocumentUploadFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Upload className="w-5 h-5 mr-2" />
        Document Upload
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="resume">Resume/CV</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => onFileUpload('resume', e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <Label htmlFor="sop">Statement of Purpose (Optional)</Label>
          <Input
            id="sop"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => onFileUpload('sop', e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <Label htmlFor="transcripts">Academic Transcripts</Label>
          <Input
            id="transcripts"
            type="file"
            accept=".pdf"
            onChange={(e) => onFileUpload('transcripts', e.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
