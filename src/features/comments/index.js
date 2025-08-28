import Comment from './ui/comment';
import CommentsList from './ui/commentsList';
import AddCommentForm from './ui/addCommentForm';
import commentsReducer from './slices/comments';
import {
  loadCommentsList,
  createComment,
  removeComment,
  getComments,
  getCommentsLoadingStatus,
  getCommentsError,
} from './slices/comments';

export {
  commentsReducer,
  loadCommentsList,
  createComment,
  removeComment,
  getComments,
  getCommentsLoadingStatus,
  getCommentsError,
  Comment,
  CommentsList,
  AddCommentForm,
};
