import React from 'react';
import PropTypes from 'prop-types';
import '../styles/error.css';

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
  ...rest
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options)
      : options;

  return (
    <div className="mb-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((option, index) => (
            <option value={option.value} key={option.value || index}>
              {option.label}
            </option>
          ))}
      </select>
      <div
        className={`invalid-feedback error-message${error ? ' visible' : ''}`}
      >
        {error || '\u00A0'}
      </div>
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
};

export default SelectField;
