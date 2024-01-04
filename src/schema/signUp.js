import * as Yup from "yup";
const signupSchema = Yup.object().shape({
    firstname:Yup.string().min(2,"fisrtname has to be longer than 2 chars").max(255, "username has to be shorter than 255 chars").required(),
    lastname:Yup.string().min(2,"lastname has to be longer than 2 chars").max(255, "lastname has to be shorter than 255 chars").required(),
    age:Yup.string().min(2,"age has to be longer than 2 chars").max(3, "age has to be shorter than 255 chars").required(),
    gender:Yup.string().min(2,"age has to be longer than 2 chars").max(3, "age has to be shorter than 255 chars").required(),
    email: Yup.string().email().required(),
    phone_number:Yup.string().min(2,"username has to be longer than 2 chars").max(255, "gender has to be shorter than 255 chars").required(),
    password: Yup.string()
      .min(4, "Password Length is short")
      .max(16, "Password Length is too Long")
      .required(),
    dob:Yup.string().min(2,"age has to be longer than 2 chars").max(3, "age has to be shorter than 255 chars").required(),
    
  });
export {signupSchema}







// SignUp.js
// const signUpValidationSchema = yup.object().shape({
//   fullName: yup
//     .string()
//     .matches(/(\w.+\s).+/, 'Enter at least 2 names')
//     .required('Full name is required'),
//   phoneNumber: yup
//     .string()
//     .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
//     .required('Phone number is required'),
//   email: yup
//     .string()
//     .email("Please enter valid email")
//     .required('Email is required'),
//   password: yup
//     .string()
//     .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
//     .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
//     .matches(/\d/, "Password must have a number")
//     .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
//     .min(8, ({ min }) => `Password must be at least ${min} characters`)
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords do not match')
//     .required('Confirm password is required'),
// })