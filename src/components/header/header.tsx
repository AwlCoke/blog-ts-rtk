import React, { FC } from "react";
import { Link } from 'react-router-dom';
import classNames from "classnames";
import styles from './header.module.scss';

const successBtn = classNames(styles.btn, styles['btn--success']);
const mainBtn = classNames(styles.btn, styles['btn--main']);

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={mainBtn}>
                Realworld Blog
            </Link>
            <div>
                <Link to="/new-article" className={successBtn} >
                    Create Article
                </Link>
                <Link to="/profile" className={mainBtn} >
                    username
                </Link>
                <Link to="/sign-in" className={mainBtn}>
                    Sign in
                </Link>
                <Link to="/sign-up" className={mainBtn}>
                    Sign up
                </Link>
                <button type="button" className={mainBtn} onClick={() => console.log('hello')}>
                    Log Out
                </button>
            </div>
        </header>
    )
};

export default Header;