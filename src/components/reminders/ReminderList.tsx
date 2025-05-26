import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reminder, Appointment, Patient } from '../../types';
import { MessageSquare, Mail, Phone, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ReminderListProps {
  reminders: Reminder[];
  appointments: Record<string, Appointment>;
  patients: Record<string, Patient>;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  appointments,
  patients
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'sms':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'sent':
        return 'info';
      case 'delivered':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Reminders</h3>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {reminders.map(reminder => {
            const appointment = appointments[reminder.appointmentId];
            if (!appointment) return null;
            
            const patient = patients[appointment.patientId];
            if (!patient) return null;

            return (
              <div key={reminder.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <Badge 
                        variant={getStatusVariant(reminder.status)}
                        size="sm"
                        className="ml-2 flex items-center space-x-1"
                      >
                        <span>{getStatusIcon(reminder.status)}</span>
                        <span>{reminder.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {appointment.type} reminder sent via {' '}
                      <span className="inline-flex items-center">
                        {getChannelIcon(reminder.channel)}
                        <span className="ml-1">{reminder.channel}</span>
                      </span>
                    </p>
                    <div className="bg-gray-50 p-2 rounded-md text-sm text-gray-600 mt-2">
                      {reminder.message.length > 100 
                        ? `${reminder.message.substring(0, 100)}...` 
                        : reminder.message}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(reminder.scheduledDate)}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="ghost" size="sm">Resend</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};