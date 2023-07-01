import AddHospitalForm from "./components/AddHospitalForm";
import AddDoctorForm from "./components/AddDoctorForm";

import { useContext, useEffect } from "react";
import EHRProvider from "./context/EHRState";
import EHRContext from "./context/EHRContext";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
  }, [
    
  ]);
  return (
    <EHRProvider>
    <Navbar/>
      <AddHospitalForm />
      <AddDoctorForm/>
    </EHRProvider>
  );
}

export default App;
