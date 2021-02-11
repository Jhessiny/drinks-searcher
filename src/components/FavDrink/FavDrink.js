import { useState, useEffect } from "react";

import "./FavDrink.scss";

const FavDrink = ({ closePopUp, favDrinkShowed }) => {
  const [favIngredients, setFavIngredients] = useState([]);

  useEffect(() => {
    const ingredientsArray = [];
    const regex = new RegExp(/strIngredient/);
    const propriedades = Object.keys(favDrinkShowed);

    propriedades.forEach((propriedade) => {
      if (regex.test(propriedade)) {
        ingredientsArray.push(propriedade);
      }
    });
    setFavIngredients(ingredientsArray);
  }, [favDrinkShowed]);

  console.log(favDrinkShowed);
  return (
    <div className="popup-background">
      <div className="fav-box">
        <div className="close-popup" onClick={closePopUp}>
          x
        </div>
        <div className="fav-left">
          <img className="fav-img" src={favDrinkShowed.strDrinkThumb} alt="" />
          <h2>{favDrinkShowed.strDrink}</h2>
        </div>
        <div className="fav-right">
          <h3>Instructions</h3>
          <p>{favDrinkShowed.strInstructions}</p>
          <ul className="ing-list">
            <h3>Ingredients</h3>
            {favIngredients.map((ingredient, index) =>
              favDrinkShowed[ingredient] ? (
                <li key={index}>{favDrinkShowed[ingredient]}</li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavDrink;
