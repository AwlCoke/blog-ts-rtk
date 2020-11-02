import { ArticleModel } from './article.model';

export interface ArticleListModel {
  articles: ArticleModel[];
  articlesCount: number;
  currentPage: number;
  loading: boolean;
  error: null | Error;
  article: ArticleModel;
}
