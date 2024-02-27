import { API_ROUTES } from '@graasp/query-client';
import { DiscriminatedItem, ItemMembership, Member } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import {
  Model,
  Response,
  RestSerializer,
  Server,
  createServer,
} from 'miragejs';

import { API_HOST } from '@/config/env';

import MOCK_ACTION_DATA from '../cypress/fixtures/actions';
import {
  MOCK_AGGREGATE_ACTIONS_ACTIVE_USERS,
  MOCK_AGGREGATE_ACTIONS_BY_DAY,
  MOCK_AGGREGATE_ACTIONS_BY_TIME,
  MOCK_AGGREGATE_ACTIONS_BY_WEEKDAY,
  MOCK_AGGREGATE_ACTIONS_TOTAL_ACTIONS,
  MOCK_AGGREGATE_ACTIONS_TOTAL_USERS,
  MOCK_AGGREGATE_ACTIONS_TYPE,
} from '../cypress/fixtures/aggregateActions';
import { buildDatabase } from './database';

const {
  buildGetItemRoute,
  GET_CURRENT_MEMBER_ROUTE,
  GET_OWN_ITEMS_ROUTE,
  SHARED_ITEM_WITH_ROUTE,
} = API_ROUTES;

const ApplicationSerializer = RestSerializer.extend({
  root: false,
  embed: true,
});

const checkPermission = (
  // todo: improve type
  schema: any,
  itemId: string,
  currentMember?: Member,
) => {
  // todo: apply public
  if (!currentMember) {
    return false;
  }

  const item = schema.find('item', itemId);
  if (!item) {
    return false;
  }
  if (currentMember?.id === item.creator.id) {
    return true;
  }
  const itemPath = item.path;
  const validPaths = schema
    .all('membership')
    .filter(({ member }: ItemMembership) => member.id === currentMember?.id)
    .models.map((i: ItemMembership) => i.item.path);
  return validPaths.some((path: string) => itemPath.includes(path));
};

const buildPathFromId = (id: string) => id.replace(/-/g, '_');

