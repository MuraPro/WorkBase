// features/comments/model/comments.slice.ts
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

// дополнительные "requested" action'ы (как в usersSlice)
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

// Создание комментария
export const createComment = createAsyncThunk(
  'comments/createComment',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    dispatch(addCommentRequested(payload));
    try {
      const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState()),
      };
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
      return content;
    } catch (error) {
      handleFirebaseError(error);
      const message = error?.message ?? 'Failed to create comment';
      dispatch(commentsRequestFailed(message));
      return rejectWithValue(message);
    }
  }
);

// Удаление комментария
export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId, { dispatch, rejectWithValue }) => {
    dispatch(removeCommentRequested());
    try {
      const { content } = await commentService.removeComment(commentId);
      if (content === null) {
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
