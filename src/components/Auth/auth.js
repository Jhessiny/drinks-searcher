import { Redirect } from "react-router-dom";

const Auth = ({ isAuth }) => {
  let searchbar = <Redirect to="/" />;
  if (isAuth) {
    searchbar = (
      <div className="form-box">
        <form action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  return searchbar;
};

export default Auth;
