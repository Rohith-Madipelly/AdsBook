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