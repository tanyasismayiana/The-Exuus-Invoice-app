import React from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import TextInput from "./Input";
import { useFormik } from "formik";
import { LoginSchema } from "./AuthSchema";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = React.useState<string>();

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      setError(undefined);
      try {
        const res = await axios.post("/users/login", values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.data.username);
        localStorage.setItem("email", res.data.data.email);
        window.location.href = "/home";
      } catch (e: any) {
        setError(e.response.data.message);
      }
    },
  });

  const { validateForm, values, errors, touched } = formik;

  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <div className="auth-container">
      <div className="auth-section">
        <div className="auth-logo">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="auth">
          <div className="auth-title">Login</div>
          {error && (
            <div style={{ fontWeight: "bold", color: "red", margin: "30px 0" }}>
              {error}
            </div>
          )}
          <div className="form">
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextInput
                placeholder="Email"
                type="email"
                value={values.email}
                name="email"
                onChange={formik.handleChange}
                labelTitle="Email"
                error={errors.email && touched.email ? errors.email : undefined}
                onBlur={formik.handleBlur}
              />
              <TextInput
                placeholder="Password"
                type="password"
                value={values.password}
                name="password"
                onChange={formik.handleChange}
                labelTitle="Password"
                error={
                  errors.password && touched.password
                    ? errors.password
                    : undefined
                }
                onBlur={formik.handleBlur}
              />
              <div className="group buttonSection">
                <Button type="submit" primary className="submitBtn">
                  Login
                </Button>
                <div className="warn">
                  <Link to={"/signup"}>Signup</Link>
                  <span>If you don't have an account</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
