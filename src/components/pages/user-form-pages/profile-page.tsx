import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorResponse, ProfileForm } from '../../../types/forms';
import { StateModel } from '../../../types/models/state.model';
import { UserModel } from '../../../types/models/user.model';
import styles from '../../forms/user-form/user-form.module.scss';
import { ProfileFormProps } from '../../forms/user-form/config';
import UserForm from '../../forms/user-form/user-form';
import { Dispatch } from '../../../store/store';
import { updateCurrentUser } from '../../../store/user';
import { updateUser } from '../../../service/production-ready-service';
import { fetchArticles } from '../../../store/article-list';
import Spinner from '../../spinner';

interface Props {
  isLogin: boolean;
  user: UserModel;
  loading: boolean;
  updateProfile: (user: ProfileForm) => void;
  getArticles: () => void;
}

const ProfilePage: FC<Props> = ({ isLogin, user, loading, updateProfile, getArticles }: Props) => {
  const { register, handleSubmit, errors } = useForm<ProfileForm>();
  const [isResponseError, setResponseError] = useState(false);
  const [responseErrorObj, setResponseErrorObj] = useState<ErrorResponse>({});
  const [responseMessage, setResponseMessage] = useState(false);
  const history = useHistory();

  const onSubmit = ({ email, image, password, username }: ProfileForm) => {
    let currentUser = { email, username };
    if (password) {
      currentUser = Object.assign(currentUser, { password });
    }
    if (image) {
      currentUser = Object.assign(currentUser, { image });
    }
    try {
      updateUser(currentUser).then((response: any) => {
        if (response.ok) {
          setResponseMessage(true);
          updateProfile(currentUser);
          getArticles();
          history.push('/');
        } else {
          response.json().then((data: any) => setResponseErrorObj(data.errors));
          setResponseError(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const responseErrors = Object.entries(responseErrorObj).map((el) => `${el[0]} ${el[1]}`);

  const profileFormContent = ProfileFormProps.map((field) => {
    const { rules, ...props } = field;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultValue = user[field.name];
    const invalidProps = { ...props, errors, defaultValue };
    return <UserForm key={`${field.name}_${props.id}`} {...invalidProps} ref={register(rules)} />;
  });

  if (!isLogin) history.push('/sign-in');

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.header}>Edit Profile</h1>
        {responseMessage && <p className={styles['message--success']}>Your profile was successfully updated!</p>}
        {isResponseError &&
          responseErrors.map((el) => (
            <p key={el} className={styles['message--error']}>
              {el}
            </p>
          ))}
        {profileFormContent}
        <input className={styles.submit} style={{ marginBottom: 40 }} type="submit" value="Save" />
      </form>
    </>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { isLogin, user },
    articleList: { loading },
  } = state;
  return { isLogin, user, loading };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProfile: (user: ProfileForm) => dispatch(updateCurrentUser(user)),
    getArticles: () => dispatch(fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
