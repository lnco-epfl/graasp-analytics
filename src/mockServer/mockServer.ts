import { StatusCodes } from 'http-status-codes';
import { Model, Response, RestSerializer, createServer } from 'miragejs';

import { API_ROUTES } from '@graasp/query-client';
import { Item, ItemMembership, Member } from '@graasp/sdk';

const {
  buildGetPublicItemRoute,
  buildGetItemRoute,
  GET_CURRENT_MEMBER_ROUTE,
  GET_OWN_ITEMS_ROUTE,
  SHARED_ITEM_WITH_ROUTE,
} = API_ROUTES;

type Database = {
  currentMember?: Member;
  items?: Item[];
  itemMemberships?: ItemMembership[];
  members?: Member[];
};

const ApplicationSerializer = RestSerializer.extend({
  root: false,
  embed: true,
});

const checkPermission = (schema, itemId, currentMember) => {
  const item = schema.find('item', itemId);
  if (currentMember.id === item.creator) {
    return true;
  }
  const itemPath = item.path;
  const validPaths = schema
    .all('membership')
    .filter(({ memberId }) => memberId === currentMember.id)
    .models.map((i) => i.itemPath);
  return validPaths.some((path) => itemPath.includes(path));
};

const buildPathFromId = (id) => id.replace(/-/g, '_');

export const buildDatabase = ({
  currentMember,
  items = [],
  itemMemberships = [],
  members,
}: Partial<Database> = {}): Database => ({
  currentMember,
  items,
  itemMemberships,
  members: members ?? [currentMember],
});

export const mockServer = ({
  urlPrefix,
  database = buildDatabase(),
  externalUrls = [],
}: {
  urlPrefix?: string;
  database?: Database;
  externalUrls?: string[];
} = {}): any => {
  const { items, members, itemMemberships } = database;
  const [currentMember] = members;

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
      this.get(`/${GET_CURRENT_MEMBER_ROUTE}`, () => currentMember);

      // get item
      this.get(`/${buildGetItemRoute(':id')}`, (schema, request) => {
        const itemId = request.url.split('/').at(-1);
        if (!checkPermission(schema, itemId, currentMember)) {
          return new Response(StatusCodes.FORBIDDEN);
        }
        return schema.find('item', itemId);
      });

      // get item
      this.get(`/${buildGetPublicItemRoute(':id')}`, (schema, request) => {
        const itemId = request.url.split('/').at(-1);
        if (!checkPermission(schema, itemId, currentMember)) {
          return new Response(StatusCodes.FORBIDDEN);
        }
        return schema.find('item', itemId);
      });

      // get children
      this.get(`/items/:id/children`, (schema, request) => {
        const itemId = request.url.split('/').at(-2);

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

      // get children
      this.get(`/p/items/:id/children`, (schema, request) => {
        const itemId = request.url.split('/').at(-2);

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

      // get own item
      this.get(`/${GET_OWN_ITEMS_ROUTE}`, (schema) =>
        schema
          .all('item')
          // TODO: remove any after figuring out the type
          .filter(
            ({ id, creator, path }: any) =>
              creator === currentMember.id && buildPathFromId(id) === path,
          ),
      );

      // get shared item
      this.get(`/${SHARED_ITEM_WITH_ROUTE}`, (schema) => {
        const sharedItem = schema
          .all('membership')
          // TODO: remove any after figuring out the type
          .filter(({ memberId }: any) => memberId === currentMember.id)
          .models.map((i: any) => i.itemPath);
        return (
          schema
            .all('item')
            // TODO: remove any after figuring out the type
            .filter(({ path }: any) => sharedItem.includes(path))
        );
      });

      // passthrough external urls
      externalUrls.forEach((url) => {
        this.passthrough(url);
      });
    },
  });
};

export default mockServer;
