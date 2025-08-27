import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getProfessionsLoadingStatus,
  getProfessionById,
} from '../slices/professions';
import { LoaderWave } from '@shared/ui/loaderWave';

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const prof = useSelector(getProfessionById(id));

  if (isLoading) return <LoaderWave />;

  return <p className="fw-bold">{prof.name}</p>;
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
