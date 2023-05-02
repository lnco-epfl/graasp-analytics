export const BREADCRUMBS_NAVIGATOR_ID = 'breadcrumbsNavigator';
export const HOME_MENU_ID = 'homeMenu';
export const HOME_MENU_DROPDOWN_BUTTON_ID = 'homeMenuDropdownButton';
export const HOME_MENU_OWN_MENUITEM_ID = 'homeMenuOwnMenuItem';
export const HOME_MENU_SHARED_MENUITEM_ID = 'homeMenuSharedMenuItem';

export const ROOT_MENU_ID = 'rootMenu';
export const ROOT_MENU_DROPDOWN_BUTTON_ID = 'rootMenuDropdownButton';

export const buildBreadcrumbsItemLink = (id: string): string =>
  `breadcrumbsItemLink-${id}`;
export const buildMenu = (id: string): string => `menu-${id}`;
export const buildMenuDropdownButton = (id: string): string =>
  `menuDropdownButton-${id}`;
export const buildMenuItem = (id: string, parent: string): string =>
  `menuItem-${parent}-${id}`;
