import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FormComponent } from '@shared/ui/formComponent';
import { TextField } from '@shared/ui/textField';
import { CheckBoxField } from '@shared/ui/checkBoxField';
import { validatorConfig } from '@shared/lib/errors';
import { useAuth } from '../model/useAuthContext';

const LoginForm = ({ toggleFormType }) => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultData = {
    email: '',
    password: '',
    stayOn: false,
  };

  const handleSubmit = async (data) => {
    try {
      await logIn(data);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      const firstError = Object.values(error)[0];
      if (firstError) {
        toast.error(firstError);
      }
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
          <span className="me-1">Регистрация </span>
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

// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { TextField, CheckBoxField } from '@shared';
// import { validator } from '@/utils/validator';
// import { validatorConfig } from '@/utils/validatorConfig';

// const LoginForm = ({ toggleFormType }) => {
//   const [data, setData] = useState({ email: '', password: '', stayOn: false });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const handleChange = ({ name, value }) => {
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (!touched[name]) {
//       setTouched((prev) => ({
//         ...prev,
//         [name]: true,
//       }));
//     }
//   };

//   const validate = useCallback(() => {
//     const errors = validator(data, validatorConfig);
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [data]);

//   useEffect(() => {
//     validate();
//   }, [validate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });
//     const isValid = validate();
//     if (!isValid) return;
//     console.log(data);
//     setData({ email: '', password: '', stayOn: false });
//     setErrors({});
//     setTouched({});
//   };

//   const disabled = useMemo(() => Object.keys(errors).length !== 0, [errors]);

//   return (
//     <div
//       className="shadow p-4 rounded bg-white"
//       style={{ width: '100%', maxWidth: '600px', height: '50%' }}
//     >
//       <h3 className="mb-4 text-center">Авторизация</h3>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Электронная почта"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           error={touched.email && errors.email}
//         />
//         <TextField
//           label="Пароль"
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           error={touched.password && errors.password}
//         />
//         <CheckBoxField
//           value={data.stayOn}
//           onChange={handleChange}
//           name="stayOn"
//           error={touched.stayOn && errors.stayOn}
//         >
//           Оставаться в системе
//         </CheckBoxField>
//         <button
//           className="btn btn-primary w-100 mt-3"
//           type="submit"
//           disabled={disabled}
//         >
//           Отправить
//         </button>
//         <div className="my-3 text-center">
//           <span className="me-1">Регистрация </span>
//           <a
//             role="button"
//             className="text-primary text-decoration-underline"
//             onClick={toggleFormType}
//           >
//             Sign Up
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };

// LoginForm.propTypes = {
//   toggleFormType: PropTypes.func,
// };

// export default LoginForm;
