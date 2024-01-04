import * as Yup from 'yup';


const RestPassword = Yup.object().shape({
    New_password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    Confirm_Password: Yup.string()
      .oneOf([Yup.ref('New_password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  
  export { RestPassword };