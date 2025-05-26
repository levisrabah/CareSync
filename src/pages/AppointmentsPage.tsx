import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { appointments, patients, doctors } from '../data/mockData';

export const AppointmentsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getFormattedDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const getDaysInWeek = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatAppointmentTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'no-show':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header pageName="Appointments" />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Card className="mb-6">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button onClick={handlePrevious} className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                </button>
                <h2 className="text-xl font-bold text-gray-900 mx-2">{getFormattedDate(currentDate)}</h2>
                <button onClick={handleNext} className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="flex bg-gray-100 rounded-md p-1">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${view === 'day' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setView('day')}
                >
                  Day
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${view === 'week' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setView('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${view === 'month' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setView('month')}
                >
                  Month
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                icon={<Filter className="h-4 w-4" />}
              >
                Filter
              </Button>
              <Button 
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
              >
                New Appointment
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {view === 'week' && (
              <div className="grid grid-cols-7 gap-4">
                {getDaysInWeek().map((day, index) => (
                  <div key={index} className="min-h-[50vh]">
                    <div className={`text-center p-2 rounded-t-md ${isToday(day) ? 'bg-teal-50 text-teal-700 font-bold' : 'bg-gray-50'}`}>
                      <p className="text-sm font-medium">{daysOfWeek[day.getDay()]}</p>
                      <p className={`text-2xl ${isToday(day) ? 'text-teal-700' : 'text-gray-900'}`}>{day.getDate()}</p>
                    </div>
                    
                    <div className="mt-2 space-y-2">
                      {getAppointmentsForDate(day).map(appointment => {
                        const patient = patients.find(p => p.id === appointment.patientId);
                        const doctor = doctors.find(d => d.id === appointment.doctorId);
                        
                        if (!patient || !doctor) return null;
                        
                        return (
                          <div 
                            key={appointment.id} 
                            className="bg-white border border-gray-200 p-2 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                              <Badge variant={getStatusVariant(appointment.status)} size="sm">
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{appointment.type}</p>
                            <p className="text-xs text-gray-500">
                              <span className="font-medium">{formatAppointmentTime(appointment.date)}</span> • Dr. {doctor.name.split(' ')[1]}
                            </p>
                          </div>
                        );
                      })}
                      
                      {getAppointmentsForDate(day).length === 0 && (
                        <div className="h-24 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
                          <p className="text-sm text-gray-400">No appointments</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};