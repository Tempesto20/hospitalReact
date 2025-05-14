import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SpecialtyList from './components/Specialty/SpecialtyList';
import DoctorList from './components/Doctor/DoctorList';
import PatientList from './components/Patient/PatientList';
import DepartmentList from './components/Department/DepartmentList';
import WardList from './components/Ward/WardList';
import AppointmentList from './components/Appointment/AppointmentList';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/specialties" element={<SpecialtyList />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/wards" element={<WardList />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;