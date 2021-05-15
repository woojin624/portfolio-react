import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import styles from './AdminWrite.module.css';
import AdminWriteEditor from './AdminWriteEditor';
import ColorTab from './ColorTab';

const AdminEdit = ({ match, projectsList, loadingProjects }) => {
  const id = match.params.id;

  useEffect(() => {
    const newArr = [...projectsList].filter((data) => data._id === parseInt(id))[0];

    setContent(newArr.content);
    setTag(newArr.tag);
    setWorkRange(newArr.workRange);
    console.log(newArr);

    setProjectContent({ ...projectContent, ...newArr, tagArr: newArr.tag.join(), workRangeArr: newArr.workRange.join() });
  }, []);

  const [projectContent, setProjectContent] = useState({
    number: '',
    thumbImg: null,
    thumbImgName: '',
    mainImg: null,
    mainImgName: '',
    subImg: '',
    subImgName: '',
    title: '',
    subTitle: '',
    period: '',
    siteLink: '',
    githubLink: '',
    desc: '',
    tagArr: '',
    people: '',
    workRangeArr: '',
  });

  const { number, thumbImg, mainImg, thumbImgName, mainImgName, title, subTitle, period, siteLink, githubLink, subImg, subImgName, desc, tagArr, people, workRangeArr } = projectContent;

  const [content, setContent] = useState();
  const [color, setColor] = useColor('hex', [...projectsList].filter((data) => data._id === parseInt(id))[0].color);
  const [tag, setTag] = useState([]);
  const [workRange, setWorkRange] = useState([]);

  useEffect(() => {
    const skills = tagArr.split(',');
    setTag(skills);
  }, [tagArr]);

  useEffect(() => {
    const ranges = workRangeArr.split(',');
    setWorkRange(ranges);
  }, [workRangeArr]);

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
    setProjectContent({
      ...projectContent,
      [name]: value,
    });
    console.log(projectContent);
  };

  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    setProjectContent({
      ...projectContent,
      [name]: files[0],
      [name + 'Name']: value,
    });
    console.log(name);
    console.log(value);
    console.log(files[0]);
  };

  const addPost = () => {
    const url = `/api/projects/editwork`;
    const formData = new FormData();

    formData.append(thumbImgName ? `${title}&thumbImg` : 'thumbImg', thumbImg);
    formData.append(mainImgName ? `${title}&mainImg` : 'mainImg', mainImg);
    formData.append(subImgName ? `${title}&subImg` : 'subImg', subImg);
    formData.append(`_id`, projectContent._id);
    formData.append(`number`, number);
    formData.append(`color`, color.hex);
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('period', period);
    formData.append('siteLink', siteLink);
    formData.append('githubLink', githubLink);
    formData.append('content', content);
    formData.append('desc', desc);
    tag.forEach((skill) => formData.append('tag[]', skill));
    formData.append('people', people);
    workRange.forEach((range) => formData.append('workRange[]', range));

    const config = {
      header: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.put(url, formData, config);
  };

  return (
    <div className={styles.AdminWrite}>
      <h1 className={styles.pageTitle}>프로젝트 글 작성</h1>
      <form onSubmit={handleFormSubmit}>
        <section className={styles.defaultInfo}>
          <article>
            <div>
              <label htmlFor='number'>프로젝트 넘버</label>
              <input className={styles.number} type='number' value={number} name='number' onChange={getValue} placeholder='프로젝트 넘버' id='number' />
            </div>
            <div className={styles.colorWrap}>
              <h3>메인 컬러</h3>
              <ColorTab color={color} setColor={setColor} />
            </div>
          </article>
          <label htmlFor='thumb'>썸네일</label>
          <input className={styles.thumbInput} type='file' value={thumbImgName} file={thumbImg} name='thumbImg' onChange={handleFileChange} placeholder='썸네일이미지파일' id='thumbImg' />
          <label htmlFor='mainImg'>메인 이미지</label>
          <input className={styles.mainImageInput} type='file' value={mainImgName} file={mainImg} name='mainImg' onChange={handleFileChange} placeholder='메인이미지파일' id='mainImg' />
        </section>

        <section className={styles.mainInfo}>
          <article>
            <input className={styles.titleInput} type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트 제목' id='title' />
            <input className={styles.subTitleInput} type='text' value={subTitle} name='subTitle' onChange={getValue} placeholder='프로젝트 부제목' id='subTitle' />
            <input className={styles.periodInput} type='text' value={period} name='period' onChange={getValue} placeholder='프로젝트 기간 ex) 2021. 01 ~ 2021. 03' id='period' />
            <input className={styles.siteLinkInput} type='text' value={siteLink} name='siteLink' onChange={getValue} placeholder='사이트 링크' id='siteLink' />
            <input className={styles.githubLinkInput} type='text' value={githubLink} name='githubLink' onChange={getValue} placeholder='깃허브 링크' id='githubLink' />
          </article>
          <article>
            <textarea className={styles.descInput} type='text' value={desc} name='desc' onChange={getValue} placeholder='프로젝트 설명' id='desc' />
          </article>
        </section>

        <label htmlFor='subImg'>서브 이미지</label>
        <input className={styles.subImageInput} type='file' value={subImgName} file={subImg} name='subImg' onChange={handleFileChange} placeholder='서브이미지파일' id='subImg' />

        <section className={styles.summary}>
          <article>
            <h1 className={styles.summaryTitle}>프로젝트 개요</h1>
          </article>
          <article>
            <label htmlFor='tagArr'>기술스택</label>
            {tag.length > 1 && (
              <div className={styles.skillSetEls}>
                {tag.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            )}
            <input className={styles.skillSetInput} type='text' value={tagArr} name='tagArr' onChange={getValue} placeholder='ex) React Js&&Node Js&&Express (단어 사이에 && 입력)' id='tagArr' />
            <label htmlFor='people'>참여인원</label>
            <input className={styles.peopleInput} type='text' value={people} name='people' onChange={getValue} placeholder='ex) 2' id='people' />
            <label htmlFor='workRangeArr'>내 업무범위</label>
            {workRange.length > 1 &&
              workRange.map((range, i) => (
                <p className={styles.rangeEls} key={i}>
                  {range}
                </p>
              ))}
            <input className={styles.rangeInput} type='text' value={workRangeArr} name='workRangeArr' onChange={getValue} placeholder='ex) 디자인 - 50%&&프론트엔드 - 100%&&(단어 사이에 && 입력)' id='workRangeArr' />
          </article>
        </section>

        <label htmlFor='content'>내용</label>
        <div className={styles.contentWrap}>{content && <AdminWriteEditor content={NodeHtmlMarkdown.translate(content)} setContent={setContent} />}</div>
        <button type='submit'>수정</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

const mapDispatchToProps = {
  loadingProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminEdit));
