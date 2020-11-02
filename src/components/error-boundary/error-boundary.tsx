/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component, ReactNode } from 'react';
import ErrorIndicator from '../error-indicator';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) return <ErrorIndicator />;
    return children;
  }
}
