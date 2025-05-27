import { useState, useEffect } from 'react';
import { Patient } from '../types';
import * as api from '../services/api';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await api.getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patient: Omit<Patient, 'id'>) => {
    try {
      const newPatient = await api.createPatient(patient);
      setPatients(prev => [newPatient, ...prev]);
      return newPatient;
    } catch (err) {
      throw err;
    }
  };

  const updatePatient = async (id: string, patient: Partial<Patient>) => {
    try {
      const updatedPatient = await api.updatePatient(id, patient);
      setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
      return updatedPatient;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
    addPatient,
    updatePatient
  };
};