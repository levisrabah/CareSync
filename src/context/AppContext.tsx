import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, Appointment, Doctor, ReminderTemplate } from '../types';
import { usePatients } from '../hooks/usePatients';
import { useAppointments } from '../hooks/useAppointments';
import * as api from '../services/api';

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleSignOut: () => void;
  handleScheduleAppointment: (patient?: Patient) => void;
  handleSendReminder: (appointment: Appointment) => void;
  handleEditPatient: (patient: Patient) => void;
  handleAddPatient: () => void;
  handleViewAllAppointments: () => void;
  handleViewAllReminders: () => void;
  handleRescheduleAppointment: (appointment: Appointment) => void;
  isPatientModalOpen: boolean;
  setIsPatientModalOpen: (isOpen: boolean) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (isOpen: boolean) => void;
  isReminderModalOpen: boolean;
  setIsReminderModalOpen: (isOpen: boolean) => void;
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  availableDoctors: Doctor[];
  reminderTemplates: ReminderTemplate[];
  patients: Patient[];
  patientsLoading: boolean;
  appointments: Appointment[];
  appointmentsLoading: boolean;
  handleSavePatient: (patientData: Partial<Patient>) => Promise<void>;
  handleSaveAppointment: (appointmentData: Partial<Appointment>) => Promise<void>;
  handleSendReminderMessage: (message: string, channel: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  // Use our custom hooks
  const { 
    patients, 
    loading: patientsLoading, 
    addPatient, 
    updatePatient 
  } = usePatients();

  const { 
    appointments, 
    loading: appointmentsLoading, 
    addAppointment, 
    updateAppointment 
  } = useAppointments();

  // Fetch doctors on mount
  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors = await api.getDoctors();
        setAvailableDoctors(doctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSignOut = () => {
    // This will be handled by AuthContext
  };

  const handleScheduleAppointment = (patient?: Patient) => {
    if (patient) {
      setSelectedPatient(patient);
    }
    setIsAppointmentModalOpen(true);
  };

  const handleSendReminder = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsReminderModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsPatientModalOpen(true);
  };

  const handleViewAllAppointments = () => {
    setCurrentPage('appointments');
  };

  const handleViewAllReminders = () => {
    setCurrentPage('reminders');
  };

  const handleRescheduleAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
  };

  const handleSavePatient = async (patientData: Partial<Patient>) => {
    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, patientData);
      } else {
        await addPatient(patientData as Omit<Patient, 'id'>);
      }
      setIsPatientModalOpen(false);
    } catch (error) {
      console.error('Failed to save patient:', error);
      throw error;
    }
  };

  const handleSaveAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.id, appointmentData);
      } else {
        await addAppointment(appointmentData as Omit<Appointment, 'id'>);
      }
      setIsAppointmentModalOpen(false);
    } catch (error) {
      console.error('Failed to save appointment:', error);
      throw error;
    }
  };

  const handleSendReminderMessage = async (message: string, channel: string) => {
    if (!selectedAppointment) return;

    try {
      await api.createReminder({
        appointmentId: selectedAppointment.id,
        message,
        channel,
        scheduledDate: new Date().toISOString(),
        status: 'pending'
      });
      setIsReminderModalOpen(false);
    } catch (error) {
      console.error('Failed to send reminder:', error);
      throw error;
    }
  };

  // Default reminder templates
  const reminderTemplates: ReminderTemplate[] = [
    {
      id: '1',
      name: 'Standard Follow-up',
      message: 'Hello {patientName}, this is a reminder of your follow-up appointment on {date} at {time}.',
      appointmentType: 'Follow-up'
    },
    {
      id: '2',
      name: 'Annual Check-up',
      message: 'Hello {patientName}, your annual check-up is scheduled for {date} at {time}.',
      appointmentType: 'Annual check-up'
    }
  ];

  return (
    <AppContext.Provider value={{ 
      currentPage, 
      setCurrentPage,
      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen(prev => !prev),
      handleSignOut,
      handleScheduleAppointment,
      handleSendReminder,
      handleEditPatient,
      handleAddPatient,
      handleViewAllAppointments,
      handleViewAllReminders,
      handleRescheduleAppointment,
      isPatientModalOpen,
      setIsPatientModalOpen,
      isAppointmentModalOpen,
      setIsAppointmentModalOpen,
      isReminderModalOpen,
      setIsReminderModalOpen,
      selectedAppointment,
      setSelectedAppointment,
      selectedPatient,
      setSelectedPatient,
      availableDoctors,
      reminderTemplates,
      patients,
      patientsLoading,
      appointments,
      appointmentsLoading,
      handleSavePatient,
      handleSaveAppointment,
      handleSendReminderMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};