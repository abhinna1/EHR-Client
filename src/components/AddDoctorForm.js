import React, { useContext, useEffect, useState } from "react";
import { Web3 } from "web3";

import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";

const AddDoctorForm = () => {
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const result = await HospitalServices.addDoctor(
    //     doctorAddress,
    //     firstname,
    //     lastname,
    //     age,
    //     gender,
    //     specialization,
    //     hospitalAddress,
    //   );
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert(error.message || error);
    //   // Handle error or show error message to the user
    // }
  };

  useEffect(() => {
    // HospitalServices.getHospitals().then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <form onSubmit={handleFormSubmit}>
      {/* <h1>{String(web3)}</h1> */}
      <h1 className="text-center p-4 text-xl font-semibold bg-green-400 my-8">Add Doctor</h1>
      <div className="">
        <label>
          Doctor Address:
          <input
            className="border border-black"
            type="text"
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          First Name:
          <input
            className="border border-black"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          Last Name:
          <input
            className="border border-black"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          Age
          <input
            className="border border-black"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          Gender
          <input
            className="border border-black"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          Specialization:
          <input
            className="border border-black"
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </label>
      </div>

      <br />

      <div className="">
        <label>
          Hospital Address:
          <input
            className="border border-black"
            type="text"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
          />
        </label>
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

export default AddDoctorForm;
