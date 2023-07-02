import React, { useContext, useEffect, useRef, useState } from "react";
import { Web3 } from "web3";

import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";
import SpecializationFields from "../commons/ENUMS/SpecializationENUM";
import GenderENUM from "../commons/ENUMS/GenderENUM";
import DoctorServices from "../services/DoctorServices";

const AddDoctorForm = () => {
  const [doctorAddress, setDoctorAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  
  const [description, setDescription] = useState("");
  const { EHRContract } = useContext(EHRContext);
  const [file, setFile] = useState("");
  const previewRef = useRef();
  const specializations = SpecializationFields.fields.sort();
  const genders = GenderENUM.fields;
  const [gender, setGender] = useState(genders[0]);
  const [specialization, setSpecialization] = useState(specializations[0]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const hash = await HospitalServices.uploadHospitalImage({
      file: file,
    });

    DoctorServices.addDoctor({
      EHRContract: EHRContract,
      doctorAddress: doctorAddress,
      firstname: firstname,
      lastname: lastname,
      age: age,
      gender: gender,
      description: description,
      image: hash,
      specialization: specialization,
    })
      .then((doctor) => {
        console.log(doctor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-8 px-24">
      {/* <h1>{String(web3)}</h1> */}
      <h1 className="text-center text-2xl font-bold">Add Doctor</h1>
      <div className="flex flex-col">
        <label>Doctor Address:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
        />
      </div>

      <br />

      <div className="flex flex-col">
        <label>First Name:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>

      <br />

      <div className="flex flex-col">
        <label>Last Name:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <br />

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

      <div className="flex flex-col">
        <label>Gender</label>
        <select
          value={gender}
          className="border border-black p-2 rounded-md"
          onChange={(e) => {
            setGender(e.target.value);
            console.log(gender);
          }}
        >
          {genders.map((curr_gender) => (
            <option
              className="border border-black p-2 rounded-md"
              value={curr_gender}
            >
              {curr_gender}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div className="flex flex-col">
        <label>Specialization:</label>
        <select
          value={specialization}
          className="border border-black p-2 rounded-md"
          onChange={(e) => {
            setSpecialization(e.target.value);
            console.log(specialization);
          }}
        >
          {specializations.map((specialization) => (
            <option
              className="border border-black p-2 rounded-md"
              value={specialization}
            >
              {specialization}
            </option>
          ))}
        </select>

      </div>

      <br />

      <div className="flex flex-col">
        <label>Description</label>
        <textarea
          className="border border-black p-1 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>

      <br />

      <div className="flex flex-col">
        <label>Image</label>
        <input
          className="border border-black p-1 rounded-md"
          type="file"
          accept="*/image"
          onChange={(e) => {
            setFile(e.target.files[0]);
            previewRef.current.src = URL.createObjectURL(e.target.files[0]);
          }}
        />
      </div>

      <br />

      <div className="flex justify-center items-center">
        <img
          src=""
          alt="doctor image preview"
          ref={previewRef}
          width={300}
          height={300}
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

export default AddDoctorForm;
