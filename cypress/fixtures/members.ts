import { CompleteMember, MemberFactory } from '@graasp/sdk';

const MOCK_MEMBERS: CompleteMember[] = [
  MemberFactory({
    id: '2546fd5b-21a8-4c52-8412-a3fd2460216d',
    name: 'pchang',
    extra: { lang: 'en' },
  }),
  MemberFactory({
    id: 'f92fc73f-e46c-47ec-8a67-6922cd23fffd',
    name: 'test',
  }),
  MemberFactory({
    id: 'f92fc73f-e46c-47ec-8a67-6922cd23fffe',
    name: 'alice',
  }),
];

export default MOCK_MEMBERS;
