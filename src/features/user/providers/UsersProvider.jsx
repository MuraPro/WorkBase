import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@shared/ui/loader';
import { UserContext } from '../model/useUsersСontext';
import { useAuth } from '@features/auth';
import { useUsersMethods } from '../model/useUsersMethods';

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
