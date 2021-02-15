import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import firebase from "./firebase";
import { fetchData } from "./api";
import Auth from "./components/Auth/auth";
import DrinksContainer from "./components/DrinksContainer/DrinksContainer";
import Header from "./components/Header/Header";
import User from "./components/User/User";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [drinks, setDrinks] = useState({});
  const [search, setSearch] = useState("margarita");
  const [beforeSubmitType, setBeforeSubmitType] = useState("s");
  const [type, setType] = useState("s");
  const [surprise, setSurprise] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    const fetchDataApi = async () => {
      if (user) {
        setIsFetching(true);
        const fetchedData = await fetchData(search, type);
        setDrinks(fetchedData);

        let fetchedFavorites;
        axios
          .get(
            `https://drinks-search-default-rtdb.firebaseio.com/users/${user.uid}/drinks.json`
          )
          .then((res) => {
            fetchedFavorites = res.data;
            let favoritesArray = [];
            let favoritesIdArray = [];
            for (let fav in fetchedFavorites) {
              let newFav = {
                firebaseId: fav,
                drinkId: fetchedFavorites[fav].drinkId,
                drinkName: fetchedFavorites[fav].drinkName,
              };
              favoritesArray.push(newFav);
              favoritesIdArray.push(fetchedFavorites[fav].drinkId);
            }
            setFavorites(favoritesArray);
            setFavoritesIds(favoritesIdArray);
          });
      }
      setSurprise(false);
      setIsFetching(false);
    };
    fetchDataApi();
  }, [user]);

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const loginHandler = (email, password) => {
    clearErrors();
    if (didMount) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
    }
  };

  const signupHandler = (email, password, newUser) => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const dbRefUsers = firebase.database().ref("users/" + user.user.uid);
        dbRefUsers.set(newUser);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
        }
      });
    }
  };

  useEffect(() => {
    authListener();
  }, []);

  const changeInput = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  const changeType = (e) => {
    const newType = e.target.value;
    setBeforeSubmitType(newType);
  };

  const searchNewDrink = async (e) => {
    e.preventDefault();
    setType(beforeSubmitType);
    setIsFetching(true);
    const fetchedData = await fetchData(search, beforeSubmitType, e);
    setDrinks(fetchedData);
    setSurprise(false);
    setIsFetching(false);
  };

  const surpriseme = async () => {
    setIsFetching(true);
    setType("s");
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const fetchedData = await fetchData(search, null, null, url);
    setDrinks(fetchedData);
    setSurprise(true);
    setSearch("");
    setIsFetching(false);
  };

  const toggleFavorite = (id, drinkName) => {
    if (favoritesIds.indexOf(id) != -1) {
      const deletedFav = favorites.filter((fav) => fav.drinkId == id);
      axios.delete(
        `https://drinks-search-default-rtdb.firebaseio.com/users/sdsd/drinks/${deletedFav[0].firebaseId}.json`
      );
      const newFavs = favorites.filter((fav) => fav.drinkId != id);
      const newFavsId = favoritesIds.filter((favId) => favId != id);
      setFavoritesIds(newFavsId);
      setFavorites(newFavs);
    } else {
      const newFav = { drinkId: id, drinkName: drinkName };
      if (user) {
        axios
          .post(
            `https://drinks-search-default-rtdb.firebaseio.com/users/${user.uid}/drinks.json`,
            newFav
          )
          .then((res) => {
            newFav.firebaseId = res.data;
          });
      }
      const newFavs = [...favorites, newFav];
      const newFavsId = [...favoritesIds, id];
      setFavoritesIds(newFavsId);
      setFavorites(newFavs);
    }
  };

  const logoutHandler = () => {
    firebase.auth().signOut();
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Header
        isAuth={isAuthenticated}
        logout={logoutHandler}
        curUserUid={user && user.uid}
      />

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <DrinksContainer
              drinks={drinks}
              surprise={surprise}
              type={type}
              isFetching={isFetching}
              isAuth={isAuthenticated}
              favorites={favorites}
              favoritesIds={favoritesIds}
              toggleFavorite={toggleFavorite}
              search={search}
              changeType={changeType}
              changeInput={changeInput}
              submit={searchNewDrink}
              surpriseme={surpriseme}
            />
          )}
        />
        <Route
          exact
          path="/auth"
          render={() => (
            <Auth
              isAuth={isAuthenticated}
              loginHandler={loginHandler}
              signupHandler={signupHandler}
              emailError={emailError}
              passwordError={passwordError}
            />
          )}
        />
        <Route
          exact
          path="/user/:id"
          render={() => (
            <User
              isFetching={isFetching}
              isAuth={isAuthenticated}
              favorites={favorites}
              curUserUid={user && user.uid}
            />
          )}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
