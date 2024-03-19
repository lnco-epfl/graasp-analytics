import { ItemMembership, PermissionLevel } from '@graasp/sdk';

import MOCK_ITEMS, {
  APP_ITEM_WITH_PARENT,
  CALC_APP_ITEM_WITH_PARENT,
} from './items';
import MOCK_MEMBERS from './members';

const MOCK_MEMBERSHIP: ItemMembership[] = [
  {
    id: 'bfaf424f-eefd-4551-93d7-455084bad895',
    member: MOCK_MEMBERS[0],
    item: MOCK_ITEMS[5],
    permission: PermissionLevel.Admin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: MOCK_MEMBERS[1],
  },
  {
    id: 'bfaf424f-eefd-4551-93d7-455084bad872',
    member: MOCK_MEMBERS[0],
    item: MOCK_ITEMS[0],
    permission: PermissionLevel.Admin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'bfaf424f-eefd-4551-93d7-455084bad870',
    member: MOCK_MEMBERS[0],
    item: APP_ITEM_WITH_PARENT,
    permission: PermissionLevel.Admin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'bfaf424f-eefd-4551-93d7-455084bad877',
    member: MOCK_MEMBERS[0],
    item: CALC_APP_ITEM_WITH_PARENT,
    permission: PermissionLevel.Admin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default MOCK_MEMBERSHIP;
