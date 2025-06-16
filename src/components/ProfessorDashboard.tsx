
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CheckCircle, Clock, User, FileText, Calendar as CalendarIcon, Search } from 'lucide-react';

const ProfessorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [pendingRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'CS2021001',
      department: 'Computer Science',
      targetUniversity: 'Stanford University',
      programType: 'Master\'s',
      submittedDate: '2024-01-15',
      documents: ['resume.pdf', 'transcripts.pdf'],
      urgency: 'High'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'CS2021002',
      department: 'Computer Science',
      targetUniversity: 'MIT',
      programType: 'PhD',
      submittedDate: '2024-01-16',
      documents: ['resume.pdf', 'sop.pdf', 'transcripts.pdf'],
      urgency: 'Medium'
    }
  ]);

  const [pastLORs] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'CS2020001',
      university: 'Harvard University',
      program: 'Master\'s',
      date: '2023-12-15',
      status: 'Completed'
    },
    {
      id: 2,
      studentName: 'Bob Wilson',
      studentId: 'CS2020002',
      university: 'Carnegie Mellon',
      program: 'PhD',
      date: '2023-11-20',
      status: 'Completed'
    }
  ]);

  const [draftContent, setDraftContent] = useState({
    introduction: '',
    body: '',
    conclusion: ''
  });

  const handleApprove = (requestId: number) => {
    console.log(`Approved request ${requestId}`);
  };

  const handleReject = (requestId: number) => {
    console.log(`Rejected request ${requestId}`);
  };

  const generateAIDraft = () => {
    setDraftContent({
      introduction: "I am writing to provide my strongest recommendation for [Student Name], who has been my student in [Course Name] during [Semester/Year]. Based on my interaction with [him/her] over the past [duration], I can confidently state that [he/she] is among the top students I have had the privilege to teach.",
      body: "[Student Name] has consistently demonstrated exceptional academic performance, achieving [specific grades/achievements]. [His/Her] analytical thinking and problem-solving abilities are particularly noteworthy. During [specific project/assignment], [he/she] showed remarkable [specific skills/qualities]. [His/Her] dedication to learning and research is evident from [specific examples]. I have been particularly impressed by [his/her] ability to [specific ability] and [his/her] contribution to [specific contribution].",
      conclusion: "In conclusion, I recommend [Student Name] without reservation for [program/position]. [He/She] has the intellectual capacity, dedication, and character necessary to excel in graduate studies. I am confident that [he/she] will make significant contributions to your program and will benefit greatly from the opportunities it provides."
    });
  };

  const renderUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={urgencyConfig[urgency as keyof typeof urgencyConfig]}>
        {urgency} Priority
      </Badge>
    );
  };

  const filteredPastLORs = pastLORs.filter(lor => 
    lor.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lor.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Professor Dashboard</h1>
        <p className="text-slate-600 mt-2">Manage LOR requests and create personalized recommendations</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="draft">LOR Draft Tool</TabsTrigger>
          <TabsTrigger value="calendar">Schedule Meeting</TabsTrigger>
          <TabsTrigger value="repository">LOR Repository</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        {request.studentName}
                      </CardTitle>
                      <CardDescription>
                        {request.studentId} • {request.department} • Submitted: {request.submittedDate}
                      </CardDescription>
                    </div>
                    {renderUrgencyBadge(request.urgency)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">Target University</div>
                        <div className="text-slate-900">{request.targetUniversity}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Program Type</div>
                        <div className="text-slate-900">{request.programType}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Documents Submitted</div>
                      <div className="flex flex-wrap gap-2">
                        {request.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>LOR Draft Tool</CardTitle>
              <CardDescription>Create and edit personalized letters of recommendation</CardDescription>
              <div className="flex space-x-4">
                <Button onClick={generateAIDraft} className="bg-blue-600 hover:bg-blue-700">
                  Generate AI Draft
                </Button>
                <Button variant="outline">Load Template</Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Introduction</label>
                <Textarea
                  value={draftContent.introduction}
                  onChange={(e) => setDraftContent({...draftContent, introduction: e.target.value})}
                  placeholder="Write the introduction paragraph..."
                  className="min-h-24"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Body</label>
                <Textarea
                  value={draftContent.body}
                  onChange={(e) => setDraftContent({...draftContent, body: e.target.value})}
                  placeholder="Write the main body of the recommendation..."
                  className="min-h-40"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Conclusion</label>
                <Textarea
                  value={draftContent.conclusion}
                  onChange={(e) => setDraftContent({...draftContent, conclusion: e.target.value})}
                  placeholder="Write the concluding paragraph..."
                  className="min-h-24"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Save & Send
                </Button>
                <Button variant="outline">Preview</Button>
                <Button variant="outline">Export PDF</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Meeting</CardTitle>
                <CardDescription>Select a date to meet with students for LOR discussion</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>
                  {selectedDate ? `Available slots for ${selectedDate.toDateString()}` : 'Select a date to view available slots'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'].map((time, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                      <span className="font-medium">{time}</span>
                      <Button size="sm" variant="outline">
                        Book Slot
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="repository">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>LOR Repository</CardTitle>
                  <CardDescription>Search and view past Letters of Recommendation</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by student name or university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPastLORs.map((lor) => (
                  <div key={lor.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50">
                    <div>
                      <div className="font-medium text-slate-900">{lor.studentName}</div>
                      <div className="text-sm text-slate-600">
                        {lor.studentId} • {lor.university} • {lor.program}
                      </div>
                      <div className="text-xs text-slate-500">Created: {lor.date}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">{lor.status}</Badge>
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorDashboard;
