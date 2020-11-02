import { ArticleListModel } from './article-list.model';
import { UserStateModel } from './user-state.model';

export interface StateModel {
  articleList: ArticleListModel;
  userState: UserStateModel;
}
