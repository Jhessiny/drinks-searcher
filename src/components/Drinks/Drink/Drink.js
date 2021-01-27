import React from 'react'
import "./Drink.scss"

const Drink = ({ name, img }) => {
  return (
    <div className="drink-box">
      <img src={img} alt="" />
      <h3>{name}</h3>
    </div>
  );
};

export default Drink;
