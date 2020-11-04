import React, { FC } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { ArticleModel } from '../../../types/models/article.model';
import { StateModel } from '../../../types/models/state.model';
import ErrorBoundary from '../../error-boundary';
import Article from '../../article/article';
import { fetchArticle } from '../../../store/article-list';
import { Dispatch } from '../../../store/store';
import Spinner from '../../spinner';

interface Props extends RouteComponentProps {
  article: ArticleModel;
  getArticle: (slug: string) => void;
}

const BlogArticlePage: FC<Props> = ({ article, match, getArticle }: Props) => {
  const { ...props } = article;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug } = match.params;
  if (!article.slug) {
    getArticle(slug);
    return <Spinner />;
  }

  return (
    <ErrorBoundary>
      <List>
        <Article mode="full" {...props} />
      </List>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    articleList: { article },
  } = state;
  return { article };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getArticle: (slug: string) => dispatch(fetchArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticlePage);
