import {combineReducers, configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import articleListReducer, {fetchArticles} from "./article-list";
import userReducer, { fetchUser } from './user';

const rootReducer = combineReducers({
    articleList: articleListReducer,
    userState: userReducer,
});

const store = configureStore({
    reducer: rootReducer
});

const token = sessionStorage.getItem('token');
if (token) {
    store.dispatch(fetchUser());
}

store.dispatch(fetchArticles());

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store;