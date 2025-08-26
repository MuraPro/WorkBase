import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormComponent } from '@shared/ui/formComponent';
import { BackHistoryButton } from '@shared/ui/BackHistoryButton';
import { SelectField } from '@shared/ui/selectField';
import { TextField } from '@shared/ui/textField';
import { TextAreaField } from '@shared/ui/textAreaField';
import { RadioField } from '@shared/ui/radioField';
import { MultiSelectField } from '@shared/ui/multiSelectField';
import { Loader } from '@shared/ui/loader';
import { validatorConfig } from '@shared/lib/errors';
import { useProfessions } from '@features/profession';
import { getQualities, getQualitiesLoadingStatus } from '@features/quality';
import { useAuth } from '@features/auth/model/useAuthContext';
import {
  transformProfessions,
  transformQualities,
  getUserQualities,
  extractIds,
} from '../model/transformData';
import { random } from 'lodash';

const EditForm = () => {
  const [defaultData, setDefaultData] = useState(null);
  const { userId } = useParams();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  const { currentUser, updateUserData } = useAuth();
  const { professions, isLoading: professionsLoading } = useProfessions();
  const professionsList = transformProfessions(professions);
  const qualitiesList = transformQualities(qualities);

  useEffect(() => {
    const isReady = !professionsLoading && !qualitiesLoading;
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
    professionsLoading,
    qualitiesLoading,
    userId,
  ]);

  const handleSubmit = async (data) => {
    const updatedUser = {
      ...data,
      profession: data.profession,
      qualities: extractIds(data.qualities),
    };

    await updateUserData(updatedUser);
  };

  if (professionsLoading || qualitiesLoading || !defaultData) return <Loader />;

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
