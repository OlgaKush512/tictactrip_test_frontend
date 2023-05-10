import { Fade, Paper, Popper, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import OptionsCity from './OptionsCity';
import { City } from '../tools/fonctions';
/**
PoperBoard Component
The PoperBoard component is used to display a popper with a list of cities.
@component
*/
const PoperBoard = (props: any) => {
  /**@param {Object} props - The component props
@param {Function} props.setOpen - Callback function to control the open state of the popper
@param {number} props.popperWidth - The width of the popper element
@param {string} props.objective - The objective or purpose of the options displayed in the popper
@param {Array} props.data - An array of city data to be displayed as options
@param {Function} props.setChoosen - Callback function to handle the selection of an option.
Passed to the OptionsCity component via props.

@param {boolean} props.open - The open state of the popper
@param {HTMLElement} props.anchorEl - The anchor element to which the popper is attached
@param {string} props.placement - The placement of the popper relative to the anchor element
@param {boolean} props.isContextUsed - Indicates whether the component is using a context;
Passed to the OptionsCity component via props.

@param {Function} props.setLocation - Callback function to set the location value;
Passed to the OptionsCity component via props.

@returns {JSX.Element} The rendered PoperBoard component
 */
  const {
    setOpen,
    popperWidth,
    objective,
    data,
    setChoosen,
    open,
    anchorEl,
    placement,
    isContextUsed,
    setLocation,
  } = props;

  const onClose = () => {
    setOpen(false);
    setChoosen(true);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      sx={{ width: popperWidth, zIndex: 1 }}
      data-testid="non-popper"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            // elevation={0}
            sx={{
              borderRadius: '.875rem',
              marginTop: '5px',
              borderTop: '8px',
              borderBottom: '8px',
              paddingBottom: '24px',
              paddingTop: '16px',
              zIndex: 1,
            }}
          >
            <ClickAwayListener onClickAway={onClose}>
              <div>
                <Typography
                  variant="caption"
                  noWrap
                  margin="16px"
                  fontSize="13px"
                  color="rgb(94, 104, 120)"
                  fontWeight={500}
                >
                  {objective}
                </Typography>
                {data?.map((city: City) => (
                  <OptionsCity
                    key={city.city_id}
                    local_name={city.local_name}
                    unique_name={city.unique_name}
                    setChoosen={setChoosen}
                    isContextUsed={isContextUsed}
                    setLocation={setLocation}
                  />
                ))}
              </div>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default PoperBoard;
