import React from 'react';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Typography } from '@mui/material';

import { buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  ROOT_MENU_DROPDOWN_BUTTON_ID,
  ROOT_MENU_ID,
  buildMenuItem,
} from '../../config/selectors';
import { StyledIconButton } from './util';

const { useOwnItems, useSharedItems } = hooks;
const RootMenu = ({ isShared }: { isShared: boolean }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: sharedItems, isLoading: areSharedItemsLoading } =
    useSharedItems();
  const { data: ownItems, isLoading: areOwnItemsLoading } = useOwnItems();
  const items = isShared ? sharedItems : ownItems;

  if (isShared && areSharedItemsLoading) {
    return null;
  }
  if (!isShared && areOwnItemsLoading) {
    return null;
  }

  if (!items || items.size === 0) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        id={ROOT_MENU_DROPDOWN_BUTTON_ID}
        onClick={handleClick}
        aria-controls={open ? ROOT_MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id={ROOT_MENU_ID}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items?.map(({ name, id }) => (
          <MenuItem
            id={buildMenuItem(id, ROOT_MENU_ID)}
            key={id}
            component={Link}
            to={buildItemPath(id)}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RootMenu;
