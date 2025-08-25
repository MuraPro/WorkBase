import React from 'react';
import PropTypes from 'prop-types';
import { useProfessions } from '../model/useProfessionContext';
import { LoaderWave } from '@shared/ui/loaderWave';

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  if (!isLoading) {
    return <p className="fw-bold">{prof.name}</p>;
  } else return <LoaderWave />;
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
