import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  PopperPlacementType,
  Input,
  Container,
  Box,
} from '@mui/material';
import CityContext from '../context/CityContext';
import './Itinerary.css';
import {
  ItineraryUniversalBox,
  BlockFromTo,
  buttonExchange,
  buttonExchangeSVG,
} from './stylesItinerary';
import PoperBoard from './PoperBoard';
import { City, fetchData } from '../tools/fonctions';
import { ButtonIcon } from '../tools/imagesSVG';

/**
 * Itinerary component allows users to select departure and destination cities for travel.
 * It displays popular points of departure and destinations based on user input.
 *
 * Props: None
 */

const Itinerary = () => {
  const [dataPopDep, setDataPopDep] = useState<City[]>([]); // State for storing city data Departure
  const [dataPopDes, setDataPopDes] = useState<City[]>([]); // State for storing city data Destination

  const { cityName, setCityName } = useContext(CityContext); // Retrieve selected city name from context

  // Input state for departure and destination

  const [departure, setDeparture] = useState<City>({
    city_id: 0,
    local_name: '',
    unique_name: '',
  });

  const [destination, setDestination] = useState<City>(
    cityName.local_name !== ''
      ? cityName
      : { city_id: 0, local_name: '', unique_name: '' }
  );
  // Handle input change for departure
  const handleInputChangeDeparture = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeparture({
      ...departure,
      local_name: event.target.value,
    });
  };

  // Handle input change for destination
  const handleInputChangeDestination = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination({
      ...destination,
      local_name: event.target.value,
    });
  };
  /**Fetch popular points of departure if a destination is set,
   * otherwise fetch popular cities
   */

  const [popularDeparture, setPopularDeparture] = useState<boolean>(false);

  useEffect(() => {
    if (popularDeparture === true /*&& departure.local_name.length < 2*/) {
      let url: string = '';
      if (destination.unique_name !== '') {
        fetchData(
          `https://api.comparatrip.eu/cities/autocomplete/?q=${destination.unique_name}`,
          setDataPopDep
        );
        url = `https://api.comparatrip.eu/cities/popular/to/${destination.unique_name}/5`;
      } else {
        url = `https://api.comparatrip.eu/cities/popular/5`;
      }
      fetchData(url, setDataPopDep);
    }
    setCityName({
      city_id: 0,
      local_name: '',
      unique_name: '',
    });
  }, [popularDeparture, destination.unique_name, setCityName]);

  /**Fetch popular points of destination if a departure is set,
   * otherwise fetch popular cities
   */

  const [popularDestination, setPopularDestination] = useState<boolean>(false);

  useEffect(() => {
    if (popularDestination === true /*|| destination.local_name.length < 2*/) {
      let url: string = '';
      if (departure.unique_name !== '') {
        url = `https://api.comparatrip.eu/cities/popular/from/${departure.unique_name}/5 `;
      } else {
        url = `https://api.comparatrip.eu/cities/popular/5`;
      }
      fetchData(url, setDataPopDes);
    }
    setCityName({
      city_id: 0,
      local_name: '',
      unique_name: '',
    });
  }, [popularDestination, departure.unique_name, setCityName]);

  // Fetch city data based on input for departure
  useEffect(() => {
    if (departure.local_name.length >= 2) {
      setPopularDeparture(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${departure.local_name} `;
      fetchData(url, setDataPopDep);
    }
    if (departure.local_name.length < 2) setPopularDeparture(true);
    setCityName({
      city_id: 0,
      local_name: '',
      unique_name: '',
    });
  }, [departure, setCityName]);

  // Fetch city data based on input for destination

  useEffect(() => {
    if (destination.local_name.length >= 2) {
      setPopularDestination(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${destination.local_name} `;
      fetchData(url, setDataPopDes);
    }
    if (destination.local_name.length < 2) setPopularDestination(true);
    setCityName({
      city_id: 0,
      local_name: '',
      unique_name: '',
    });
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
              value={departure.local_name}
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
              value={destination.local_name}
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
                const tmp_dest: City = { ...destination };
                const tmp_dept: City = { ...departure };
                setDeparture(tmp_dest);
                setDestination(tmp_dept);
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
