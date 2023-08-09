class Routes{
    static base_route = '/';
    static hospital_route = '/hospital';
    static doctor_route = '/doctor';
    static patient_route = '/patient';
}

class HospitalRoutes extends Routes{
    static base_route = this.hospital_route;
    static hospital_detail_route = (hospital_id) => `${this.base_route}/${hospital_id}`;
}

class PatientRoutes extends Routes {
    static base_route = this.patient_route;
    static patient_form_route = this.patient_route + '/form';
    static patient_detail_route = (patient_id) => `${this.base_route}/${patient_id}`;
    static patient_requests_route = this.patient_route + '/access';
}

class DoctorRoutes extends Routes {
    static base_route = this.doctor_route;
    static request_access_route = this.doctor_route + '/access/form';
    static accessed_list_route = this.doctor_route + '/access/list'
}

export default {
    Routes,
    HospitalRoutes,
    PatientRoutes,
    DoctorRoutes,
}