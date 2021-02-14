import React from "react";
import Drink from "./Drink/Drink";
import "./Drinks.scss";

const Drinks = ({ drinks, surprise, type, favoritesIds, toggleFavorite }) => {
  return (
    <>
      {surprise ? <p className="p-center">Our suggestion for you is:</p> : null}
      <div className={`drinks-list ${surprise ? "surprise-drink" : ""}`}>
        {drinks && drinks.length > 0 ? (
          drinks.map((drink) => (
            <Drink
              drink={drink}
              name={drink.strDrink}
              img={drink.strDrinkThumb}
              type={type}
              favoritesIds={favoritesIds}
              key={drink.idDrink}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p className="p-center">Nothing Found</p>
        )}
        {(drinks.length + 1) % 3 == 0 ? (
          <Drink
            drink={""}
            name={""}
            img={""}
            type={""}
            favoritesIds={""}
            key={""}
            toggleFavorite={""}
            lastRowDoubleDrink={true}
          />
        ) : null}
      </div>
    </>
  );
};

export default Drinks;
