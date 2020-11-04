import { ArticleListModel } from '../types/models/article-list.model';
import { UserStateModel } from '../types/models/user-state.model';

export const initialArticleState: ArticleListModel = {
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

export const initialUserState: UserStateModel = {
  isLogin: false,
  user: {
    id: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    username: '',
    bio: null,
    image: null,
    token: '',
  },
};
