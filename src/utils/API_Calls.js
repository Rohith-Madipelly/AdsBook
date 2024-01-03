import axios from 'axios';

import { GUEST_URL, BASE_URL } from '../Enviornment.js'



// User Login API Call 
export const UserLoginApi = async (email, password) => {
    const loginData = {
      email: email,
      password: password
    };
  
    return await axios.post(`${GUEST_URL}/login`, loginData);
  };






  // //Profile api 
  // export const UserGetProfileDetails = async (token) => {
  //   const ProfileData={
  //   }
  //   console.log("here token is printing >",token)
  //   return await axios.get("http://51.20.138.48:8001/user/profile" ,{
  //     headers: { 
  //       'Authorization': token
  //     }
  //   });
  // };







  //Profile api 
export const UserGetProfileDetails = async (token) => {
  const ProfileData={
  }
  return await axios.get(`http://16.170.162.36:8001/user/profile` ,{
    headers:  { 
      'Authorization':`Bearer ${token}`
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGU3OTI3ODUwN2NjNDVhMWE3ZjVlZSIsImlhdCI6MTcwNDI2MzI5MCwiZXhwIjoxNzA0NDM2MDkwfQ.rCj1rD-BkqBINXpG1bVFR-D2Wcjkt2H2ITb-c59TKwc'
    }
    
  });
};