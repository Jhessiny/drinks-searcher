import "./User.scss";
import { fetchData } from "../../api";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FavDrink from "../FavDrink/FavDrink";

const User = (props) => {
  const { favorites, isAuth, curUserUid } = props;
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    if (curUserUid) {
      axios
        .get(
          `https://drinks-search-default-rtdb.firebaseio.com/users/${curUserUid}.json`
        )
        .then((res) => setCurUser(res.data));
    }
  }, [curUserUid]);

  const [showDrink, setShowDrink] = useState(false);
  const [favDrinkShowed, setFavDrinkShowed] = useState({});

  const reqDrink = async (e, drinkId) => {
    const fetchedData = await fetchData(drinkId, "fav");
    setShowDrink(true);
    setFavDrinkShowed(fetchedData[0]);
  };

  const closePopUp = () => {
    setShowDrink(false);
    console.log("oi");
  };

  let user = <Redirect to="/" />;
  if (isAuth) {
    user = (
      <div className="userCard">
        <h2 className="userName">Hey, {curUser.userName}!</h2>
        <div className="userInfo">
          <div className="myPreferences profileItem">
            <h3>My Drinking Preferences</h3>
            <p>{curUser.freqPref}</p>
            <p>{curUser.alcoholPref}</p>
          </div>
          <div className="myFavorits profileItem">
            <h3>My favorite drinks</h3>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((favorite, index) => (
                  <li
                    key={index}
                    onClick={(e) => reqDrink(e, favorite.drinkId)}
                  >
                    {favorite.drinkName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorite drinks yet.</p>
            )}
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
