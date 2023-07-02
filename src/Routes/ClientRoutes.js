class Routes{
    static base_route = '/';
    static hospital_route = '/hospital';
    static doctor_route = '/doctor';
}

class HospitalRoutes extends Routes{
    static base_route = this.hospital_route;
    static hospital_detail_route = (hospital_id) => `${this.base_route}/${hospital_id}`;
}


export default {
    Routes,
    HospitalRoutes,
}