/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateModel } from '../../types/models/user-state.model';
import { UserModel } from '../../types/models/user.model';
import { Dispatch, Thunk } from '../store';
import { getCurrentUser } from '../../service/production-ready-service';
import { initialUserState } from '../config';
import { ProfileForm } from '../../types/forms';

const initialState: UserStateModel = initialUserState;

const index = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: UserStateModel, action: PayloadAction<UserModel>) => {
      state.isLogin = true;
      state.user = action.payload;
      return state;
    },
    logout: (state: UserStateModel) => {
      state.isLogin = false;
      state.user = initialState.user;
      return state;
    },
    setCurrentUser: (state: UserStateModel, action: PayloadAction<UserModel>) => {
      state.user = { ...Object.entries(state.user)[0][1], ...Object.entries(action.payload)[0][1] };
      return state;
    },
    updateCurrentUser: (state: UserStateModel, action: PayloadAction<ProfileForm>) => {
      state.user = { ...Object.entries(state.user)[0][1], ...action.payload };
      return state;
    },
  },
});

export default index.reducer;

export const { login, logout, setCurrentUser, updateCurrentUser } = index.actions;

export const fetchUser = (): Thunk => async (dispatch: Dispatch) => {
  const user = await getCurrentUser();
  dispatch(login(user));
  dispatch(setCurrentUser(user));
};