const mockServer = ({
  urlPrefix,
  database = buildDatabase(),
  externalUrls = [],
}: {
  urlPrefix?: string;
  database?: ReturnType<typeof buildDatabase>;
  externalUrls?: string[];
}): Server => {
  const { items, members, itemMemberships } = database;
  const currentMember = members?.[0];

  return createServer({
    // environment
    urlPrefix,
    models: {
      item: Model,
      member: Model,
      membership: Model,
    },

    serializers: {
      item: ApplicationSerializer,
      member: ApplicationSerializer,
      membership: ApplicationSerializer,
    },
    seeds(server) {
      members?.forEach((m) => {
        server.create('member', m);
      });
      items?.forEach((i) => {
        server.create('item', i);
      });
      itemMemberships?.forEach((m) => {
        server.create('membership', m);
      });
    },
    routes() {
      // get current member
      this.get(`/${GET_CURRENT_MEMBER_ROUTE}`, () => {
        if (currentMember) {
          return currentMember;
        }

        return new Response(StatusCodes.UNAUTHORIZED);
      });

      // members route
      this.get(`/members/:id`, (schema, request) => {
        return schema.find('member', request.params.id);
      });
      // members avatar route
      this.get(`/members/:id/avatar/:size`, () => {
        return new Response(StatusCodes.NOT_FOUND);
      });

      // get item
      this.get(`/${buildGetItemRoute(':id')}`, (schema, request) => {
        const itemId = request.url.split('/').at(-1);
        if (!itemId) {
          throw new Error('item id does not exist');
        }
        if (!checkPermission(schema, itemId, currentMember)) {
          return new Response(StatusCodes.FORBIDDEN);
        }
        if (!itemId) {
          throw new Error('item id does not exist');
        }
        return schema.find('item', itemId);
      });

      // get children
      this.get(`/items/:id/children`, (schema, request) => {
        const itemId = request.params.id;
        if (!itemId) {
          throw new Error('item id does not exist');
        }

        return (
          schema
            .all('item')
            // TODO: remove any after figuring out the type
            .filter(({ id, path }: any) =>
              path.includes(
                `${buildPathFromId(itemId)}.${buildPathFromId(id)}`,
              ),
            )
        );
      });

      // get parents
      this.get(`/items/:id/parents`, (schema, request) => {
        const itemId = request.params.id;
        if (!itemId) {
          throw new Error('item id does not exist');
        }
        const itemPath = (
          schema.find('item', itemId) as unknown as DiscriminatedItem
        ).path;

        return (
          schema
            .all('item')
            // TODO: remove any after figuring out the type
            .filter(
              ({ path }: any) => itemPath.startsWith(path) && itemPath !== path,
            )
        );
      });

      // get own item
      this.get(`/${GET_OWN_ITEMS_ROUTE}`, (schema) =>
        schema
          .all('item')
          // TODO: remove any after figuring out the type
          .filter(
            ({ id, creator, path }: any) =>
              creator.id === currentMember?.id && buildPathFromId(id) === path,
          ),
      );

      // get shared item
      this.get(
        `/${SHARED_ITEM_WITH_ROUTE}`,
        (schema) =>
          schema
            .all('membership')
            // TODO: remove any after figuring out the type
            .filter(({ member }: any) => member.id === currentMember?.id)
            .models.map((i: any) => i.item),
        // return (
        //   schema
        //     .all('item')
        //     // TODO: remove any after figuring out the type
        //     .filter(({ path }: any) => sharedItem.includes(path))
        // );
      );

      // get actions
      this.get(`/items/:id/actions`, () => MOCK_ACTION_DATA);

      // get aggregate actions
      this.get(`/items/:id//actions/aggregation`, (_schema, request) => {
        const {
          countGroupBy,
          aggregateBy,
          aggregateMetric,
          aggregateFunction,
        } = request.queryParams as any;

        if (
          countGroupBy === 'user' &&
          aggregateMetric === 'user' &&
          aggregateFunction === 'count'
        ) {
          return MOCK_AGGREGATE_ACTIONS_TOTAL_USERS;
        }
        if (
          countGroupBy === 'createdDay' &&
          aggregateBy === 'createdDay' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'count'
        ) {
          return MOCK_AGGREGATE_ACTIONS_ACTIVE_USERS;
        }
        if (
          countGroupBy === 'createdDay' &&
          aggregateBy === 'createdDay' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'avg'
        ) {
          return MOCK_AGGREGATE_ACTIONS_BY_DAY;
        }
        if (
          countGroupBy === 'createdDay' &&
          aggregateBy === 'createdDay' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'sum'
        ) {
          return MOCK_AGGREGATE_ACTIONS_TOTAL_ACTIONS;
        }
        if (
          countGroupBy === 'createdTimeOfDay' &&
          aggregateBy === 'createdTimeOfDay' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'avg'
        ) {
          return MOCK_AGGREGATE_ACTIONS_BY_TIME;
        }
        if (
          countGroupBy === 'createdDayOfWeek' &&
          aggregateBy === 'createdDayOfWeek' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'avg'
        ) {
          return MOCK_AGGREGATE_ACTIONS_BY_WEEKDAY;
        }
        if (
          countGroupBy === 'actionType' &&
          aggregateBy === 'actionType' &&
          aggregateMetric === 'actionCount' &&
          aggregateFunction === 'sum'
        ) {
          return MOCK_AGGREGATE_ACTIONS_TYPE;
        }
        return [];
      });

      // passthrough external urls
      externalUrls.forEach((url) => {
        this.passthrough(url);
      });
    },
  });
};

export const initMockServer = (): void => {
  mockServer({
    urlPrefix: API_HOST,
    database: window.Cypress ? window.database : undefined,
  });
};
