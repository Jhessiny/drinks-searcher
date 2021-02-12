import { Redirect } from "react-router-dom";
import Drinks from "../Drinks/Drinks";
import SearchBar from "../SearchBar/SearchBar";

const DrinksContainer = ({
  isFetching,
  drinks,
  surprise,
  type,
  isAuth,
  favoritesIds,
  toggleFavorite,
  search,
  changeType,
  changeInput,
  submit,
  surpriseme,
}) => {
  return (
    <>
      {isAuth && (
        <SearchBar
          search={search}
          changeType={changeType}
          changeInput={changeInput}
          submit={(e) => submit(e)}
          surpriseme={surpriseme}
        />
      )}
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
    </>
  );
};

export default DrinksContainer;
