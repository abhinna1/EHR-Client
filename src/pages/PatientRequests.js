import { useContext, useEffect, useState } from "react";
import EHRContext from "../context/EHRContext";
import PatientServices from "../services/PatientServices";
import DoctorServices from "../services/DoctorServices";
import { Link } from "react-router-dom";
import ClientRoutes from "../Routes/ClientRoutes";
const PatientRequests = () => {
  const { EHRContract } = useContext(EHRContext);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!EHRContract) return;

    PatientServices.getAccessRequests({ EHRContract }).then((res) => {
      console.log(res);
      setRequests(res);
    }).catch(e=>{
      console.log(e);
    })
    // PatientServices.getAccessRequests({ EHRContract })
    //   .then((res) => {
    //     setRequests(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, [EHRContract]);
  return (
    <div>
      <h1>All Doctor Requests</h1>

      <div className="w-full overflow-x-auto px-24 py-3">
        <table className="w-full divide-y divide-gray-200 text-center ">
          <thead className="text-center">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {requests.length === 0 ? (
            <p>No requests available.</p>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <RequestRow request={request} key={request} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

const RequestRow = ({ request }) => {
  const { EHRContract } = useContext(EHRContext);
  const [doctor, setDoctor] = useState({});

  const handleAccptRequest = () => {
    PatientServices.approveEHRRequest({
      EHRContract,
      doctorAddress: request.doctorAddress,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    DoctorServices.getDoctorByAddress({
      EHRContract,
      doctor_address: request.doctorAddress,
    })
      .then((res) => {
        console.log(res);
        setDoctor(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!doctor.firstName) return null;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{doctor.doctorAddress}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {`Dr. ${doctor.firstName} ${doctor.lastName}`}
      </td>

      {doctor.hospital && (
        <td className="text-center">
          <Link
            to={ClientRoutes.HospitalRoutes.hospital_detail_route(
              doctor.hospital.hospitalAddress
            )}
            className="text-blue-500 hover:text-blue-800 text-center w-full"
          >
            {doctor.hospital.name}
          </Link>
        </td>
      )}

      {doctor.age && (
        <td className="px-6 py-4 whitespace-nowrap">{doctor.age.toNumber()}</td>
      )}
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-green-400 rounded-xl"
        onClick={handleAccptRequest}
      >
        Accept
      </td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-red-400 rounded-xl">
        Reject
      </td>
    </tr>
  );
};

export default PatientRequests;
