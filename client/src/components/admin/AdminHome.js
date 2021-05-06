import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './AdminHome.module.css';

function AdminHome(props) {
  return (
    <div className={styles.adminHome}>
      <h1>어드민 페이지입니다.</h1>
      <p>Ver 1.0.0</p>
    </div>
  );
}

export default withRouter(AdminHome);
