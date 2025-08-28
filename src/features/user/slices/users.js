import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../api/user.service';
import authService from '../../auth/api/auth.service';
import { localStorageService } from '@shared/lib/storage';
import { randomInt } from '@shared/lib/helpers';
import { generateAvatarUrl } from '@shared/lib/helpers';
import { handleFirebaseError } from '@shared/lib/errors';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const createUserFailed = createAction('users/createUserFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      return { userId: data.localId };
    } catch (error) {
      handleFirebaseError(error);
      dispatch(authRequestFailed(error));
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  'users/signUp',
  async ({ email, password, ...rest }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);

      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          bookmark: false,
          completedMeetings: randomInt(0, 200),
          image: generateAvatarUrl(
            `${(Math.random() + 1).toString(36).substring(7)}`
          ),
          ...rest,
        })
      );

      return data.localId;
    } catch (error) {
      handleFirebaseError(error);
      dispatch(authRequestFailed(error));
      return rejectWithValue(error);
    }
  }
);

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
    } catch (error) {
      handleFirebaseError(error);
      dispatch(createUserFailed(error.message));
    }
  };
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    handleFirebaseError(error);
    dispatch(usersRequestFailed(error.message));
  }
};

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSuccessed(content));
      return content;
    } catch (error) {
      handleFirebaseError(error);
      dispatch(userUpdateFailed(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersList = () => (state) => state.users.entities;

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
