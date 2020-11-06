/* eslint-disable no-useless-escape */
import { nanoid } from 'nanoid';
import { UserFormValidProps } from '../../../types/forms';

export const RegisterFormProps: UserFormValidProps[] = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    errorMessage: 'Username must be between 3 and 20 characters',
    responseError: null,
    id: `${nanoid()}`,
    rules: {
      required: true,
      maxLength: 20,
      minLength: 3,
    },
  },
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    placeholder: 'Email address',
    id: `${nanoid()}`,
    errorMessage: 'Input correct email address',
    responseError: null,
    rules: {
      required: true,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
  {
    label: 'Repeat Password',
    name: 'repeatPassword',
    type: 'password',
    placeholder: 'Repeat Password',
    id: `${nanoid()}`,
    errorMessage: 'Passwords must match',
    responseError: null,
    rules: {
      required: true,
    },
  },
];

export const LoginFormProps: UserFormValidProps[] = [
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'Email address',
    id: `${nanoid()}`,
    type: 'email',
    errorMessage: 'Input correct email address',
    responseError: null,
    rules: {
      required: true,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },
  {
    name: 'password',
    label: 'Password',
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

export const ProfileFormProps: UserFormValidProps[] = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    id: `${nanoid()}`,
    errorMessage: 'Username must be between 3 and 20 characters',
    responseError: null,
    rules: {
      required: true,
      maxLength: 20,
      minLength: 3,
    },
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
    id: `${nanoid()}`,
    errorMessage: 'Input correct email address',
    responseError: null,
    rules: {
      required: true,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    placeholder: 'New password',
    errorMessage: 'Password must be between 8 and 40 characters',
    responseError: null,
    id: `${nanoid()}`,
    rules: {
      required: false,
      maxLength: 40,
      minLength: 8,
    },
  },
  {
    label: 'Avatar image (url)',
    name: 'image',
    type: 'url',
    placeholder: 'Avatar image',
    errorMessage: 'Input correct url',
    id: `${nanoid()}`,
    responseError: null,
    rules: {
      required: true,
      validate: {
        url: (data) =>
          data.match(
            /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/i
          ),
        dataUrl: (data) =>
          data.match(
            /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
          ),
      },
    },
  },
];
