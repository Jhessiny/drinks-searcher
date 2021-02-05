import "./User.scss";
import React from "react";
import { Redirect } from "react-router-dom";

const User = ({ favorites, isAuth }) => {
  let user = <Redirect to="/" />;
  if (isAuth) {
    user = (
      <div className="userCard">
        <h2 className="userName">Hey, Jhéssiny!</h2>
        <div className="userInfo">
          <div className="myPreferences profileItem">
            <h3>My Drinking Preferences</h3>
            <p>Non-alcoholic drinks</p>
            <p>Casual drinking</p>
          </div>
          <div className="myFavorits profileItem">
            <h3>My favorite drinks</h3>
            <ul>
              {favorites.map((favorite) => (
                <li>{favorite.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return user;
};

export default User;
