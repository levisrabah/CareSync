import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Appointment, Patient, Doctor } from '../../types';
import { useApp } from '../../context/AppContext';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  patients: Record<string, Patient>;
  doctors: Record<string, Doctor>;
}

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  scheduled: 'info',
  completed: 'success',
  cancelled: 'error',
  'no-show': 'warning'
};

export const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
  patients,
  doctors
}) => {
  const { handleViewAllAppointments, handleRescheduleAppointment, handleSendReminder } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        <Button variant="outline" size="sm" onClick={handleViewAllAppointments}>View All</Button>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          ) : (
            appointments.map((appointment) => {
              const patient = patients[appointment.patientId];
              const doctor = doctors[appointment.doctorId];
              
              if (!patient || !doctor) return null;
              
              return (
                <div key={appointment.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <Badge 
                        variant={statusVariant[appointment.status] || 'default'}
                        size="sm"
                        className="ml-2"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {appointment.type} with {doctor.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</p>
                    <div className="flex space-x-2 mt-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRescheduleAppointment(appointment)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleSendReminder(appointment)}
                      >
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};