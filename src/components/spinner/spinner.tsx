// eslint-disable-next-line no-unused-vars
import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <Spin className="spinner" size="large" />
    </div>
  );
};

export default Spinner;
