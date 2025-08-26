import React from 'react';
import PropTypes from 'prop-types';

const QualityBadge = ({ color, name }) => {
  return (
    <span className={'badge rounded-pill px-3   m-1 bg-' + color}>{name}</span>
  );
};

QualityBadge.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default QualityBadge;
