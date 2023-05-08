import {
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import OptionsCity from './OptionsCity';
import { City } from '../tools/fonctions';

// const whichObjective(objective:string){}

const PoperBoard = (
  props: any & { handleClick: (event: MouseEvent<HTMLElement>) => void }
) => {
  const {
    popperWidth,
    objective,
    data,
    setChoosen,
    open,
    anchorEl,
    placement,
    isContextUsed,
    setLocation,
    setOpen,
  } = props;
  const handleClick = props.handleClick;
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      style={{ width: popperWidth, zIndex: 1 }}
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
