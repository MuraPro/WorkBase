import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsReducer } from '@features/comments';
import { professionsReducer } from '@features/profession';
import { qualitiesReducer } from '@features/quality';
import { usersReducer } from '@features/user';

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
