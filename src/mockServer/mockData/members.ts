import { Member, MemberType } from '@graasp/sdk';

const MOCK_MEMBERS: Member[] = [
  {
    id: '2546fd5b-21a8-4c52-8412-a3fd2460216d',
    email: 'mock-email',
    name: 'mock-name',
    type: MemberType.Individual,
    extra: {},
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
  {
    id: 'f92fc73f-e46c-47ec-8a67-6922cd23fffd',
    email: 'mock-email',
    name: 'mock-name',
    type: MemberType.Individual,
    extra: {},
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
];

export default MOCK_MEMBERS;
