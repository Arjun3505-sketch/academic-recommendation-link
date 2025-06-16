
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { RequestForm, LORRequest, Documents, PersonalDetails, AcademicDetails } from '@/types/studentTypes';
import PersonalDetailsForm from './student/PersonalDetailsForm';
import AcademicDetailsForm from './student/AcademicDetailsForm';
import DocumentUploadForm from './student/DocumentUploadForm';
import RequestCard from './student/RequestCard';
import ProfessorSelection from './student/ProfessorSelection';

const StudentDashboard = () => {
  const [requestForm, setRequestForm] = useState<RequestForm>({
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      year: '',
      cgpa: ''
    },
    academicDetails: {
      course: '',
      semester: '',
      specialization: '',
      targetUniversity: '',
      programType: ''
    },
    professorSelection: '',
    documents: {
      resume: null,
      sop: null,
      transcripts: null
    }
  });

  const [requests] = useState<LORRequest[]>([
    {
      id: 1,
      professor: 'Dr. Sarah Johnson',
      status: 'Under Review',
      progress: 25,
      submittedDate: '2024-01-15',
      expectedDate: '2024-02-15',
      stages: [
        { name: 'Submitted', status: 'completed', date: '2024-01-15' },
        { name: 'TPO Review', status: 'current', date: null },
        { name: 'HOD Approval', status: 'pending', date: null },
        { name: 'Professor Review', status: 'pending', date: null }
      ]
    },
    {
      id: 2,
      professor: 'Dr. Michael Chen',
      status: 'In Progress',
      progress: 75,
      submittedDate: '2024-01-10',
      expectedDate: '2024-02-10',
      stages: [
        { name: 'Submitted', status: 'completed', date: '2024-01-10' },
        { name: 'TPO Review', status: 'completed', date: '2024-01-12' },
        { name: 'HOD Approval', status: 'completed', date: '2024-01-14' },
        { name: 'Professor Review', status: 'current', date: null }
      ]
    }
  ]);

  const handlePersonalDetailsChange = (field: string, value: string) => {
    setRequestForm(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const handleAcademicDetailsChange = (field: string, value: string) => {
    setRequestForm(prev => ({
      ...prev,
      academicDetails: {
        ...prev.academicDetails,
        [field]: value
      }
    }));
  };

  const handleProfessorSelectionChange = (value: string) => {
    setRequestForm(prev => ({
      ...prev,
      professorSelection: value
    }));
  };

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setRequestForm(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-600 mt-2">Manage your LOR requests and track their progress</p>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="documents">Document Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <div className="grid gap-6">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new-request">
          <Card>
            <CardHeader>
              <CardTitle>New LOR Request</CardTitle>
              <CardDescription>Fill out the form below to submit a new Letter of Recommendation request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <PersonalDetailsForm
                personalDetails={requestForm.personalDetails}
                onInputChange={handlePersonalDetailsChange}
              />

              <AcademicDetailsForm
                academicDetails={requestForm.academicDetails}
                onInputChange={handleAcademicDetailsChange}
              />

              <ProfessorSelection
                professorSelection={requestForm.professorSelection}
                onSelectionChange={handleProfessorSelectionChange}
              />

              <DocumentUploadForm
                documents={requestForm.documents}
                onFileUpload={handleFileUpload}
              />

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Submit LOR Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Hub</CardTitle>
              <CardDescription>Manage and upload additional documents for your LOR requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No additional documents</h3>
                <p className="text-gray-500 mb-4">Upload additional documents as requested by your professors</p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
