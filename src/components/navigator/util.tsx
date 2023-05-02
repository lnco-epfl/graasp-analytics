import truncate from 'lodash.truncate';

import { Link } from 'react-router-dom';

import { IconButton, Typography, styled } from '@mui/material';

import { ITEM_NAME_MAX_LENGTH } from '../../config/constants';
import { buildItemPath } from '../../config/paths';
import { buildBreadcrumbsItemLink } from '../../config/selectors';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'text.primary',
});

type ParentLinkProps = {
  id: string;
  name: string;
};

const ParentLink = ({ name, id }: ParentLinkProps): JSX.Element => (
  <StyledLink id={buildBreadcrumbsItemLink(id)} to={buildItemPath(id)}>
    <Typography>{truncate(name, { length: ITEM_NAME_MAX_LENGTH })}</Typography>
  </StyledLink>
);

const StyledIconButton = styled(IconButton)({
  margin: 0,
});

export { ParentLink, StyledLink, StyledIconButton };
