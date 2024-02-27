import { ItemMembership, PermissionLevel } from '@graasp/sdk';

import MOCK_ITEMS from './items';
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
];

export default MOCK_MEMBERSHIP;
