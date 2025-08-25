import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../model/useQualityContext';

const Quality = ({ id }) => {
  const { getQuality } = useQualities();
  const quality = getQuality(id);

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
