import { ethers } from "ethers";

const addHospital = async ({
  EHRContract,
  hospitalAddress,
  hospitalName,
  location,
}) => {
  return await EHRContract.addHospital(hospitalAddress, hospitalName, location);
};


export default {
  addHospital,
}

