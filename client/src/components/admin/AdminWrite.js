import React, { useState } from 'react';
import axios from 'axios';

import styles from './AdminWrite.module.css';

const AdminWrite = () => {
  const [projectContent, setProjectContetns] = useState({
    title: '',
    subTitle: '',
    period: '',
    content: '',
    thumb: '',
    mainImg: '',
    subImg: '',
    desc: '',
    tag: '',
    people: '',
    workRange: '',
  });

  const { title, subTitle, period, mainImg, subImg, content, desc, thumb, tag, people, workRange } = projectContent;

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setProjectContetns({
      ...projectContent,
      [name]: value,
    });
  };

  const send = (e) => {
    e.preventDefault();

    axios
      .post('/api/projects/add', {
        title: projectContent.title,
        subTitle: projectContent.subTitle,
        period: projectContent.period,
        content: projectContent.content,
        thumb: projectContent.thumb,
        mainImg: projectContent.mainImg,
        subImg: projectContent.subImg,
        desc: projectContent.desc,
        tag: projectContent.tag,
        people: projectContent.people,
        workRange: projectContent.workRange,
      })
      .then((response) => {
        console.log(response.data);
      });
    alert('등록 완료!');
  };

  return (
    <div className={styles.AdminWrite}>
      <h1 className={styles.pageTitle}>프로젝트 글 작성</h1>
      <form>
        <label htmlFor='thumb'>thumb</label>
        <input type='text' value={thumb} name='thumb' onChange={getValue} placeholder='썸네일' id='thumb' />

        <label htmlFor='mainImg'>mainImg</label>
        <input type='text' value={mainImg} name='mainImg' onChange={getValue} placeholder='메인이미지' id='mainImg' />

        <section className={styles.mainInfo}>
          <article>
            <label htmlFor='title'>title</label>
            <input type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트 제목' id='title' />

            <label htmlFor='subTitle'>subTitle</label>
            <input type='text' value={subTitle} name='subTitle' onChange={getValue} placeholder='프로젝트 부제목' id='subTitle' />

            <label htmlFor='period'>period</label>
            <input type='text' value={period} name='period' onChange={getValue} placeholder='프로젝트 기간' id='period' />
          </article>
          <article>
            <label htmlFor='desc'>description</label>
            <input type='text' value={desc} name='desc' onChange={getValue} placeholder='프로젝트 설명' id='desc' />
          </article>
        </section>

        <label htmlFor='subImg'>subImg</label>
        <input type='text' value={subImg} name='subImg' onChange={getValue} placeholder='프로젝트내용' id='subImg' />

        <section className={styles.summary}>
          <article>
            <h1 className={styles.summaryTitle}>프로젝트 개요</h1>
          </article>
          <article>
            <label htmlFor='tag'>기술스택</label>
            <input type='text' value={tag} name='tag' onChange={getValue} placeholder='태그' id='tag' />
            <label htmlFor='people'>참여인원</label>
            <input type='text' value={people} name='people' onChange={getValue} placeholder='태그' id='people' />
            <label htmlFor='workRange'>내 업무범위</label>
            <input type='text' value={workRange} name='workRange' onChange={getValue} placeholder='태그' id='workRange' />
          </article>
        </section>

        <label htmlFor='content'>content</label>
        <input type='text' value={content} name='content' onChange={getValue} placeholder='프로젝트내용' id='content' />

        <button
          onClick={(e) => {
            send(e);
          }}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default AdminWrite;
