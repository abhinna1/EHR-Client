import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";
import IPFSRoutes from "../Routes/IPFSRoutes";

const HospitalDetail = () => {
  const { EHRContract } = useContext(EHRContext);
  const { hospital_id } = useParams();
  const [hospital, setHospital] = useState({});
  const [doctors, setDoctors] = useState([]); // Add state for doctors

  useEffect(() => {
    if (!EHRContract) return;
    HospitalServices.getHospitalByAddress({
      EHRContract: EHRContract,
      hospital_address: hospital_id,
    }).then((hospital) => {
      console.log(hospital.name);
      setHospital(hospital);
    });

    HospitalServices.getDoctorsByHospital({
      EHRContract: EHRContract,
      hospital_address: hospital_id,
    }).then((doctors) => {
      console.log(doctors);
      setDoctors(doctors); // Set the doctors state
    });
  }, [EHRContract]);

  return (
    <div className="">
      <div className="flex items-start justify-between px-16 lg:py-12 flex-col-reverse gap-y-4 lg:flex-row">
        <div className="lg:w-[48%] h-[30rem] rounded-md overflow-hidden">
          <img
            src={IPFSRoutes.mediaRoute(hospital.image)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center lg:text-start mt-4 lg:w-1/2 flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold">{hospital.name}</h1>
          <p className="text-justify">{hospital.description}</p>
        </div>
      </div>
      {/* Render doctor cards */}
      <div className="">
      <h1 className="text-center text-2xl font-bol">Our Doctors</h1>
        <div className="grid grid-cols-3 gap-4 mt-8 px-14">
          {doctors.map((doctor) => (
            <>
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              {/* <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} />
              <DoctorCard key={doctor.doctorAddress} doctor={doctor} /> */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md p-6">
      <div className="flex items-center justify-center">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={IPFSRoutes.mediaRoute(doctor.image)}
          alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Dr. {doctor.firstName} {doctor.lastName}
        </h3>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p className="text-gray-600 mt-2">{doctor.age.toNumber()} Years</p>
      </div>
    </div>
  );
};

export default HospitalDetail;
