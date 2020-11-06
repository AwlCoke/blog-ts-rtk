/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import styles from './article-list.module.scss';
import ErrorBoundary from '../../../error-boundary';
import Spinner from '../../../spinner';
import { StateModel } from '../../../../types/models/state.model';
import { ArticleModel } from '../../../../types/models/article.model';
import Article from '../../../article';

interface Props {
  articles: ArticleModel[];
  loading: boolean;
}

const ArticleList: FC<Props> = ({ articles, loading }: Props) => {
  const elements =
    !loading &&
    articles.map((article) => {
      const { ...props } = article;
      return <Article key={article.slug} mode="short" {...props} />;
    });

  if (loading) return <Spinner />;

  return (
    <ErrorBoundary>
        <div className={styles.list}>
            <List>{elements}</List>
        </div>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    articleList: { articles, loading },
  } = state;
  return { articles, loading };
};

export default connect(mapStateToProps)(ArticleList);
