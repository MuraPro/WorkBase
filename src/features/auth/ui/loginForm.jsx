import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { validatorConfig } from '@shared/lib/errors';
import { CheckBoxField } from '@shared/ui/checkBoxField';
import { FormComponent } from '@shared/ui/formComponent';
import { TextField } from '@shared/ui/textField';
import { login } from '@features/user';

const LoginForm = ({ toggleFormType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const defaultData = {
    email: '',
    password: '',
    stayOn: false,
  };

  const handleSubmit = async (data) => {
    const from = location.state?.from?.pathname || '/';
    try {
      await dispatch(login(data)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Сведенья для разработчиков: ', error);
    }
  };

  return (
    <div
      className="shadow p-4 rounded bg-white"
      style={{ width: '100%', maxWidth: '600px', height: '50%' }}
    >
      <h3 className="mb-4 text-center">Авторизация</h3>
      <FormComponent
        validatorConfig={validatorConfig}
        defaultData={defaultData}
        onSubmit={handleSubmit}
        requiredFields={['email', 'password']}
      >
        <TextField label="Электронная почта" name="email" />
        <TextField label="Пароль" type="password" name="password" />
        <CheckBoxField name="stayOn">Оставаться в системе</CheckBoxField>

        <button className="btn btn-primary w-100 mt-3" type="submit">
          Войти
        </button>

        <div className="my-3 text-center">
          <span className="me-1">Регистрация</span>
          <a
            role="button"
            className="text-primary text-decoration-underline"
            onClick={toggleFormType}
          >
            Sign Up
          </a>
        </div>
      </FormComponent>
    </div>
  );
};

LoginForm.propTypes = {
  toggleFormType: PropTypes.func,
};

export default LoginForm;
