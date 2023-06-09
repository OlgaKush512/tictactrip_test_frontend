import { useState, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import CityContext from '../context/CityContext';
import { parsingCity } from '../tools/fonctions';
import { CityIcon } from '../tools/imagesSVG';

/**
The OptionsCity component displays an option for a city in a dropdown list.
It allows the user to select a city and triggers the corresponding actions.
@param {Object} props - The component props.
@param {string} props.local_name - The local name of the city.
@param {string} props.unique_name - The unique name of the city.
@param {Function} props.setChoosen - Callback function to handle the selection of an option.
@param {boolean} props.isContextUsed - Indicates whether the CityContext is being used.
@param {Function} props.setLocation - Callback function to set the location.
@param {Function} props.setOpen - Callback function to control the open state of the popper
@returns {JSX.Element} The rendered OptionsCity component.
*/

const OptionsCity = (props: {
  local_name: string;
  setChoosen: any;
  isContextUsed: boolean;
  setLocation: any;
  unique_name: string;
  setOpen: any;
}) => {
  const {
    local_name,
    setChoosen,
    isContextUsed,
    setLocation,
    unique_name,
    setOpen,
  } = props;

  const [isCursorOn, setIsCursorOn] = useState<boolean>(false);
  //Event handler when the mouse enters the option element.
  const handleMouseEnter = (): void => {
    setIsCursorOn(true);
  };

  //Event handler when the mouse leaves the option element.
  const handleMouseLeave = () => {
    setIsCursorOn(false);
  };

  const city = parsingCity(local_name)[0]; //local name of the city
  /**
Generates the location string for the city.
@returns {string} The formatted location string.
*/
  const location = () => {
    let result: string = '';
    const arr: string[] = parsingCity(local_name);
    for (let i: number = 1; i < arr.length; i++) {
      result = result + arr[i];
      if (i !== arr.length - 1) result = result + ', ';
    }
    result = result + ')';
    return result;
  };

  //Context
  const { setCityName } = useContext(CityContext);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-selected={isCursorOn}
      data-testid="option"
      onClick={() => {
        if (isContextUsed === true) {
          setCityName({
            city_id: 0,
            local_name: local_name,
            unique_name: unique_name,
          });
        } else {
          setLocation({
            city_id: 0,
            local_name: local_name,
            unique_name: unique_name,
          });
        }
        setChoosen(true);
        setOpen(false);
      }}
      style={{
        backgroundColor: isCursorOn ? 'rgb(229, 229, 239)' : 'white',
        padding: '0.5rem 1.5rem',
        display: 'flex',
        alignItems: 'end',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <CityIcon sx={{ fontSize: '29px' }} />
      <Stack marginLeft="16px">
        <Typography
          variant="caption"
          noWrap
          fontSize="11px"
          color="rgb(94, 104, 120)"
          fontWeight={500}
        >
          Ville
        </Typography>
        <Stack direction="row">
          <Typography variant="inherit" noWrap>
            <span
              style={{
                fontWeight: '500',
                fontSize: '16px',
                color: 'rgb(12, 19, 31)',
              }}
            >
              {city}
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'rgb(94, 104, 120)',
              }}
            >
              {' (' + location()}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default OptionsCity;
