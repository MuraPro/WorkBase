import React from 'react';
import PropTypes from 'prop-types';
import '../style/input.css';

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    name="searchQuery"
    placeholder="Search..."
    value={value}
    onChange={onChange}
    className="form-control my-3 w-50 w-70-sm ms-3"
  />
);

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
