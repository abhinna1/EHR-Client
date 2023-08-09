import { useContext, useEffect, useState } from "react";
import EHRContext from "../context/EHRContext";
import PatientServices from "../services/PatientServices";
import DoctorServices from "../services/DoctorServices";
import { Link } from "react-router-dom";
import ClientRoutes from "../Routes/ClientRoutes";
import IPFSRoutes from "../Routes/IPFSRoutes";
const DoctorAccessList = () => {
  const { EHRContract } = useContext(EHRContext);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!EHRContract) return;
    // console.log("getting requests");
    PatientServices.getDoctorAccessList({ EHRContract })
      .then((res) => {
        setRequests(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [EHRContract]);
  return (
    <div>
      <h1 className="text-center">All Accessable Patients</h1>
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
  const [currentPatient, setCurrentPatient] = useState({});
  const [listPopup, setListPopup] = useState(false);

  const handleViewEhrs = () => {
    // console.log(request);
    setCurrentPatient(request);
    setListPopup(true);
  };

  const [popup, setPopup] = useState(false);

  return (
    <tr>
      {listPopup && (
        <EHRListPopup
          patient={currentPatient}
          onClose={() => {
            setListPopup(false);
          }}
        />
      )}

      {popup ? (
        <AddRecordPopup
          patient={request}
          onClose={() => {
            setPopup(false);
          }}
        />
      ) : null}

      {/* <td className="px-6 py-4 whitespace-nowrap">{doctor.doctorAddress}</td> */}
      <td className="px-6 py-4 whitespace-nowrap">{request.PatientAddress}</td>
      <td className="px-6 py-4 whitespace-nowrap">{request.fullName}</td>

      {request.age && (
        <td className="px-6 py-4 whitespace-nowrap">
          {request.age.toNumber()}
        </td>
      )}
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-green-400 rounded-xl"
        onClick={handleViewEhrs}
      >
        View Records
      </td>
      <td className="px-4">
        <p
          className="px-6 py-4 whitespace-nowrap cursor-pointer p-3 bg-blue-400 rounded-xl"
          onClick={() => {
            setPopup(true);
          }}
        >
          Add Record
        </p>
      </td>
    </tr>
  );
};

const AddRecordPopup = ({ patient, onClose }) => {
  const { EHRContract } = useContext(EHRContext);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    DoctorServices.uploadHospitalImage({ file })
      .then((hash) => {
        DoctorServices.insertEHRRecord({
          EHRContract: EHRContract,
          patientAddress: patient.PatientAddress,
          file: hash,
          date: Date.now().toString(),
        })
          .then((res) => {
            console.log(res);
            setFile(null);
            onClose();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="fixed  flex justify-center items-center  bg-black bg-opacity-50 z-[100] w-full h-full top-0 left-0">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center font-semibold text-lg mb-4">
          Add EHR associated with {patient.fullName.split(" ")[0]}
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const EHRListPopup = ({ patient, onClose }) => {
  const { EHRContract } = useContext(EHRContext);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    DoctorServices.uploadHospitalImage({ file })
      .then((hash) => {
        DoctorServices.insertEHRRecord({
          EHRContract: EHRContract,
          patientAddress: patient.PatientAddress,
          file: hash,
          date: Date.now().toString(),
        })
          .then((res) => {
            console.log(res);
            setFile(null);
            onClose();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="fixed flex justify-center items-center z-[90] w-full h-full top-0 left-0">
      <div
        className="w-full h-full bg-black bg-opacity-50 absolute z-[60] left-0 top-0"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded-lg shadow-md z-[70]">
        <table className="w-full divide-y divide-gray-200 text-center z-[75] ">
          <thead className="text-center">
            <tr>
            <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                Added By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                Added Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"></th>

              {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th> */}
            </tr>
          </thead>

          {/* {patient.records  ? (
            <p className="text-center">No records available.</p>
          ) : ( */}
          <tbody className="bg-white divide-y divide-gray-200">
            {patient.records.map((record) => (
              <EHRRow record={record} key={record} />
            ))}
          </tbody>
          {/* )} */}
        </table>
      </div>
    </div>
  );
};

const EHRRow = ({ record }) => {
  const { EHRContract } = useContext(EHRContext);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const date = new Date(parseInt(record.date));
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setDate(date.getDate());
  }, [record.date]);
  return (
    <tr>
      {/* <td className="px-6 py-4 whitespace-nowrap">{doctor.doctorAddress}</td> */}
      {popup && <EHRViewPopup record={record} onClose={()=>{setPopup(false)}} />}
      <td className="px-6 py-4 whitespace-nowrap">
        Dr. {record.doctor.firstName} {record.doctor.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {month}-{date}-{year}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-blue-600">
        {" "}
        <Link onClick={()=>{setPopup(true);}}>View record</Link>
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
      <div className="bg-white p-4 rounded-lg shadow-md z-[70] flex flex-col gap-y-4">
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg">Added By: </p>Dr.{" "}
          {record.doctor.firstName} {record.doctor.lastName}
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg">Added On: </p>
          {new Date(parseInt(record.date)).toLocaleDateString()}
        </div>
        <img src={IPFSRoutes.mediaRoute(record.file)} className="" alt="" />
      </div>
    </div>
  );
};
export default DoctorAccessList;
