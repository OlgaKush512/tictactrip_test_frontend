import { Box, BoxProps, SvgIcon, TextField, TextFieldProps } from '@mui/material';
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

export const blockUniversalTo: React.CSSProperties = {
  color: 'rgb(12, 19, 31)',
  height: '2.75rem',
  padding: '0px',
  textOverflow: ' ellipsis',
};

export const buttonExchange: React.CSSProperties = {
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

export const buttonExchangeSVG: React.CSSProperties = {
  fill: 'rgb(12, 19, 31)',
  transform: ' rotate(90deg)',
  height: '1.5rem',
  width: '1.5rem',
};
