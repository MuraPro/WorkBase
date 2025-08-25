import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@shared/ui/avatar';
import UserInfo from './userInfo';
import PropTypes from 'prop-types';
import { useAuth } from '../../auth';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleClick = () => {
    navigate(location.pathname + '/edit');
  };

  return (
    <div className="card mb-3">
      <div className="card-body position-relative">
        {currentUser._id === user._id && (
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
