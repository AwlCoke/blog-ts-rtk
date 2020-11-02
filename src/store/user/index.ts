/* eslint-disable no-param-reassign */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserStateModel} from "../../types/models/user-state.model";
import {UserModel} from "../../types/models/user.model";
import {Dispatch} from "../store";
import {getCurrentUser} from "../../service/production-ready-service";

const initialState: UserStateModel = {
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

const index = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: UserStateModel) => {
            state.isLogin = true;
            return state;
        },
        logout: (state: UserStateModel) => {
            state.isLogin = false;
            return state;
        },
        setCurrentUser: (state: UserStateModel, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
            return state;
        },
        updateCurrentUser: (state: UserStateModel, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
            return state;
        },
    },
});

export default index.reducer;

export const { login, logout, setCurrentUser, updateCurrentUser } = index.actions;

export  const fetchUser = () => async (dispatch: Dispatch ) => {
    try {
        const user = await getCurrentUser().then(data => data);
        dispatch(setCurrentUser(user));
        dispatch(login());
    }  catch (error) {
        throw new Error(error);
    }
};