export type CreateArticleType = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};

export type UserLoginType = {
  user: {
    email: string;
    password: string;
  };
};

export type UserUpdateType = {
  email: string;
  username: string;
  password?: string;
  image?: string;
};

export type RegisterUserType = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};
