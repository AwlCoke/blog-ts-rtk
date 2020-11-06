import React, { FC, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Checkbox } from 'antd';
import { RegisterForm, ErrorResponse } from '../../../types/forms';
import { registerNewUser } from '../../../service/production-ready-service';
import { StateModel } from '../../../types/models/state.model';
import Spinner from '../../spinner';
import styles from '../../forms/user-form/user-form.module.scss';
import { RegisterFormProps } from '../../forms/user-form/config';
import UserForm from '../../forms/user-form/user-form';
import { Dispatch } from '../../../store/store';
import { fetchUser } from '../../../store/user';
import { fetchArticles } from '../../../store/article-list';

interface Props {
  loading: boolean;
  getUser: () => void;
  getArticles: () => void;
}

const RegisterPage: FC<Props> = ({ loading, getUser, getArticles }: Props) => {
  const { register, handleSubmit, reset, errors, watch } = useForm<RegisterForm>();
  const [isResponseError, setResponseError] = useState(false);
  const [responseErrorObj, setResponseErrorObj] = useState<ErrorResponse>({});
  const [responseMessage, setResponseMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const history = useHistory();

  const onSubmit = ({ email, username, password }: RegisterForm) => {
    setResponseError(false);
    const body = { user: { username, email, password } };

    try {
      registerNewUser(body).then((response: any) => {
        if (response.ok) {
          response.json().then((json: any) => {
            sessionStorage.setItem('token', json.user.token);
            getUser();
          });
          setResponseMessage(true);
          reset();
          getArticles();
          history.push('/');
        } else {
          if (response.status === 422) {
            response.json().then((data: any) => setResponseErrorObj(data.errors));
          }
          reset();
          setResponseError(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const responseErrors = Object.entries(responseErrorObj).map((el) => `${el[0]} ${el[1]}`);

  const passwordValue = useRef({});
  passwordValue.current = watch('password', '');

  RegisterFormProps[3].rules = {
    ...RegisterFormProps[3].rules,
    validate: (value) => value === passwordValue.current || 'Passwords must match',
  };

  const registerFormContent = RegisterFormProps.map((field) => {
    const { rules, ...props } = field;
    const invalidProps = { ...props, errors };
    return <UserForm key={`${field.name}_${props.id}`} {...invalidProps} ref={register(rules)} />;
  });

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.header}>Create new account</h1>
        {isResponseError &&
          responseErrors.map((el) => (
            <p key={el} className={styles['message--error']}>
              {el}
            </p>
          ))}
        {responseMessage && <p className={styles['message--success']}>You successfully sign up!</p>}
        {registerFormContent}
        <Checkbox
          style={{ marginTop: 30, paddingTop: 30 }}
          className={styles.checkbox}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          defaultChecked
        >
          I agree to the processing of my personal information
        </Checkbox>
        <input className={styles.submit} type="submit" />
        <div className={styles.message}>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.link}>
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    articleList: { loading },
  } = state;
  return { loading };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUser: () => dispatch(fetchUser()),
    getArticles: () => dispatch(fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
