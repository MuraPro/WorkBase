import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsReducer } from '@features/comments';
import { professionsReducer } from '@entities/profession';
import { qualitiesReducer } from '@entities/quality';
import { usersReducer } from '@entities/user';

const rootReducer = combineReducers({
  users: usersReducer,
  qualities: qualitiesReducer,
  professions: professionsReducer,
  comments: commentsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
