import { useCallback, useEffect, useState } from 'react';
import userService from '../api/user.service';
import { handleFirebaseError } from '@shared/lib/errors';
import { syncCurrentUser } from './syncCurrentUser';

export const useUsersMethods = (currentUser) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUsers = useCallback(async () => {
    try {
      const { content } = await userService.get();
      setUsers(content);
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      setUsers((prevUsers) => syncCurrentUser(prevUsers, currentUser));
    }
  }, [currentUser, isLoading]);

  const getUserById = (userId) => users.find((u) => u._id === userId);

  return { users, isLoading, getUserById };
};
