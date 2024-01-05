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




// User Forgot OTP Send API Call 
export const UserForgotOTPApi = async (email) => {
  const loginData = {
    email: email,
  };

  return await axios.post(`${GUEST_URL}/sendotp`, loginData);
};



// User Forgot OTP verifyotp API Call 
export const UserVerifyOtp = async (email,userOtp) => {

  const ReqData = {
    email: email,
    userOtp:userOtp
  };

  return await axios.post(`${GUEST_URL}/verifyotp`, ReqData);
};



// User Forgot OTP verifyotp API Call 
export const ForgotApiPassRest = async (email,password) => {

  const ReqData = {
    email: email,
    password:password
  };

  return await axios.post(`${GUEST_URL}/forgotpassword`, ReqData);
};


  //Profile api 
export const UserGetProfileDetails = async (token) => {
  return await axios.get(`${GUEST_URL}/user/profile` ,{
    headers:  { 
      'Authorization':`Bearer ${token}`
    }
    
  });

};



  //Profile PasswordChange
  export const ChangePasswordAPI = async (old_password,New_Password,tokenn) => {
    const ReqData = {
      oldPassword:old_password,
      newPassword:New_Password,
    };
    
    return await axios.post(`${GUEST_URL}/user/changepassword`
    ,ReqData,{
      headers:{ 
        'Authorization': `Bearer ${tokenn}`
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQwYTE3MzJhZmRmY2NkMWIzNWIwOCIsImlhdCI6MTcwNDQzNTczOCwiZXhwIjoxNzA0NjA4NTM4fQ.XQ2xpaTQTxgH3343VdZylmd3bqGvdsH_ekRX1p-pnR0'
      }
    });
  };




  //Video api 
  export const GetVideosDataAPI = async (token) => {
    return await axios.get(`${GUEST_URL}/user/videos` ,{
      headers:  { 
        'Authorization':`Bearer ${token}`
      }
      
    });
  };