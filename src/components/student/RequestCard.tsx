
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';
import { LORRequest } from '@/types/studentTypes';

interface RequestCardProps {
  request: LORRequest;
}

const RequestCard = ({ request }: RequestCardProps) => {
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
    <Card className="border-l-4 border-l-blue-600">
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
  );
};

export default RequestCard;
