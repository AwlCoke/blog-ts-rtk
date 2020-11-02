import { FieldErrors, ValidationRules } from 'react-hook-form';

export type UserFormProps = {
  label?: string;
  name: string;
  value?: string;
  type: string;
  id?: string;
  textarea?: string;
  defaultValue?: string;
  tagList?: string;
  placeholder: string;
  errors?: FieldErrors;
  errorMessage?: string;
  responseError?: string | null;
  rules?: ValidationRules;
};

export type ValidatedUserFormProps = Omit<UserFormProps, 'errors'>;

export type LoginForm = {
  email: string;
  password: string;
};

export type RegistrationForm = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type ProfileForm = {
  username: string;
  email: string;
  password: string;
  image: string;
};

export type ArticleForm = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};
