import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';

import styles from './AdminHome.module.css';

import AdminWriteEditor from './AdminWriteEditor';
import TuiViewer from './TuiViewer';

function AdminHome({ user }) {
  const [memo, setMemo] = useState(user.memo);
  const [isEdit, setIsEdit] = useState(false);

  const onEditHandler = () => {
    setIsEdit(!isEdit);
  };

  const onConfirmHandler = () => {
    axios //
      .put('/api/users/editmemo', { memo: memo, _id: user._id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.adminHome}>
      <h1>어드민 페이지</h1>
      <div className={styles.memoWrap}>
        {isEdit ? (
          <button className={styles.memoBtn} onClick={onConfirmHandler}>
            <AiOutlineCheck /> 완료
          </button>
        ) : (
          <button className={styles.memoBtn} onClick={onEditHandler}>
            <AiFillEdit /> 수정
          </button>
        )}
        {isEdit ? ( //
          <AdminWriteEditor content={memo} setContent={setMemo} />
        ) : (
          <section className={styles.memoBoard}>
            <TuiViewer content={memo} />
          </section>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.userData,
  };
};

export default connect(mapStateToProps)(withRouter(AdminHome));
