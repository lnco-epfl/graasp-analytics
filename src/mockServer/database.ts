import { DiscriminatedItem, ItemMembership, Member } from '@graasp/sdk';

type Database = {
  currentMember?: Member;
  items?: DiscriminatedItem[];
  itemMemberships?: ItemMembership[];
  members?: Member[];
};

export const buildDatabase = ({
  currentMember,
  items = [],
  itemMemberships = [],
  members,
}: Partial<Database> = {}): Database => ({
  currentMember,
  items,
  itemMemberships,
  members: members ?? (currentMember ? [currentMember] : []),
});
