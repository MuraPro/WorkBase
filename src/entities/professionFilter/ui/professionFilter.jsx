import React from 'react';
import PropTypes from 'prop-types';
import { GroupList } from '@shared/ui/groupList';

export const ProfessionFilters = ({
  selectedProf,
  professions,
  clearFilter,
  handleProfessionSelect,
}) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3">
      <GroupList
        selectedItem={selectedProf}
        items={professions}
        onItemSelect={handleProfessionSelect}
      />
      <button className="btn btn-secondary mt-2" onClick={clearFilter}>
        Очистить
      </button>
    </div>
  );
};

ProfessionFilters.propTypes = {
  selectedProf: PropTypes.object,
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  clearFilter: PropTypes.func.isRequired,
  handleProfessionSelect: PropTypes.func.isRequired,
};
