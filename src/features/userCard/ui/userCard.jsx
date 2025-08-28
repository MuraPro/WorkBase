import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@shared/ui/avatar';
import { getCurrentUserId } from '@features/user';
import UserInfo from './userInfo';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = useSelector(getCurrentUserId());

  const handleClick = () => {
    navigate(location.pathname + '/edit');
  };

  return (
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
            rate={user.rate}
          />
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    profession: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
