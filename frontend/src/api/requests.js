import { request } from "./request.js";
//import {axiosRequest} from "./request.js";
//import axios from 'axios';

const url = "http://localhost:9000/";

const api = {
    doctor: {
        signUp: (payload) =>
            request(`${url}doctor/signup`, { method: "POST", body: payload }),
        logIn: (payload) =>
            request(`${url}doctor/login`, { method: "POST", body: payload }),
        patient: {
            getAll: () => request(`${url}doctor/patients`, { method: "GET" }),
            create: (payload) =>
                request(`${url}doctor/patient`, {
                    method: "POST",
                    body: payload,
                }),
            delete: (patientId) =>
                request(`${url}doctor/patient/${patientId}`, {
                    method: "DELETE",
                }),
            update: (patientId, payload) =>
                request(`${url}doctor/patient/${patientId}`, {
                    method: "PUT",
                    body: payload,
                }),
            addMedication: (payload) =>
                request(`${url}doctor/medication`, {
                    method: "POST",
                    body: payload,
                }),
            updateMedication: (medicationId, payload) =>
                request(`${url}doctor/medication/${medicationId}`, {
                    method: "PUT",
                    body: payload,
                }),
            deleteMedication: (medicationId) =>
                request(`${url}doctor/medication/${medicationId}`, {
                    method: "DELETE",
                }),
        },
        caregiver: {
            getAll: () => request(`${url}doctor/caregivers`, { method: "GET" }),
            create: (payload) =>
                request(`${url}doctor/caregiver`, {
                    method: "POST",
                    body: payload,
                }),
            delete: (caregiverId) =>
                request(`${url}doctor/caregiver/${caregiverId}`, {
                    method: "DELETE",
                }),
            update: (caregiverId, payload) =>
                request(`${url}doctor/caregiver/${caregiverId}`, {
                    method: "PUT",
                    body: payload,
                }),
        },
    },
};

export default api;

///FILES
// this is going to be used only with files
// export const downloadFile = (payload) => {
//   return axios({
//     method: 'GET',
//     responseType: 'blob',
//     url: url + 'download?filename='+payload.fileName + '&version=' + payload.version,
//     headers:{
//       token: sessionStorage.getItem( 'authToken' )
//     }
//   });
//  };
// export const uploadFile = (payload) => {return axiosRequest( url + 'download/' , payload ) };
