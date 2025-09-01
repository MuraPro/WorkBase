import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@shared/ui/avatar';
import { getCurrentUserId, hasUserLiked, toggleLike } from '@entities/user';
import { UserInfo } from '@entities/userInfo';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = useSelector(getCurrentUserId());

  const dispatch = useDispatch();
  const alreadyLiked = useSelector(hasUserLiked(user._id));

  const handleLike = () => {
    if (!alreadyLiked) {
      dispatch(toggleLike(user._id));
    }
  };

  const handleClick = () => {
    navigate(location.pathname + '/edit');
  };

  return (
    user && (
      <div className="card mb-3">
        <div className="card-body position-relative">
          {currentUserId === user._id && (
            <button
              className="position-absolute top-0 end-0 btn btn-sm"
              onClick={handleClick}
            >
              <i className="bi bi-gear"></i>
            </button>
          )}

          <div className="d-flex flex-column align-items-center text-center position-relative">
            <Avatar url={user.image} size={150} />
            <UserInfo
              name={user.name}
              professionId={user.profession}
              like={user.like ?? 0}
              onLike={handleLike}
            />
          </div>
        </div>
      </div>
    )
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    like: PropTypes.number,
    profession: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
