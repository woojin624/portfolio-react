import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';

import styles from './AdminList.module.scss';

const AdminList = ({ loadingProjects, originProjectsList }) => {
  const history = useHistory();

  const [projectsList, setProjectsList] = useState(originProjectsList);

  const [deleteProject, setDeleteProject] = useState({
    status: false,
    title: '',
    _id: '',
  });

  // 삭제버튼 클릭 시 워크 삭제
  const onDeleteWork = (e) => {
    e.preventDefault();
    let workId = e.target.dataset.id;
    let workTitle = e.target.dataset.name;

    setDeleteProject({
      status: true,
      title: workTitle,
      _id: workId,
    });
  };

  const onDeleteConfirm = () => {
    axios
      //DELETE 요청의 두 번째 인자에 data: {} atrribute를 넣어주면 된다.
      .delete(`/api/projects/delete/${deleteProject._id}`, {
        data: { _id: deleteProject._id },
      })
      .then((response) => {
        console.log(response.data);
        loadingProjects();
      });
  };

  const onDeleteCancel = () => {
    setDeleteProject({
      status: false,
      title: '',
      _id: '',
    });
  };

  const onEditWork = (e) => {
    e.preventDefault();
    let workId = e.target.dataset.id;
    history.push(`/admin/edit/${workId}`);
  };

  // 글번호 오름차순 정렬
  const handleNumberSortUp = () => {
    let tempArr = [...projectsList];
    tempArr.sort(function (a, b) {
      return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
    });
    setProjectsList(tempArr);
  };
  // 글번호 내림차순 정렬
  const handleNumberSortDown = () => {
    let tempArr = [...projectsList];
    tempArr.sort(function (a, b) {
      return a._id > b._id ? -1 : a._id < b._id ? 1 : 0;
    });
    setProjectsList(tempArr);
  };
  // 카테고리 오름차순 정렬
  // const handleCategorySortUp = () => {
  //   let tempArr = [...projectsList];
  //   tempArr.sort(function (a, b) {
  //     let x = a.category.toLowerCase();
  //     let y = b.category.toLowerCase();
  //     if (x < y) {
  //       return -1;
  //     }
  //     if (x > y) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   setProjectsList(tempArr);
  // };
  // // 카테고리 내림차순 정렬
  // const handleCategorySortDown = () => {
  //   let tempArr = [...projectsList];
  //   tempArr.sort(function (a, b) {
  //     let x = a.category.name[0].toLowerCase();
  //     let y = b.category.name[0].toLowerCase();
  //     if (x < y) {
  //       return 1;
  //     }
  //     if (x > y) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //   setProjectsList(tempArr);
  // };

  var tStyle = { color: 'blue' };

  return (
    <div className={styles.adminList}>
      <table border='1px'>
        <thead>
          <tr style={tStyle}>
            <th>
              <div className='sort-flex'>
                <span>글번호</span>
                <div className='sort-arrow'>
                  <div className='arrow-up' onClick={handleNumberSortUp}></div>
                  <div className='arrow-down' onClick={handleNumberSortDown}></div>
                </div>
              </div>
            </th>
            <th>제목</th>
            <th>공개여부</th>
            <th>내용</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {projectsList.map((element, i) => {
            return (
              <tr key={i} className={i % 2 === 1 ? styles.odd : styles.even}>
                <td>{element.number}</td>
                <td>{element.title}</td>
                <td>{element.visible ? '공개' : '비공개'}</td>
                <td>{element.subTitle}</td>
                <td>
                  <button className={styles.editBtn} data-id={element._id} onClick={onEditWork}>
                    수정
                  </button>
                </td>
                <td>
                  <button className={styles.deleteBtn} data-id={element._id} data-name={element.title} onClick={onDeleteWork}>
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

        {deleteProject.status ? (
          <div className={styles.deleteAlertModal}>
            <article>
              <p>{deleteProject.title} 프로젝트를 삭제하시겠습니까?</p>
              <div className={styles.btnWrap}>
                <button onClick={onDeleteConfirm}>삭제</button>
                <button onClick={onDeleteCancel}>취소</button>
              </div>
            </article>
          </div>
        ) : null}
      </table>
    </div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    originProjectsList: projects.projects,
  };
};

const mapDispatchToProps = {
  loadingProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
