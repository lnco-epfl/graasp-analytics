import { filterActionsByActionTypes, filterActionsByUser } from './api';

export const groupBy = (key, arr) =>
  arr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur[key]]: cur[key] in acc ? acc[cur[key]].concat(cur) : [cur],
    }),
    {},
  );

export const filterActions = ({
  selectedUsers,
  selectedActions,
  actions,
  // TODO: remove the argument
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allMembersLength,
  chartFunction,
}) => {
  const noUsers = selectedUsers === null;
  const noActions = selectedActions === null;
  let actionsByTimeOfDay;

  if (noUsers) {
    return {};
  }

  if (noUsers && noActions) {
    actionsByTimeOfDay = chartFunction(actions);
  } else if (!noUsers && noActions) {
    actionsByTimeOfDay = chartFunction(
      filterActionsByUser(actions, selectedUsers),
    );
  } else if (noUsers && !noActions) {
    actionsByTimeOfDay = chartFunction(
      filterActionsByActionTypes(actions, selectedActions),
    );
  } else {
    const filteredByUser = filterActionsByUser(actions, selectedUsers);
    actionsByTimeOfDay = chartFunction(
      filterActionsByActionTypes(filteredByUser, selectedActions),
    );
  }
  return actionsByTimeOfDay;
};
