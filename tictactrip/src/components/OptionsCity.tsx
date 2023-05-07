import { Box, Divider, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { City } from './SearchBar';
// import city_icon from '../../images/city_icon.svg';

function CityIcon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M14.3915 9.27272C14.0313 9.27272 13.7393 9.57798 13.7393 9.95455V11.3181C13.7393 11.6947 14.0313 12 14.3915 12H15.6958C16.056 12 16.348 11.6947 16.348 11.3181V9.95455C16.348 9.57798 16.056 9.27272 15.6958 9.27272H14.3915ZM14.6088 11.091V10.1818H15.4784V11.091H14.6088Z"></path>
      <path d="M17.2173 9.95455C17.2173 9.57798 17.5092 9.27272 17.8694 9.27272H19.1738C19.534 9.27272 19.826 9.57798 19.826 9.95455V11.3181C19.826 11.6947 19.534 12 19.1738 12H17.8694C17.5092 12 17.2173 11.6947 17.2173 11.3181V9.95455ZM18.0868 10.1818V11.091H18.9564V10.1818H18.0868Z"></path>
      <path d="M14.3915 5.63668C14.0313 5.63668 13.7393 5.94194 13.7393 6.31849V7.68213C13.7393 8.05869 14.0313 8.36394 14.3915 8.36394H15.6958C16.056 8.36394 16.348 8.05869 16.348 7.68213V6.31849C16.348 5.94194 16.056 5.63668 15.6958 5.63668H14.3915ZM14.6088 7.45486V6.54576H15.4784V7.45486H14.6088Z"></path>
      <path d="M17.2173 6.31849C17.2173 5.94194 17.5092 5.63668 17.8694 5.63668H19.1738C19.534 5.63668 19.826 5.94194 19.826 6.31849V7.68213C19.826 8.05869 19.534 8.36394 19.1738 8.36394H17.8694C17.5092 8.36394 17.2173 8.05869 17.2173 7.68213V6.31849ZM18.0868 6.54576V7.45486H18.9564V6.54576H18.0868Z"></path>
      <path d="M14.3915 12.9092H15.6958C16.056 12.9092 16.348 13.2144 16.348 13.591V14.9546C16.348 15.3311 16.056 15.6364 15.6958 15.6364H14.3915C14.0313 15.6364 13.7393 15.3311 13.7393 14.9546V13.591C13.7393 13.2144 14.0313 12.9092 14.3915 12.9092ZM14.6088 14.7273H15.4784V13.8183H14.6088V14.7273Z"></path>
      <path d="M17.2173 13.591V14.9546C17.2173 15.3311 17.5092 15.6364 17.8694 15.6364H19.1738C19.534 15.6364 19.826 15.3311 19.826 14.9546V13.591C19.826 13.2144 19.534 12.9092 19.1738 12.9092H17.8694C17.5092 12.9092 17.2173 13.2144 17.2173 13.591ZM18.0868 13.8183H18.9564V14.7273H18.0868V13.8183Z"></path>
      <path d="M11.5653 2.68181C11.5653 2.30526 11.8573 2 12.2175 2H21.3479C21.7081 2 22.0001 2.30526 22.0001 2.68181V21.3182C22.0001 21.6946 21.7081 21.9999 21.3479 21.9999L2.65217 22C2.29199 22 2 21.6947 2 21.3182V15.9969C2 15.5201 2.23824 15.0779 2.6283 14.8307L6.54135 12.3514C6.95686 12.0881 7.47792 12.0881 7.89344 12.3514L11.5653 14.6779V2.68181ZM21.1305 21.0909V2.90909H12.4349V21.0909H15.0436V19.2727C15.0436 18.2686 15.8222 17.4546 16.7827 17.4546C17.7432 17.4546 18.5218 18.2686 18.5218 19.2727V21.0909H21.1305ZM15.9131 19.2727V21.0909H17.6523V19.2727C17.6523 18.7706 17.263 18.3636 16.7827 18.3636C16.3025 18.3636 15.9131 18.7706 15.9131 19.2727ZM7.44274 13.1288C7.30423 13.0411 7.13055 13.0411 6.99204 13.1288L3.079 15.6081C2.94898 15.6905 2.86957 15.8379 2.86957 15.9969V21.0909H5.47838V19.2723C5.47838 18.2682 6.25701 17.4541 7.21751 17.4541C8.178 17.4541 8.95664 18.2682 8.95664 19.2723V21.0909H11.5652V15.9969C11.5652 15.8379 11.4858 15.6905 11.3558 15.6081L7.44274 13.1288ZM7.21751 18.3632C6.73726 18.3632 6.34794 18.7702 6.34794 19.2723V21.0905H8.08708V19.2723C8.08708 18.7702 7.69776 18.3632 7.21751 18.3632Z"></path>
    </SvgIcon>
  );
}

const parsingCity = (location: string) => {
  const words: string[] = location.split(/[,\s]+/);
  return words;
};

const OptionsCity = (props: { local_name: string; setChoosenClick: any }) => {
  const { local_name, setChoosenClick } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const handleMouseEnter = (): void => {
    setIsSelected(true);
  };
  const handleMouseLeave = () => {
    setIsSelected(false);
  };
  const handleClick = (): void => {
    setIsSelected(!isSelected);
  };
  const city = parsingCity(local_name)[0];
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
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-selected={isSelected}
        onClick={() => setChoosenClick(local_name)}
        style={{
          backgroundColor: isSelected ? 'rgb(229, 229, 239)' : 'white',
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
                  // fontFamily: 'Avenir-Heavy, Arial, Helvetica, sans-serif',
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
    </>
  );
};

export default OptionsCity;