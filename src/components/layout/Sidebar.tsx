import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';
import { MainMenu as GraaspMainMenu } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';
import {
  HOME_PATH,
  MY_ANALYTICS_PATH,
  buildAppsAnalyticsPath,
  buildExportAnalyticsPath,
  buildItemPath,
  buildItemsAnalyticsPath,
  buildUsersAnalyticsPath,
} from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  APP_ITEM,
  TAB_GENERAL,
  TAB_ITEMS,
  TAB_USERS,
  buildSidebarListItemId,
} from '@/config/selectors';

import { DataContext } from '../context/DataProvider';
import LinkMenuItem from '../custom/LinkMenuItem';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();
  const { descendantApps } = useContext(DataContext);

  const { data: item } = hooks.useItem(itemId);

  const menuItems = [];

  if (item) {
    menuItems.push(
      <LinkMenuItem
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
        to={buildItemPath(itemId)}
        key={'TAB_GENERAL'}
        id={buildSidebarListItemId(TAB_GENERAL)}
      />,
      <LinkMenuItem
        to={buildUsersAnalyticsPath(itemId)}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
        key={'TAB_USERS'}
        id={buildSidebarListItemId(TAB_USERS)}
      />,
      <LinkMenuItem
        to={buildItemsAnalyticsPath(itemId)}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
        key={'TAB_ITEMS'}
        id={buildSidebarListItemId(TAB_ITEMS)}
      />,
    );
    if (descendantApps.length) {
      menuItems.push(
        <LinkMenuItem
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
          id={buildSidebarListItemId(APP_ITEM)}
          to={buildAppsAnalyticsPath(itemId)}
          key={'TAB_APPS'}
        />,
      );
    }

    // read access users don't have permission over export actions
    if (
      item?.permission &&
      PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
    ) {
      menuItems.push(
        <LinkMenuItem
          to={buildExportAnalyticsPath(itemId)}
          icon={<CloudDownloadIcon />}
          text={t('TAB_EXPORT')}
          key={'TAB_EXPORT'}
        />,
      );
    }
  } else {
    menuItems.push(
      <LinkMenuItem
        icon={<HomeIcon />}
        text={t('HOME_MENU_ITEM')}
        to={HOME_PATH}
      />,
      <LinkMenuItem
        icon={<BarChartIcon />}
        text={t('TAB_MY_ANALYTICS')}
        to={MY_ANALYTICS_PATH}
      />,
    );
  }

  return <GraaspMainMenu>{menuItems}</GraaspMainMenu>;
};

export default Sidebar;
