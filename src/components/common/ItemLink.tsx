import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  ItemType,
  formatDate,
  getLinkExtra,
  getMimetype,
} from '@graasp/sdk';
import { ItemIcon } from '@graasp/ui';

import i18n from '@/config/i18n';
import { buildItemPath } from '@/config/paths';
import { hooks } from '@/config/queryClient';

const ItemLink = ({ item }: { item: DiscriminatedItem }): JSX.Element => {
  const { data } = hooks.useCurrentMember();
  const linkExtra =
    item.type === ItemType.LINK ? getLinkExtra(item.extra) : undefined;

  const alt = item.name;
  const iconSrc = linkExtra?.icons?.[0];
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <ItemIcon
        type={item.type}
        iconSrc={iconSrc}
        alt={alt}
        mimetype={getMimetype(item.extra)}
        sx={{ width: '16px', height: '16px' }}
      />
      <Link
        to={buildItemPath(item.id)}
        style={{
          textDecoration: 'none',
          lineHeight: 2,
        }}
      >
        {item.name}
      </Link>
      {item.creator && data?.id !== item.creator?.id && (
        <Typography variant="body1" lineHeight={2}>
          {item.creator?.name}
        </Typography>
      )}
      <Typography variant="caption" lineHeight={2} color="GrayText">
        {formatDate(item.createdAt, { locale: i18n.language })}
      </Typography>
    </Box>
  );
};

export default ItemLink;
