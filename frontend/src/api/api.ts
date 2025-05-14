import axios from 'axios';
import { AppointmentData, DepartmentData, DoctorData, PatientData, SpecialtyData, WardData } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Specialty API
export const fetchSpecialties = () => api.get('/specialties');
export const fetchSpecialty = (id: number) => api.get(`/specialties/${id}`);
export const createSpecialty = (specialty: SpecialtyData) => api.post('/specialties', specialty);
export const updateSpecialty = (id: number, specialty: SpecialtyData) => api.put(`/specialties/${id}`, specialty);
export const deleteSpecialty = (id: number) => api.delete(`/specialties/${id}`);

// Doctor API
export const fetchDoctors = () => api.get('/doctors');
export const fetchDoctor = (id: number) => api.get(`/doctors/${id}`);
export const createDoctor = (doctor: DoctorData) => api.post('/doctors', doctor);
export const updateDoctor = (id: number, doctor: DoctorData) => api.put(`/doctors/${id}`, doctor);
export const deleteDoctor = (id: number) => api.delete(`/doctors/${id}`);

// Patient API
export const fetchPatients = () => api.get('/patients');
export const fetchPatient = (id: number) => api.get(`/patients/${id}`);
export const createPatient = (patient: PatientData) => api.post('/patients', patient);
export const updatePatient = (id: number, patient: PatientData) => api.put(`/patients/${id}`, patient);
export const deletePatient = (id: number) => api.delete(`/patients/${id}`);

// Department API
export const fetchDepartments = () => api.get('/departments');
export const fetchDepartment = (id: number) => api.get(`/departments/${id}`);
export const createDepartment = (department: DepartmentData) => api.post('/departments', department);
export const updateDepartment = (id: number, department: DepartmentData) => api.put(`/departments/${id}`, department);
export const deleteDepartment = (id: number) => api.delete(`/departments/${id}`);

// Ward API
export const fetchWards = () => api.get('/wards');
export const fetchWard = (id: number) => api.get(`/wards/${id}`);
export const createWard = (ward: WardData) => api.post('/wards', ward);
export const updateWard = (id: number, ward: WardData) => api.put(`/wards/${id}`, ward);
export const deleteWard = (id: number) => api.delete(`/wards/${id}`);

// Appointment API
export const fetchAppointments = () => api.get('/appointments');
export const fetchAppointment = (id: number) => api.get(`/appointments/${id}`);
export const createAppointment = (appointment: AppointmentData) => api.post('/appointments', appointment);
export const updateAppointment = (id: number, appointment: AppointmentData) => api.put(`/appointments/${id}`, appointment);
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);

export default api;