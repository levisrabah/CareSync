import { Patient, Appointment, Doctor, Reminder, ReminderTemplate, Stats } from '../types';

// Sample data for testing and development
export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    preferredChannel: 'sms'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1987654321',
    medicalHistory: 'Asthma, Allergies',
    preferredChannel: 'email'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '+1122334455',
    medicalHistory: 'Heart disease, Arthritis',
    preferredChannel: 'whatsapp'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    phone: '+1567890123',
    medicalHistory: 'Migraine, Anxiety',
    preferredChannel: 'sms'
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@example.com',
    phone: '+1456789012',
    medicalHistory: 'Chronic back pain',
    preferredChannel: 'whatsapp'
  }
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Amanda Chen',
    specialization: 'Cardiology',
    email: 'dr.chen@clinic.com',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Dr. Robert Williams',
    specialization: 'Neurology',
    email: 'dr.williams@clinic.com',
    phone: '+1987654321'
  },
  {
    id: '3',
    name: 'Dr. Maria Garcia',
    specialization: 'Endocrinology',
    email: 'dr.garcia@clinic.com',
    phone: '+1122334455'
  }
];

// Create dates relative to current date for more realistic data
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: tomorrow.toISOString(),
    type: 'Follow-up',
    notes: 'Check blood pressure medication effectiveness',
    status: 'scheduled',
    followUpInterval: 30
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    date: nextWeek.toISOString(),
    type: 'Annual check-up',
    notes: 'Annual diabetes management review',
    status: 'scheduled',
    followUpInterval: 90
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '2',
    date: lastWeek.toISOString(),
    type: 'Consultation',
    notes: 'Review recent test results',
    status: 'completed',
    followUpInterval: 14
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '2',
    date: yesterday.toISOString(),
    type: 'Emergency',
    notes: 'Severe migraine episode',
    status: 'completed',
    followUpInterval: 7
  },
  {
    id: '5',
    patientId: '5',
    doctorId: '1',
    date: yesterday.toISOString(),
    type: 'Treatment',
    notes: 'Physical therapy session',
    status: 'no-show'
  }
];

export const reminders: Reminder[] = [
  {
    id: '1',
    appointmentId: '1',
    channel: 'sms',
    scheduledDate: today.toISOString(),
    message: 'Reminder: You have an appointment with Dr. Chen tomorrow at 10:00 AM.',
    status: 'sent'
  },
  {
    id: '2',
    appointmentId: '2',
    channel: 'email',
    scheduledDate: today.toISOString(),
    message: 'Reminder: You have an annual check-up with Dr. Garcia next week on Monday at 2:00 PM.',
    status: 'pending'
  },
  {
    id: '3',
    appointmentId: '3',
    channel: 'whatsapp',
    scheduledDate: lastWeek.toISOString(),
    message: 'Reminder: Follow-up appointment with Dr. Williams tomorrow at 11:30 AM. Please bring your test results.',
    status: 'delivered'
  },
  {
    id: '4',
    appointmentId: '4',
    channel: 'sms',
    scheduledDate: yesterday.toISOString(),
    message: 'Reminder: Your follow-up appointment with Dr. Williams is scheduled for tomorrow at 9:00 AM.',
    status: 'failed'
  }
];

export const reminderTemplates: ReminderTemplate[] = [
  {
    id: '1',
    name: 'Standard Follow-up',
    message: 'Hello {patientName}, this is a reminder of your follow-up appointment with {doctorName} on {date} at {time}. Please reply to confirm.',
    appointmentType: 'Follow-up'
  },
  {
    id: '2',
    name: 'Annual Check-up',
    message: 'Hello {patientName}, your annual check-up with {doctorName} is scheduled for {date} at {time}. Please remember to fast for 8 hours before your appointment.',
    appointmentType: 'Annual check-up'
  },
  {
    id: '3',
    name: 'Pre-Surgery',
    message: 'Hello {patientName}, your surgery preparation appointment with {doctorName} is on {date} at {time}. Please bring all your medication list and recent test results.',
    appointmentType: 'Pre-Surgery'
  }
];

export const stats: Stats = {
  totalAppointments: 125,
  upcomingAppointments: 42,
  completedAppointments: 78,
  missedAppointments: 5,
  followUpComplianceRate: 92
};