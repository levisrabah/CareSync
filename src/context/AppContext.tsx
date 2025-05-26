import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, Appointment, Doctor, ReminderTemplate } from '../types';
import { doctors, reminderTemplates } from '../data/mockData';

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

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSignOut = () => {
    alert('Sign out functionality will be implemented with authentication');
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

  return (
    <AppContext.Provider value={{ 
      currentPage, 
      setCurrentPage,
      isSidebarOpen,
      toggleSidebar,
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
      availableDoctors: doctors,
      reminderTemplates
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