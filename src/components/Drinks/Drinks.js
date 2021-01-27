import React from "react";
import Drink from "./Drink/Drink";
import "./Drinks.scss"

const Drinks = ({ drinks }) => {
  return (
    <div className="drinks-list">
      {drinks.length > 0 &&
        drinks.map((drink) => (
          <Drink name={drink.strDrink} img={drink.strDrinkThumb} />
        ))}
    </div>
  );
};

export default Drinks;
