import { FC, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';
import { MainMenu as GraaspMainMenu, Loader } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';
import {
  HOME_PATH,
  buildAppsAnalyticsPath,
  buildExportAnalyticsPath,
  buildItemPath,
  buildItemsAnalyticsPath,
  buildUsersAnalyticsPath,
} from '@/config/paths';
import { hooks } from '@/config/queryClient';
import { APP_ITEM, buildSidebarListItemId } from '@/config/selectors';

import { DataContext } from '../context/DataProvider';
import LinkMenuItem from '../custom/LinkMenuItem';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();
  const { pathname } = useLocation();
  const { descendantApps } = useContext(DataContext);

  const { data: item, isLoading } = hooks.useItem(itemId);
  const disableMenuItem = pathname === HOME_PATH;

  if (isLoading) {
    return <Loader />;
  }

  const menuItems = [
    <LinkMenuItem
      icon={<BarChartIcon />}
      text={t('TAB_GENERAL')}
      to={buildItemPath(itemId)}
      disabled={disableMenuItem}
      key={'TAB_GENERAL'}
    />,
    <LinkMenuItem
      to={buildUsersAnalyticsPath(itemId)}
      disabled={disableMenuItem}
      icon={<PersonIcon />}
      text={t('TAB_USERS')}
      key={'TAB_USERS'}
    />,
    <LinkMenuItem
      to={buildItemsAnalyticsPath(itemId)}
      disabled={disableMenuItem}
      icon={<FolderIcon />}
      text={t('TAB_ITEMS')}
      key={'TAB_ITEMS'}
    />,
  ];

  if (descendantApps.length) {
    menuItems.push(
      <LinkMenuItem
        icon={<AppsIcon />}
        text={t('TAB_APPS')}
        id={buildSidebarListItemId(APP_ITEM)}
        to={buildAppsAnalyticsPath(itemId)}
        disabled={disableMenuItem}
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
        disabled={disableMenuItem}
        icon={<CloudDownloadIcon />}
        text={t('TAB_EXPORT')}
        key={'TAB_EXPORT'}
      />,
    );
  }

  return <GraaspMainMenu>{menuItems}</GraaspMainMenu>;
};

export default Sidebar;
