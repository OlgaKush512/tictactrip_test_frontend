import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  PopperPlacementType,
  Input,
  Container,
  Grid,
  Box,
} from '@mui/material';
import CityContext from '../context/CityContext';
import './Itinerary.css';
import {
  ItineraryUniversalBox,
  BlockFromTo,
  blockUniversalTo,
  buttonExchange,
  buttonExchangeSVG,
} from './stylesItinerary';
import PoperBoard from './PoperBoard';
import { City, fetchData } from '../tools/fonctions';
import { ButtonIcon } from '../tools/imagesSVG';
import { parsingCity } from '../tools/fonctions';

/**
 * Itinerary component allows users to select departure and destination cities for travel.
 * It displays popular points of departure and destinations based on user input.
 *
 * Usage:
 * <Itinerary />
 *
 * Props:
 * None
 */

const Itinerary = () => {
  const [dataPopDep, setDataPopDep] = useState<City[]>([]); // State for storing city data Departure
  const [dataPopDes, setDataPopDes] = useState<City[]>([]); // State for storing city data Destination

  const { cityName, setCityName } = useContext(CityContext); // Retrieve selected city name from context

  // Input state for departure and destination

  const [departure, setDeparture] = useState<string>('');

  const [destination, setDestination] = useState<string>(
    cityName !== '' ? cityName : ''
  );
  // Handle input change for departure
  const handleInputChangeDeparture = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeparture(event.target.value);
  };

  // Handle input change for destination
  const handleInputChangeDestination = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination(event.target.value);
  };
  /**Fetch popular points of departure if a destination is set,
   * otherwise fetch popular cities
   */

  const [popularDeparture, setPopularDeparture] = useState<boolean>(false);

  useEffect(() => {
    if (popularDeparture === true || departure.length < 2) {
      let url: string = '';
      if (destination !== '') {
        const parsedCity = parsingCity(destination);
        if (parsedCity && parsedCity.length > 0) {
          const city = parsedCity[0];
          console.log(city);
          url = `https://api.comparatrip.eu/cities/popular/to/${city}/5 `;
          console.log(url);
        }
      } else {
        url = `https://api.comparatrip.eu/cities/popular/5`;
      }

      fetchData(url, setDataPopDep);
    }
    setCityName('');
  }, [popularDeparture, destination, departure, setCityName]);

  /**Fetch popular points of destination if a departure is set,
   * otherwise fetch popular cities
   */

  const [popularDestination, setPopularDestination] = useState<boolean>(false);

  useEffect(() => {
    if (popularDestination === true || destination.length < 2) {
      let url: string = '';
      if (departure !== '') {
        const parsedCity = parsingCity(departure);
        if (parsedCity && parsedCity.length > 0) {
          const city = parsedCity[0];
          url = `https://api.comparatrip.eu/cities/popular/from/${city}/5 `;
        }
      } else {
        url = `https://api.comparatrip.eu/cities/popular/5`;
      }
      fetchData(url, setDataPopDes);
    }
    setCityName('');
  }, [popularDestination, destination, departure, setCityName]);

  // Fetch city data based on input for departure
  useEffect(() => {
    if (departure.length >= 2) {
      setPopularDeparture(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${departure} `;
      fetchData(url, setDataPopDep);
    }
    if (departure.length < 2) setPopularDeparture(true);
    setCityName('');
  }, [departure, setCityName]);

  // Fetch city data based on input for destination

  useEffect(() => {
    if (destination.length >= 2) {
      setPopularDestination(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${destination} `;
      fetchData(url, setDataPopDes);
    }
    if (destination.length < 2) setPopularDestination(true);
    setCityName('');
  }, [destination, setCityName]);

  /*Popper Departure*/
  const [choosenDeparture, setChoosenDeparture] = useState<boolean>(false); //Is a departure option has been chosen.
  const [anchorElDeparture, setAnchorElDeparture] = //The reference element that the departure Popper is anchored to.
    useState<HTMLElement | null>(null);
  const [openDeparture, setOpenDeparture] = useState(false); //The state indicating whether the departure Popper is open.
  const [placementDeparture, setPlacementDeparture] = //The placement of the departure Popper relative to its anchor element.
    useState<PopperPlacementType>();

  /**The event handler function for clicking on the departure Popper. */
  const handleClickDeparture =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      // if (departure.length < 2)
      setAnchorElDeparture(event.currentTarget);
      setOpenDeparture((prev) => placementDeparture !== newPlacement || !prev);
      setPlacementDeparture('bottom-start');
      setPopularDeparture(true);
    };

  /*Popper Destination*/
  const [choosenDestination, setChoosenDestination] = useState<boolean>(false); //Is a destination option has been chosen.
  const [anchorElDestination, setAnchorElDestination] = //The reference element that the destination Popper is anchored to.
    useState<HTMLElement | null>(null);
  const [openDestination, setOpenDestination] = useState(false); //The state indicating whether the destination Popper is open.
  const [placementDestination, setPlacementDestination] = //The placement of the destination Popper relative to its anchor element.
    useState<PopperPlacementType>();

  /**The event handler function for clicking on the destination Popper. */
  const handleClickDestination =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      // if (destination.length < 2)
      setPopularDestination(true);
      setAnchorElDestination(event.currentTarget);
      setOpenDestination(
        (prev) => placementDestination !== newPlacement || !prev
      );
      setPlacementDestination('bottom-start');
    };

  /*Width Popper*/
  const inputRef = useRef<HTMLInputElement | null>(null); //The reference to the input element.
  const [popperWidth, setPopperWidth] = useState<number>(0);
  useEffect(() => {
    const inputWidth = inputRef.current?.offsetWidth || 0;
    setPopperWidth(inputWidth);
  }, [inputRef]);

  /*Poppers's CloseHandlers */

  /**This hook is responsible for handling the closing behavior of the departure Popper.
   * It runs whenever the choosenDeparture state changes.
   * If choosenDeparture is true, it sets the openDeparture state to false,
   * effectively closing the departure Popper. */
  useEffect(() => {
    if (choosenDeparture === true) {
      setOpenDeparture(false);
    }
  }, [choosenDeparture]);

  /**This hook handles the closing behavior of the destination Popper.
   * It runs whenever the choosenDestination state changes.
   * If choosenDestination is true, it sets the openDestination state to false,
   * closing the destination Popper.*/
  useEffect(() => {
    if (choosenDestination === true) {
      setOpenDestination(false);
    }
  }, [choosenDestination]);

  return (
    <Box
      sx={{ backgroundColor: 'rgb(243, 243, 248)' }}
      style={{ minHeight: '100vh', minWidth: 'auto' }}
    >
      <Container>
        <ItineraryUniversalBox
          // style={{ marginTop: '50px' }}
          className="itinerary-universal"
        >
          <BlockFromTo ref={inputRef}>
            <div style={{ position: 'relative' }}>
              <PoperBoard
                setOpen={setOpenDeparture}
                popperWidth={popperWidth}
                objective={popularDeparture ? 'Départs Populaires' : 'Villes'}
                data={dataPopDep}
                setChoosen={setChoosenDeparture}
                open={openDeparture}
                anchorEl={anchorElDeparture}
                placement={'bottom-start'}
                isContextUsed={false}
                setLocation={setDeparture}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 200, left: 401 }}
              />
              <PoperBoard
                setOpen={setOpenDestination}
                popperWidth={popperWidth}
                objective={
                  popularDestination ? 'Destination Populaires' : 'Villes'
                }
                data={dataPopDes}
                setChoosen={setChoosenDestination}
                open={openDestination}
                anchorEl={anchorElDestination}
                placement={'bottom-start'}
                isContextUsed={false}
                setLocation={setDestination}
              />
            </div>
            <Input
              placeholder="D'où partons-nous ?"
              value={departure}
              onChange={handleInputChangeDeparture}
              onClick={handleClickDeparture('bottom-start')}
              autoComplete="off"
              disableUnderline
              startAdornment={
                <InputAdornment position="start" className="adornment">
                  Départ&nbsp;:&nbsp;
                </InputAdornment>
              }
              sx={{
                borderRadius: '15px 15px 0px 0px',
                padding: 1,
                backgroundColor: 'white',
                border: '2px solid transparent',
                '&:hover': { backgroundColor: '#e5e5ef' },
                '&.Mui-focused': {
                  border: '2px solid #127996',
                },
              }}
            />
            <Input
              placeholder="Où allons-nous ?"
              value={destination}
              onChange={handleInputChangeDestination}
              onClick={handleClickDestination('bottom-start')}
              autoComplete="off"
              startAdornment={
                <InputAdornment position="start" className="adornment">
                  Arrivée&nbsp;:&nbsp;
                </InputAdornment>
              }
              disableUnderline
              sx={{
                marginTop: '2px',
                backgroundColor: 'white',
                borderRadius: '0px 0px 15px 15px',
                padding: 1,
                border: '2px solid transparent',
                '&:hover': { backgroundColor: '#e5e5ef' },
                '&.Mui-focused': {
                  border: '2px solid #127996',
                },
              }}
            />

            <IconButton
              sx={buttonExchange}
              onClick={() => {
                setDeparture(destination);
                setDestination(departure);
              }}
            >
              <ButtonIcon sx={buttonExchangeSVG} />
            </IconButton>
          </BlockFromTo>
        </ItineraryUniversalBox>
      </Container>
    </Box>
  );
};

export default Itinerary;
