import { Link } from "react-router-dom";
import IPFSRoutes from "../Routes/IPFSRoutes";
import ClientRoutes from "../Routes/ClientRoutes";
const HospitalCard = ({hospital}) => {
  return (
    <Link
    to={ClientRoutes.HospitalRoutes.hospital_detail_route(hospital.hospitalAddress)}
    className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={
              IPFSRoutes.mediaRoute(hospital.image)
            }
            alt={hospital.name}
          />
        </div>
        <div className="p-8">
          {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {hospital.specialty}
            </div> */}
          <h3 className="mt-2 text-xl font-bold text-gray-800">
            {hospital.name}
          </h3>
          <p className="mt-2 text-gray-500">{hospital.location}</p>
          {/* <p className="mt-2 text-gray-500">{hospital.contact}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default HospitalCard;
