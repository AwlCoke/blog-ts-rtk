import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './user-form.module.scss';
import { UserFormProps } from '../../../types/forms';

const UserForm = forwardRef<HTMLInputElement & HTMLTextAreaElement, UserFormProps>((props, ref) => {
  const { label, textarea, id, errorMessage, errors, responseError = null, name, ...userFormProps } = props;

  const itemStyles = {
    cnInput: classNames(styles.input, { [styles['input--danger']]: errors?.[name] }),
    cnError: classNames(styles['message--error']),
  };

  const input = textarea ? (
    <textarea {...userFormProps} id={id} name={name} ref={ref} className={itemStyles.cnInput} rows={10} />
  ) : (
    <input {...userFormProps} id={id} name={name} ref={ref} className={itemStyles.cnInput} />
  );

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {input}
      {errors?.[name] && <p className={itemStyles.cnError}>{errorMessage}</p>}
      <p className={itemStyles.cnError}>{responseError}</p>
    </>
  );
});

export default UserForm;
