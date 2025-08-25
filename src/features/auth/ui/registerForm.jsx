import React from 'react';
import PropTypes from 'prop-types';
import { validatorConfig } from '@shared/lib/errors';
import { FormComponent } from '@shared/ui/formComponent';
import { SelectField } from '@shared/ui/selectField';
import { TextField } from '@shared/ui/textField';
import { TextAreaField } from '@shared/ui/textAreaField';
import { RadioField } from '@shared/ui/radioField';
import { MultiSelectField } from '@shared/ui/multiSelectField';
import { CheckBoxField } from '@shared/ui/checkBoxField';
import { transformToSelectOptions } from '../model/transformData';
import { useQualities } from '../../quality/model/useQualityContext';
import { useProfessions } from '../../profession/model/useProfessionContext';
import { useAuth } from '../model/useAuthContext';

const RegisterForm = ({ toggleFormType }) => {
  const defaultData = {
    name: '',
    email: '',
    password: '',
    profession: '',
    about: '',
    sex: 'male',
    qualities: [],
    licence: false,
  };
  const { signUp } = useAuth();
  const { qualities } = useQualities();
  const qualitiesList = transformToSelectOptions(qualities);

  const { professions } = useProfessions();
  const professionsList = transformToSelectOptions(professions);

  const handleSubmit = async (data) => {
    const selectedQualities = data.qualities.map((q) => q.value);
    const userPayload = {
      ...data,
      qualities: selectedQualities,
    };

    await signUp(userPayload);
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
