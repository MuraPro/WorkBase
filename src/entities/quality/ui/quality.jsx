import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getQualitiesByIds } from '../slices/qualities';

const Quality = ({ id }) => {
  const quality = useSelector(getQualitiesByIds(id));

  if (!quality) return null;

  const { color, name } = quality;

  return (
    <span className={'badge rounded-pill px-3   m-1 bg-' + color}>{name}</span>
  );
};

Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
