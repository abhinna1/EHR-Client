import { useContext, useEffect, useState } from "react";
import PatientServices from "../services/PatientServices";
import EHRContext from "../context/EHRContext";
import DoctorServices from "../services/DoctorServices";
import { Link } from "react-router-dom";

const PatientAccessList = () => {
  const [doctors, setDoctors] = useState([]);
  const { EHRContract } = useContext(EHRContext);

  useEffect(() => {
    if (!EHRContract) return;
    PatientServices.getSelfData({ EHRContract })
      .then((res) => {
        // console.log(res);
        setDoctors(res.approvedDoctors);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [EHRContract]);
  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl my-8">Accessed Doctors</h1>
      <div className="w-full overflow-x-auto px-24 py-3">
        <table className="w-full divide-y divide-gray-200 text-center ">
          <thead className="text-center">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fullname
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {doctors.length === 0 ? (
            <p>No requests available.</p>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <DoctorRow doctor={doctor} key={doctor} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

const DoctorRow = ({ doctor }) => {
  const { EHRContract } = useContext(EHRContext);
  const [currentDoctor, setCurrentDoctor] = useState({});
  const [listPopup, setListPopup] = useState(false);

  const [popup, setPopup] = useState(false);

  const handleRevoceAccess = ()=>{
    PatientServices.revokeAccess({EHRContract, doctor_address: doctor})
    .then((res)=>{
      console.log(res);
      alert(`Access for Dr. ${currentDoctor.firstName} ${currentDoctor.lastName} has been revoked.}`)
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  useEffect(() => {
    console.log(doctor);
    DoctorServices.getDoctorByAddress({
      EHRContract,
      doctor_address: doctor,
    })
      .then((res) => {
        console.log(res);
        setCurrentDoctor(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <tr>
      {/* {popup ? (
          <EHRViewPopup
            record={request}
            onClose={() => {
              setPopup(false);
            }}
          />
        ) : null} */}
      {/* <td className="px-6 py-4 whitespace-nowrap">{doctor.doctorAddress}</td> */}
      {/* <td className="px-6 py-4 whitespace-nowrap">
          {new Date(parseInt(request.date)).toLocaleDateString()}
        </td> */}
        <td className="px-6 py-4 whitespace-nowrap">
        {currentDoctor.doctorAddress}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        Dr. {currentDoctor.firstName} {currentDoctor.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {currentDoctor.age && currentDoctor.age.toNumber()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link className="text-red-600"
        onClick={handleRevoceAccess}>
            Revoke Access
        </Link>
      </td>

      {/* {request.age && (
            <td className="px-6 py-4 whitespace-nowrap">
              {request.age.toNumber()}
            </td>
          )} */}
      {/* <td
          className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-green-400 rounded-xl"
          onClick={handleViewEhrs}
        >
          View Records
        </td> */}
    </tr>
  );
};

export default PatientAccessList;
