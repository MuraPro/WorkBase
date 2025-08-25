import React from 'react';
import PropTypes from 'prop-types';
import { FormComponent } from '@shared/ui/formComponent';
import { TextAreaField } from '@shared/ui/textAreaField';
import { validatorConfig } from '@shared/lib/errors';

const AddCommentForm = ({ onSubmit }) => {
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div>
      <h5>Оставить отзыв</h5>
      <FormComponent
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        requiredFields={['userId', 'content']}
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

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddCommentForm;
