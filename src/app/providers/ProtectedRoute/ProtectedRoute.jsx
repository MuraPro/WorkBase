import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLoggedIn } from '@features/user';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
