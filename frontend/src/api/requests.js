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
