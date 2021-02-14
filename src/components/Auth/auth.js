import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./auth.scss";
import Form from "./form";

const Auth = ({
  isAuth,
  loginHandler,
  signupHandler,
  emailError,
  passwordError,
}) => {
  const [isLogingIn, setIsLogingIn] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    userName: "",
    freqPref: "casual",
    alcoholPref: "na",
  });

  let auth;

  const showSignUpform = () => {
    setIsLogingIn(false);
  };

  const showLoginForm = () => {
    setIsLogingIn(true);
  };

  const changeInputHandler = (event, inputType, formType) => {
    const newInput = event.target.value;
    if (formType == "login") {
      setLoginData({ ...loginData, [inputType]: newInput });
    } else if (formType == "signup") {
      setSignupData({ ...signupData, [inputType]: newInput });
    }
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    loginHandler(loginData.email, loginData.password);
  };

  const submitSignupHandler = (e) => {
    e.preventDefault();
    let freqPref;
    let alcoholPref;
    if (signupData.alcoholPref == "na") {
      alcoholPref = "Non-alcoholic drinks";
    } else if (signupData.alcoholPref == "a") {
      alcoholPref = "Alcoholic drinks";
    }
    if (signupData.freqPref == "often") {
      freqPref = "Drinks often";
    } else if (signupData.freqPref == "casual") {
      freqPref = "Drinks casually";
    }
    const userName =
      signupData.userName.charAt(0).toUpperCase() +
      signupData.userName.slice(1);
    const newUser = {
      userName: userName,
      freqPref: freqPref,
      alcoholPref: alcoholPref,
    };
    signupHandler(signupData.email, signupData.password, newUser);
  };

  isAuth
    ? (auth = <Redirect to="/" />)
    : (auth = (
        <>
          <div className={`form-box ${!isLogingIn ? "login-box-hidden" : ""}`}>
            <Form
              click={submitLoginHandler}
              formTitle="Login"
              emailValue={loginData.email}
              passValue={loginData.password}
              changeInput={changeInputHandler}
              emailError={emailError}
              passwordError={passwordError}
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
            <Form
              click={submitSignupHandler}
              formTitle="Signup"
              emailValue={signupData.email}
              passValue={signupData.password}
              changeInput={changeInputHandler}
              emailError={emailError}
              passwordError={passwordError}
            >
              <div className="input-box">
                <input
                  placeholder=" "
                  name="userName"
                  id="userName"
                  type="text"
                  autoComplete="off"
                  required
                  value={signupData.userName}
                  onChange={(e) => changeInputHandler(e, "userName", "signup")}
                />
                <label htmlFor="name" className="input-label">
                  <span className="input-label-content">UserName</span>
                </label>
              </div>
              <div className="input-box-select">
                <select
                  name="frequency"
                  id="frequency"
                  required
                  value={signupData.freqPref}
                  onChange={(e) => changeInputHandler(e, "freqPref", "signup")}
                >
                  <option value="casual">Drinks casually</option>
                  <option value="often">Drinks Often</option>
                </select>
              </div>
              <div className="input-box-select">
                <select
                  name="alcoholic-pref"
                  id="alcoholic-pref"
                  required
                  value={signupData.alcoholPref}
                  onChange={(e) =>
                    changeInputHandler(e, "alcoholPref", "signup")
                  }
                >
                  <option value="na">Non-alcoholic drinks</option>
                  <option value="a">Alcoholic drinks</option>
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
