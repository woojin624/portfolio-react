import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './SideBar.module.css';

import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineFileAdd } from 'react-icons/ai';

const Sidebar = ({ location, history }) => {
  const [isSideOpen, setIsSideOpen] = useState(true);

  const sideToggleHandler = () => {
    setIsSideOpen(!isSideOpen);
  };

  const [menuList, setMenuList] = useState([
    { name: 'Home', icon: <AiOutlineHome />, link: '/admin', cls: location.pathname === '/admin' ? styles.selected : '' },
    { name: 'Write', icon: <AiOutlineFileAdd />, link: '/admin/write', cls: location.pathname === '/admin/write' ? styles.selected : '' },
    { name: 'List', icon: <AiOutlineUnorderedList />, link: '/admin/list', cls: location.pathname === '/admin/list' ? styles.selected : '' },
  ]);

  const onClickMenu = (e) => {
    let menuId = e.target.dataset.id;
    let arr = [...menuList];
    arr.map((menu) => (menu.cls = ''));
    arr[menuId].cls = styles.selected;
    setMenuList(arr);
  };

  const onLogoutHandler = () => {
    axios.get('api/users/logout').then((response) => {
      if (response.data.success) {
        history.push('/login');
        window.location.reload();
      } else {
        alert('로그아웃 하는데 실패하였습니다');
      }
    });
  };

  return (
    <>
      <div className={isSideOpen ? styles.sidebarBack : `${styles.sidebarBack} ${styles.sideClose}`}></div>
      <div className={isSideOpen ? styles.sidebar : `${styles.sidebar} ${styles.sideClose}`}>
        <div className={isSideOpen ? `${styles.sideToggleBtn} ${styles.opened}` : styles.sideToggleBtn} onClick={sideToggleHandler}>
          <div className={styles.sideToggleTop}></div>
          <div className={styles.sideToggleBottom}></div>
        </div>
        <section className={styles.profile}>
          <figure>
            <img src='/images/profile-img.png' alt='profile' />
          </figure>
          <h2>
            Hello, <span>Woojin</span>
          </h2>
        </section>
        <section className={styles.menu}>
          <ul className={styles.menuList}>
            {menuList.map((menu, i) => (
              <li className={menu.cls} key={i}>
                <Link to={menu.link} data-id={i} onClick={onClickMenu}>
                  <span>{menu.icon}</span> {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <button onClick={onLogoutHandler} className={styles.logoutBtn}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
