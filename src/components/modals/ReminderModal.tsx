import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../ui/Button';
import { Appointment, Patient, ReminderTemplate } from '../../types';
import { X } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, channel: 'sms' | 'email' | 'whatsapp') => void;
  appointment: Appointment;
  patient: Patient;
  templates: ReminderTemplate[];
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  onSend,
  appointment,
  patient,
  templates
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [channel, setChannel] = useState<'sms' | 'email' | 'whatsapp'>(patient.preferredChannel);

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const customizedMessage = template.message
        .replace('{patientName}', patient.name)
        .replace('{date}', new Date(appointment.date).toLocaleDateString())
        .replace('{time}', new Date(appointment.date).toLocaleTimeString());
      setMessage(customizedMessage);
    }
    setSelectedTemplate(templateId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(message, channel);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Send Reminder</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Select a template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as 'sms' | 'email' | 'whatsapp')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="sms">SMS</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send Reminder
          </Button>
        </div>
      </form>
    </Modal>
  );
};