export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory: string;
  preferredChannel: 'sms' | 'email' | 'whatsapp';
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  type: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  followUpInterval?: number; // in days
}

export interface Reminder {
  id: string;
  appointmentId: string;
  channel: 'sms' | 'email' | 'whatsapp';
  scheduledDate: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

export interface ReminderTemplate {
  id: string;
  name: string;
  message: string;
  appointmentType: string;
}

export interface Stats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  followUpComplianceRate: number;
}