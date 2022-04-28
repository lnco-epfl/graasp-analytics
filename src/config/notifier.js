import { routines } from '@graasp/query-client';
import { toast } from 'react-toastify';
import i18n from './i18n';

const { exportActionsRoutine } = routines;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ type, payload }) => {
  console.log('type: ', type);
  let message = null;
  switch (type) {
    case exportActionsRoutine.SUCCESS: {
      message =
        'Your request has been sent. An email will be sent to you in several minutes.';
      break;
    }
    case exportActionsRoutine.FAILURE: {
      message =
        payload?.error?.response?.data?.message ??
        'An unexpected error occured, please retry later';
      break;
    }
    default:
  }
  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message));
  }
};
