import { FieldErrors, ValidationRules } from 'react-hook-form';

export type ErrorState = {
  hasError: boolean;
};

export type State = {
  user: User | null;
};

export type ArticleType = {
  [key: string]: any;
  full?: boolean;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: false;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: false;
  };
};

export type UserFormProps = {
  label?: string;
  name: string;
  value?: string;
  type: string;
  readOnly?: boolean;
  style?: {
    width?: string;
    minHeight?: string;
    maxHeight?: string;
  };
  id?: string;
  textarea?: boolean;
  defaultValue?: string;
  tagList?: string[];
  placeholder?: string;
  errors?: FieldErrors;
  errorMessage?: string;
  responseError?: string | null;
  rules?: ValidationRules;
};

export type UserFormValidProps = Omit<UserFormProps, 'errors'>;

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
};

export type LoginForm = {
  password: string;
  email: string;
};

export type ProfileForm = {
  username: string;
  email: string;
  password?: string;
  image?: string;
};

export type FormDataArticle = {
  title: string;
  description: string;
  body: string;
};

export type FormDataTags = {
  tag: string;
};

export type AuthenticationBody = {
  user: {
    email: string;
    password: string;
  };
};

export type ArticleFormBody = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
};

export type User = {
  [key: string]: any;
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ErrorResponse = {
  errors?: {
    email?: string[];
    username?: string[];
  };
};
