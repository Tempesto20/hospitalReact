export interface SpecialtyData {
  specialty_id?: number;
  specialty_name: string;
}

export interface DoctorData {
  doctor_id?: number;
  full_name: string;
  specialty_id: number;
}

export interface PatientData {
  patient_id?: number;
  full_name: string;
  birth_date: string;
  insurance_policy: string;
  passport: string;
  admission_date: string;
  discharge_date?: string | number | Date | undefined | any;
}

export interface DepartmentData {
  department_id?: number;
  department_name: string;
}

export interface WardData {
  ward_id?: number;
  ward_number: string;
  department_id: number;
  doctor_id?: number;
}

export interface AppointmentData {
  appointment_id?: number;
  patient_id: number;
  doctor_id: number;
  ward_id?: number;
  appointment_date: string;
  symptom?: string;
  diagnos?: string;
  allergy?: string;
  preparation?: string;
}