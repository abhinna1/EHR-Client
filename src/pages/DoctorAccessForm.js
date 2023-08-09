import { useContext, useEffect, useState } from "react";
import EHRContext from "../context/EHRContext";
import PatientServices from "../services/PatientServices";
import DoctorServices from "../services/DoctorServices";

const DoctorAccessForm = () => {
  const [patient_address, setPatientAddress] = useState("");
  const { EHRContract } = useContext(EHRContext);

  useEffect(() => {
    if (!EHRContract) return;
    PatientServices.getSelfData({
      EHRContract,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [EHRContract]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    DoctorServices.requestPatientAccess({
      EHRContract: EHRContract,
      patient_address: patient_address,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-8 px-24">
      <h1 className="text-center text-2xl font-bold">Add Patient</h1>

      <div className="flex flex-col mb-3">
        <label>Patient Address:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={patient_address}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
      </div>

      <br />

      <button
        type="submit"
        className="border p-3 rounded-md bg-blue-800 text-white w-full"
      >
        Request Access
      </button>
    </form>
  );
};

export default DoctorAccessForm;
