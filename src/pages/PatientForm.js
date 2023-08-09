import { useContext, useEffect, useState } from "react";
import PatientServices from "../services/PatientServices";
import EHRContext from "../context/EHRContext";
const PatientForm = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const { EHRContract } = useContext(EHRContext);
  
  useEffect(()=>{
    if(!EHRContract) {console.log("no");return};
    PatientServices.getSelfData({
      EHRContract
    }).then(res=>{
    console.log(res);
    }).catch(e=>{
      console.log(e);
    })
  }, [EHRContract])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    PatientServices.registerPatient({
      EHRContract: EHRContract,
      fullname: fullName,
      age: age,
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
      {/* <h1>{String(web3)}</h1> */}
      <h1 className="text-center text-2xl font-bold">Add Patient</h1>

      <div className="flex flex-col mb-3">
        <label>Full Name:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Age</label>
        <input
          className="border border-black p-1 rounded-md"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <br />

      <button
        type="submit"
        className="border p-3 rounded-md bg-blue-800 text-white w-full"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default PatientForm;
