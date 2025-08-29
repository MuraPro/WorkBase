import React from 'react';
import PropTypes from 'prop-types';
import { Profession } from '../../profession';
import '../style/user.css';

const UserInfo = ({ name, professionId, like = 0, onLike }) => {
  return (
    <div className="mt-3 text-center">
      <p className="mb-1 fw-semibold">{name}</p>
      <Profession id={professionId} />
      <div
        className="d-flex align-items-center justify-content-center mt-3"
        style={{ gap: 8 }}
      >
        <button
          type="button"
          className="btn btn-primary btn-sm d-flex align-items-center"
          onClick={onLike}
          aria-label="Поставить лайк"
        >
          <i className="bi bi-hand-thumbs-up-fill me-1" />
          Лайк
        </button>

        <span className="badge text-bg-light d-inline-flex align-items-center  py-1">
          <i className="bi bi-heart-fill text-danger" />
          <span className="ms-1 text-danger mb-2px">{like}</span>
        </span>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string,
  professionId: PropTypes.string,
  like: PropTypes.number,
  rate: PropTypes.number,
  onLike: PropTypes.func,
};

export default UserInfo;
