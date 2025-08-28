import React from 'react';
import PropTypes from 'prop-types';
import '../style/bookmark.css';

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest} className="bookmark">
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool,
};

export default BookMark;
