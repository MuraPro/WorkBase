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

  const handleSubmit = async (formData) => {
    await dispatch(
      createComment({
        content: formData.content,
        pageId: pageOwnerId,
      })
    ).unwrap?.();
    setFormKey(Date.now());
  };

  return (
    <div>
      <h5>Оставить отзыв</h5>
      <FormComponent
        key={formKey}
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        requiredFields={['userId', 'content']}
        defaultData={{ content: '' }}
      >
        <TextAreaField name="content" label="" />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Опубликовать
          </button>
        </div>
      </FormComponent>
    </div>
  );
};

export default AddCommentForm;
