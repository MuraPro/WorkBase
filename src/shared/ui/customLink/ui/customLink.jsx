import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/customlink.css';

const CustomLink = ({ children, to, ...props }) => {
  return (
    <Link to={to} {...props} className="custom-link text-decoration-none">
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default CustomLink;
