import { createContext, useMemo, useState } from 'react';

import { ActionViewContext, ActionViewContextUnion } from '@/config/constants';

const defaultValue: {
  view: ActionViewContextUnion;
  setView: (view: string) => void;
} = {
  view: ActionViewContext.Builder,
  setView: () => {
    // do nothing
  },
};

const isActionView = (view: string): view is ActionViewContextUnion => {
  return Object.keys(ActionViewContext).includes(view);
};

export const ViewDataContext = createContext(defaultValue);

const ViewDataProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [view, setView] = useState<ActionViewContextUnion>(
    ActionViewContext.Builder,
  );
  const value = useMemo(
    () => ({
      view,
      setView: (view: string): void => {
        if (isActionView(view)) {
          setView(view);
        }
      },
    }),
    [view, setView],
  );
  return (
    <ViewDataContext.Provider value={value}>
      {children}
    </ViewDataContext.Provider>
  );
};

export default ViewDataProvider;
