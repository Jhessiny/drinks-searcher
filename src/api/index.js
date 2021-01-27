import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// www.thecocktaildb.com/api/json/v1/1/random.php

export const fetchData = async (drink) => {
  let changeableUrl = url + "margarita";
  if (drink) changeableUrl = `${url}/${drink}`;
  try {
    const data = await axios.get(changeableUrl);
    console.log(data.data.drinks);
    return data.data.drinks;
  } catch (error) {}
};
