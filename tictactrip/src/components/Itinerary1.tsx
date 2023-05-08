import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  SvgIcon,
  PopperPlacementType,
} from '@mui/material';
import CityContext from '../context/CityContext';
import './Itinerary.css';
import { ItineraryUniversalBox, BlockFromTo } from './stylesItinerary';
import PoperBoard from './PoperBoard';
import { City, fetchData } from '../tools/fonctions';
// import CityContext from '../context/CityContext';

function ButtonIcon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M18.4609 16.8848C18.461 16.9504 18.4481 17.0155 18.423 17.0762C18.3978 17.1368 18.361 17.192 18.3146 17.2384C18.2681 17.2848 18.213 17.3217 18.1523 17.3468C18.0916 17.3719 18.0266 17.3848 17.9609 17.3848H6.89209L10.6538 21.1465C10.701 21.1927 10.7386 21.2479 10.7643 21.3087C10.7901 21.3696 10.8035 21.4349 10.8038 21.501C10.8042 21.5671 10.7914 21.6326 10.7663 21.6937C10.7411 21.7548 10.7041 21.8103 10.6574 21.8571C10.6107 21.9038 10.5552 21.9408 10.494 21.9659C10.4329 21.9911 10.3674 22.0038 10.3014 22.0035C10.2353 22.0032 10.1699 21.9897 10.1091 21.964C10.0482 21.9382 9.99306 21.9007 9.94681 21.8535L5.936 17.8428C5.68226 17.5885 5.53976 17.244 5.53976 16.8848C5.53976 16.5256 5.68226 16.181 5.936 15.9268L9.94678 11.916C10.0409 11.8238 10.1675 11.7725 10.2992 11.7731C10.431 11.7738 10.5571 11.8264 10.6502 11.9196C10.7434 12.0127 10.796 12.1388 10.7967 12.2705C10.7973 12.4023 10.746 12.5289 10.6538 12.623L6.89209 16.3848H17.9609C18.0266 16.3847 18.0916 16.3976 18.1523 16.4228C18.213 16.4479 18.2681 16.4847 18.3146 16.5311C18.361 16.5776 18.3978 16.6327 18.423 16.6934C18.4481 16.7541 18.461 16.8191 18.4609 16.8848ZM6.03906 7.61572H17.1084L13.3462 11.3774C13.299 11.4237 13.2614 11.4788 13.2357 11.5397C13.2099 11.6006 13.1965 11.6659 13.1962 11.732C13.1958 11.7981 13.2086 11.8636 13.2337 11.9247C13.2589 11.9858 13.2959 12.0413 13.3426 12.088C13.3893 12.1348 13.4449 12.1718 13.506 12.1969C13.5671 12.222 13.6326 12.2348 13.6986 12.2345C13.7647 12.2341 13.8301 12.2207 13.8909 12.1949C13.9518 12.1692 14.0069 12.1316 14.0532 12.0844L18.0649 8.0737C18.3183 7.8192 18.4604 7.4747 18.4604 7.1156C18.4603 6.7565 18.3179 6.41207 18.0644 6.1577L14.0532 2.14648C13.9591 2.05429 13.8325 2.00294 13.7008 2.00361C13.569 2.00427 13.4429 2.05689 13.3498 2.15003C13.2566 2.24317 13.204 2.36931 13.2033 2.50103C13.2027 2.63274 13.254 2.7594 13.3462 2.85348L17.1079 6.61568H6.03906C5.90645 6.61568 5.77928 6.66836 5.68551 6.76213C5.59174 6.85589 5.53906 6.98307 5.53906 7.11568C5.53906 7.24829 5.59174 7.37547 5.68551 7.46923C5.77928 7.563 5.90645 7.61568 6.03906 7.61568V7.61572Z"></path>
    </SvgIcon>
  );
}

const blockUniversalTo: React.CSSProperties = {
  color: 'rgb(12, 19, 31)',
  height: '2.75rem',
  padding: '0px',
  textOverflow: ' ellipsis',
};

const buttonExchange: React.CSSProperties = {
  display: 'inline-flex',
  // -webkit-box-align: 'center',
  alignItems: 'center',
  // -webkit-box-pack: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  // -webkit-tap-highlight-color: 'transparent',
  outline: '0px',
  border: '0px',
  margin: '0px',
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  textDecoration: 'none',
  textAlign: 'center',
  flex: '0 0 auto',
  borderRadius: '50%',
  overflow: 'visible',
  color: 'rgb(12, 19, 31)',
  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  fontSize: ' 1.75rem',
  backgroundColor: 'rgb(243, 243, 248)',
  padding: '0px',
  height: '2.5rem',
  width: '2.5rem',
  right: '1rem',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
};
const buttonExchangeSVG: React.CSSProperties = {
  fill: 'rgb(12, 19, 31)',
  transform: ' rotate(90deg)',
  height: '1.5rem',
  width: '1.5rem',
};

