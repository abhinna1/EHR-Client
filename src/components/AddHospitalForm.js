import React, { useContext, useEffect, useState } from "react";
import { Web3 } from "web3";

import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";

const AddHospitalForm = () => {
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [web3, setWeb3] = useState(null);
  const {wallet, setWallet}  = useContext(EHRContext);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await HospitalServices.addHospital(
        hospitalAddress,
        hospitalName,
        location,
      )
      console.log(result);
      // Handle success or update UI accordingly
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || error);
      // Handle error or show error message to the user
    }
  };

  useEffect(() => {
    HospitalServices.getHospitals().then((res) => {
      console.log(res);
    }
    );

  }, []);
;

  return (
    <form onSubmit={handleFormSubmit}>
      {/* <h1>{String(web3)}</h1> */}
      <h1>{wallet}</h1>
      <label>
        Hospital Address:
        <input
          type="text"
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Hospital Name:
        <input
          type="text"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Hospital</button>
    </form>
  );
};

export default AddHospitalForm;
