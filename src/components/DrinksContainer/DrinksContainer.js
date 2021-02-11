import { Redirect } from "react-router-dom";
import Drinks from "../Drinks/Drinks";

const DrinksContainer = ({
  isFetching,
  drinks,
  surprise,
  type,
  isAuth,
  favoritesIds,
  toggleFavorite,
}) => {
  return (
    <div className="container">
      {!isAuth ? (
        <Redirect to="/auth" />
      ) : !isFetching ? (
        <Drinks
          drinks={drinks}
          surprise={surprise}
          type={type}
          favoritesIds={favoritesIds}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
};

export default DrinksContainer;
