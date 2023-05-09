import { useEffect, useState, MouseEvent, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopperPlacementType } from '@mui/material';
import CityContext from '../context/CityContext';
import PoperBoard from './PoperBoard';
import { City, fetchData } from '../tools/fonctions';
import './SearchBar.css';

/**
 * The SearchBar component allows users to search for cities and navigate.
 *
 * @component
 */

const SearchBar = () => {
  // State variables
  const [data, setData] = useState<City[]>([]); // State for city data
  const [destination, setDestination] = useState<string>(''); // State for destination input
  /**State for popular cities; If true , use API 5popular cities*/
  const [popularCities, setPopularCities] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); //State for popper
  const [open, setOpen] = useState(false); //State for openning popper
  const [placement, setPlacement] = useState<PopperPlacementType>(); //State for placement of the popper
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popperWidth, setPopperWidth] = useState<number>(0);
  /**State if citie was choosen from the list of cities in OptionCity*/
  const [choosen, setChoosen] = useState<boolean>(false);

  // Context
  const { cityName, setCityName } = useContext(CityContext);

  // Router navigation
  const navigate = useNavigate();

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

  // Handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination(event.target.value);
  };

  // Handle click event for the popper

  const handleClick =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      if (destination.length < 2) setPopularCities(true);
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  // Set popper width
  useEffect(() => {
    const inputWidth = inputRef.current?.offsetWidth || 0;
    setPopperWidth(inputWidth);
  }, [inputRef]);

  // Handle selection and navigate to itinerary
  useEffect(() => {
    if (choosen === true) {
      navigate('/itinerary');
    }
  }, [choosen]);
  // Handle clic on input for Blur effect

  let classBlur = '';
  useEffect(() => {
    if (open === true) {
      classBlur = 'universal-search__backdrop';
    } else {
      classBlur = 'universal-search__input-search';
    }
  }, [open]);

  return (
    <div className="block-universal-search" >
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
          data-vsc-sticky //to make the element stay fixed on the page when scrolling the page.
        >
          {/* <div className="universal-search__backdrop "> */}
          <div className="universal-search__wrapper" ref={inputRef}>
            <PoperBoard
              setOpen={setOpen}
              popperWidth={popperWidth}
              objective={popularCities ? 'Destinations Populaires' : 'Villes'}
              data={data}
              setChoosen={setChoosen}
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
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