const Itinerary = () => {
  const [data, setData] = useState<City[]>([]);

  const { cityName, setCityName } = useContext(CityContext);

  //Input Raw

  const [departure, setDeparture] = useState<string>('');

  const [destination, setDestination] = useState<string>(
    cityName !== '' ? cityName : ''
  );
  const handleInputChangeDestination = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestination(event.target.value);
  };

  const handleInputChangeDeparture = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeparture(event.target.value);
  };

  //API 5 popular point of depature

  const [popularDeparture, setPopularDeparture] = useState<boolean>(false);
  useEffect(() => {
    if (popularDeparture === true || departure.length < 2) {
      const url = `https://api.comparatrip.eu/cities/popular/to/${destination}/5 `;
      fetchData(url, setData);
    }
    setCityName('');
  }, [popularDeparture]);

  //API 5 popular point of destination

  const [popularDestination, setPopularDestination] = useState<boolean>(false);

  useEffect(() => {
    if (popularDestination === true || destination.length < 2) {
      const url = `https://api.comparatrip.eu/cities/popular/from/${departure}/5 `;
      fetchData(url, setData);
    }
    setCityName('');
  }, [popularDestination]);

  //API input departure

  useEffect(() => {
    if (departure.length >= 2) {
      setPopularDeparture(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${departure} `;
      fetchData(url, setData);
    }
    if (departure.length < 2) setPopularDeparture(true);
    setCityName('');
  }, [departure]);

  //API input destination

  useEffect(() => {
    if (destination.length >= 2) {
      setPopularDestination(false);
      const url = `https://api.comparatrip.eu/cities/autocomplete/?q=${destination} `;
      fetchData(url, setData);
    }
    if (destination.length < 2) setPopularDestination(true);
    setCityName('');
  }, [destination]);

  /*Popper Departure*/
  const [choosenDeparture, setChoosenDeparture] = useState<boolean>(false);
  const [anchorElDeparture, setAnchorElDeparture] =
    useState<HTMLElement | null>(null);
  const [openDeparture, setOpenDeparture] = useState(false);
  const [placementDeparture, setPlacementDeparture] =
    useState<PopperPlacementType>();
  const handleClickDeparture =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      if (departure.length < 2) setPopularDeparture(true);
      setAnchorElDeparture(event.currentTarget);
      setOpenDeparture((prev) => placementDeparture !== newPlacement || !prev);
      setPlacementDeparture(newPlacement);
    };

  /*Popper Destination*/
  const [choosenDestination, setChoosenDestination] = useState<boolean>(false);
  const [anchorElDestination, setAnchorElDestination] =
    useState<HTMLElement | null>(null);
  const [openDestination, setOpenDestination] = useState(false);
  const [placementDestination, setPlacementDestination] =
    useState<PopperPlacementType>();
  const handleClickDestination =
    (newPlacement: PopperPlacementType) => (event: MouseEvent<HTMLElement>) => {
      if (destination.length < 2) setPopularDestination(true);
      setAnchorElDestination(event.currentTarget);
      setOpenDestination(
        (prev) => placementDestination !== newPlacement || !prev
      );
      setPlacementDestination(newPlacement);
    };

  /*Width Popper*/
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popperWidth, setPopperWidth] = useState<number>(0);
  useEffect(() => {
    const inputWidth = inputRef.current?.offsetWidth || 0;
    setPopperWidth(inputWidth);
  }, [inputRef]);

  /*Poppers's CloseHandlers */
  useEffect(() => {
    if (choosenDeparture === true) {
      setOpenDeparture(false);
    }
  }, [choosenDeparture]);

  useEffect(() => {
    if (choosenDestination === true) {
      setOpenDestination(false);
    }
  }, [choosenDestination]);

  return (
    <ItineraryUniversalBox
      style={{ marginTop: '50px' }}
      className="itinerary-universal"
    >
      <BlockFromTo ref={inputRef}>
        <PoperBoard
          setOpen={setOpenDeparture}
          popperWidth={popperWidth}
          objective={popularDeparture ? 'Departure Populaires' : 'Villes'}
          data={data}
          setChoosen={setChoosenDeparture}
          handleClick={handleClickDeparture}
          open={openDeparture}
          anchorEl={anchorElDeparture}
          placement={placementDeparture}
          isContextUsed={false}
          setLocation={setDeparture}
        />
        <PoperBoard
          setOpen={setOpenDestination}
          popperWidth={popperWidth}
          objective={popularDestination ? 'Destination Populaires' : 'Villes'}
          data={data}
          setChoosen={setChoosenDestination}
          handleClick={handleClickDestination}
          open={openDestination}
          anchorEl={anchorElDestination}
          placement={placementDestination}
          isContextUsed={false}
          setLocation={setDestination}
        />
        <TextField
          sx={{
            '&MuiOutlinedInput-root': {
              borderRadius: '0.875rem 0.875rem 0px 0px',
            },
          }}
          // className="universal-block-to"
          color="primary"
          placeholder="D'où partons-nous ?"
          value={departure}
          onChange={handleInputChangeDeparture}
          onClick={handleClickDeparture('bottom-start')}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="adornment">
                <Typography className="font-itinerary-input ">
                  Départ :
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="input-bottom"
          style={blockUniversalTo}
          color="primary"
          placeholder="Où allons-nous ?"
          value={destination}
          onChange={handleInputChangeDestination}
          onClick={handleClickDestination('bottom-start')}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="adornment">
                <Typography className="font-itinerary-input ">
                  Arrivée :
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          sx={buttonExchange}
          onClick={() => {
            const temp = departure;
            setDeparture(destination);
            setDestination(departure);
          }}
        >
          <ButtonIcon
            stylr={buttonExchangeSVG}
            variant="contained"
            size="large"
            sx={{ zIndex: 2 }}
          />
        </IconButton>
      </BlockFromTo>
    </ItineraryUniversalBox>
  );
};

export default Itinerary;
