const SearchBar = () => {
  return (
    <div>
      <div>
        <h1>Recherchez vos voyages, trajets courts et bien plus encore...</h1>
      </div>
      <div>
        <form>
          <div>
            <input
              name="userInput"
              type="search"
              id="userInput"
              placeholder="Une destination, demande..."
              autoComplete="off"
            />
            <button
              type="submit"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
