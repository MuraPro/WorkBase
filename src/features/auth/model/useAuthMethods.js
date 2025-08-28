import { useEffect, useCallback } from 'react';
import { httpAuth } from '@shared/lib/api';
import { setTokens } from '@shared/lib/storage/localStorage';
import userService from '../../user/api/user.service';
import { handleFirebaseError } from '@shared/lib/errors';
import { randomInt } from '../../../shared/lib/helpers/randomData';
import { generateAvatarUrl } from '@shared/lib/helpers';
import localStorageService from '@shared/lib/storage/localStorage';

export const useAuthMethods = (setUser, setLoading, navigate) => {
  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      handleFirebaseError(error);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    navigate('/');
  }

  async function updateUserData(data) {
    try {
      const { content } = await userService.update(data);
      setUser(content);
      navigate(`/users/${content._id}`);
    } catch (error) {
      handleFirebaseError(error);
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      handleFirebaseError(error);
    }
  }

  const getUserData = useCallback(async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [getUserData, setLoading]);

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        bookmark: false,
        completedMeetings: randomInt(0, 200),
        image: generateAvatarUrl(
          `${(Math.random() + 1).toString(36).substring(7)}`
        ),
        ...rest,
      });
      navigate('/');
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  return { logIn, signUp, logOut, updateUserData };
};
