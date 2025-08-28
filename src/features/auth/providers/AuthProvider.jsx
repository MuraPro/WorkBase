import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@shared/ui/loader';
import { AuthContext } from '../model/useAuthContext';
import { useAuthMethods } from '../model/useAuthMethods';

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { logIn, signUp, logOut, updateUserData } = useAuthMethods(
    setUser,
    setLoading,
    navigate
  );

  return (
    <AuthContext.Provider
      value={{ logIn, signUp, logOut, updateUserData, isLoading, currentUser }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
