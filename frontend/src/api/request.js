// import axios from 'axios';
// axios is going to be used when we work with files,
// for now its just going to be commented

export const request = (path, opts = {})=> {
    // Adding contentType and registration token to the request every time
    const headers = Object.assign({},
                        opts.headers || {},
                        {'Content-Type': 'application/json',
                        'token': sessionStorage.getItem( 'authToken' ) || localStorage.getItem( 'authToken' ) || ''
                        }
                    );
    // default method is post, or it can be provided in opts
    return fetch(
        path,
        Object.assign({ method: 'POST',}, opts,{headers}),
    ).then( result => {
    // 401 error for missing auth is just a convention from previous project
      if( result.status === 401 ){
        sessionStorage.setItem( 'authToken' , 'missing' );
        window.location.assign( '/login' );
      }
      return result;
    } );
};

// export const axiosRequest = ( path , data ) => {
//   return axios.post( path , data , {
//       headers:{'token' : sessionStorage.getItem( 'authToken' )}
//   });
// }

