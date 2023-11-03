import { Action, Member } from '@graasp/sdk';

import { filterActionsByActionTypes, filterActionsByUsers } from './utils';

export function filterActions<T>({
  selectedUsers,
  selectedActionTypes,
  actions,
  chartFunction,
}: {
  selectedUsers: Member[];
  selectedActionTypes: string[];
  actions: Action[];
  chartFunction: (x: any) => T;
}): T {
  const shouldFilterByUser = selectedUsers?.length;
  const shouldFilterByTypes = selectedActionTypes?.length;
  let result;

  if (!shouldFilterByUser && !shouldFilterByTypes) {
    result = chartFunction(actions);
  } else if (shouldFilterByUser && !shouldFilterByTypes) {
    result = chartFunction(filterActionsByUsers(actions, selectedUsers));
  } else if (!shouldFilterByUser && shouldFilterByTypes) {
    result = chartFunction(
      filterActionsByActionTypes(actions, selectedActionTypes),
    );
  } else {
    const filteredByUser = filterActionsByUsers(actions, selectedUsers);
    result = chartFunction(
      filterActionsByActionTypes(filteredByUser, selectedActionTypes),
    );
  }
  return result;
}
