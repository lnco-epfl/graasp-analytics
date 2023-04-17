import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Typography } from '@mui/material';

import { HOME_PATH, SHARED_ITEMS_PATH } from '../../config/paths';
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
        onClick={handleClick}
        aria-controls={open ? `menu-home` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-home"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to={HOME_PATH}>
          <Typography>{t('My items')}</Typography>
        </MenuItem>
        <MenuItem component={Link} to={SHARED_ITEMS_PATH}>
          <Typography>{t('Shared items')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HomeMenu;
