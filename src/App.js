import logo from "./logo.svg";
import "./App.css";
import AddHospitalForm from "./components/AddHospitalForm";
import { useContext, useEffect } from "react";
import EHRProvider from "./context/EHRState";
import EHRContext from "./context/EHRContext";

function App() {
  useEffect(() => {
  }, [
    
  ]);
  return (
    <EHRProvider>
      <AddHospitalForm />
    </EHRProvider>
  );
}

export default App;
