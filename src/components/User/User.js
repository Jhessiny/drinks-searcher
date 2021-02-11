import "./User.scss";
import { fetchData } from "../../api";
import React, { Fragment, useState } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import FavDrink from "../FavDrink/FavDrink";

const User = (props) => {
  const { favorites, isAuth } = props;
  const [showDrink, setShowDrink] = useState(false);
  const [favDrinkShowed, setFavDrinkShowed] = useState({});

  const reqDrink = async (e, drinkId) => {
    const fetchedData = await fetchData(drinkId, "fav");
    setShowDrink(true);
    setFavDrinkShowed(fetchedData[0]);
  };

  const closePopUp = () => {
    setShowDrink(false);
  };

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
              {favorites.map((favorite, index) => (
                <li key={index} onClick={(e) => reqDrink(e, favorite.drinkId)}>
                  {favorite.drinkName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      {user}
      {showDrink && (
        <FavDrink closePopUp={closePopUp} favDrinkShowed={favDrinkShowed} />
      )}
    </Fragment>
  );
};

export default User;
