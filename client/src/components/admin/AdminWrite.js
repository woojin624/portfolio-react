import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';

import styles from './AdminWrite.module.css';

const AdminWrite = ({ loadingProjects }) => {
  const [projectContent, setProjectContetns] = useState({
    thumbImg: null,
    thumbImgName: '',
    mainImg: null,
    mainImgName: '',
    subImg: '',
    subImgName: '',
    title: '',
    subTitle: '',
    period: '',
    content: '',
    desc: '',
    tag: '',
    people: '',
    workRange: '',
  });

  const { thumbImg, mainImg, thumbImgName, mainImgName, title, subTitle, period, subImg, subImgName, content, desc, tag, people, workRange } = projectContent;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPost().then((response) => {
      console.log(response.data);
      // loadingProjects();
    });
    alert('등록 완료!');
  };

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setProjectContetns({
      ...projectContent,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    setProjectContetns({
      ...projectContent,
      [name]: files[0],
      [name + 'Name']: value,
    });
    console.log(name);
    console.log(value);
    console.log(files[0]);
  };

  useEffect(() => {
    console.log(projectContent);
  }, [projectContent]);

  const addPost = () => {
    const url = '/api/projects/add';
    const formData = new FormData();

    formData.append(`${title}&thumbImg`, thumbImg);
    formData.append(`${title}&mainImg`, mainImg);
    formData.append(`${title}&subImg`, subImg);
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('period', period);
    formData.append('content', content);
    formData.append('desc', desc);
    formData.append('tag', tag);
    formData.append('people', people);
    formData.append('workRange', workRange);

    const config = {
      header: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  };

  return (
    <div className={styles.AdminWrite}>
      <h1 className={styles.pageTitle}>프로젝트 글 작성</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='thumb'>썸네일</label>
        {/* <input className={styles.thumbInput} type='text' value={thumb} name='thumb' onChange={getValue} placeholder='썸네일' id='thumb' /> */}
        <input className={styles.thumbInput} type='file' value={thumbImgName} file={thumbImg} name='thumbImg' onChange={handleFileChange} placeholder='썸네일이미지파일' id='thumbImg' />

        <label htmlFor='mainImg'>메인 이미지</label>
        {/* <input className={styles.mainImageInput} type='text' value={mainImg} name='mainImg' onChange={getValue} placeholder='메인이미지' id='mainImg' /> */}
        <input className={styles.mainImageInput} type='file' value={mainImgName} file={mainImg} name='mainImg' onChange={handleFileChange} placeholder='메인이미지파일' id='mainImg' />

        <section className={styles.mainInfo}>
          <article>
            <input className={styles.titleInput} type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트 제목' id='title' />

            <input className={styles.subTitleInput} type='text' value={subTitle} name='subTitle' onChange={getValue} placeholder='프로젝트 부제목' id='subTitle' />

            <input className={styles.periodInput} type='text' value={period} name='period' onChange={getValue} placeholder='프로젝트 기간 ex) 2021. 01 ~ 2021. 03' id='period' />
          </article>
          <article>
            <input className={styles.descInput} type='text' value={desc} name='desc' onChange={getValue} placeholder='프로젝트 설명' id='desc' />
          </article>
        </section>

        <label htmlFor='subImg'>서브 이미지</label>
        {/* <input className={styles.subImageInput} type='text' value={subImg} name='subImg' onChange={getValue} placeholder='서브 이미지' id='subImg' /> */}
        <input className={styles.subImageInput} type='file' value={subImgName} file={subImg} name='subImg' onChange={handleFileChange} placeholder='서브이미지파일' id='subImg' />

        <section className={styles.summary}>
          <article>
            <h1 className={styles.summaryTitle}>프로젝트 개요</h1>
          </article>
          <article>
            <label htmlFor='tag'>기술스택</label>
            <input className={styles.skillSetInput} type='text' value={tag} name='tag' onChange={getValue} placeholder='ex) React Js&&Node Js&&Express (단어 사이에 && 입력)' id='tag' />
            <label htmlFor='people'>참여인원</label>
            <input className={styles.peopleInput} type='text' value={people} name='people' onChange={getValue} placeholder='ex) 2' id='people' />
            <label htmlFor='workRange'>내 업무범위</label>
            <input className={styles.rangeInput} type='text' value={workRange} name='workRange' onChange={getValue} placeholder='ex) 디자인 - 50%&&프론트엔드 - 100%&&(단어 사이에 && 입력)' id='workRange' />
          </article>
        </section>

        <label htmlFor='content'>content</label>
        <input type='text' value={content} name='content' onChange={getValue} placeholder='프로젝트내용' id='content' />

        <button type='submit'>등록</button>
      </form>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  loadingProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminWrite);
