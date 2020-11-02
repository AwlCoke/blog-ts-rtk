import React, { FC } from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Header from "../header";
import styles from "./app.module.scss";
import HomePage from "../pages/home-page";

const App: FC = () => {
  return (
    <main role='main' className={styles.container}>
        <Header />
        <Switch>
            <Route path={['/', '/articles']} component={HomePage} />
            <Redirect to='/' />
        </Switch>
    </main>
  );
};

export default App;
