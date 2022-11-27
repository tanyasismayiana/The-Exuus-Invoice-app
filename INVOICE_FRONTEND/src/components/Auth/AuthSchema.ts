import { object, string } from "yup";

export const LoginSchema = object().shape({
  email: string().required("Email is required").email("Email must be valid"),
  password: string().required("Password is required"),
});

export const SignupSchema = object().shape({
  email: string().required("Email is required").email("Email must be valid"),
  password: string()
    .required("Password is required")
    .min(5, "Password should be more than 5 characters"),
  userName: string()
    .required("Username is required")
    .min(3, "Username should be more than 3 characters"),
});
