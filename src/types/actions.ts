import { ArticleModel } from './models/article.model';
import { UserModel } from './models/user.model';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const SET_FAVORITED_ARTICLE = 'SET_FAVORITED_ARTICLE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface ArticlesRequested {
  type: typeof FETCH_ARTICLES_REQUEST;
}

interface ArticlesLoaded {
  type: typeof FETCH_ARTICLES_SUCCESS;
  payload: {
    articles: ArticleModel[];
    articlesCount: number;
  };
}

interface ArticlesError {
  type: typeof FETCH_ARTICLES_FAILURE;
  payload: Error | null;
}

interface SetCurrentArticle {
  type: typeof SET_CURRENT_ARTICLE;
  payload: ArticleModel;
}

interface SetFavoritedArticle {
  type: typeof SET_FAVORITED_ARTICLE;
  payload: string;
}

interface SetPage {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
}

interface Login {
  type: typeof LOGIN;
}

interface Logout {
  type: typeof LOGOUT;
}

interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: UserModel;
}

interface UpdateCurrentUser {
  type: typeof UPDATE_CURRENT_USER;
  payload: UserModel;
}

export type FetchArticlesActionType =
  | ArticlesRequested
  | ArticlesLoaded
  | ArticlesError
  | SetCurrentArticle
  | SetFavoritedArticle
  | SetPage;
export type FetchUserActionType = Login | Logout | SetCurrentUser | UpdateCurrentUser;
