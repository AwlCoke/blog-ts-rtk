/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserModel } from '../types/models/user.model';
import { ArticleModel } from '../types/models/article.model';
import { CreateArticleType, UserLoginType, UserUpdateType } from '../types/requests-types';

type BodyRequest = {
  method: string;
  body?: string;
  headers: { Authorization: string; 'Content-Type': string } | { 'Content-Type': string };
};

const apiBase = 'https://conduit.productionready.io/api';

export const getToken: () => string | null = () => {
  return sessionStorage.getItem('token');
};

const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

const sendAuthRequest = async (uri: string, body: BodyRequest) => {
  const response = await fetch(`${apiBase}${uri}`, body);
  return response;
};

const sendUnauthRequest = async (uri: string) => {
  const response = await fetch(`${apiBase}${uri}`);
  if (!response.ok) throw new Error();
  return response;
};

export const requests = {
  get: async (uri: string) => {
    return sendUnauthRequest(uri).then((data) => data.json());
  },
  getAuth: async (uri: string) => {
    return sendAuthRequest(uri, {
      method: requestMethod.get,
      headers: { Authorization: `Token ${getToken()}`, 'Content-Type': 'application/json' },
    }).then((data) => data.json());
  },
  post: async (uri: string) => {
    return sendAuthRequest(uri, {
      method: requestMethod.post,
      headers: { Authorization: `Token ${getToken()}`, 'Content-Type': 'application/json' },
    });
  },
  postWithDataUnAuth: async (
    uri: string,
    body: UserModel | ArticleModel | CreateArticleType | UserUpdateType | UserLoginType
  ) => {
    return sendAuthRequest(uri, {
      method: requestMethod.post,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  postWithData: async (
    uri: string,
    body: UserModel | ArticleModel | CreateArticleType | UserUpdateType | UserLoginType
  ) => {
    return sendAuthRequest(uri, {
      method: requestMethod.post,
      body: JSON.stringify(body),
      headers: { Authorization: `Token ${getToken()}`, 'Content-Type': 'application/json' },
    });
  },
  put: async (uri: string, body: ArticleModel | UserModel | UserUpdateType | CreateArticleType) => {
    return sendAuthRequest(uri, {
      method: requestMethod.put,
      body: JSON.stringify(body),
      headers: { Authorization: `Token ${getToken()}`, 'Content-Type': 'application/json' },
    });
  },
  delete: async (uri: string) => {
    return sendAuthRequest(uri, {
      method: requestMethod.delete,
      headers: { Authorization: `Token ${getToken()}`, 'Content-Type': 'application/json' },
    });
  },
};
