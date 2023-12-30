import * as Yup from "yup";
const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(4, "Password Length is short")
      .max(225, "Password Length is too Long")
      .required(),
  });
export {loginSchema}