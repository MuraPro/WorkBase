import React from 'react';
import PropTypes from 'prop-types';
import '../style/errors.css';

const TextAreaField = ({ label, name, value, onChange, error, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => 'form-control' + (error ? ' is-invalid' : '');

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className={getInputClasses()}
          aria-invalid={Boolean(error)}
          {...rest}
        />
        <div
          className={`invalid-feedback error-message${error ? ' visible' : ''}`}
        >
          {error || '\u00A0'}
        </div>
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextAreaField;
