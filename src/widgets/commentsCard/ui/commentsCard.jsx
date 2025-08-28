import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  AddCommentForm,
  CommentsList,
  getComments,
  loadCommentsList,
} from '@features/comments';

const CommentsCard = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [dispatch, userId]);

  const comments = useSelector(getComments());

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body ">
          <h5>Отзывы</h5>
          <hr />
          {sortedComments.length > 0 && (
            <CommentsList comments={sortedComments} />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
