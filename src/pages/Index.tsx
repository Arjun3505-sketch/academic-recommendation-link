
import React, { useState } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import StudentDashboard from '@/components/StudentDashboard';
import ProfessorDashboard from '@/components/ProfessorDashboard';
import TPODashboard from '@/components/TPODashboard';
import HODDashboard from '@/components/HODDashboard';

const Index = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const handleLogin = (credentials: { email: string; password: string; role: string }) => {
    // Simulate login - in real app, this would make API call
    const userNames = {
      student: 'John Doe',
      professor: 'Dr. Sarah Johnson',
      tpo: 'Michael Smith',
      hod: 'Dr. Priya Sharma'
    };
    
    setUser({
      name: userNames[credentials.role as keyof typeof userNames],
      email: credentials.email,
      role: credentials.role.toUpperCase()
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role.toLowerCase()) {
      case 'student':
        return <StudentDashboard />;
      case 'professor':
        return <ProfessorDashboard />;
      case 'tpo':
        return <TPODashboard />;
      case 'hod':
        return <HODDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      {user ? renderDashboard() : <LandingPage onLogin={handleLogin} />}
    </div>
  );
};

export default Index;
