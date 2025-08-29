import React, { useEffect, useState } from 'react';
import { random } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { validatorConfig } from '@shared/lib/errors';
import { BackHistoryButton } from '@shared/ui/BackHistoryButton';
import { FormComponent } from '@shared/ui/formComponent';
import { Loader } from '@shared/ui/loader';
import { MultiSelectField } from '@shared/ui/multiSelectField';
import { RadioField } from '@shared/ui/radioField';
import { SelectField } from '@shared/ui/selectField';
import { TextAreaField } from '@shared/ui/textAreaField';
import { TextField } from '@shared/ui/textField';
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '@entities/profession';
import { getQualities, getQualitiesLoadingStatus } from '@entities/quality';
import { getCurrentUserData, updateUser } from '@entities/user';
import {
  extractIds,
  getUserQualities,
  transformProfessions,
  transformQualities,
} from '../model/transformData';

const EditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [defaultData, setDefaultData] = useState(null);
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());

  const professionsList = transformProfessions(professions);
  const qualitiesList = transformQualities(qualities);

  useEffect(() => {
    const isReady = !professionLoading && !qualitiesLoading;
    if (isReady) {
      const currentUserQualities = getUserQualities(currentUser, qualities);
      const transformedCurrentUserQualities =
        transformQualities(currentUserQualities);

      setDefaultData({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: transformedCurrentUserQualities,
        about: currentUser.about,
        _id: currentUser._id,
        image: currentUser.image,
        rate: random(1, 5),
        bookmark: false,
      });
    }
  }, [
    currentUser,
    professions,
    qualities,
    professionLoading,
    qualitiesLoading,
    userId,
  ]);

  const handleSubmit = async (data) => {
    const updatedUser = {
      ...data,
      profession: data.profession,
      qualities: extractIds(data.qualities),
    };
    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error('Сведенья для разработчиков: ', error);
    }
  };

  if (professionLoading || qualitiesLoading || !defaultData) return <Loader />;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <FormComponent
            onSubmit={handleSubmit}
            defaultData={defaultData}
            validatorConfig={validatorConfig}
            requiredFields={['name', 'email']}
          >
            <TextField label="Имя" name="name" autoFocus />
            <TextField label="Электронная почта" name="email" />
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
              name="qualities"
              label="Ваши качества"
              options={qualitiesList}
            />
            <TextAreaField label="О себе" name="about" />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
              Обновить
            </button>
          </FormComponent>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
