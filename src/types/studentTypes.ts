
export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  cgpa: string;
}

export interface AcademicDetails {
  course: string;
  semester: string;
  specialization: string;
  targetUniversity: string;
  programType: string;
}

export interface Documents {
  resume: File | null;
  sop: File | null;
  transcripts: File | null;
}

export interface RequestForm {
  personalDetails: PersonalDetails;
  academicDetails: AcademicDetails;
  professorSelection: string;
  documents: Documents;
}

export interface RequestStage {
  name: string;
  status: 'completed' | 'current' | 'pending';
  date: string | null;
}

export interface LORRequest {
  id: number;
  professor: string;
  status: string;
  progress: number;
  submittedDate: string;
  expectedDate: string;
  stages: RequestStage[];
}
