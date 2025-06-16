import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Clock, CheckCircle, User, Mail, Phone } from 'lucide-react';

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  cgpa: string;
}

interface AcademicDetails {
  course: string;
  semester: string;
  specialization: string;
  targetUniversity: string;
  programType: string;
}

interface Documents {
  resume: File | null;
  sop: File | null;
  transcripts: File | null;
}

interface RequestForm {
  personalDetails: PersonalDetails;
  academicDetails: AcademicDetails;
  professorSelection: string;
  documents: Documents;
}

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

  const [requests] = useState([
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

  const handleInputChange = (section: keyof RequestForm, field: string, value: any) => {
    setRequestForm(prev => {
      if (section === 'personalDetails') {
        return {
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            [field]: value
          }
        };
      } else if (section === 'academicDetails') {
        return {
          ...prev,
          academicDetails: {
            ...prev.academicDetails,
            [field]: value
          }
        };
      } else if (section === 'professorSelection') {
        return {
          ...prev,
          professorSelection: value
        };
      }
      return prev;
    });
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

  const renderStatusBadge = (status: string) => {
    const statusConfig = {
      'Under Review': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'In Progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Under Review'];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
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
              <Card key={request.id} className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{request.professor}</CardTitle>
                      <CardDescription>
                        Submitted: {request.submittedDate} | Expected: {request.expectedDate}
                      </CardDescription>
                    </div>
                    {renderStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{request.progress}%</span>
                      </div>
                      <Progress value={request.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {request.stages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            stage.status === 'completed' ? 'bg-green-500 text-white' :
                            stage.status === 'current' ? 'bg-blue-500 text-white' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {stage.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="text-xs font-medium">{stage.name}</div>
                          {stage.date && (
                            <div className="text-xs text-slate-500">{stage.date}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              {/* Personal Details */}
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
                      value={requestForm.personalDetails.fullName}
                      onChange={(e) => handleInputChange('personalDetails', 'fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={requestForm.personalDetails.email}
                      onChange={(e) => handleInputChange('personalDetails', 'email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={requestForm.personalDetails.phone}
                      onChange={(e) => handleInputChange('personalDetails', 'phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={requestForm.personalDetails.studentId}
                      onChange={(e) => handleInputChange('personalDetails', 'studentId', e.target.value)}
                      placeholder="Enter your student ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => handleInputChange('personalDetails', 'department', value)}>
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
                    <Select onValueChange={(value) => handleInputChange('personalDetails', 'year', value)}>
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

              {/* Academic Details */}
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
                      value={requestForm.academicDetails.targetUniversity}
                      onChange={(e) => handleInputChange('academicDetails', 'targetUniversity', e.target.value)}
                      placeholder="Enter target university"
                    />
                  </div>
                  <div>
                    <Label htmlFor="programType">Program Type</Label>
                    <Select onValueChange={(value) => handleInputChange('academicDetails', 'programType', value)}>
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

              {/* Professor Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Professor Selection</h3>
                <Select onValueChange={(value) => handleInputChange('professorSelection', '', value)}>
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

              {/* Document Upload */}
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
                      onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sop">Statement of Purpose (Optional)</Label>
                    <Input
                      id="sop"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('sop', e.target.files?.[0] || null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transcripts">Academic Transcripts</Label>
                    <Input
                      id="transcripts"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload('transcripts', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>

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
