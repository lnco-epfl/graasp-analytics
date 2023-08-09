import { Dispatch, createContext, useMemo, useState } from 'react';

import { Context } from '@graasp/sdk';

const defaultValue: {
  // todo: use sdk context
  view: Context;
  setView: Dispatch<Context>;
} = {
  view: Context.Builder,
  setView: () => {
    // do nothing
  },
};

export const ViewDataContext = createContext(defaultValue);

const ViewDataProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [view, setView] = useState(Context.Builder);
  const value = useMemo(() => ({ view, setView }), [view, setView]);
  return (
    <ViewDataContext.Provider value={value}>
      {children}
    </ViewDataContext.Provider>
  );
};

export default ViewDataProvider;
