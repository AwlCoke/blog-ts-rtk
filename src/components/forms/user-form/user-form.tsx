import React, { forwardRef } from 'react';
import './user-form.scss';
import { UserFormProps } from '../../../types/forms';

const UserForm = forwardRef<HTMLInputElement & HTMLTextAreaElement, UserFormProps>((props, ref) => {
  const { label, textarea, id, errorMessage, errors, responseError = null, name, ...userFormProps } = props;

  const input = textarea ? (
    <textarea {...userFormProps} name={name} ref={ref} />
  ) : (
    <input {...userFormProps} name={name} ref={ref} />
  );

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {input}
      {errors && errors.name && <span>{errors[name].message}</span>}
      <span>{responseError}</span>
    </div>
  );
});

export default UserForm;
