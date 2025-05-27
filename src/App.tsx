import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { PatientsPage } from './pages/PatientsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { LoginPage } from './pages/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientModal } from './components/modals/PatientModal';
import { AppointmentModal } from './components/modals/AppointmentModal';
import { ReminderModal } from './components/modals/ReminderModal';
import Modal from 'react-modal';

// Set the app element for react-modal
Modal.setAppElement('#root');

const MainApp: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
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
    reminderTemplates,
    handleSavePatient,
    handleSaveAppointment,
    handleSendReminderMessage
  } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        onSignOut={handleSignOut}
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
          onSend={handleSendReminderMessage}
          appointment={selectedAppointment}
          patient={selectedPatient!}
          templates={reminderTemplates}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;