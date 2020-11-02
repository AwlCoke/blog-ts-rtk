import React, { FC, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import UserForm from '../../forms/user-form/user-form';
import { LoginFormProps } from '../../forms/user-form/config';
import { LoginForm } from '../../../types/forms';
import Spinner from '../../spinner';
import { StateModel } from '../../../types/models/state.model';
import { Dispatch } from '../../../store/store';
import { fetchUser, setCurrentUser } from '../../../store/user';
import { login } from '../../../service/production-ready-service';
import { fetchArticles } from '../../../store/article-list';

interface Props {
  isLogin: boolean;
  loading: boolean;
  getUser: () => void;
  getArticles: () => void;
}

const LoginPage: FC<Props> = ({ isLogin, loading, getUser, getArticles }: Props) => {
  const { register, handleSubmit, errors } = useForm<LoginForm>();
  const [responseError, setResponseError] = useState(false);
  const history = useHistory();

  const onSubmit = (data: LoginForm) => {
    setResponseError(false);
    const { email, password } = data;
    const body = {
      user: { email, password },
    };
    try {
      login(body).then((response) => {
        if (response.ok) {
          getUser();
          sessionStorage.setItem('token', response.user.token);
          getArticles();
          return history.push('/');
        }
        return setResponseError(true);
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  if (isLogin) {
    history.push('/');
  }

  const loginForm = LoginFormProps.map((input) => {
    const { rules, ...props } = input;
    const propsInvalidForm = { ...props, errors };
    return <UserForm name={input.name} type={input.type} placeholder={input.placeholder} ref={register(rules)} />;
  });
  return (
    <>
      {loading && <Spinner />}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2> Sign In </h2>
          {loginForm}
          {responseError && <span>Either email or password is wrong</span>}
          <button type="submit">Sign In</button>
          <span>
            Don`t have an account? <Link to="/sign-up">Sign Up</Link>
          </span>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { isLogin },
    articleList: { loading },
  } = state;
  return { isLogin, loading };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUser: () => dispatch(fetchUser()),
    getArticles: () => dispatch(fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
