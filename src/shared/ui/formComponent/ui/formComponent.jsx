import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../lib/errors/validator';

const FormComponent = ({
  children,
  validatorConfig,
  onSubmit,
  defaultData = {},
  requiredFields = [],
}) => {
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const handleChange = useCallback(
    (target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
      if (!touched[target.name]) {
        setTouched((prev) => ({
          ...prev,
          [target.name]: true,
        }));
      }
    },
    [touched]
  );
  const validate = useCallback(() => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [data, validatorConfig]);
  useEffect(() => {
    validate();
  }, [data, validate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(data).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData(data);
    setErrors({});
    setTouched({});
  };
  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const form = event.target.form;
      const indexField = Array.prototype.indexOf.call(form, event.target);
      form.elements[indexField + 1]?.focus();
    }
  }, []);
  const isValid = useMemo(() => {
    return requiredFields.every(
      (field) => data[field]?.toString().trim() && !errors[field]
    );
  }, [data, errors, requiredFields]);
  const clonedElements = React.Children.map(children, (child) => {
    let config = {};
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (!child.props.name) {
        throw new Error('Name property is required for field components');
      }
      config = {
        ...child.props,
        onChange: handleChange,
        value: data[child.props.name] ?? '',
        error: touched[child.props.name] && errors[child.props.name],
        onKeyDown: handleKeyDown,
      };
    }
    if (typeof child.type === 'string' && child.type === 'button') {
      if (child.props.type === 'submit' || child.props.type === undefined) {
        config = {
          ...child.props,
          disabled: !isValid,
        };
      }
    }
    return React.cloneElement(child, config);
  });
  return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};
FormComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  requiredFields: PropTypes.array,
  defaultData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  validatorConfig: PropTypes.object,
};
export default FormComponent;
