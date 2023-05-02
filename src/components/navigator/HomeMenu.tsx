import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Typography } from '@mui/material';

import { HOME_PATH, SHARED_ITEMS_PATH } from '../../config/paths';
import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  HOME_MENU_ID,
  HOME_MENU_OWN_MENUITEM_ID,
  HOME_MENU_SHARED_MENUITEM_ID,
} from '../../config/selectors';
import { StyledIconButton } from './util';

const HomeMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton
        id={HOME_MENU_DROPDOWN_BUTTON_ID}
        onClick={handleClick}
        aria-controls={open ? HOME_MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id={HOME_MENU_ID}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          id={HOME_MENU_OWN_MENUITEM_ID}
          component={Link}
          to={HOME_PATH}
        >
          <Typography>{t('My items')}</Typography>
        </MenuItem>
        <MenuItem
          id={HOME_MENU_SHARED_MENUITEM_ID}
          component={Link}
          to={SHARED_ITEMS_PATH}
        >
          <Typography>{t('Shared items')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HomeMenu;
