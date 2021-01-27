import React from "react";
import Drink from "./Drink/Drink";
import "./Drinks.scss"

const Drinks = ({ drinks, surprise, type }) => {
  return (
    <>
{surprise ? <p className="p-center">Our suggestion for you is:</p> : null}
    <div className="drinks-list" style={{ justifyContent: surprise ? 'center' : "space-between" }}>
      {drinks && drinks.length > 0 ? (
        drinks.map((drink) => (
          <Drink drink={drink} name={drink.strDrink} img={drink.strDrinkThumb} type={type}/>
        ))) : <p className="p-center">Nothing Found</p>}
    </div>
    </>
  );
};

export default Drinks;
