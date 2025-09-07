import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { handleFirebaseError } from '@shared/lib/errors';
import { getCurrentUserId } from '@entities/user';
import commentService from '../api/comment.service';

const initialState = {
  entities: null,
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      if (!Array.isArray(state.entities)) return;
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved,
} = actions;

const addCommentRequested = createAction('comments/addCommentRequested');
const removeCommentRequested = createAction('comments/removeCommentRequested');

/* ========================= THUNKS ========================= */

// Загрузка списка комментариев
export const loadCommentsList = createAsyncThunk(
  'comments/loadCommentsList',
  async (userId, { dispatch, rejectWithValue }) => {
    dispatch(commentsRequested());
    try {
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceived(content));
      return content;
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message ?? 'Failed to load comments';
      dispatch(commentsRequestFailed(message));
      return rejectWithValue(message);
    }
  }
);

export const createComment = (payload) => async (dispatch, getState) => {
  dispatch(addCommentRequested(payload));
  try {
    const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      userId: getCurrentUserId()(getState()),
      pageId: payload.pageId,
    };

    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

// Удаление комментария
export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId, { dispatch, rejectWithValue }) => {
    dispatch(removeCommentRequested());
    try {
      const { content } = await commentService.removeComment(commentId);
      if (
        content === null ||
        (Array.isArray(content) && content.length === 0) ||
        Object.keys(content).length === 0
      ) {
        dispatch(commentRemoved(commentId));
      }

      return commentId;
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message ?? 'Failed to remove comment';
      dispatch(commentsRequestFailed(message));
      return rejectWithValue(message);
    }
  }
);

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;
export const getCommentsError = () => (state) => state.comments.error;

export default commentsReducer;
