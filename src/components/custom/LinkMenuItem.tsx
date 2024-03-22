import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MenuItem } from '@graasp/ui';

interface Props {
  disabled: boolean;
  to: string;
  text: string;
  icon: ReactElement;
  id?: string;
}
const LinkMenuItem = ({ disabled, to, text, icon, id }: Props): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <Link
      id={id}
      to={disabled ? '#' : to}
      style={{
        color: 'unset',
        textDecoration: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <MenuItem
        icon={icon}
        text={text}
        selected={pathname === to}
        disabled={disabled}
      />
    </Link>
  );
};

export default LinkMenuItem;
