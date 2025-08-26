import { createSlice, createSelector } from '@reduxjs/toolkit';
import qualityService from '../api/quality.service';
import { isOutdated } from '@shared/lib/date';
import { handleFirebaseError } from '@shared/lib/errors';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      handleFirebaseError(error);
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;

const selectQualitiesEntities = (state) => state.qualities.entities;

export const getQualitiesByIds = (qualitiesIds) =>
  createSelector([selectQualitiesEntities], (entities) => {
    if (!entities) return [];
    return qualitiesIds
      .map((id) => entities.find((q) => q._id === id))
      .filter(Boolean);
  });

export default qualitiesReducer;
