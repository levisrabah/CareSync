import React, { useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { StatsCard } from '../components/dashboard/StatsCard';
import { UpcomingAppointments } from '../components/dashboard/UpcomingAppointments';
import { ReminderList } from '../components/reminders/ReminderList';
import { Calendar, Users, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { patients, appointments, doctors, reminders, stats } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter(a => a.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, []);

  const patientMap = useMemo(() => {
    return patients.reduce((acc, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, {} as Record<string, typeof patients[0]>);
  }, []);

  const doctorMap = useMemo(() => {
    return doctors.reduce((acc, doctor) => {
      acc[doctor.id] = doctor;
      return acc;
    }, {} as Record<string, typeof doctors[0]>);
  }, []);

  const appointmentMap = useMemo(() => {
    return appointments.reduce((acc, appointment) => {
      acc[appointment.id] = appointment;
      return acc;
    }, {} as Record<string, typeof appointments[0]>);
  }, []);

  const recentReminders = useMemo(() => {
    return reminders
      .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
      .slice(0, 4);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header pageName="Dashboard" />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Patients"
            value={patients.length}
            icon={<Users className="h-5 w-5 text-teal-600" />}
          />
          <StatsCard
            title="Upcoming Appointments"
            value={stats.upcomingAppointments}
            icon={<Calendar className="h-5 w-5 text-teal-600" />}
            change={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Completed Appointments"
            value={stats.completedAppointments}
            icon={<CheckCircle className="h-5 w-5 text-teal-600" />}
          />
          <StatsCard
            title="Follow-up Compliance"
            value={stats.followUpComplianceRate}
            icon={<Activity className="h-5 w-5 text-teal-600" />}
            suffix="%"
            change={{ value: 3, isPositive: true }}
          />
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <UpcomingAppointments 
            appointments={upcomingAppointments}
            patients={patientMap}
            doctors={doctorMap}
          />
          
          {/* Recent Reminders */}
          <ReminderList 
            reminders={recentReminders}
            appointments={appointmentMap}
            patients={patientMap}
          />
        </div>
      </main>
    </div>
  );
};