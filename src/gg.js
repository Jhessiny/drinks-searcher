  useEffect(async () => {
    setIsFetching(true);
    const fetchedData = await fetchData(this.state.search, this.state.type);

    setDrinks(fetchedData);

    let fetchedFavorites;
    
  }


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
            drinkId: fetchedFavorites[fav].id,
            drinkName: fetchedFavorites[fav].name,
          }
          favoritesArray.push(newFav);
          favoritesIdArray.push(fetchedFavorites[fav].id)
        }
       setFavorites(favoritesArray)
      setFavoritesIds(favoritesIdArray)
        })
    setSurprise(false);
    setIsFetching(false);