import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { validatorConfig } from '@shared/lib/errors';
import { FormComponent } from '@shared/ui/formComponent';
import { TextAreaField } from '@shared/ui/textAreaField';
import { createComment } from '../slices/comments';

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { userId: pageOwnerId } = useParams();
  const [formKey, setFormKey] = useState(Date.now());

  const handleSubmit = (formData) => {
    dispatch(
      createComment({
        content: formData.content,
        pageId: pageOwnerId,
      })
    );
    setFormKey(Date.now());
  };

  return (
    <div>
      <h5>Оставить отзыв</h5>
      <FormComponent
        key={formKey}
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        requiredFields={['content']}
        defaultData={{ content: '' }}
      >
        <TextAreaField name="content" label="Ваш комментарий" />
        <div className="d-flex justify-content-end mt-2">
          <button type="submit" className="btn btn-primary">
            Опубликовать
          </button>
        </div>
      </FormComponent>
    </div>
  );
};

export default AddCommentForm;
