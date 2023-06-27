import { ethers } from "ethers";

import ehrArtifact from "../artifacts/contracts/EHR.sol/EHR.json";
// import contractAddress from "../artifacts/constants/contract-address.json";

const contractAddress = '0x5b6a1D60788592E533Bf88aC03d68e0Ad783DEAf';
const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
);
const signer = provider.getSigner();

const constractABI = ehrArtifact.abi;

const contract = new ethers.Contract(
  contractAddress,
  constractABI,
  provider,
)

contract.connect(signer);

const addHospital = async (hospitalAddress, hospitalName, location) => {
    try {
        const transaction = await contract.addHospital(hospitalAddress, hospitalName, location, {from: "0x686B7d57Ad12D5a25a982F2B7F64a6A3eC504571"});
    } catch (error) {
        console.log(error);
    }
}

const getHospitals = async () => {

    try {
        const hospitals = await contract.get_hospital_count();
        console.log(`hospital: ${hospitals}`)
        return hospitals;
    } catch (error) {
        console.log(error);
    }
}

export default {

  addHospital,
  getHospitals

}