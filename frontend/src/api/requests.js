import {request} from "./request.js";
//import {axiosRequest} from "./request.js";
//import axios from 'axios';

// At which endpoint the api is located
// we will use this for the example getting mock data
// For development this will usually be localhost
const url = 'https://jsonplaceholder.typicode.com/';

export const getProducts = () => {return request( url + 'albums/' , {method:'GET'})};

// not used in example
// payload will be a product identifier object, something like
// {
//  id: 123
// }
export const addProduct = (payload) => {return request(url + 'albums/', {method:"POST", body:JSON.stringify(payload)})};
export const deleteProduct = (payload) => {return request(url+'albums/', {method:"DELETE", body:JSON.stringify(payload)})};
export const login = (payload) => {return request( url + 'login/' ,{body:JSON.stringify( payload )}) };

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
