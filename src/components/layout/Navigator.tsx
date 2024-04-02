import { useLocation, useMatch } from 'react-router-dom';

import { COMMON } from '@graasp/translations';
import { HomeMenu, ItemMenu, Navigation } from '@graasp/ui';

import { useCommonTranslation } from '@/config/i18n';

import { NAVIGATOR_BACKGROUND_COLOR } from '../../config/constants';
import { HOME_PATH, buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  BREADCRUMBS_NAVIGATOR_ID,
  HOME_MENU_DROPDOWN_BUTTON_ID,
  HOME_MENU_ID,
  buildBreadcrumbsItemLink,
  buildMenuItemId,
  buildNavigationDropDownId,
} from '../../config/selectors';

const { useItem, useParents, useCurrentMember, useChildren, useOwnItems } =
  hooks;

const Navigator = (): JSX.Element | null => {
  const { t } = useCommonTranslation();
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const { data: item, isInitialLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const { data: parents, isInitialLoading: areParentsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  const isParentOwned =
    (item?.creator?.id ?? parents?.[0]?.creator?.id) === currentMember?.id;

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const menu = [{ name: t(COMMON.USER_OWN_ITEMS), id: 'home', to: HOME_PATH }];

  const renderRoot = () => {
    // no root access if signed out
    if (!currentMember) {
      return null;
    }

    const selected =
      isParentOwned || pathname === HOME_PATH ? menu[0] : menu[1];

    return (
      <>
        <HomeMenu
          selected={selected}
          elements={menu}
          menuId={HOME_MENU_ID}
          homeDropdownId={HOME_MENU_DROPDOWN_BUTTON_ID}
          buildMenuItemId={buildBreadcrumbsItemLink}
        />
        <ItemMenu
          buildIconId={buildNavigationDropDownId}
          itemId="root"
          buildMenuItemId={buildMenuItemId}
          useChildren={useOwnItems as any}
          buildToItemPath={buildItemPath}
        />
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
