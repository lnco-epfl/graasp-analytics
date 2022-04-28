import React from 'react';
import { useTranslation } from 'react-i18next';
import { components } from 'react-select';
import PropTypes from 'prop-types';

const getNameFromValue = (value) => value.props.data.name;

// this component, used within the UsersSelect component, overrides react-select's default text display
// by default, react-select will keep expanding its text display as additional options are selected
// with this component, after 2 selections, the text box will stop expanding and display: 'A, B, and X other(s) selected'
const CustomValueContainer = ({ children, ...props }) => {
  const { t } = useTranslation();

  // values is an array of objects corresponding to the currently made selection
  let [values] = children;

  if (Array.isArray(values)) {
    const { length } = values;
    const plural = length === 3 ? '' : 's';
    const alsoSelectedCount = length - 2;
    if (length === 1) {
      values = `${getNameFromValue(values[0])}`;
    } else if (length === 2) {
      values = `${getNameFromValue(values[0])}, ${getNameFromValue(values[1])}`;
    } else {
      const firstSelection = getNameFromValue(values[0]);
      const secondSelection = getNameFromValue(values[1]);
      values = t('Many users selected...', {
        firstSelection,
        secondSelection,
        alsoSelectedCount,
        plural,
      });
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

CustomValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomValueContainer;
