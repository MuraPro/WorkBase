import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { qualitiesReducer } from '@features/quality';
// import commentsReducer from "./comments";
// import professionsReducer from "./professions";
// import usersReducer from "./users";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  // professions: professionsReducer,
  // users: usersReducer,
  // comments: commentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
