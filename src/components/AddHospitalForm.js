import React, { useContext, useEffect, useRef, useState } from "react";
import { Web3 } from "web3";

import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";
import Hospital from "../pages/Hospital";
import helpers from "../helpers";
import ClientRoutes from "../Routes/ClientRoutes";
import SpecializationFields from "../commons/ENUMS/SpecializationENUM";

const AddHospitalForm = () => {
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { EHRContract } = useContext(EHRContext);

  const [file, setFile] = useState("");

  const previewRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const hash = await HospitalServices.uploadHospitalImage({
        file: file,
      });

      const hospital = await HospitalServices.addHospital({
        EHRContract: EHRContract,
        hospitalAddress: hospitalAddress,
        hospitalName: hospitalName,
        location: location,
        description: description,
        image: hash,
      });
      console.log(hash);
      alert(`Hospital Added Successfully. Hospital image hash: ${hash}`);
      window.location.href = `${ClientRoutes.HospitalRoutes.hospital_detail_route(hospital.hospitalAddress)}`
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-8 px-24">
      <h1 className="text-center text-2xl font-bold">Add New Hospital</h1>
      {/* <h1>{String(web3)}</h1> */}
      <div className="flex flex-col">
        <label>Hospital Address:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
        />
      </div>

      <br />

      <div className="flex flex-col">
        <label>Hospital Name:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
      </div>
      <br />
      <div className="flex flex-col">
        <label>Location:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Description:</label>
        <textarea
          className="border border-black p-1 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Image:</label>
        <input
          className="border border-black p-1 rounded-md"
          type="file"
          // value={location}
          width={300}
          height={300}
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
          alt="hospital image preview"
          ref={previewRef}
          width={300}
          height={300}
        />
      </div>

      <button
        type="submit"
        className="border p-3 rounded-md bg-blue-800 text-white w-full"
      >
        Add Hospital
      </button>
    </form>
  );
};

export default AddHospitalForm;
