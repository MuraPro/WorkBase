import React from 'react';
import PropTypes from 'prop-types';
import '../styles/error.css';

const CheckBoxField = ({ name, value, onChange, children, error, ...rest }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };
  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '');
  };
  return (
    <div className="form-check mb-2">
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
        {...rest}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      <div
        className={`invalid-feedback error-message${error ? ' visible' : ''}`}
      >
        {error || '\u00A0'}
      </div>
    </div>
  );
};
CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
};

export default CheckBoxField;
