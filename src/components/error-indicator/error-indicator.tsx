import React, { FC } from 'react';
import { Alert } from 'antd';
import styles from './error-indicator.module.scss';

const ErrorIndicator: FC = () => {
  return (
    <div className={styles.container}>
      <Alert message="SOMETHING WENT WRONG!" description="But we are already working on it" type="warning" />
    </div>
  );
};

export default ErrorIndicator;
