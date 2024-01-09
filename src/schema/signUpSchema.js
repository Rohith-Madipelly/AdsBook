import * as Yup from "yup";
const signupSchema = Yup.object().shape({
  fName: Yup.string().required("First Name is a Required Field"),
  lName: Yup.string().required("Last Name is a Required Field"),
  email: Yup.string().email().required("Email is a Required Field"),
  userAge: Yup.number()
  .required("Age is a Required Field")
  .integer("Age must be an integer")
  .min(18, "You must be at least 18 years old")
  .max(120, "Age must be less than or equal to 120"),

  userGender: Yup.string().required("Gender is a Required Field").oneOf(["male", "female"], "Invalid gender"),
 
  phoneNo: Yup.string()
    .required("Phone Number is a Required Field")
    .matches(/^[0-9]{10}$/, "Invalid phone number. Must be 10 digits."),

  password: Yup.string()
    .min(6, "Password Length is short")
    .max(225, "Password Length is too Long")
    .required("Password is a Required Field")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    //   "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit"
    // )
    .test(
      "password-requirements",
      "Password must contain at least:\n1 uppercase letter,\n1 lowercase letter, and\n1 digit",
      (value) => {
        // Password validation logic here (using a regular expression or other methods)
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
      }
    )
});
export { signupSchema }

