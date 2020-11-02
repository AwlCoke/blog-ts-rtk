import { FieldErrors, ValidationRules } from 'react-hook-form';

export type InputProps = {
  label?: string;
  name: string;
  value?: string;
  type: string;
  id?: string;
  defaultValue?: string;
  tagList?: string;
  placeholder: string;
  errors?: FieldErrors;
  errorMessage?: string;
  rules?: ValidationRules;
};

export type InputValidatedProps = Omit<InputProps, 'errors'>;

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
