import React, { useState } from 'react';
import { Patient } from '../../types';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Search, UserPlus, Mail, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PatientListProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ patients, onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleAddPatient } = useApp();
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const getChannelIcon = (channel: 'sms' | 'email' | 'whatsapp') => {
    switch (channel) {
      case 'sms':
        return <Phone className="h-4 w-4 text-gray-400" />;
      case 'email':
        return <Mail className="h-4 w-4 text-gray-400" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Patients</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="primary"
            icon={<UserPlus className="h-4 w-4" />}
            onClick={handleAddPatient}
          >
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden p-0">
        <div className="divide-y divide-gray-200">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No patients found</p>
            </div>
          ) : (
            filteredPatients.map(patient => (
              <div 
                key={patient.id} 
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onPatientSelect(patient)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        {patient.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Preferred:</span>
                      {getChannelIcon(patient.preferredChannel)}
                    </div>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};