import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?";

export const fetchData = async (search, type, e, randomDrinkUrl) => {
  if (e) e.preventDefault();
  let searchUrl;
  randomDrinkUrl
    ? (searchUrl = randomDrinkUrl)
    : (searchUrl = `${url}${type}=${search}`);

  if (type === "i") {
    searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
  } else if (type === "fav") {
    searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${search}`;
  }

  try {
    const data = await axios.get(searchUrl);
    return data.data.drinks;
  } catch (error) {}
};
