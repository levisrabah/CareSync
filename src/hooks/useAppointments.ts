import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import * as api from '../services/api';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await api.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      const newAppointment = await api.createAppointment(appointment);
      setAppointments(prev => [newAppointment, ...prev]);
      return newAppointment;
    } catch (err) {
      throw err;
    }
  };

  const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      const updatedAppointment = await api.updateAppointment(id, appointment);
      setAppointments(prev => prev.map(a => a.id === id ? updatedAppointment : a));
      return updatedAppointment;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    addAppointment,
    updateAppointment
  };
};