import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { PatientsPage } from './pages/PatientsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { Sidebar } from './components/layout/Sidebar';
import { AppProvider, useApp } from './context/AppContext';
import { PatientModal } from './components/modals/PatientModal';
import { AppointmentModal } from './components/modals/AppointmentModal';
import { ReminderModal } from './components/modals/ReminderModal';
import Modal from 'react-modal';
import { patients } from './data/mockData';

// Set the app element for react-modal
Modal.setAppElement('#root');

const MainApp: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    isSidebarOpen, 
    toggleSidebar,
    isPatientModalOpen,
    setIsPatientModalOpen,
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    isReminderModalOpen,
    setIsReminderModalOpen,
    selectedAppointment,
    selectedPatient,
    availableDoctors,
    reminderTemplates
  } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'patients':
        return <PatientsPage />;
      case 'appointments':
        return <AppointmentsPage />;
      default:
        return <DashboardPage />;
    }
  };

  const handleSavePatient = (patientData: Partial<Patient>) => {
    console.log('Saving patient:', patientData);
    setIsPatientModalOpen(false);
    // In a real app, this would save to the database
  };

  const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
    console.log('Saving appointment:', appointmentData);
    setIsAppointmentModalOpen(false);
    // In a real app, this would save to the database
  };

  const handleSendReminder = (message: string, channel: 'sms' | 'email' | 'whatsapp') => {
    console.log('Sending reminder:', { message, channel });
    setIsReminderModalOpen(false);
    // In a real app, this would send the reminder through the selected channel
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        {renderPage()}
      </div>

      {/* Modals */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSave={handleSavePatient}
        patient={selectedPatient || undefined}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        onSave={handleSaveAppointment}
        appointment={selectedAppointment || undefined}
        patient={selectedPatient || undefined}
        doctors={availableDoctors}
      />

      {selectedAppointment && (
        <ReminderModal
          isOpen={isReminderModalOpen}
          onClose={() => setIsReminderModalOpen(false)}
          onSend={handleSendReminder}
          appointment={selectedAppointment}
          patient={patients.find(p => p.id === selectedAppointment.patientId)!}
          templates={reminderTemplates}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;