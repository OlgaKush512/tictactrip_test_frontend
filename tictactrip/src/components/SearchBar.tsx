import { useEffect, useState, MouseEvent, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopperPlacementType } from '@mui/material';
import CityContext from '../context/CityContext';
import PoperBoard from './PoperBoard';
import { City, fetchData } from '../tools/fonctions';
import './SearchBar.css';

const SearchBar = () => {
  const [data, setData] = useState<City[]>([]);

  const [destination, setDestination] = useState<string>('');

  const [popularCities, setPopularCities] = useState<boolean>(false);

  //API autocomplete
  useEffect(() => {
    if (destination.length >= 2) {
      setPopularCities(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${destination} `;
      fetchData(url, setData);
    }
    if (destination.length < 2) setPopularCities(true);
  }, [destination]);

  //API clic; 5 popular cities

  useEffect(() => {
    if (popularCities === true || destination.length < 2) {
      const url = `https://api.comparatrip.eu/cities/popular/5`;
      fetchData(url, setData);
    }
  }, [popularCities]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination(event.target.value);
  };

  /*Popper*/
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const handleClick =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      if (destination.length < 2) setPopularCities(true);
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  /*Width Popper*/
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popperWidth, setPopperWidth] = useState<number>(0);
  useEffect(() => {
    const inputWidth = inputRef.current?.offsetWidth || 0;
    setPopperWidth(inputWidth);
  }, [inputRef]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Selection
  const [choosen, setChoosen] = useState<boolean>(false);

  const { cityName, setCityName } = useContext(CityContext);

  //Navigate

  const navigate = useNavigate();

  useEffect(() => {
    if (choosen === true) {
      navigate('/itinerary');
    }
  }, [choosen]);

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
          <div className="universal-search__wrapper" ref={inputRef}>
            <PoperBoard
              setOpen={setOpen}
              location={destination}
              setFonction={setPopularCities}
              popperWidth={popperWidth}
              objective={popularCities ? 'Destinations Populaires' : 'Villes'}
              data={data}
              setChoosen={setChoosen}
              handleClick={handleClick}
              open={open}
              anchorEl={anchorEl}
              placement={placement}
              isContextUsed={true}
              setLocation={setDestination}
            />
            <input
              className="universal-search__input-search"
              name="userInput"
              type="search"
              id="userInput"
              placeholder="Une destination, demande..."
              autoComplete="off"
              onClick={handleClick('bottom-start')}
              value={cityName !== '' ? cityName : destination}
              onChange={handleInputChange}
            />
            <button
              className="universal-search__submit"
              type="submit"
              value="Rechercher"
              onClick={() => {
                setCityName(destination);
                navigate('/itinerary');
              }}
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
