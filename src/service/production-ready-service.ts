import { getToken, requests } from '../utils/requests';
import { CreateArticleType, UserLoginType, UserUpdateType, RegisterUserType } from '../types/requests-types';

const articlesListURI = '/articles?offset=';
const articleURI = '/articles/';
const registerURI = '/users';
const loginURI = '/users/login';

export const getArticlesList: (a?: number) => Promise<any> = async (offset = 0) => {
  let response;
  const uri = `${articlesListURI}${offset}`;
  if (getToken()) {
    response = await requests.getAuth(uri);
  } else {
    response = await requests.get(uri);
  }
  return response;
};

export const getArticle: (a: string) => Promise<any> = async (slug: string) => {
  let response;
  const uri = `${articleURI}${slug}`;
  if (getToken()) {
    response = await requests.getAuth(uri);
  } else {
    response = await requests.get(uri);
  }
  return response;
};

export const createArticle: (a: any) => Promise<any> = (article: CreateArticleType) => {
  return requests.postWithData(`${articleURI}`, article);
};

export const deleteArticle: (a: string) => Promise<any> = (slug: string) => {
  return requests.delete(`${articleURI}${slug}`);
};

export const updateArticle: (a: string, b: any) => Promise<any> = (slug: string, article: CreateArticleType) => {
  return requests.put(`${articleURI}${slug}`, article);
};

export const favoriteArticle: (a: string) => Promise<any> = (slug: string) => {
  return requests.post(`${articleURI}${slug}/favorite`);
};

export const unfavoriteArticle: (a: string) => Promise<any> = (slug: string) => {
  return requests.delete(`${articleURI}${slug}/favorite`);
};

export const registerNewUser: (a: RegisterUserType) => Promise<any> = (user: RegisterUserType) => {
  return requests.postWithDataUnAuth(`${registerURI}`, user);
};

export const loginApi: (user: UserLoginType) => Promise<any> = (user: UserLoginType) => {
  return requests.postWithDataUnAuth(`${loginURI}`, user);
};

export const getCurrentUser: () => Promise<any> = () => {
  return requests.getAuth('/user');
};

export const updateUser: (a: UserUpdateType) => Promise<any> = (user: UserUpdateType) => {
  return requests.put('/user', user);
};
