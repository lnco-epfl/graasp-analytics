import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { IconButton } from '@mui/material';

import { Navigation } from '@graasp/ui';

import { NAVIGATOR_BACKGROUND_COLOR } from '../../config/constants';
import { HOME_PATH, buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  BREADCRUMBS_NAVIGATOR_ID,
  buildBreadcrumbsItemLink,
  buildMenuItemId,
  buildNavigationDropDownId,
} from '../../config/selectors';

const { useItem, useParents, useCurrentMember, useChildren } = hooks;

const Navigator = (): JSX.Element | null => {
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const { data: item, isInitialLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const navigate = useNavigate();

  const { data: parents, isInitialLoading: areParentsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const renderRoot = () => {
    // no root access if signed out
    if (!currentMember) {
      return null;
    }

    return (
      <>
        <IconButton onClick={() => navigate(HOME_PATH)}>
          <HomeOutlinedIcon />
        </IconButton>
        <ArrowForwardIosIcon sx={{ m: 2 }} fontSize="inherit" />
      </>
    );
  };

  if (!item && pathname !== HOME_PATH) {
    return null;
  }

  return (
    <Navigation
      id={BREADCRUMBS_NAVIGATOR_ID}
      sx={{ paddingLeft: 2 }}
      item={item}
      buildToItemPath={buildItemPath}
      parents={parents}
      renderRoot={renderRoot}
      backgroundColor={NAVIGATOR_BACKGROUND_COLOR}
      buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLink}
      buildMenuItemId={buildMenuItemId}
      useChildren={useChildren as any}
      buildIconId={buildNavigationDropDownId}
    />
  );
};

export default Navigator;
