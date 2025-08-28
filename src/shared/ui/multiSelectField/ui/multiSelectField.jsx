import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  value,
  error,
  ...rest
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  const getInputClasses = () => {
    return 'basic-multi-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        value={value}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        {...rest}
      />
      <div
        className={`invalid-feedback error-message${error ? ' visible' : ''}`}
      >
        {error || '\u00A0'}
      </div>
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.array,
  error: PropTypes.string,
};

export default MultiSelectField;
