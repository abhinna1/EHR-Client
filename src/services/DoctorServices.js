import helpers from "../helpers";

const addDoctor = async ({
  EHRContract,
  doctorAddress,
  firstname,
  lastname,
  age,
  gender,
  description,
  image,
  specialization,
}) => {
  return await EHRContract.addDoctor(
    doctorAddress,
    firstname,
    lastname,
    age,
    gender,
    description,
    image,
    specialization
  );
};

const uploadHospitalImage = async ({ file }) => {
  const hash = await helpers.uploadFileToIPFS(file);
  return hash;
}

const uploadEHR = async ({ file }) => {
  const hash = await helpers.uploadFileToIPFS(file);
  return hash;
}

const requestPatientAccess = async ({EHRContract, patient_address})=>{
  return await EHRContract.requestPatientAccess(patient_address);
}

const getDoctorByAddress = async ({EHRContract, doctor_address})=>{
  return await EHRContract.get_doctor_by_address(doctor_address);
}

const insertEHRRecord = async ({EHRContract, patientAddress, file, date}) => {
  return await EHRContract.insertEHRRecord(patientAddress, file, date)
}

export default {
  addDoctor,
  uploadHospitalImage,
  requestPatientAccess,
  getDoctorByAddress,
  uploadEHR,
  insertEHRRecord,
};
