import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateModel } from '../../../types/models/state.model';
import { ArticleType } from '../../../types/forms';
import ArticleForm from '../../forms/article-form';

interface Props {
  isLogin: boolean;
}

const CreateArticlePage: FC<ArticleType & Props> = ({ isLogin }) => {
  const history = useHistory();

  if (!isLogin) history.push('/sign-in');

  return (
    <>
      <ArticleForm mode="create" slug="" />
    </>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { isLogin },
  } = state;
  return { isLogin };
};

export default connect(mapStateToProps)(CreateArticlePage);
