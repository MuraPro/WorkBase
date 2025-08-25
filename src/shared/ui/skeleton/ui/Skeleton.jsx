import React from 'react';
import PropTypes from 'prop-types';
import '../style/skeleton.css';

export const Skeleton = ({ h = 16, w = '100%', className = '' }) => (
  <div className={`skeleton ${className}`} style={{ height: h, width: w }} />
);

Skeleton.propTypes = {
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
