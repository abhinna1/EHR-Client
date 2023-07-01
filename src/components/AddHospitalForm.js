import React, { useContext, useEffect, useState } from "react";
import { Web3 } from "web3";

import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";

const AddHospitalForm = () => {
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const { wallet, setWallet, EHRContract } = useContext(EHRContext);

  useEffect(() => {
    if(!EHRContract) return;
    EHRContract.get_hospital_count()
    .then(count=>{
      console.log(count.toNumber())
    })
  }, [EHRContract]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const hospital = await HospitalServices.addHospital({
        EHRContract: EHRContract,
        hospitalAddress: hospitalAddress,
        hospitalName: hospitalName,
        location: location,
      })
      console.log("hospital added.");
      console.log(hospital);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // HospitalServices.getHospitals().then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <form onSubmit={handleFormSubmit}>
      {/* <h1>{String(web3)}</h1> */}
      <h1>{wallet}</h1>
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

      <div className="">
        <label>
          Hospital Name:
          <input
            className="border border-black"
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </label>
      </div>
      <br />
      <div className="">
        <label>
          Location:
          <input
            className="border border-black"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      </div>
      <br />
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
