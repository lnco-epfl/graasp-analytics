import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import customStyles from '../../../styles/react-select-styles';
import { extractItemTypes } from '../../../utils/api';

const ItemsSelect = ({ actions, selectedItemTypes, setSelectedItemTypes }) => {
  const { t } = useTranslation();
  const allItemTypes = extractItemTypes(actions);

  // custom option allowing us to select all users in the dropdown
  const allOption = {
    name: t('Select All'),
    value: '*',
  };

  const handleChange = (selectedItem) => {
    setSelectedItemTypes(selectedItem);
  };

  return (
    <div>
      <Select
        styles={customStyles}
        options={[allOption, ...allItemTypes]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        allowSelectAll
        getOptionLabel={(option) => option.name}
        value={selectedItemTypes}
        onChange={(selected) => {
          if (
            // in the dropdown, say the option 'Option A' then the option 'Select All' are chosen
            // the 'selected' argument in this function would be [{"name": "Option A", value: "Option A"}, {name: "Select All", value: "*"}]
            // hence the third condition below: always check the last item in this array - if it's the Select All option, then handleChange(allItemTypes)
            // the other two conditions prevent the following errors occuring:
            // (selected !== null): when multiple options are selected THEN removed, 'selected' here becomes null - hence selected[selected.length - 1].value fails
            // (selected.length > 0): when multiple options are being selected, there are 'transitions' where 'selected' here becomes [], and again [...].value fails
            // (to see the errors, comment out 1 or more of the conditions)
            selected !== null &&
            selected.length > 0 &&
            selected[selected.length - 1].value === allOption.value
          ) {
            return handleChange(allItemTypes);
          }
          return handleChange(selected);
        }}
        placeholder={t('Filter by item type...')}
      />
    </div>
  );
};

ItemsSelect.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedItemTypes: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItemTypes: PropTypes.func.isRequired,
};

export default ItemsSelect;
