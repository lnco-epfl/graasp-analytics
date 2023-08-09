import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

const Sidebar: FC = () => {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GraaspMainMenu>
      <MenuItem
        onClick={() => scrollTo('general')}
        icon={<BarChartIcon />}
        text={t('General')}
      />
      <MenuItem
        onClick={() => scrollTo('users')}
        icon={<PersonIcon />}
        text={t('Users')}
      />
      <MenuItem
        onClick={() => scrollTo('items')}
        icon={<FolderIcon />}
        text={t('Items')}
      />
    </GraaspMainMenu>
  );
};

export default Sidebar;
