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
  allMembersLength,
  chartFunction,
}) => {
  const types = Object.keys(groupBy('type', actions));
  const noUsers =
    selectedUsers === null ||
    !selectedUsers.size ||
    selectedUsers.size === allMembersLength;
  const noActions =
    selectedActions === null ||
    !selectedActions.size ||
    selectedActions.size === types.size;
  let actionsByTimeOfDay;
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
