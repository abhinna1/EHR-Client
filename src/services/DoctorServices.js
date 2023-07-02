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

export default {
  addDoctor,
  uploadHospitalImage
};
