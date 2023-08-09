import { Member, MemberType } from '@graasp/sdk';

const MOCK_MEMBERS: Member[] = [
  {
    id: '2546fd5b-21a8-4c52-8412-a3fd2460216d',
    email: 'mock-email',
    name: 'pchang',
    type: MemberType.Individual,
    extra: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'f92fc73f-e46c-47ec-8a67-6922cd23fffd',
    email: 'mock-email',
    name: 'test',
    type: MemberType.Individual,
    extra: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'f92fc73f-e46c-47ec-8a67-6922cd23fffe',
    email: 'mock-email',
    name: 'alice',
    type: MemberType.Individual,
    extra: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default MOCK_MEMBERS;
