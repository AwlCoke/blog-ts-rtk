import { UserModel } from './user.model';

export interface UserStateModel {
  isLogin: boolean;
  user: UserModel;
}
