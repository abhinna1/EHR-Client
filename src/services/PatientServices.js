const registerPatient = async ({ EHRContract, fullname, age }) => {
  return await EHRContract.registerPatient(fullname, age);
};

const getSelfData = async ({ EHRContract }) => {
  // console.log(EHRContract)
  return await EHRContract.getSelfData();
};


const getAccessRequests = async ({ EHRContract }) => {
  // console.log(EHRContract)
  return await EHRContract.getAllDoctorRequests();
};

const getDoctorAccessList = async ({ EHRContract }) => {
  // console.log(EHRContract)
  return await EHRContract.getApprovedRequestsAsDoctor();
};

const approveEHRRequest = async ({ EHRContract, doctorAddress }) => {
  return await EHRContract.approveEHRRequest(doctorAddress);
}

const revokeAccess = async ({ EHRContract, doctor_address }) => {
  return await EHRContract.revokeDoctorAccess(doctor_address);
}

const isPatient = async ({ EHRContract }) => {
  return await EHRContract.isPatient();
}



export default {
  registerPatient,
  getSelfData,
  getAccessRequests,
  approveEHRRequest,
  getDoctorAccessList,
  revokeAccess,
  isPatient,
}