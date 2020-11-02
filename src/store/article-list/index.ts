/* eslint-disable no-shadow,no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleModel } from '../../types/models/article.model';
import { ArticleListModel } from '../../types/models/article-list.model';
import { Dispatch, Thunk } from '../store';
import { getArticle, getArticlesList } from '../../service/production-ready-service';

const updateArticle = (article: ArticleModel) => {
  if (Object.keys(article).length) {
    if (article.favorited) {
      return {
        ...article,
        favorited: !article.favorited,
        favoritesCount: article.favoritesCount - 1,
      };
    }
    return {
      ...article,
      favorited: !article.favorited,
      favoritesCount: article.favoritesCount + 1,
    };
  }
  return article;
};

const setFavoritedArticle = (articles: ArticleModel[], slug: string) => {
  let index;
  let updatedArticle = articles.filter((article, idx) => {
    if (article.slug === slug) {
      index = idx;
      return article;
    }
    return '';
  })[0];
  if (updatedArticle.favorited) {
    updatedArticle = { ...updatedArticle, favoritesCount: updatedArticle.favoritesCount - 1 };
  } else {
    updatedArticle = { ...updatedArticle, favoritesCount: updatedArticle.favoritesCount + 1 };
  }
  if (index !== undefined) {
    return [
      ...articles.slice(0, index),
      { ...updatedArticle, favorited: !updatedArticle.favorited },
      ...articles.slice(index + 1),
    ];
  }
  return articles;
};

const initialState: ArticleListModel = {
  articles: [
    {
      title: '',
      slug: '',
      createdAt: '',
      updatedAt: '',
      body: '',
      author: {
        username: '',
        bio: null,
        image: '',
        following: false,
      },
      favorited: false,
      tagList: [],
      description: '',
      favoritesCount: 0,
    },
  ],
  articlesCount: 1,
  currentPage: 1,
  loading: false,
  error: null,
  article: {
    title: '',
    slug: '',
    createdAt: '',
    updatedAt: '',
    body: '',
    author: {
      username: '',
      bio: null,
      image: '',
      following: false,
    },
    favorited: false,
    tagList: [],
    description: '',
    favoritesCount: 0,
  },
};

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
      updateArticle(article);
      return state;
    },
    setCurrentPage: (state: ArticleListModel, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      return state;
    },
    setCurrentArticle: (state: ArticleListModel, action: PayloadAction<ArticleModel>) => {
      state.article = action.payload;
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
  setCurrentPage,
} = index.actions;

export const fetchArticles = (page = 1): Thunk => async (dispatch: Dispatch) => {
  const offset = (page - 1) * 20;
  dispatch(articlesRequested());
  try {
    const response = await getArticlesList(offset).then((data) => data);
    return dispatch(articlesLoaded(response));
  } catch (error) {
    dispatch(articlesErrors(error));
  }
};

export const fetchArticle = (slug: string): Thunk => async (dispatch: Dispatch) => {
  try {
    const response = await getArticle(slug).then((data) => data);
    return dispatch(setCurrentArticle(response));
  } catch (error) {
    dispatch(articlesErrors(error));
  }
};
