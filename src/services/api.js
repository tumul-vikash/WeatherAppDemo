import axios from 'axios';

// import {getItem} from '../utils/utils';

// export async function getAuthorizationHeader() {
//   const token = await getItem('TOKEN');
//   console.log('TOKEN', token);
//   if (token) {
//     return {
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return null;
// }

export async function request(url, method, data, headers) {
  //   const bearer = await getAuthorizationHeader();
  
  var h = {
    'Content-Type': 'application/json',
    ...headers,
    // ...bearer,
  };

  return new Promise((resolve, reject) => {
    const config = {
      url: url,
      method: method,
      data: data,
      headers: h,
    };
    console.log(config);
    axios(config)
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        console.log('ERROR RESPONSE', err, url);
        reject(err?.response?.data);
      });
  });
}

export function apiGet(url, data = undefined, headers = {}) {
  return request(url, 'get', data, headers);
}

export function apiPost(url, data = {}, headers = {}) {
  return request(url, 'post', data, headers);
}

export function apiPut(url, data = {}, headers = {}) {
  return request(url, 'put', data, headers);
}
