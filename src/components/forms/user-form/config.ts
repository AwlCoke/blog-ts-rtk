import { nanoid } from 'nanoid';
import { ValidatedUserFormProps } from '../../../types/forms';

export const LoginFormProps: ValidatedUserFormProps[] = [
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    placeholder: 'Email address',
    id: `${nanoid()}`,
    errorMessage: 'Input existing email',
    responseError: null,
    rules: {
      required: true,
      pattern: /^[^@]+@[^@.]+\.[^@]+$/,
    },
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    id: `${nanoid()}`,
    errorMessage: 'Password must be between 8 and 40 characters',
    responseError: null,
    rules: {
      required: true,
      maxLength: 40,
      minLength: 8,
    },
  },
];

// export RegisterFormProps: ValidatedUserFormProps[] = [
//
// ]
