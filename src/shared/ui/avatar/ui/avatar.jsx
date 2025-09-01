import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/avatar.css';

const Avatar = ({ size, url }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="avatar-wrapper position-relative"
      style={{ width: size, height: size }}
    >
      {!loaded && (
        <div
          className="avatar-loader d-flex justify-content-center align-items-center"
          style={{ width: size, height: size }}
        >
          <div className="spinner-border text-secondary" role="status" />
        </div>
      )}
      <img
        src={url}
        width={size}
        height={size}
        alt="User avatar"
        className={`rounded-circle avatar-img ${
          loaded ? 'fade-in' : 'invisible'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
Avatar.propTypes = {
  url: PropTypes.string,
  size: PropTypes.number,
};
Avatar.defaultProps = {
  size: 100,
};
export default Avatar;
