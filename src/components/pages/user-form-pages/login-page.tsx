import React, { FC, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { LoginForm } from '../../../types/forms';
import Spinner from '../../spinner';
import { StateModel } from '../../../types/models/state.model';
import { Dispatch } from '../../../store/store';
import { fetchUser } from '../../../store/user';
import { loginApi } from '../../../service/production-ready-service';
import { fetchArticles } from '../../../store/article-list';
import { UserStateModel } from '../../../types/models/user-state.model';
import { LoginFormProps } from '../../forms/user-form/config';
import UserForm from '../../forms/user-form/user-form';
import styles from '../../forms/user-form/user-form.module.scss';

interface Props {
  isLogin: boolean;
  loading: boolean;
  getUser: () => void;
  getArticles: () => void;
}

const LoginPage: FC<Props> = ({ isLogin, loading, getUser, getArticles }: Props) => {
  const { register, handleSubmit, reset, errors } = useForm<LoginForm>();
  const [responseError, setResponseError] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const history = useHistory();

  const onSubmit = (data: LoginForm) => {
    setResponseError(false);
    const { email, password } = data;
    const body = {
      user: { email, password },
    };
    try {
      loginApi(body).then((response: any) => {
        if (response.ok) {
          return response.json().then((json: UserStateModel) => {
            reset();
            sessionStorage.setItem('token', json.user.token);
            setResponseMessage(true);
            getUser();
            getArticles();
            history.push('/');
          });
        }
        return setResponseError(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginFormContent = LoginFormProps.map((field) => {
    const { rules, ...props } = field;
    const invalidProps = { ...props, errors };
    return <UserForm key={`${field.name}_${props.id}`} {...invalidProps} ref={register(rules)} />;
  });

  if (isLogin) {
    history.push('/');
  }

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.header}>Sign In</h1>
        {responseError && <p className={styles['message--error']}>Wrong password or email</p>}
        {responseMessage && <p className={styles['message--success']}>You successfully signed in!</p>}
        {loginFormContent}
        <input className={styles.submit} type="submit" />
        <div className={styles.message} style={{ alignSelf: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={styles.link}>
            Sign up
          </Link>
        </div>
      </form>
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
