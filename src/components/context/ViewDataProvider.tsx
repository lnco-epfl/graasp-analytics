import PropTypes from 'prop-types';

import { Dispatch, createContext, useMemo, useState } from 'react';

import { Context } from '../../config/constants';

const defaultValue: {
  // todo: use sdk context
  view: string;
  setView: Dispatch<string>;
} = {
  view: Context.BUILDER,
  setView: () => {},
};

export const ViewDataContext = createContext(defaultValue);

const ViewDataProvider = ({ children }) => {
  const [view, setView] = useState(Context.BUILDER);
  const value = useMemo(() => ({ view, setView }), [view, setView]);
  return (
    <ViewDataContext.Provider value={value}>
      {children}
    </ViewDataContext.Provider>
  );
};

ViewDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ViewDataProvider;
