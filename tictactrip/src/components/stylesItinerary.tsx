import { Box, BoxProps, TextField, TextFieldProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// const theme = useTheme();
export const ItineraryUniversalBox = styled(Box)<BoxProps>(
  ({ theme: Theme }) => {
    const theme = useTheme();
    return {
      boxSizing: 'border-box',
      margin: '0px',
      flexDirection: 'row',
      flexBasis: '100%',
      flexGrow: 0,
      maxWidth: '100%',
      padding: '0px 1rem',
      marginTop: '50px',
      [theme.breakpoints.up('md')]: {
        flexBasis: 'auto',
        WebkitBoxFlex: 0,
        flexGrow: 0,
        maxWidth: '100%',
      },
      [theme.breakpoints.up(768)]: {
        flexBasis: 'auto',
        WebkitBoxFlex: 0,
        flexGrow: 0,
        maxWidth: '100%',
      },
    };
  }
);

export const BlockFromTo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 1,
});

// export const blockFromTo: React.CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   position: 'relative',
//   zIndex: 4,
// };

export const UniversalBlockTo = styled(TextField)<TextFieldProps>(
  ({ theme: Theme }) => {
    const theme = useTheme();
    return {
      /* overflow: hidden; */
      boxSizing: 'border-box',
      cursor: 'text',
      display: 'inline-flex',
      /* -webkit-box-align: 'center', */
      /* align-items: 'center', */
      position: 'relative',
      caretColor: 'rgb(18, 121, 150)',
      width: '100%',
      fontFamily: 'Avenir-Medium, Arial, Helvetica, sans-serif',
      fontSize: '1rem',
      lineHeight: '1.375rem',
      fontWeight: '500',
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid transparent',
      color: 'rgb(12, 19, 31)',
      height: '3rem',
      padding: '0px 4.5rem 0px 1rem',
      borderRadius: '0.875rem 0.875rem 0px 0px',
    };
  }
);

export const universalBlockTo: React.CSSProperties = {
  /* overflow: hidden; */
  boxSizing: 'border-box',
  cursor: 'text',
  display: 'inline-flex',
  /* -webkit-box-align: 'center', */
  /* align-items: 'center', */
  position: 'relative',
  caretColor: 'rgb(18, 121, 150)',
  width: '100%',
  fontFamily: 'Avenir-Medium, Arial, Helvetica, sans-serif',
  fontSize: '1rem',
  lineHeight: '1.375rem',
  fontWeight: '500',
  backgroundColor: 'rgb(255, 255, 255)',
  border: '1px solid transparent',
  color: 'rgb(12, 19, 31)',
  height: '3rem',
  padding: '0px 4.5rem 0px 1rem',
  borderRadius: '0.875rem 0.875rem 0px 0px',
};
