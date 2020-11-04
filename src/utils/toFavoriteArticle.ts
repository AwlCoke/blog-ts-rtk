import { ArticleModel } from '../types/models/article.model';

export const updateArticle = (article: ArticleModel) => {
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

export const setFavoritedArticle = (articles: ArticleModel[], slug: string) => {
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
