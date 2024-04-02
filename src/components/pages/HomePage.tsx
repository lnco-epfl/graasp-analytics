import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { SearchInput } from '@graasp/ui';

import { ITEM_PAGE_SIZE } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import ItemLink from '../common/ItemLink';
import ItemLoaderSkelton from '../common/ItemLoaderSkeleton';

const HomePage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: accessibleItems, isLoading } = hooks.useAccessibleItems(
    {
      name: searchQuery,
    },
    // get items cumulative
    { pageSize: page * ITEM_PAGE_SIZE },
  );

  if (accessibleItems?.data) {
    return (
      <Container>
        <Alert severity="warning">{t('NO_ITEM_SELECTED')}</Alert>
        <Stack flexDirection="row" alignItems="center" mt={2} gap={4}>
          <Typography variant="h4" textAlign="center">
            {t('RECENT_ITEMS_TITLE')}
          </Typography>
          <SearchInput
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder={t('ITEM_SEARCH_PLACEHOLDER')}
            width="250px"
          />
        </Stack>
        {accessibleItems?.data.length ? (
          <Box>
            {accessibleItems?.data.map((item) => (
              <ItemLink key={item.id} item={item} />
            ))}
            {accessibleItems.data.length < accessibleItems.totalCount && (
              <Button variant="text" onClick={() => setPage((p) => p + 1)}>
                {t('HOME_SHOW_MORE')}
              </Button>
            )}
          </Box>
        ) : (
          <Typography variant="subtitle1">
            {searchQuery ? t('NO_ITEMS_MATCH_SEARCH') : t('NO_ITEMS_EXIT')}
          </Typography>
        )}
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box padding={2}>
        {Array(ITEM_PAGE_SIZE)
          .fill(0)
          .map((ele, index) => (
            <ItemLoaderSkelton key={index} />
          ))}
      </Box>
    );
  }
  return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
};

export default HomePage;
