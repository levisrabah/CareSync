import { supabase } from '../lib/supabase';
import { Patient, Appointment, Doctor, Reminder } from '../types';

// Patients
export const getPatients = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createPatient = async (patient: Omit<Patient, 'id'>) => {
  const { data, error } = await supabase
    .from('patients')
    .insert([patient])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePatient = async (id: string, patient: Partial<Patient>) => {
  const { data, error } = await supabase
    .from('patients')
    .update(patient)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Appointments
export const getAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patients(*),
      doctor:doctors(*)
    `)
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointment])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
  const { data, error } = await supabase
    .from('appointments')
    .update(appointment)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Doctors
export const getDoctors = async () => {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) throw error;
  return data;
};

// Reminders
export const createReminder = async (reminder: Omit<Reminder, 'id'>) => {
  const { data, error } = await supabase
    .from('reminders')
    .insert([reminder])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getReminders = async () => {
  const { data, error } = await supabase
    .from('reminders')
    .select(`
      *,
      appointment:appointments(
        *,
        patient:patients(*),
        doctor:doctors(*)
      )
    `)
    .order('scheduled_date', { ascending: false });
  
  if (error) throw error;
  return data;
};