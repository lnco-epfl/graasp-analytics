import { ItemMembership, PermissionLevel } from '@graasp/sdk';

import MOCK_ITEMS from './items';
import MOCK_MEMBERS from './members';

const MOCK_MEMBERSHIP: ItemMembership[] = [
  {
    id: 'bfaf424f-eefd-4551-93d7-455084bad895',
    memberId: MOCK_MEMBERS[0].id,
    itemPath: MOCK_ITEMS[5].path,
    permission: PermissionLevel.Admin,
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
    creator: MOCK_MEMBERS[1].id,
  },
];

export default MOCK_MEMBERSHIP;
