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



// User Registertion API Call 
export const UserRegisterApi = async (fName, lName, userAge, userGender, email, phoneNo, password) => {
  const loginData = {
    firstname: fName,
    lastname: lName,
    age: userAge,
    gender: userGender,
    email: email,
    phone_number: phoneNo,
    password: password
  };

  return await axios.post(`${GUEST_URL}/register`, loginData);
};




// User Forgot OTP Send API Call 
export const UserForgotOTPApi = async (email) => {
  const loginData = {
    email: email,
  };

  return await axios.post(`${GUEST_URL}/sendotp`, loginData);
};



// User Forgot OTP verifyotp API Call 
export const UserVerifyOtp = async (email, userOtp) => {

  const ReqData = {
    email: email,
    userOtp: userOtp
  };

  return await axios.post(`${GUEST_URL}/verifyotp`, ReqData);
};



// User Forgot OTP verifyotp API Call 
export const ForgotApiPassRest = async (email, password) => {

  const ReqData = {
    email: email,
    password: password
  };

  return await axios.post(`${GUEST_URL}/forgotpassword`, ReqData);
};


//Profile api 
export const UserGetProfileDetails = async (token) => {
  return await axios.get(`${GUEST_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Updated Profile api 
export const UserUpdatedProfileDetails = async (fName, lName, userAge, token) => {
  const loginData = {
    firstname: fName,
    lastname: lName,
    age: userAge,
    // gender: userGender,
  };
  return await axios.post(`${GUEST_URL}/user/updateprofile`,loginData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Updated Profile Pic api 
export const UserUpdatedProfilePic = async (image, token) => {




  // const ReqData = {
  //   profile_pic: image,
  // };

  // return await axios.post(`${GUEST_URL}/user/updateprofilepicture`
  //   , ReqData, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // });

  const formData = new FormData();
  formData.append("profile_pic", image);

  return await axios.post(`${GUEST_URL}/user/updateprofilepicture`,formData, {
    headers: {
      // 'Authorization': `Bearer ${token}`
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQwYTE3MzJhZmRmY2NkMWIzNWIwOCIsImlhdCI6MTcwNTQ3MTQzMywiZXhwIjoxNzA1NjQ0MjMzfQ.5PN-Tbg6sJXCGLSwG8zqaGpL_dFfGzezwV-JPsK65X0'
    }
  });
};


//Profile PasswordChange
export const ChangePasswordAPI = async (old_password, New_Password, tokenn) => {
  const ReqData = {
    oldPassword: old_password,
    newPassword: New_Password,
  };

  return await axios.post(`${GUEST_URL}/user/changepassword`
    , ReqData, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};




//Video api 
export const GetVideosDataAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/videos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};





//Video api  locations based
export const GetVideosDataAPI2 = async (ReqData,page,token) => {
  return await axios.post(`${GUEST_URL}/user/locationvideos?page=${page}`,
  ReqData,
   {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};


// Put Like on Video
export const PutLikeAPI = async (dateVideoId,token) => {
  return await axios.put(`${GUEST_URL}/user/${dateVideoId}/likes`,{}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};



// Repost API Call
export const PostRepostAPI = async (ReqData,token) => {

  return await axios.post(`${GUEST_URL}/user/report`,
  ReqData,
   {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};

//Profile rewarded
export const rewardedAPI = async (videoId, tokenn) => {
  const ReqData = {
    videoId: videoId,
  };

  return await axios.post(`${GUEST_URL}/user/wallet`
    , ReqData, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};

// Get Wallet Amount
export const GetWalletAmountAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/walletamount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};



//Put Like Video
export const PutLikeVideoAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/walletamount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};