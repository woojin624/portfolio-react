import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';
import { Table } from 'react-bootstrap';

const AdminList = ({ loadingProjects }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/projects/list')
      .then((res) => {
        setProjectsList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 삭제버튼 클릭 시 워크 삭제
  const onDeleteWork = (e) => {
    let workId = e.target.dataset.id;
    axios
      //DELETE 요청의 두 번째 인자에 data: {} atrribute를 넣어주면 된다.
      .delete(`/api/projects/delete/${workId}`, {
        data: { _id: workId },
      })
      .then((response) => {
        console.log(response.data);
        loadingProjects();
      });
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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Table responsive>
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
            <th>내용</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {projectsList.map((element, i) => {
            return (
              <tr key={i}>
                <td>{element._id}</td>
                <td>{element.title}</td>
                <td>{element.desc}</td>
                <td>
                  <button data-id={element._id} onClick={onDeleteWork}>
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  loadingProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
