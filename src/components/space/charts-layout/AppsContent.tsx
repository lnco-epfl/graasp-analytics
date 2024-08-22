import { Box, Typography } from '@mui/material';

import { Api } from '@graasp/query-client';
import {
  AppItemType,
  CompleteMember,
  Context,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { AppItem, Loader } from '@graasp/ui';

import { API_HOST } from '@/config/env';
import { axios, hooks } from '@/config/queryClient';
import { APP_ITEM_CLASS_NAME, buildAppItemSelector } from '@/config/selectors';

export const ITEM_DEFAULT_HEIGHT = '70vh';

const AppContent = ({
  item,
  member,
}: {
  item: AppItemType;
  member?: CompleteMember | null;
}): JSX.Element | null => {
  const { data: memberships, isLoading } = hooks.useItemMemberships(item.id);

  if (memberships) {
    const userMemberships = memberships
      ?.filter((m) => m.account.id === member?.id)
      .reduce((acc: PermissionLevel[], curr) => [...acc, curr.permission], []);

    const permission =
      userMemberships && PermissionLevelCompare.getHighest(userMemberships);

    return (
      <Box id={buildAppItemSelector(item.id)} className={APP_ITEM_CLASS_NAME}>
        <Typography m={1} variant="h6" align="center">
          {item.name}
        </Typography>
        <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <AppItem
            isResizable={false}
            item={item}
            height={ITEM_DEFAULT_HEIGHT}
            requestApiAccessToken={(payload: {
              id: string;
              key: string;
              origin: string;
            }) => Api.requestApiAccessToken(payload, { API_HOST, axios })}
            contextPayload={{
              apiHost: API_HOST,
              itemId: item.id,
              memberId: member?.id,
              permission: permission || PermissionLevel.Read,
              settings: item.settings,
              lang: item.lang || member?.extra?.lang || DEFAULT_LANG,
              context: Context.Analytics,
            }}
          />
        </Box>
      </Box>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  return null;
};

export default AppContent;
