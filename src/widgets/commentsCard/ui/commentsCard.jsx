import React from 'react';
import { orderBy } from 'lodash';
import { useComments, CommentsList, AddCommentForm } from '@features/comments';

const CommentsCard = () => {
  const { createComment, comments, removeComment } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
  };

  const handleRemoveComment = (id) => {
    removeComment(id);
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body ">
          <h5>Отзывы</h5>
          <hr />
          {sortedComments.length > 0 && (
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
