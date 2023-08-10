import { useContext, useEffect, useState } from "react";
import PatientServices from "../services/PatientServices";
import EHRContext from "../context/EHRContext";
import IPFSRoutes from "../Routes/IPFSRoutes";

const PatientEHRList = () => {
  const [records, setRecords] = useState([]);
  const { EHRContract } = useContext(EHRContext);
  useEffect(() => {
    PatientServices.getSelfData({ EHRContract })
      .then((res) => {
        setRecords(res.records);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [EHRContract]);
  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl my-8">My EHRs</h1>
      <div className="w-full overflow-x-auto px-24 py-3">
        <table className="w-full divide-y divide-gray-200 text-center ">
          <thead className="text-center">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added On
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added By
              </th>
              {/*   
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th> */}
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                View EHR
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {records.length === 0 ? (
            <p>No requests available.</p>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((request) => (
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
  const [currentPatient, setCurrentPatient] = useState({});
  const [listPopup, setListPopup] = useState(false);

  const handleViewEhrs = () => {
    // console.log(request);
    setCurrentPatient(request);
    setPopup(true);
  };

  const [popup, setPopup] = useState(false);

  return (
    <tr>
      {popup ? (
        <EHRViewPopup
          record={request}
          onClose={() => {
            setPopup(false);
          }}
        />
      ) : null}
      {/* <td className="px-6 py-4 whitespace-nowrap">{doctor.doctorAddress}</td> */}
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(parseInt(request.date)).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        Dr. {request.doctor.firstName} {request.doctor.lastName}
      </td>

      {/* {request.age && (
          <td className="px-6 py-4 whitespace-nowrap">
            {request.age.toNumber()}
          </td>
        )} */}
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-green-400 rounded-xl"
        onClick={handleViewEhrs}
      >
        View Records
      </td>
    </tr>
  );
};

const EHRViewPopup = ({ record, onClose }) => {
  return (
    <div className="fixed flex justify-center items-center z-[90] w-full h-full top-0 left-0">
      <div
        className="w-full h-full bg-black bg-opacity-50 absolute z-[60] left-0 top-0"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded-lg z-[70] flex flex-col gap-y-4">
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg">Added By: </p>Dr.{" "}
          {record.doctor.firstName} {record.doctor.lastName}
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg">Added On: </p>
          {new Date(parseInt(record.date)).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-center">
          <img
            src={IPFSRoutes.mediaRoute(record.file)}
            className="w-1/2 h-1/2"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PatientEHRList;
