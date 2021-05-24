import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux';

import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

import styles from './LoginPage.module.css';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    console.log(body);
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/admin');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>J.com Admin</h1>
      <div className={styles.formWrap}>
        <figure className={styles.imgWrap}>
          <img src='/images/login.png' alt='login' />
        </figure>
        <div className={styles.formLine}></div>
        <form className={styles.loginForm} onSubmit={onSubmitHandler}>
          <p className={styles.formCopy}>Login as a Admin User</p>
          <div className={styles.formCopyLine}></div>
          <div className={styles.inputWrap}>
            <AiOutlineUser className={styles.loginIcon} />
            <input type='email' value={Email} onChange={onEmailHandler} placeholder='admin@email.com'></input>
          </div>
          <div className={styles.inputWrap}>
            <AiOutlineLock className={styles.loginIcon} />
            <input type='password' value={Password} onChange={onPasswordHandler} placeholder='*********'></input>
          </div>
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
