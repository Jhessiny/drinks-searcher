import { Redirect } from "react-router-dom";
import "./auth.scss";

const Auth = ({ isAuth, login }) => {
  let auth;

  isAuth
    ? (auth = <Redirect to="/" />)
    : (auth = (
        <div className="form-box">
          <i className="fa fa-user fa-login"></i>
          <form action="">
            <h2>Login</h2>
            <div className="input-box">
              <input
                type="email"
                placeholder=" "
                name="email"
                id="email"
                type="text"
                autoComplete="off"
                required
              />
              <label for="name" class="input-label">
                <span class="input-label-content">Email</span>
              </label>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder=" "
                name="password"
                id="password"
                type="text"
                autoComplete="off"
                required
              />
              <label for="name" class="input-label">
                <span class="input-label-content">Password</span>
              </label>
            </div>

            <input
              className="btn-auth"
              type="submit"
              value="Submit"
              onClick={login}
            />
          </form>
          <p>
            <a className="p-auth-color" href="#">
              Forgot password?
            </a>
          </p>
          <p>
            New here?{" "}
            <a className="p-auth-color" href="#">
              Create an account
            </a>
          </p>
        </div>
      ));

  return auth;
};

export default Auth;
