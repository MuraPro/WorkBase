import userService from './api/user.service';
import { useUsersMethods } from './model/useUsersMethods';
import { useUser } from './model/useUsersСontext';
import UserProvider from './providers/UsersProvider';
import usersReducer, {
  createUser,
  getAuthErrors,
  getCurrentUserData,
  getCurrentUserId,
  getDataStatus,
  getIsLoggedIn,
  getUserById,
  getUsersList,
  getUsersLoadingStatus,
  loadUsersList,
  logOut,
  login,
  signUp,
  updateUser,
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
