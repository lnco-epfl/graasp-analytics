import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MouseIcon from '@mui/icons-material/Mouse';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

const Sidebar: FC = () => {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GraaspMainMenu>
      <>
        <MenuItem
          onClick={() => scrollTo('general')}
          icon={<BarChartIcon />}
          text={t('General')}
        />
        <MenuItem
          onClick={() => scrollTo('contents')}
          icon={<MenuBookIcon />}
          text={t('Contents')}
        />
        <MenuItem
          onClick={() => scrollTo('actions')}
          icon={<MouseIcon />}
          text={t('Actions')}
        />
        <MenuItem
          onClick={() => scrollTo('chats')}
          icon={<ChatIcon />}
          text={t('Chats')}
        />
        <MenuItem
          onClick={() => scrollTo('apps')}
          icon={<AppsIcon />}
          text={t('Apps')}
        />
      </>
    </GraaspMainMenu>
  );
};

export default Sidebar;
