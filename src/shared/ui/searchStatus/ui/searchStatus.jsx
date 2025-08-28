import React from 'react';
import PropTypes from 'prop-types';
import { PersonFill } from 'react-bootstrap-icons';

const SearchStatus = ({ length }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <PersonFill size={40} color={length > 0 ? '#0d6efd' : '#dc3545'} />
      {length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            padding: '3px 7px',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '1',
          }}
        >
          {length}
        </span>
      )}
    </div>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number,
};

export default SearchStatus;
