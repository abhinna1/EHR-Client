import AddHospitalForm from "./components/AddHospitalForm";
import AddDoctorForm from "./components/AddDoctorForm";

import { useContext, useEffect } from "react";
import EHRProvider from "./context/EHRState";
import EHRContext from "./context/EHRContext";
import Navbar from "./components/Navbar";
import HospitalCard from "./components/HospitalCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hospital from "./pages/Hospital";
import HospitalDetail from "./pages/HospitalDetail";
import ClientRoutes from "./Routes/ClientRoutes";
import PatientForm from "./pages/PatientForm";
import DoctorAccessForm from "./pages/DoctorAccessForm";
import PatientRequests from "./pages/PatientRequests";
import DoctorAccessList from "./pages/DoctorAccessList";
import PatientAccessList from "./pages/PatientAccessList";
import PatientEHRList from "./pages/PatientEHRList";
import HomePage from "./pages/Homepage";
function App() {

  return (
    <Router>
      <EHRProvider>
      <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hospital/form" element={<AddHospitalForm />} />
          <Route path="/doctor/form" element={<AddDoctorForm />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/hospital/:hospital_id" element={<HospitalDetail />} />
          <Route path={ClientRoutes.PatientRoutes.patient_form_route} element={<PatientForm/>} />
          <Route path={ClientRoutes.DoctorRoutes.request_access_route} element={<DoctorAccessForm/>} />
          <Route path={ClientRoutes.PatientRoutes.patient_requests_route} element={<PatientRequests/>} />
          <Route path={ClientRoutes.DoctorRoutes.accessed_list_route} element={<DoctorAccessList/>} />
          <Route path={ClientRoutes.PatientRoutes.accessed_list_route} element={<PatientAccessList/>} />
          <Route path={ClientRoutes.PatientRoutes.ehr_list_route} element={<PatientEHRList/>} />
          
        </Routes>
      </EHRProvider>
    </Router>
  );
}

export default App;
