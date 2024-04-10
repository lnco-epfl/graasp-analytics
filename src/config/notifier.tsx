import { toast } from 'react-toastify';

import { routines } from '@graasp/query-client';

import i18n, { ANALYTICS_NAMESPACE } from './i18n';

const { exportActionsRoutine } = routines;

export default ({ type, payload }: { type: string; payload?: any }): void => {
  let message = null;
  switch (type) {
    case exportActionsRoutine.SUCCESS: {
      message = 'EXPORT_SUCCESS_MESSAGE';
      break;
    }
    case exportActionsRoutine.FAILURE: {
      message =
        payload?.error?.response?.data?.message ?? 'EXPORT_ERROR_MESSAGE';
      break;
    }
    default:
  }
  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message, { ns: ANALYTICS_NAMESPACE }));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message, { ns: ANALYTICS_NAMESPACE }));
  }
};
