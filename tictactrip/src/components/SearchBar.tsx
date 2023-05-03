import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="block-universal-search">
      <div className="block-universal-search__wrapper">
        <h1 className="search-heading">
          Recherchez vos voyages, trajets courts et bien plus encore...
        </h1>
      </div>
      <div
        className="universal-search"
        id="universal-search"
        data-test="search-autocomplete"
      >
        <form
          className="universal-search__form"
          id="universal-search-form"
          action="/app/home/search"
          method="get"
          data-vsc-sticky /* to make the element stay fixed on the page when scrolling the page.*/
        >
          <div className="universal-search__wrapper" style={{borderRadius: 'solid'}}>
            <input
              className="universal-search__input-search"
              name="userInput"
              type="search"
              id="userInput"
              placeholder="Une destination, demande..."
              autoComplete="off"
            />
            <button
              className="universal-search__submit"
              type="submit"
              id="userInput-submit"
              value="Rechercher"
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
