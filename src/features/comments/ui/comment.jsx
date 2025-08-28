import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { displayDate } from '@shared/lib/date';
import { Avatar } from '@shared/ui/avatar';
import { getCurrentUserId, getUserById } from '@features/user';
import { removeComment } from '../slices/comments';

const Comment = ({ content, created_at: created, _id: id, userId }) => {
  const dispatch = useDispatch();
  const { userId: pageOwnerId } = useParams();
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());

  const handleSubmit = (id) => {
    dispatch(removeComment(id));
  };

  const canDelete = currentUserId === userId || currentUserId === pageOwnerId;

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start" style={{ columnGap: '20px' }}>
            {user && <Avatar url={user.image} size={65} />}
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}{' '}
                    <span className="small">- {displayDate(created)}</span>
                  </p>

                  {canDelete && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => handleSubmit(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string,
  edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  _id: PropTypes.string,
};

export default Comment;
