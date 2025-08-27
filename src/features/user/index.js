import UserProvider from './providers/UsersProvider';
import { useUsersMethods } from './model/useUsersMethods';
import { useUser } from './model/useUsersСontext';
import userService from './api/user.service';
import usersReducer from './slices/users';
import {
  login,
  signUp,
  logOut,
  createUser,
  loadUsersList,
  updateUser,
  getUsersList,
  getCurrentUserData,
  getUserById,
  getIsLoggedIn,
  getDataStatus,
  getUsersLoadingStatus,
  getCurrentUserId,
  getAuthErrors,
} from './slices/users';

export {
  UserProvider,
  useUser,
  userService,
  useUsersMethods,
  usersReducer,
  login,
  signUp,
  logOut,
  createUser,
  loadUsersList,
  updateUser,
  getUsersList,
  getCurrentUserData,
  getUserById,
  getIsLoggedIn,
  getDataStatus,
  getUsersLoadingStatus,
  getCurrentUserId,
  getAuthErrors,
};
