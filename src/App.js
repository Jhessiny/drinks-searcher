import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { fetchData } from "./api";
import Auth from "./components/Auth/auth";
import DrinksContainer from "./components/DrinksContainer/DrinksContainer";
import Header from "./components/Header/Header";
import User from "./components/User/User";

const App = () => {
  const [drinks, setDrinks] = useState({});
  const [search, setSearch] = useState("margarita");
  const [beforeSubmitType, setBeforeSubmitType] = useState("s");
  const [type, setType] = useState("s");
  const [surprise, setSurprise] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchDataApi = async () => {
      setIsFetching(true);
      const fetchedData = await fetchData(search, type);

      setDrinks(fetchedData);

      let fetchedFavorites;
      axios
        .get(
          "https://drinks-search-default-rtdb.firebaseio.com/users/sdsd/drinks.json"
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
      setSurprise(false);
      setIsFetching(false);
    };
    fetchDataApi();
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
      axios
        .post(
          `https://drinks-search-default-rtdb.firebaseio.com/users/sdsd/drinks.json/`,
          newFav
        )
        .then((res) => {
          newFav.firebaseId = res.data;
        });
      const newFavs = [...favorites, newFav];
      const newFavsId = [...favoritesIds, id];
      setFavoritesIds(newFavsId);
      setFavorites(newFavs);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  const login = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Header isAuth={isAuthenticated} logout={logout} />

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
          render={() => <Auth isAuth={isAuthenticated} login={login} />}
        />
        <Route
          exact
          path="/user/:id"
          render={() => (
            <User
              isFetching={isFetching}
              isAuth={isAuthenticated}
              favorites={favorites}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
