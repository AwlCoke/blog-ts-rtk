import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../header';
import styles from './app.module.scss';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page/login-page';

const App: FC = () => {
  return (
    <main role="main" className={styles.container}>
      <Header />
      <Switch>
        <Route path={['/', '/articles']} component={HomePage} exact />
        <Route path="/articles/:slug" exact />
        <Route path="/articles/:slug/edit" />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/sign-up" />
        <Route path="/profile" />
        <Route path="/new-article" />
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default App;
