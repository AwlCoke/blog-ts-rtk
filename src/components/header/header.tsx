import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './header.module.scss';
import { StateModel } from '../../types/models/state.model';
import { Dispatch } from '../../store/store';
import { fetchArticles } from '../../store/article-list';
import { logout } from '../../store/user';
import { UserModel } from '../../types/models/user.model';

interface Props {
  user: UserModel;
  isLogin: boolean;
  logOut: () => void;
  getArticles: () => void;
}

const Header: FC<Props> = ({ user, isLogin, logOut, getArticles }: Props) => {
  const itemStyles = {
    mainBtn: classNames(styles.main),
    loginBtn: classNames(styles.login, { [styles.hide]: isLogin }),
    logoutBtn: classNames(styles.logout, { [styles.hide]: !isLogin }),
    registerBtn: classNames(styles.register, styles.success, { [styles.hide]: isLogin }),
    newArticleBtn: classNames(styles.success, { [styles.hide]: !isLogin }),
    profileBtn: classNames(styles.profile, { [styles.hide]: !isLogin }),
  };

  const { username, image } = user;

  const onLogOut = () => {
    logOut();
    sessionStorage.removeItem('token');
    getArticles();
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={itemStyles.mainBtn}>
        <button type="button" onClick={() => getArticles()}>
          Realworld Blog
        </button>
      </Link>
      <div>
        <Link to="/new-article" className={itemStyles.newArticleBtn}>
          Create Article
        </Link>
        <Link to="/profile" className={itemStyles.profileBtn}>
          <span style={{ marginRight: 5 }}>{username}</span>
          {image ? (
            <Avatar src={image} alt="avatar image" style={{ width: 46, height: 46 }} />
          ) : (
            <Avatar icon={<UserOutlined />} alt="avatar" style={{ width: 46, height: 46 }} />
          )}
        </Link>
        <Link to="/sign-in" className={itemStyles.loginBtn}>
          Sign in
        </Link>
        <Link to="/sign-up" className={itemStyles.registerBtn}>
          Sign up
        </Link>
        <button type="button" className={itemStyles.logoutBtn} onClick={() => onLogOut()}>
          Log Out
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { isLogin, user },
  } = state;
  return { isLogin, user };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logOut: () => dispatch(logout()),
    getArticles: () => dispatch(fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
