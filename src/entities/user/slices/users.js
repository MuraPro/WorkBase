import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleFirebaseError } from '@shared/lib/errors';
import { generateAvatarUrl, randomInt } from '@shared/lib/helpers';
import { localStorageService } from '@shared/lib/storage';
import authService from '../api/auth.service';
import userService from '../api/user.service';

const hasToken = localStorageService.getAccessToken();

const initialState = hasToken
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() ?? null },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: { userId: null },
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
      state.error = null;
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
      state.auth = action.payload ?? { userId: null };
      state.isLoggedIn = Boolean(action.payload?.userId);
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = { userId: null };
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      if (!Array.isArray(state.entities)) return;
      const idx = state.entities.findIndex((u) => u._id === action.payload._id);
      if (idx !== -1) state.entities[idx] = action.payload;
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

/* ========================= THUNKS ========================= */

export const toggleLike = createAsyncThunk(
  'users/toggleLike',
  async (profileId, { getState, dispatch, rejectWithValue }) => {
    dispatch(userUpdateRequested());

    try {
      const state = getState();
      const currentUserId = state.users.auth?.userId;

      if (!currentUserId) {
        return rejectWithValue('Пользователь не авторизован');
      }

      // 🚫 запретить лайк самому себе
      if (currentUserId === profileId) {
        return rejectWithValue('Вы не можете лайкнуть сами себя');
      }

      const list = state.users.entities;
      const profile = list?.find((u) => u._id === profileId);

      if (!profile) {
        return rejectWithValue('Профиль не найден');
      }

      // Нормализуем likedBy
      const likedBy = Array.isArray(profile.likedBy) ? profile.likedBy : [];

      if (likedBy.includes(currentUserId)) {
        return rejectWithValue('Вы уже лайкали этого пользователя');
      }

      // Формируем обновлённые данные
      const updated = {
        ...profile,
        like: (profile.like || 0) + 1,
        likedBy: [...likedBy, currentUserId],
      };

      const { content } = await userService.updateById(profileId, updated);

      dispatch(userUpdateSuccessed(content));
      return content;
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message || 'Ошибка при лайке';
      dispatch(userUpdateFailed(message));
      return rejectWithValue(message);
    }
  }
);

export const hasUserLiked = (profileId) => (state) => {
  const currentUserId = state.users.auth?.userId;
  const user = state.users.entities?.find((u) => u._id === profileId);
  if (!user || !currentUserId) return false;
  return (user.likedBy || []).includes(currentUserId);
};

export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      return { userId: data.localId };
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message || String(error);
      dispatch(authRequestFailed(message));
      return rejectWithValue(message);
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
          completedMeetings: randomInt(0, 100),
          image: generateAvatarUrl(
            `${(Math.random() + 1).toString(36).substring(7)}`
          ),
          ...rest,
        })
      );

      dispatch(authRequestSuccess({ userId: data.localId }));

      return data.localId;
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message || error;
      dispatch(authRequestFailed(message));
      return rejectWithValue(message);
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
      dispatch(createUserFailed(error?.message || String(error)));
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
    dispatch(usersRequestFailed(error?.message || error));
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
      const message = error?.message || error;
      dispatch(userUpdateFailed(message));
      return rejectWithValue(message);
    }
  }
);

/* ========================= SELECTORS ========================= */

export const getUsersList = () => (state) => state.users.entities;

export const getCurrentUserData = () => (state) => {
  const userId = state.users.auth?.userId;
  const list = state.users.entities;
  if (!userId || !Array.isArray(list)) return null;
  return list.find((u) => u._id === userId) ?? null;
};

export const getUserById = (userId) => (state) => {
  const list = state.users.entities;
  if (!Array.isArray(list)) return null;
  return list.find((u) => u._id === userId) ?? null;
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) =>
  state.users.auth?.userId ?? null;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
