import React, { FC } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button, Result } from 'antd';
import Header from '../header';
import styles from './app.module.scss';
import HomePage from '../pages/home-page';
import { LoginPage, ProfilePage, RegisterPage } from '../pages/user-form-pages';
import BlogArticlePage from '../pages/blog-article-page/blog-article-page';
import { CreateArticlePage, EditArticlePage } from '../pages/article-form-pages';

const App: FC = () => {
  const history = useHistory();
  return (
    <main role="main" className={styles.container}>
      <Header />
      <Switch>
        <Route path={['/', '/articles']} component={HomePage} exact />
        <Route path="/articles/:slug" component={BlogArticlePage} exact />
        <Route path="/articles/:slug/edit" component={EditArticlePage} />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/sign-up" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/new-article" component={CreateArticlePage} />
        <Route
          render={() => (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button type="primary" onClick={() => history.push('/')}>
                  Back Home Page
                </Button>
              }
            />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
