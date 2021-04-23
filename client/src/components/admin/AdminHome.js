import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function AdminHome(props) {
  const onLogoutHandler = () => {
    axios.get('api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
        window.location.reload();
      } else {
        alert('로그아웃 하는데 실패하였습니다');
      }
    });
  };

  return (
    <div>
      Admin Page
      <button onClick={onLogoutHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(AdminHome);
