import { Link } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  ItemType,
  formatDate,
  getLinkExtra,
  getMimetype,
} from '@graasp/sdk';
import { DEFAULT_LIGHT_PRIMARY_COLOR, ItemIcon } from '@graasp/ui';

import i18n from '@/config/i18n';
import { buildItemPath } from '@/config/paths';
import { hooks } from '@/config/queryClient';

const ItemLink = ({ item }: { item: DiscriminatedItem }): JSX.Element => {
  const { data: currentMember } = hooks.useCurrentMember();
  const linkExtra =
    item.type === ItemType.LINK ? getLinkExtra(item.extra) : undefined;

  const alt = item.name;
  const iconSrc = linkExtra?.icons?.[0];
  return (
    <Link
      to={buildItemPath(item.id)}
      style={{
        color: 'currentcolor',
        textDecoration: 'none',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          p={1}
          width="40px"
          height="40px"
          borderRadius={1}
          bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
        >
          <ItemIcon
            type={item.type}
            iconSrc={iconSrc}
            alt={alt}
            mimetype={getMimetype(item.extra)}
          />
        </Box>
        <Stack>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="caption" color="gray">
            {formatDate(item.createdAt, { locale: i18n.language })}
            {item.creator &&
              currentMember?.id !== item.creator?.id &&
              ` - ${item.creator?.name}`}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default ItemLink;
