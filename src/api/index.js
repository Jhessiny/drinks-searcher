import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?";
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// www.thecocktaildb.com/api/json/v1/1/random.php

export const fetchData = async (search, type, e, randomDrinkUrl) => {
  if(e) e.preventDefault()
  let searchUrl 
  randomDrinkUrl ? searchUrl = randomDrinkUrl : searchUrl = `${url}${type}=${search}`;

  // console.log(searchUrl);
  console.log(type);
  if(type === "i"){
      searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`
      console.log(searchUrl);
    }

  try {
    const data = await axios.get(searchUrl);
    console.log(data.data.drinks);
    return data.data.drinks;
  } catch (error) {}
};
