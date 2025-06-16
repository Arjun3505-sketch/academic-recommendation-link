
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, XCircle, Clock, TrendingUp, Users, FileText, Download, UserCheck } from 'lucide-react';

const HODDashboard = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const [pendingRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'CS2021001',
      department: 'Computer Science',
      professor: 'Dr. Sarah Johnson',
      targetUniversity: 'Stanford University',
      programType: 'Master\'s',
      submittedDate: '2024-01-15',
      cgpa: '8.5',
      urgency: 'High',
      tpoApproval: 'Approved'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'CS2021002',
      department: 'Computer Science',
      professor: 'Dr. Michael Chen',
      targetUniversity: 'MIT',
      programType: 'PhD',
      submittedDate: '2024-01-16',
      cgpa: '9.2',
      urgency: 'Medium',
      tpoApproval: 'Approved'
    }
  ]);

  const departmentData = [
    { name: 'Computer Science', requests: 45, completed: 38 },
    { name: 'Electronics', requests: 32, completed: 28 },
    { name: 'Mechanical', requests: 28, completed: 25 },
    { name: 'Civil', requests: 22, completed: 20 },
    { name: 'Electrical', requests: 18, completed: 16 }
  ];

  const monthlyData = [
    { month: 'Jan', requests: 65, completed: 58 },
    { month: 'Feb', requests: 78, completed: 72 },
    { month: 'Mar', requests: 85, completed: 79 },
    { month: 'Apr', requests: 92, completed: 88 },
    { month: 'May', requests: 88, completed: 82 },
    { month: 'Jun', requests: 76, completed: 71 }
  ];

  const statusData = [
    { name: 'Completed', value: 68, color: '#10B981' },
    { name: 'In Progress', value: 22, color: '#3B82F6' },
    { name: 'Pending', value: 10, color: '#F59E0B' }
  ];

  const professorData = [
    { name: 'Dr. Sarah Johnson', requests: 15, completed: 13, pending: 2 },
    { name: 'Dr. Michael Chen', requests: 12, completed: 10, pending: 2 },
    { name: 'Dr. Priya Sharma', requests: 18, completed: 16, pending: 2 },
    { name: 'Dr. James Wilson', requests: 9, completed: 8, pending: 1 }
  ];

  const handleApprove = (requestId: number) => {
    console.log(`HOD approved request ${requestId}`);
  };

  const handleReject = (requestId: number, reason: string) => {
    console.log(`HOD rejected request ${requestId} with reason: ${reason}`);
  };

  const renderUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={urgencyConfig[urgency as keyof typeof urgencyConfig]}>
        {urgency}
      </Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">HOD Dashboard</h1>
        <p className="text-slate-600 mt-2">Departmental oversight and final approval for LOR requests</p>
      </div>

      <Tabs defaultValue="approval" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approval">Final Approval</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Management</TabsTrigger>
          <TabsTrigger value="analytics">Department Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="approval" className="space-y-6">
          <div className="grid gap-6">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-purple-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{request.studentName}</CardTitle>
                      <CardDescription>
                        {request.studentId} • {request.department} • CGPA: {request.cgpa}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {renderUrgencyBadge(request.urgency)}
                      <Badge className="bg-green-100 text-green-800">
                        TPO: {request.tpoApproval}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">Professor</div>
                        <div className="text-slate-900">{request.professor}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Target University</div>
                        <div className="text-slate-900">{request.targetUniversity}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Program</div>
                        <div className="text-slate-900">{request.programType}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3 pt-4">
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Final Approval
                        </Button>
                        <Button variant="outline">
                          View Documents
                        </Button>
                        <Button variant="outline">
                          Student Profile
                        </Button>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Reason for Rejection (if applicable)
                          </label>
                          <div className="flex space-x-2">
                            <Select onValueChange={setSelectedReason}>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select rejection reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="department-policy">Against Department Policy</SelectItem>
                                <SelectItem value="prof-workload">Professor Overloaded</SelectItem>
                                <SelectItem value="academic-standing">Academic Standing Issues</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              variant="outline"
                              onClick={() => handleReject(request.id, selectedReason)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              disabled={!selectedReason}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                          {selectedReason === 'other' && (
                            <Textarea
                              placeholder="Please specify the reason for rejection..."
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              className="mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty LOR Workload</CardTitle>
              <CardDescription>Monitor professor assignments and workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professorData.map((prof, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <UserCheck className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-medium">{prof.name}</div>
                        <div className="text-sm text-slate-600">
                          {prof.completed} completed, {prof.pending} pending
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Total Requests</div>
                        <div className="font-semibold">{prof.requests}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-slate-900">89</div>
                    <div className="text-sm text-slate-600">Department Requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-slate-900">76</div>
                    <div className="text-sm text-slate-600">Approved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-slate-900">8</div>
                    <div className="text-sm text-slate-600">Pending Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-slate-900">12</div>
                    <div className="text-sm text-slate-600">Active Faculty</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Department Trends</CardTitle>
                <CardDescription>LOR requests in your department over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#7C3AED" name="Total Requests" />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Status Distribution</CardTitle>
                <CardDescription>Current status of department LOR requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {statusData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm text-slate-600">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Faculty Performance</CardTitle>
              <CardDescription>LOR completion rates by faculty members</CardDescription>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={professorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#7C3AED" name="Total Requests" />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HODDashboard;
