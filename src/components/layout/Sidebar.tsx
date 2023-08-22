import { FC } from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
    </GraaspMainMenu>
  );
};

export default Sidebar;
