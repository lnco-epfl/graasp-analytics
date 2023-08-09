import { DAY, DUMMY_TIMESTAMP, HOUR } from './util';

const MOCK_AGGREGATE_ACTIONS_TOTAL_USERS: unknown[] = [
  {
    aggregateResult: 3,
  },
];

const MOCK_AGGREGATE_ACTIONS_ACTIVE_USERS: unknown[] = [
  {
    aggregateResult: 2,
    createdDay: new Date(DUMMY_TIMESTAMP),
  },
  {
    aggregateResult: 2,
    createdDay: new Date(DUMMY_TIMESTAMP - DAY),
  },
  {
    aggregateResult: 1,
    createdDay: new Date(DUMMY_TIMESTAMP - 2 * DAY),
  },
  {
    aggregateResult: 3,
    createdDay: new Date(DUMMY_TIMESTAMP - 3 * DAY),
  },
];

const MOCK_AGGREGATE_ACTIONS_BY_DAY: unknown[] = [
  {
    aggregateResult: 4,
    createdDay: new Date(DUMMY_TIMESTAMP),
  },
  {
    aggregateResult: 2,
    createdDay: new Date(DUMMY_TIMESTAMP - DAY),
  },
  {
    aggregateResult: 4,
    createdDay: new Date(DUMMY_TIMESTAMP - 2 * DAY),
  },
  {
    aggregateResult: 6,
    createdDay: new Date(DUMMY_TIMESTAMP - 3 * DAY),
  },
];

const MOCK_AGGREGATE_ACTIONS_TOTAL_ACTIONS: unknown[] = [
  {
    aggregateResult: 12,
    createdDay: new Date(DUMMY_TIMESTAMP),
  },
  {
    aggregateResult: 3,
    createdDay: new Date(DUMMY_TIMESTAMP - DAY),
  },
  {
    aggregateResult: 4,
    createdDay: new Date(DUMMY_TIMESTAMP - 2 * DAY),
  },
  {
    aggregateResult: 12,
    createdDay: new Date(DUMMY_TIMESTAMP - 3 * DAY),
  },
];

const MOCK_AGGREGATE_ACTIONS_BY_TIME: unknown[] = [
  {
    aggregateResult: 6,
    createdTimeOfDay: new Date(DUMMY_TIMESTAMP + 10 * HOUR).getUTCHours(),
  },
  {
    aggregateResult: 4,
    createdTimeOfDay: new Date(DUMMY_TIMESTAMP + 11 * HOUR).getUTCHours(),
  },
  {
    aggregateResult: 12,
    createdTimeOfDay: new Date(DUMMY_TIMESTAMP + 12 * HOUR).getUTCHours(),
  },
  {
    aggregateResult: 3,
    createdTimeOfDay: new Date(DUMMY_TIMESTAMP + 13 * HOUR).getUTCHours(),
  },
];

const MOCK_AGGREGATE_ACTIONS_BY_WEEKDAY: unknown[] = [
  {
    aggregateResult: 4,
    createdDayOfWeek: new Date(DUMMY_TIMESTAMP).getDay(),
  },
  {
    aggregateResult: 2,
    createdDayOfWeek: new Date(DUMMY_TIMESTAMP - DAY).getDay(),
  },
  {
    aggregateResult: 4,
    createdDayOfWeek: new Date(DUMMY_TIMESTAMP - 2 * DAY).getDay(),
  },
  {
    aggregateResult: 6,
    createdDayOfWeek: new Date(DUMMY_TIMESTAMP - 3 * DAY).getDay(),
  },
];

const MOCK_AGGREGATE_ACTIONS_TYPE: unknown[] = [
  {
    aggregateResult: 1,
    actionType: 'create',
  },
  {
    aggregateResult: 12,
    actionType: 'update',
  },
  {
    aggregateResult: 2,
    actionType: 'copy',
  },
  {
    aggregateResult: 2,
    actionType: 'move',
  },
];

export {
  MOCK_AGGREGATE_ACTIONS_TOTAL_USERS,
  MOCK_AGGREGATE_ACTIONS_ACTIVE_USERS,
  MOCK_AGGREGATE_ACTIONS_BY_DAY,
  MOCK_AGGREGATE_ACTIONS_TOTAL_ACTIONS,
  MOCK_AGGREGATE_ACTIONS_BY_TIME,
  MOCK_AGGREGATE_ACTIONS_BY_WEEKDAY,
  MOCK_AGGREGATE_ACTIONS_TYPE,
};
