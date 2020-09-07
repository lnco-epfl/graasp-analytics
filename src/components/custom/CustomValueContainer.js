import React from 'react';
import { components } from 'react-select';

// this component, used within the UsersSelect component, overrides react-select's default text display
// by default, react-select will keep expanding its text display as additional options are selected
// with this component, after 2 selections, the text box will stop expanding and display: 'A, B, and X other(s) selected'
// eslint-disable-next-line react/prop-types
const CustomValueContainer = ({ children, ...props }) => {
  // values is an array of objects corresponding to the currently made selection
  let [values] = children;
  const { length } = values;

  if (length) {
    const plural = length === 3 ? '' : 's';
    const alsoSelectedCount = length - 2;
    switch (length) {
      case 1:
        values = `${values[0].key}`;
        break;
      case 2:
        values = `${values[0].key}, ${values[1].key}`;
        break;
      default:
        values = `${values[0].key}, ${values[1].key}, and ${alsoSelectedCount} other${plural} selected`;
        break;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.ValueContainer {...props}>
      {values}
      {children[1]}
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
