import { useEffect, useState, MouseEvent, useRef } from 'react';
import {
  Box,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  Typography,
} from '@mui/material';

import './SearchBar.css';

interface City {
  city_id: number;
  local_name: string;
}

const SearchBar = () => {
  //API typed text
  const [destination, setDestination] = useState<string>('');

  const [results, setResults] = useState<City[]>([]);

  //API clic; 5 popular cities
  const [popularCities, setPopularCities] = useState<boolean>(false);

  useEffect(() => {
    if (destination.length >= 2) {
      setPopularCities(false);
      fetch(
        `https://api.comparatrip.eu/cities/autocomplete/?q=${destination}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': 'https://mywebsite.com',
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data: City[]) => {
          setResults(data);
          //   console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [destination]);

  
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination(event.target.value);
  };

  const handleClickCity = () => (event: MouseEvent<HTMLElement>) => {
    if (destination.length < 2) setPopularCities(true);
  };

  useEffect(() => {
    if (popularCities === true) {
      fetch(
        `https://api.comparatrip.eu/cities/popular/5`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': 'https://mywebsite.com',
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data: City[]) => {
          setResults(data);
          //   console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [destination]);

  /*Popper*/
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  /*Width Popper*/
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [popperWidth, setPopperWidth] = useState<number>(0);
  useEffect(() => {
    const inputWidth = inputRef.current?.offsetWidth || 0;
    // const buttonWidth = buttonRef.current?.offsetWidth || 0;
    setPopperWidth(inputWidth);
  }, [inputRef]);

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
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement={placement}
              transition
              style={{ width: popperWidth }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    style={{
                      borderRadius: '.875rem',
                      marginTop: '5px',
                      borderTop: '8px',
                      borderBottom: '8px',
                      paddingBottom: '24px',
                      paddingTop: '16px',
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      The content of the Popper.
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <input
              className="universal-search__input-search"
              name="userInput"
              type="search"
              id="userInput"
              placeholder="Une destination, demande..."
              autoComplete="off"
              onClick={(handleClick('bottom-start'), handleClickCity())}
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
