// eslint-disable-next-line no-unused-vars
import { AuthorModel } from './author.model';

export interface ArticleModel {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorModel;
  favorited: boolean;
  tagList: string[];
  description: string;
  favoritesCount: number;
}
