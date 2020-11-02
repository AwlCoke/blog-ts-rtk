/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Avatar, List } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './article-list.module.scss';
import ErrorBoundary from '../../../error-boundary';
import Spinner from '../../../spinner';
import {StateModel} from "../../../../types/models/state.model";
import {Dispatch} from "../../../../store/store";
import { favoritedArticle, fetchArticle  } from "../../../../store/article-list";
import {ArticleModel} from "../../../../types/models/article.model";
import Article from "../article";

interface Props {
    articles: ArticleModel[];
    loading: boolean;
    isLogin: boolean;
    setFavoritedArticle: (slug: string) => void;
    setCurrentArticle: (slug: string) => void;
}

const ArticleList: FC<Props> = ({ articles, loading, isLogin, setFavoritedArticle, setCurrentArticle }: Props) => {

    const elements = articles.map((article) => <Article />)

    return (
        <>
            <h2>
                Blog List
            </h2>
            <div>
                {elements}
            </div>
        </>
    )
};

const mapStateToProps = (state: StateModel) => {
    const { articleList: { articles, loading }, userState: { isLogin } } = state;
    return { articles, loading, isLogin };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setFavoritedArticle: (slug: string) => dispatch(favoritedArticle),
        setCurrentArticle: (slug: string) => dispatch(fetchArticle(slug)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
