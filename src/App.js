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
function App() {

  return (
    <Router>
      <EHRProvider>
      <Navbar />

        <Routes>
          <Route path="/hospital/form" element={<AddHospitalForm />} />
          <Route path="/doctor/form" element={<AddDoctorForm />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/hospital/:hospital_id" element={<HospitalDetail />} />
        </Routes>
      </EHRProvider>
    </Router>
  );
}

export default App;
