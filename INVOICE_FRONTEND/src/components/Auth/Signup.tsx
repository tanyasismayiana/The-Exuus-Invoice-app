import React from "react";
import { Button } from "semantic-ui-react";
import TextInput from "./Input";
import { useFormik } from "formik";
import { SignupSchema } from "./AuthSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = React.useState<string>();

  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: SignupSchema,
    initialValues: { email: "", password: "", userName: "" },
    onSubmit: async (values) => {
      setError(undefined);
      console.log('re', values);
      try {
        await axios.post("/users/signup", values);
        navigate("/");
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
          <div className="auth-title">Register</div>
          {error && (
            <div style={{ fontWeight: "bold", color: "red", margin: "30px 0" }}>
              {error}
            </div>
          )}
          <div className="form">
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextInput
                placeholder="Username"
                type="text"
                value={values.userName}
                name="userName"
                onChange={formik.handleChange}
                labelTitle="Username"
                error={
                  errors.userName && touched.userName
                    ? errors.userName
                    : undefined
                }
                onBlur={formik.handleBlur}
              />
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
                <div className="agree">
                  <span>
                    <Icon
                      icon={"material-symbols:check-box-outline-rounded"}
                      color="#3b67be"
                      fontSize={20}
                    />
                  </span>
                  <span>
                    By signing up you are acepting{" "}
                    <Link to="#">Terms of service</Link> and{" "}
                    <Link to={"#"}>Privacy policy</Link> of invox
                  </span>
                </div>
                <Button type="submit" primary className="submitBtn">
                  Signup
                </Button>
                <div className="warn">
                  <Link to={"/"}>Login</Link>
                  <span>If you already have an account</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
