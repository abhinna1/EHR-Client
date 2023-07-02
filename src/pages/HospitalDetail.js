import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";
import IPFSRoutes from "../Routes/IPFSRoutes";

const HospitalDetail = () => {
  const { EHRContract } = useContext(EHRContext);
  const { hospital_id } = useParams();
  const [hospital, setHospital] = useState({});
  useEffect(() => {
    if (!EHRContract) return;
    HospitalServices.getHospitalByAddress({
      EHRContract: EHRContract,
      hospital_address: hospital_id,
    }).then((hospital) => {
      console.log(hospital.name);
      setHospital(hospital);
    });
  }, [EHRContract]);

//   useEffect(() => {
//     if (!EHRContract) return;
//     HospitalServices.getHospitalByAddress({
//       EHRContract: EHRContract,
//       hospital_address: hospital_id,
//     }).then((hospital) => {
//       console.log(hospital.name);
//       setHospital(hospital);
//     });
//   }, [EHRContract]);


  return (
    <div className="flex items-start justify-between px-16 lg:py-12 flex-col-reverse gap-y-4 lg:flex-row">
      <div className="lg:w-[48%] h-[30rem] rounded-md overflow-hidden">
        <img src={IPFSRoutes.mediaRoute(hospital.image)} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="text-center lg:text-start mt-4 lg:w-1/2 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">{hospital.name}</h1>
        <p className="text-justify">{hospital.description}</p>
      </div>
    </div>
  );
};

export default HospitalDetail;
