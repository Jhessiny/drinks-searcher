import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./auth.scss";
import Form from "./form";

const Auth = ({ isAuth, login }) => {
  const [isLogingIn, setIsLogingIn] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    userName: "",
    freqPref: "",
    alcoholPref: "",
  });

  let auth;

  const showSignUpform = () => {
    setIsLogingIn(false);
  };

  const showLoginForm = () => {
    setIsLogingIn(true);
  };

  const sendLoginData = () => {
    console.log("oi");
  };

  isAuth
    ? (auth = <Redirect to="/" />)
    : (auth = (
        <>
          <div className={`form-box ${!isLogingIn ? "login-box-hidden" : ""}`}>
            <Form
              click={sendLoginData}
              formTitle="Login"
              emailValue={loginData.email}
              passValue={loginData.password}
            />
            <p>
              <a className="p-auth-color" href="#">
                Forgot password?
              </a>
            </p>
            <p>
              New here?{" "}
              <a className="p-auth-color" onClick={showSignUpform}>
                Create an account
              </a>
            </p>
          </div>

          <div
            className={`form-box signup-box ${
              !isLogingIn ? "signup-box-shown" : ""
            }`}
          >
            <Form click={login} formTitle="Signup">
              <div className="input-box">
                <input
                  type="userName"
                  placeholder=" "
                  name="userName"
                  id="userName"
                  type="text"
                  autoComplete="off"
                  required
                />
                <label for="name" class="input-label">
                  <span class="input-label-content">UserName</span>
                </label>
              </div>
              <div className="input-box-select">
                <select name="frequency" id="frequency" required>
                  <option value="casual">Casual drinking</option>
                  <option value="casual">Often</option>
                </select>
              </div>
              <div className="input-box-select">
                <select name="alcoholic-pref" id="alcoholic-pref" required>
                  <option value="a">Alcoholic drinks</option>
                  <option value="na">Non alcoholic drinks</option>
                </select>
              </div>
            </Form>

            <p>
              Already have an account?{" "}
              <a className="p-auth-color" onClick={showLoginForm}>
                Login.
              </a>
            </p>
          </div>
        </>
      ));

  return auth;
};

export default Auth;
