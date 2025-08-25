import Comment from './ui/comment';
import CommentsList from './ui/commentsList';
import AddCommentForm from './ui/addCommentForm';
import { CommentsProvider } from './provider/CommentsProvider';
import { useCommentsMethods } from './model/useCommentsMethods';
import { useComments } from './model/useCommentsContext';
import commentService from './api/comment.service';

export {
  Comment,
  CommentsList,
  AddCommentForm,
  CommentsProvider,
  useCommentsMethods,
  useComments,
  commentService,
};
