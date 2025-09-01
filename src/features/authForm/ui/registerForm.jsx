// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { validatorConfig } from '@shared/lib/errors';
// import { CheckBoxField } from '@shared/ui/checkBoxField';
// import { FormComponent } from '@shared/ui/formComponent';
// import { MultiSelectField } from '@shared/ui/multiSelectField';
// import { RadioField } from '@shared/ui/radioField';
// import { SelectField } from '@shared/ui/selectField';
// import { TextAreaField } from '@shared/ui/textAreaField';
// import { TextField } from '@shared/ui/textField';
// import { getProfessions } from '@entities/profession';
// import { getQualities } from '@entities/quality';
// import { signUp } from '@entities/user';
// import { transformToSelectOptions } from '../model/transformData';
// const RegisterForm = ({ toggleFormType }) => {
//   const defaultData = {
//     name: '',
//     email: '',
//     password: '',
//     profession: '',
//     about: '',
//     sex: 'male',
//     qualities: [],
//     licence: false,
//   };
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const qualities = useSelector(getQualities());
//   const qualitiesList = transformToSelectOptions(qualities);
//   const professions = useSelector(getProfessions());
//   const professionsList = transformToSelectOptions(professions);
//   const handleSubmit = async (data) => {
//     const selectedQualities = data.qualities.map((q) => q.value);
//     const userPayload = {
//       ...data,
//       qualities: selectedQualities,
//     };
//     try {
//       await dispatch(signUp(userPayload)).unwrap();
//       navigate('/users');
//     } catch (error) {
//       console.error('Сведенья для разработчиков: ', error);
//     }
//   };
//   return (
//     <div
//       className="shadow p-4 rounded bg-white"
//       style={{ width: '100%', maxWidth: '600px' }}
//     >
//       <h3 className="mb-4 text-center">Регистрация</h3>
//       <FormComponent
//         defaultData={defaultData}
//         validatorConfig={validatorConfig}
//         onSubmit={handleSubmit}
//         requiredFields={['email', 'password']}
//       >
//         <TextField label="Электронная почта" name="email" />
//         <TextField label="Имя" name="name" />
//         <TextField label="Пароль" type="password" name="password" />
//         <SelectField
//           label="Ваша профессия"
//           defaultOption="Choose..."
//           options={professionsList}
//           name="profession"
//         />
//         <RadioField
//           options={[
//             { name: 'Male', value: 'male' },
//             { name: 'Female', value: 'female' },
//             { name: 'Other', value: 'other' },
//           ]}
//           name="sex"
//           label="Ваш пол"
//         />
//         <MultiSelectField
//           options={qualitiesList}
//           name="qualities"
//           label="Ваши качества"
//         />
//         <TextAreaField label="О себе" name="about" />
//         <CheckBoxField name="licence">
//           Подтвердить <a>лицензионное соглашение</a>
//         </CheckBoxField>
//         <button className="btn btn-primary w-100 mx-auto" type="submit">
//           Submit
//         </button>
//         <div className="my-3 text-center">
//           <span className="me-1">Уже прошли регистрацию? </span>
//           <a
//             role="button"
//             className="text-primary text-decoration-underline"
//             onClick={toggleFormType}
//           >
//             Sign In
//           </a>
//         </div>
//       </FormComponent>
//     </div>
//   );
// };
// RegisterForm.propTypes = {
//   toggleFormType: PropTypes.func,
// };
// export default RegisterForm;
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validatorConfig } from '@shared/lib/errors';
import { CheckBoxField } from '@shared/ui/checkBoxField';
import { FormComponent } from '@shared/ui/formComponent';
import { MultiSelectField } from '@shared/ui/multiSelectField';
import { RadioField } from '@shared/ui/radioField';
import { SelectField } from '@shared/ui/selectField';
import { TextAreaField } from '@shared/ui/textAreaField';
import { TextField } from '@shared/ui/textField';
import { getProfessions } from '@entities/profession';
import { getQualities } from '@entities/quality';
import { signUp } from '@entities/user';
import { transformToSelectOptions } from '../model/transformData';

const RegisterForm = ({ toggleFormType }) => {
  const defaultData = {
    name: '',
    email: '',
    password: '',
    profession: '',
    about: '',
    sex: 'male',
    image: '',
    qualities: [],
    licence: false,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qualities = useSelector(getQualities());
  const qualitiesList = transformToSelectOptions(qualities);

  const professions = useSelector(getProfessions());
  const professionsList = transformToSelectOptions(professions);

  const handleSubmit = async (data) => {
    const selectedQualities = data.qualities.map((q) => q.value);

    const userPayload = {
      ...data,
      qualities: selectedQualities,
      image: data.image?.trim() || null,
    };

    try {
      await dispatch(signUp(userPayload)).unwrap();
      navigate('/users');
    } catch (error) {
      console.error('Сведенья для разработчиков: ', error);
    }
  };

  return (
    <div
      className="shadow p-4 rounded bg-white"
      style={{ width: '100%', maxWidth: '600px' }}
    >
      <h3 className="mb-4 text-center">Регистрация</h3>

      <FormComponent
        defaultData={defaultData}
        validatorConfig={validatorConfig}
        onSubmit={handleSubmit}
        requiredFields={['email', 'password']}
      >
        <TextField label="Электронная почта" name="email" />
        <TextField label="Имя" name="name" />
        <TextField label="Пароль" type="password" name="password" />
        <TextField label="Ссылка на аватар" name="image" />

        <SelectField
          label="Ваша профессия"
          defaultOption="Choose..."
          options={professionsList}
          name="profession"
        />
        <RadioField
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' },
          ]}
          name="sex"
          label="Ваш пол"
        />
        <MultiSelectField
          options={qualitiesList}
          name="qualities"
          label="Ваши качества"
        />
        <TextAreaField label="О себе" name="about" />
        <CheckBoxField name="licence">
          Подтвердить <a>лицензионное соглашение</a>
        </CheckBoxField>

        <button className="btn btn-primary w-100 mx-auto" type="submit">
          Submit
        </button>

        <div className="my-3 text-center">
          <span className="me-1">Уже прошли регистрацию? </span>
          <a
            role="button"
            className="text-primary text-decoration-underline"
            onClick={toggleFormType}
          >
            Sign In
          </a>
        </div>
      </FormComponent>
    </div>
  );
};

RegisterForm.propTypes = {
  toggleFormType: PropTypes.func,
};

export default RegisterForm;
