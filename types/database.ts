import { CompleteMember, DiscriminatedItem, ItemMembership } from '@graasp/sdk';

export type Database = {
  currentMember?: CompleteMember;
  items?: DiscriminatedItem[];
  itemMemberships?: ItemMembership[];
  members?: CompleteMember[];
};
