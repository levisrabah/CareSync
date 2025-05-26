# CareSync- Patient Follow-Up System

CareSync is a comprehensive healthcare follow-up reminder system designed to help clinics and private doctors effectively manage patient appointments and follow-ups. The system provides automated reminders through multiple communication channels while maintaining a clean, intuitive interface.

## Features

### Dashboard
- Real-time statistics and metrics
- Upcoming appointments overview
- Recent reminder status tracking
- Quick access to key functions

### Patient Management
- Detailed patient profiles
- Medical history tracking
- Contact preference management
- Appointment history

### Appointment Scheduling
- Calendar view with multiple display options
- Quick appointment scheduling
- Follow-up interval tracking
- Status tracking (scheduled, completed, cancelled, no-show)

### Reminder System
- Multi-channel notifications (SMS, Email, WhatsApp)
- Customizable reminder templates
- Delivery status tracking
- Automated follow-up scheduling

### User Interface
- Responsive design for desktop and mobile
- Intuitive navigation
- Clean, medical-themed design
- Accessibility-focused interface

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (Header, Sidebar)
│   ├── patients/     # Patient management components
│   ├── reminders/    # Reminder system components
│   └── ui/           # Reusable UI components
├── context/          # Application context and state management
├── data/            # Mock data for development
├── pages/           # Main application pages
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements
- Advanced reminder rules
- Integration with medical record systems
- Mobile application
- Automated follow-up scheduling
- Patient portal
- Billing integration

## License

MIT License - see LICENSE file for details