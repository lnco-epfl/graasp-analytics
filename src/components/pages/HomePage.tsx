import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { DiscriminatedItem, PackedItem } from '@graasp/sdk';
import { SearchInput } from '@graasp/ui';

import { ITEM_PAGE_SIZE } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import ItemLink from '../common/ItemLink';
import ItemLoaderSkelton from '../common/ItemLoaderSkeleton';

const HomePage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<DiscriminatedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: accessibleItems,
    isLoading,
    error,
  } = hooks.useAccessibleItems(
    { keywords: searchQuery },
    // get items cumulative
    { pageSize: ITEM_PAGE_SIZE, page },
  );

  useEffect(() => {
    if (accessibleItems?.data) {
      if (page === 1) {
        setItems(accessibleItems?.data);
      } else {
        setItems((prev) => {
          const newItems = accessibleItems.data.filter(
            (item: PackedItem) => !prev.some((p) => p.id === item.id),
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [accessibleItems?.data, page]);

  if (!isLoading && !error) {
    return (
      <Stack direction="column" spacing={2}>
        <Alert severity="warning">{t('NO_ITEM_SELECTED')}</Alert>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={{ xs: 1, sm: 4 }}
        >
          <Typography variant="h4" textAlign="center">
            {t('RECENT_ITEMS_TITLE')}
          </Typography>
          <SearchInput
            size="small"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            value={searchQuery}
            placeholder={t('ITEM_SEARCH_PLACEHOLDER')}
          />
        </Stack>
        {items.length ? (
          <Stack spacing={1}>
            <Box>
              {items.map((item) => (
                <ItemLink key={item.id} item={item} />
              ))}
            </Box>
            {accessibleItems?.totalCount &&
              items.length < accessibleItems?.totalCount && (
                <Button
                  variant="text"
                  sx={{ textTransform: 'none', maxWidth: 'max-content' }}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {t('HOME_SHOW_MORE')}
                </Button>
              )}
          </Stack>
        ) : (
          <Typography variant="subtitle1">
            {searchQuery ? t('NO_ITEMS_MATCH_SEARCH') : t('NO_ITEMS_EXIT')}
          </Typography>
        )}
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={30}></Skeleton>
        <Stack spacing={1} marginTop={1}>
          {Array(ITEM_PAGE_SIZE)
            .fill(0)
            .map((_, index) => (
              <ItemLoaderSkelton key={index} />
            ))}
        </Stack>
      </>
    );
  }

  return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
};

const HomePageWrapper = (): JSX.Element => {
  return (
    <Box p={2}>
      <Container>
        <HomePage />
      </Container>
    </Box>
  );
};

export default HomePageWrapper;
