import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { fetchData } from "./api";
import Auth from "./components/Auth/auth";
import DrinksContainer from "./components/DrinksContainer/DrinksContainer";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import User from "./components/User/User";

class App extends Component {
  state = {
    drinks: {},
    search: "margarita",
    beforeSubmitType: "",
    type: "s",
    surprise: false,
    isFetching: false,
    isAuthenticated: true,
    favoritesIds: ["11007", "17216"],
    favorites: [
      { id: "11007", name: "Margarita" },
      { id: "17216", name: "Tommy's Margarita" },
    ],
  };
  async componentDidMount() {
    this.setState({ isFetching: true });
    const fetchedData = await fetchData(this.state.search, this.state.type);
    this.setState({ drinks: fetchedData });
    console.log("data", this.state.data);
    this.setState({ surprise: false, isFetching: false });
  }

  changeInput = (e) => {
    const newSearch = e.target.value;
    this.setState({ search: newSearch });
  };

  changeType = (e) => {
    const newType = e.target.value;
    this.setState({ beforeSubmitType: newType });
  };

  searchNewDrink = async (e) => {
    // this.props.history.push("/");
    e.preventDefault();
    this.setState({ type: this.state.beforeSubmitType, isFetching: true });
    const fetchedData = await fetchData(
      this.state.search,
      this.state.beforeSubmitType,
      e
    );
    this.setState({ drinks: fetchedData, surprise: false, isFetching: false });
  };

  surpriseme = async () => {
    this.setState({ isFetching: true, type: "s" });
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const fetchedData = await fetchData(this.state.search, null, null, url);
    this.setState({ drinks: fetchedData });
    console.log("data", this.state.data);
    this.setState({ surprise: true, search: "", isFetching: false });
  };

  toggleFavorite = (id, drinkName) => {
    if (this.state.favoritesIds.indexOf(id) != -1) {
      const newFavs = this.state.favorites.filter((fav) => fav.id != id);
      const newFavsId = this.state.favoritesIds.filter((favId) => favId != id);
      this.setState({ favoritesIds: newFavsId, favorites: newFavs });
    } else {
      const newFavs = [...this.state.favorites, { id: id, name: drinkName }];
      const newFavsId = [...this.state.favoritesIds, id];
      this.setState({ favoritesIds: newFavsId, favorites: newFavs });
    }
    console.log(this.state.favorites);
    console.log(this.state.favoritesIds);
  };

  render() {
    const {
      drinks,
      search,
      surprise,
      type,
      isFetching,
      isAuthenticated,
      favorites,
      favoritesIds,
    } = this.state;

    return (
      <BrowserRouter>
        <Header isAuth={isAuthenticated} />
        {isAuthenticated && (
          <SearchBar
            search={search}
            changeType={this.changeType}
            changeInput={this.changeInput}
            submit={this.searchNewDrink}
            surpriseme={this.surpriseme}
          />
        )}

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
                toggleFavorite={this.toggleFavorite}
              />
            )}
          />
          <Route exact path="/auth" component={Auth} />
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
  }
}

export default App;
