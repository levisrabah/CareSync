import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, Appointment } from '../types';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSignOut = () => {
    // In a real app, this would handle authentication
    alert('Sign out functionality will be implemented with authentication');
  };

  const handleScheduleAppointment = (patient?: Patient) => {
    setCurrentPage('appointments');
    alert(`Schedule appointment${patient ? ` for ${patient.name}` : ''}`);
  };

  const handleSendReminder = (appointment: Appointment) => {
    alert(`Sending reminder for appointment ${appointment.id}`);
  };

  const handleEditPatient = (patient: Patient) => {
    alert(`Edit patient: ${patient.name}`);
  };

  const handleAddPatient = () => {
    alert('Add new patient');
  };

  const handleViewAllAppointments = () => {
    setCurrentPage('appointments');
  };

  const handleViewAllReminders = () => {
    setCurrentPage('reminders');
  };

  const handleRescheduleAppointment = (appointment: Appointment) => {
    alert(`Reschedule appointment ${appointment.id}`);
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
      handleRescheduleAppointment
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