/* eslint-disable no-shadow,no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleModel } from '../../types/models/article.model';
import { ArticleListModel } from '../../types/models/article-list.model';
import { Dispatch, Thunk } from '../store';
import {favoriteArticle, getArticle, getArticlesList, unfavoriteArticle} from '../../service/production-ready-service';
import { updateArticle, setFavoritedArticle } from '../../utils/toFavoriteArticle';
import { initialArticleState } from '../config';

const initialState: ArticleListModel = initialArticleState;

const index = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    articlesRequested: (state: ArticleListModel) => {
      state.loading = true;
      return state;
    },
    articlesLoaded: (
      state: ArticleListModel,
      action: PayloadAction<{ articles: ArticleModel[]; articlesCount: number }>
    ) => {
      const { payload } = action;
      state.loading = false;
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      return state;
    },
    articlesErrors: (state: ArticleListModel, action: PayloadAction<Error>) => {
      const { payload } = action;
      state.loading = false;
      state.articles = [];
      state.error = payload;
      return state;
    },
    favoritedArticle: (state: ArticleListModel, action: PayloadAction<string>) => {
      const { article, articles } = state;
      setFavoritedArticle(articles, action.payload);
      if (article.slug === action.payload) updateArticle(article);
      return state;
    },
    setCurrentPage: (state: ArticleListModel, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      return state;
    },
    setCurrentArticle: (state: ArticleListModel, action: PayloadAction<ArticleModel>) => {
      state.article = { ...Object.entries(state.article)[0][1], ...action.payload };
      return state;
    },
    removeCurrentArticle: (state: ArticleListModel) => {
      state.article = initialState.article;
      return state;
    },
  },
});

export default index.reducer;

export const {
  articlesRequested,
  articlesLoaded,
  articlesErrors,
  favoritedArticle,
  setCurrentArticle,
  removeCurrentArticle,
  setCurrentPage,
} = index.actions;

export const fetchArticles = (page = 1): Thunk => async (dispatch: Dispatch) => {
  const offset = (page - 1) * 20;
  dispatch(articlesRequested());
  try {
    const response = await getArticlesList(offset).then((data) => data);
    dispatch(setCurrentPage(page));
    return dispatch(articlesLoaded(response));
  } catch (error) {
    return dispatch(articlesErrors(error));
  }
};

export const fetchArticle = (slug: string): Thunk => async (dispatch: Dispatch) => {
  try {
    const response = await getArticle(slug).then((data) => data);
    return dispatch(setCurrentArticle(response));
  } catch (error) {
    return dispatch(articlesErrors(error));
  }
};

export const toFavoritedArticle = (favorited: boolean, slug: string): Thunk => async (dispatch: Dispatch) => {
  try {
    if (favorited) {
      await unfavoriteArticle(slug).then((response) => {
        if (response.ok) {
          return dispatch(favoritedArticle(slug));
        }
      });
    }
    if (!favorited) {
      await favoriteArticle(slug).then((response) => {
        if (response.ok) {
          return dispatch(favoritedArticle(slug));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
