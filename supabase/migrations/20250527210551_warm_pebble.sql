/*
  # Initial Schema Setup for CareSync

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `patients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `medical_history` (text)
      - `preferred_channel` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `doctors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `specialization` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references patients)
      - `doctor_id` (uuid, references doctors)
      - `date` (timestamp)
      - `type` (text)
      - `notes` (text)
      - `status` (text)
      - `follow_up_interval` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reminders`
      - `id` (uuid, primary key)
      - `appointment_id` (uuid, references appointments)
      - `channel` (text)
      - `scheduled_date` (timestamp)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'staff',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  medical_history text,
  preferred_channel text DEFAULT 'sms',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialization text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors ON DELETE CASCADE,
  date timestamptz NOT NULL,
  type text NOT NULL,
  notes text,
  status text DEFAULT 'scheduled',
  follow_up_interval integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments ON DELETE CASCADE,
  channel text NOT NULL,
  scheduled_date timestamptz NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read profiles"
  ON profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow users to update their own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to read patients"
  ON patients FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage patients"
  ON patients FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read doctors"
  ON doctors FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage doctors"
  ON doctors FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read appointments"
  ON appointments FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage appointments"
  ON appointments FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read reminders"
  ON reminders FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage reminders"
  ON reminders FOR ALL TO authenticated
  USING (true);