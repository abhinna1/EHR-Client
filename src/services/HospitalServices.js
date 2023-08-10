import helper from "../helpers";
const addHospital = async ({
  EHRContract,
  hospitalAddress,
  hospitalName,
  location,
  description,
  image
}) => {
  return await EHRContract.addHospital(hospitalAddress, hospitalName, location, description, image);
};

const getAllHospitals = async ({ EHRContract }) => {
  return await EHRContract.getAllHospitals();
};

const uploadHospitalImage = async ({ file }) => {
  const hash = await helper.uploadFileToIPFS(file);
  return hash;
}

const getHospitalByAddress = async({ EHRContract, hospital_address }) => {
  try{
    return await EHRContract.get_hospital_by_address(hospital_address);
  }
  catch(e){
    console.log(e);
    return ;
  }
}

const getDoctorsByHospital = async({ EHRContract, hospital_address }) =>{
  try{
    return await EHRContract.get_doctors_by_hospital(hospital_address)
    
  }
  catch(e){
    console.log(e);
    return ;
  }
}

const isHospital = async ({ EHRContract }) => {
  return await EHRContract.isHospital();
}

const get_doctors_by_hospital = async ({ EHRContract, hospital_address }) => {
  return await EHRContract.get_doctors_by_hospital(hospital_address);
}





export default {
  addHospital,
  getAllHospitals,
  uploadHospitalImage,
  getHospitalByAddress,
  getDoctorsByHospital,
  isHospital,
  get_doctors_by_hospital,
};
