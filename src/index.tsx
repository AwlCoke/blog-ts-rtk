import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/error-boundary';
import App from './components/app/app';
import store from './store/store';
import './assets/style/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
