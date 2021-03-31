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
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItemTypes: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItemTypes: PropTypes.func.isRequired,
};

export default ItemsSelect;
