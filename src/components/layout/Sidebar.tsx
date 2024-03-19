import { FC, useContext } from 'react';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';
import { APPS_ID, APP_ITEM, buildSidebarListItemId } from '@/config/selectors';

import { DataContext } from '../context/DataProvider';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  const { descendantApps } = useContext(DataContext);

  return (
    <GraaspMainMenu>
      <MenuItem
        onClick={() => scrollTo('general')}
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
      />
      <MenuItem
        onClick={() => scrollTo('users')}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
      />
      <MenuItem
        onClick={() => scrollTo('items')}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
      />
      {descendantApps.length ? (
        <MenuItem
          onClick={() => scrollTo(APPS_ID)}
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
          id={buildSidebarListItemId(APP_ITEM)}
        />
      ) : (
        <></>
      )}
    </GraaspMainMenu>
  );
};

export default Sidebar;
