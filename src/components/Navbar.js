import EHRContext from "../context/EHRContext";
import { useContext, useEffect, useState } from "react";
import ContextHelpers from "../context/ContextHelpers";
import { Link } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import DropdownButtonItem from "./DropdownButtonItem";
import ClientRoutes from "../Routes/ClientRoutes";
import PatientServices from "../services/PatientServices";
import DoctorServices from "../services/DoctorServices";
import HospitalServices from "../services/HospitalServices";
const Navbar = () => {
  const { account, provider } = useContext(EHRContext);
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const { EHRContract } = useContext(EHRContext);
  useEffect(() => {
    if (!EHRContract) return;
    PatientServices.isPatient({ EHRContract })
      .then((res) => {
        console.log(res);
        // if (res ==="yes")
        setIsPatient(res);
      })
      .catch((err) => {
        setIsDoctor(false);
        console.log(err);
      });
  }, [EHRContract]);

  useEffect(() => {
    if (!EHRContract) return;
    DoctorServices.isDoctor({ EHRContract })
      .then((res) => {
        console.log(res);
        // if (res ==="yes")
        setIsDoctor(res);
      })
      .catch((err) => {
        setIsDoctor(false);
        console.log(err);
      });
  }, [EHRContract]);

  useEffect(() => {
    if (!EHRContract) return;
    HospitalServices.isHospital({ EHRContract })
      .then((res) => {
        console.log(res);
        // if (res ==="yes")
        setIsDoctor(res);
      })
      .catch((err) => {
        setIsDoctor(false);
        console.log(err);
      });
  }, [EHRContract]);
  return (
    <nav className="p-4 bg-green-300 flex justify-between w-full items-center ">
      <Link to="/">
        {" "}
        <h1 className="font-bold">DECENTRAL EHR</h1>
      </Link>

      <div className="flex items-center gap-x-4">
        <Link className="font-bold" to={ClientRoutes.HospitalRoutes.base_route}>
          Hospitals
        </Link>

        {/* Doctor Dropdown */}
        {isDoctor && (
          <DropdownButton title="Doctor">
            <DropdownButtonItem
              link={ClientRoutes.DoctorRoutes.accessed_list_route}
              body="My Patients"
            />
            <DropdownButtonItem
              link={ClientRoutes.DoctorRoutes.request_access_route}
              body="Request Access"
            />
          </DropdownButton>
        )}

        {/* Hospital Dropdown */}
        {isDoctor && (
          <DropdownButton title="Hospital">
            <DropdownButtonItem
              link={ClientRoutes.DoctorRoutes.doctor_form_route}
              body="Add Doctor"
            />
          </DropdownButton>
        )}

        {/* Patient Dropdown */}
        {isPatient ? (
          <DropdownButton title="Patient">
            <DropdownButtonItem
              link={ClientRoutes.PatientRoutes.ehr_list_route}
              body="My Records"
            />
            <DropdownButtonItem
              link={ClientRoutes.PatientRoutes.patient_requests_route}
              body="Doctor Requests"
            />
            <DropdownButtonItem
              link={ClientRoutes.PatientRoutes.accessed_list_route}
              body="Accessed doctors"
            />
          </DropdownButton>
        ) : (
          <Link to={ClientRoutes.PatientRoutes.patient_form_route}>
            Register as a Patient
          </Link>
        )}

        {account ? (
          <h1>{account}</h1>
        ) : (
          <h1
            onClick={() => {
              ContextHelpers.connectToMetaMask(provider)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="cursor-pointer
          font-semibold"
          >
            Connect Wallet
          </h1>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
