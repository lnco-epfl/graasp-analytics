import truncate from 'lodash.truncate';

import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import {
  ITEM_NAME_MAX_LENGTH,
  NAVIGATOR_BACKGROUND_COLOR,
} from '../../config/constants';
import {
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../../config/paths';
import { hooks } from '../../config/queryClient';
import HomeMenu from './HomeMenu';
import ItemMenu from './ItemMenu';
import RootMenu from './RootMenu';
import { ParentLink, StyledLink } from './util';

const { useItem, useParents, useCurrentMember } = hooks;

const CenterAlignWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledHomeIcon = styled(HomeIcon)({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Navigator = () => {
  const { t } = useTranslation();
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const currentMemberId = currentMember?.id;
  const { data: item, isLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const { data: parents, isLoading: areParentsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const renderRoot = () => {
    let to = HOME_PATH;
    let text = t('My items');
    let isShared = false;

    const isParentOwned =
      (item?.creator ?? parents?.first()?.creator) === currentMemberId;

    if (
      pathname === SHARED_ITEMS_PATH ||
      (pathname !== HOME_PATH && !isParentOwned)
    ) {
      to = SHARED_ITEMS_PATH;
      text = t('Shared items');
      isShared = true;
    }

    return (
      <CenterAlignWrapper>
        <StyledLink color="inherit" to={to}>
          <Typography>{text}</Typography>
        </StyledLink>
        <RootMenu isShared={isShared} />
      </CenterAlignWrapper>
    );
  };

  const renderParents = () =>
    parents?.map(({ name, id }) => (
      <CenterAlignWrapper key={id}>
        <ParentLink name={name} id={id} />
        <ItemMenu itemId={id} />
      </CenterAlignWrapper>
    ));

  const renderHome = () => (
    <CenterAlignWrapper>
      <StyledLink to="#">
        <StyledHomeIcon />
      </StyledLink>
      <HomeMenu />
    </CenterAlignWrapper>
  );
  if (
    item === undefined &&
    pathname !== SHARED_ITEMS_PATH &&
    pathname !== HOME_PATH
  ) {
    return <Navigate to={HOME_PATH} />;
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      aria-label="breadcrumb"
      style={{ backgroundColor: NAVIGATOR_BACKGROUND_COLOR }}
    >
      {renderHome()}
      {renderRoot()}
      {itemId && renderParents()}
      {itemId && (
        <CenterAlignWrapper>
          <StyledLink key={itemId} to={buildItemPath(itemId)}>
            <Typography>
              {truncate(item.name, { length: ITEM_NAME_MAX_LENGTH })}
            </Typography>
          </StyledLink>
          <ItemMenu itemId={itemId} />
        </CenterAlignWrapper>
      )}
    </Breadcrumbs>
  );
};

export default Navigator;
