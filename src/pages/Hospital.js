import { useContext, useEffect, useState } from "react";
import HospitalCard from "../components/HospitalCard";
import HospitalServices from "../services/HospitalServices";
import EHRContext from "../context/EHRContext";

const Hospital = () => {
  const { EHRContract } = useContext(EHRContext);
  const [hosptials, setHospitals] = useState([]);
  useEffect(() => {
    if (!EHRContract) return;
    HospitalServices.getAllHospitals({ EHRContract })
      .then((hospitals) => {
        console.log(hospitals);
        setHospitals(hospitals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [EHRContract]);

  return (
    <>
      <h1 className="text-center text-3xl py-6 font-semibold">
        {" "}
        Available Hospitals{" "}
      </h1>
      {hosptials.length === 0 && (
        <p className="text-center w-full">No Hospitals Available</p>
      )}
      <div className="gap-8 lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-8 ">
        {hosptials.map((hospital) => {
          return (
            <HospitalCard key={hospital.hospitalAddress} hospital={hospital} />
          );
        })}
      </div>
    </>
  );
};

export default Hospital;
