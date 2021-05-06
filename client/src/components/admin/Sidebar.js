import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

const Sidebar = () => {
  const [isSideOpen, setIsSideOpen] = useState(true);

  const sideToggleHandler = () => {
    setIsSideOpen(!isSideOpen);
  };

  const [menuList, setMenuList] = useState([
    { name: 'Home', link: '/admin', class: '' },
    { name: 'Write', link: '/admin/write', class: '' },
    { name: 'List', link: '/admin/list', class: '' },
  ]);

  const onClickMenu = (e) => {
    let menuId = e.target.dataset.id;
    let arr = [...menuList];
    arr.map((menu) => (menu.class = ''));
    arr[menuId].class = styles.selected;
    setMenuList(arr);
  };

  return (
    <div className={isSideOpen ? styles.sidebar : `${styles.sidebar} ${styles.sideClose}`}>
      <div className={isSideOpen ? `${styles.sideToggleBtn} ${styles.opened}` : styles.sideToggleBtn} onClick={sideToggleHandler}>
        <div className={styles.sideToggleTop}></div>
        <div className={styles.sideToggleBottom}></div>
      </div>
      <section className={styles.profile}>
        <figure>
          <img src='/images/profile-img.png' alt='' />
        </figure>
        <h2>Hello, Woojin</h2>
      </section>
      <section className={styles.menu}>
        <ul className={styles.menuList}>
          {menuList.map((menu, i) => (
            <li className={menu.class} key={i}>
              <Link to={menu.link} data-id={i} onClick={onClickMenu}>
                {menu.name}
              </Link>
            </li>
          ))}
          {/* <li className={}>
            <Link to='/admin'>Home</Link>
          </li>
          <li>
            <Link to='/admin/write'>Write</Link>
          </li>
          <li>
            <Link to='/admin/list'>List</Link>
          </li> */}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;
