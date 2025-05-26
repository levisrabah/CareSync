import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { PatientList } from '../components/patients/PatientList';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { patients, appointments } from '../data/mockData';
import { Patient, Appointment } from '../types';
import { Calendar, Clock, AlertCircle, CheckCircle, UserX } from 'lucide-react';

export const PatientsPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const getPatientAppointments = (patientId: string): Appointment[] => {
    return appointments.filter(appointment => appointment.patientId === patientId);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'no-show':
        return <UserX className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header pageName="Patients" />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <PatientList 
              patients={patients}
              onPatientSelect={setSelectedPatient}
            />
          </div>
          
          {/* Patient Details */}
          <div>
            {selectedPatient ? (
              <Card className="h-full">
                <CardHeader className="flex flex-col items-start">
                  <div className="w-full flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <span className="text-xl font-bold text-teal-700">
                        {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h2 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-sm text-gray-500">Patient ID: {selectedPatient.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                      <div className="bg-gray-50 p-3 rounded-md space-y-2">
                        <div className="flex items-start">
                          <span className="text-gray-500 w-16">Email:</span>
                          <span className="text-gray-900">{selectedPatient.email}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-16">Phone:</span>
                          <span className="text-gray-900">{selectedPatient.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-16">Preferred:</span>
                          <span className="text-gray-900 capitalize">{selectedPatient.preferredChannel}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Medical History</h4>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-gray-900">{selectedPatient.medicalHistory}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Appointments</h4>
                      <div className="space-y-2">
                        {getPatientAppointments(selectedPatient.id).length === 0 ? (
                          <p className="text-gray-500 text-center py-2">No appointments found</p>
                        ) : (
                          getPatientAppointments(selectedPatient.id).map(appointment => (
                            <div key={appointment.id} className="bg-gray-50 p-3 rounded-md">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 text-teal-600 mr-1" />
                                  <span className="font-medium text-gray-900">{appointment.type}</span>
                                </div>
                                <div className="flex items-center">
                                  {getStatusIcon(appointment.status)}
                                  <span className="ml-1 text-sm capitalize">{appointment.status}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">{formatDate(appointment.date)}</p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-700 mt-1 bg-white p-2 rounded">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button variant="primary">Schedule Appointment</Button>
                      <Button variant="outline">Send Reminder</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                    <UserX className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Patient Selected</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mb-4">
                    Select a patient from the list to view their details and manage their appointments.
                  </p>
                  <Button variant="outline">Add New Patient</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};