import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@features/auth';
import { useUsersMethods } from '../model/useUsersMethods';
import { UserContext } from '../model/useUsersСontext';

const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { users, isLoading, getUserById } = useUsersMethods(currentUser);

  return (
    <UserContext.Provider value={{ users, isLoading, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
