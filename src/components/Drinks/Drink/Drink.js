import React, {useState, useEffect} from 'react'
import "./Drink.scss"

const Drink = ({ name, img, drink, type }) => {
    const [ ingredients, setIngredients ]= useState([])
 
    useEffect(() => {
      const ingredientsArray = []
      const regex = new RegExp(/strIngredient/);
      const propriedades = Object.keys(drink)
      
      propriedades.forEach(propriedade => {
        if(regex.test(propriedade)){
           ingredientsArray.push(propriedade)
        }
      });
      setIngredients(ingredientsArray)
     
    }, [drink])
    
  

  return (
    <div className="drink-box">
      <div className={`box-side ${type === 's' ? 'front-side' : null}`}>
        <img src={img} alt="" />
        <h3>{name}</h3>
      </div>
      {type === 's' ? (<div className="box-side back-side">
        <h3>{name}</h3>
         <h4>Ingredients</h4>
        <ul className="ing-list">
          {ingredients.map((ingredient)=> (
          drink[ingredient] ? <li>{drink[ingredient]}</li> : null
        ))}
        </ul>
         <h4>Instructions</h4>
        <p>{drink.strInstructions}</p>
      </div>) : null}
      
    </div>
  );
};

export default Drink;

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
