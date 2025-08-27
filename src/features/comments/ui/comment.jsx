import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Avatar } from '@shared/ui/avatar';
import { displayDate } from '@shared/lib/date';
import { getUserById } from '@features/user';
import { getCurrentUserData } from '@features/user';
import { useSelector } from 'react-redux';

const Comment = ({
  content,
  created_at: created,
  _id: id,
  userId,
  onRemove,
}) => {
  const user = useSelector(getUserById(userId));
  const currentUser = useSelector(getCurrentUserData());
  const { userId: pageOwnerId } = useParams();

  const canDelete =
    currentUser._id === userId || currentUser._id === pageOwnerId;

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
                      onClick={() => onRemove(id)}
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
  onRemove: PropTypes.func,
  _id: PropTypes.string,
};

export default Comment;
