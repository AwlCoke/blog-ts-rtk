import React, { FC } from 'react';
import { connect } from 'react-redux';
import { StateModel } from '../../../types/models/state.model';
import { ArticleFormProps } from '../../forms/article-form/config';
import { ArticleType } from '../../../types/forms';

interface Props {
  isLogin: boolean;
}

const CreateArticlePage: FC<ArticleType & Props> = ({ isLogin }) => {
  const createArticleFormContent = ArticleFormProps.map((field) => {
    return <div>{field}</div>;
  });

  return (
    <form>
      <h1>Create New Article</h1>
      <input type="submit" />
    </form>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { isLogin },
  } = state;
  return { isLogin };
};

export default connect(mapStateToProps)(CreateArticlePage);
