import * as Yup from "yup";
const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });
export {loginSchema}