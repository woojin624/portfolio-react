import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';
import { useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import styles from './AdminWrite.module.css';
import AdminWriteEditor from './AdminWriteEditor';
import ColorTab from './ColorTab';

const AdminEdit = ({ match, projectsList, loadingProjects }) => {
  const id = match.params.id;
  const history = useHistory();

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
    category: '',
    thumbImg: null,
    thumbImgName: '',
    thumbImgPath: '',
    mainImg: null,
    mainImgName: '',
    mainImgPath: '',
    subImg: '',
    subImgName: '',
    subImgPath: '',
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

  const { number, category, thumbImg, thumbImgName, thumbImgPath, mainImg, mainImgName, mainImgPath, title, subTitle, period, siteLink, githubLink, subImg, subImgName, subImgPath, desc, tagArr, people, workRangeArr } = projectContent;

  const [content, setContent] = useState();
  const [color, setColor] = useColor('hex', [...projectsList].filter((data) => data._id === parseInt(id))[0].color);
  const [tag, setTag] = useState([]);
  const [workRange, setWorkRange] = useState([]);
  const [visible, setVisible] = useState([...projectsList].filter((data) => data._id === parseInt(id))[0].visible);

  useEffect(() => {
    const skills = tagArr.split(',');
    setTag(skills);
  }, [tagArr]);

  useEffect(() => {
    const ranges = workRangeArr.split(',');
    setWorkRange(ranges);
  }, [workRangeArr]);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPost().then((response) => {
      console.log(response.data);
      loadingProjects();
    });
    alert('등록 완료!');
    history.push(`/admin/list`);
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
    e.preventDefault();
    const { name, value, files } = e.target;

    setProjectContent({
      ...projectContent,
      [name]: files[0],
      [name + 'Name']: value,
      [name + 'Path']: URL.createObjectURL(files[0]),
    });
    console.log('name : ', name);
    console.log('value : ', value);
    console.log(URL.createObjectURL(files[0]));
    console.log('files[0] : ', files[0]);
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
    formData.append(`visible`, visible);
    formData.append(`category`, category);
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
            <div className={styles.numberWrap}>
              <label htmlFor='number'>프로젝트 넘버</label>
              <input className={styles.number} type='number' min='0' required value={number} name='number' onChange={getValue} placeholder='프로젝트 넘버' id='number' />
            </div>
            <div className={styles.colorWrap}>
              <h3>메인 컬러</h3>
              <ColorTab color={color} setColor={setColor} />
            </div>
            <div className={styles.visibleWrap}>
              <h3>공개 여부</h3>
              <div className={styles.visibleInput}>
                <p>{visible ? '공개' : '비공개'}</p>
                <div className={styles.toggleWrap} style={{ backgroundColor: visible ? 'green' : 'red' }} onClick={handleVisible}>
                  <div className={styles.toggle} style={{ left: visible ? '0' : '50%' }}></div>
                </div>
              </div>
            </div>
            <div className={styles.categoryWrap}>
              <h3>프로젝트 종류</h3>
              <select value={category} name='category' id='category' onChange={getValue}>
                <option value='Personal Project'>Personal Project</option>
                <option value='Team Project'>Team Project</option>
                <option value='Business Project'>Business Project</option>
              </select>
            </div>
          </article>
          <figure className={styles.thumbFrame}>
            <img src={thumbImgPath ? thumbImgPath : thumbImg} alt='thumbnail' />
            <input className={styles.thumbInput} type='file' value={thumbImgName} file={thumbImg} name='thumbImg' onChange={handleFileChange} placeholder='썸네일이미지파일' id='thumbImg' />
          </figure>
        </section>

        <div className={styles.divLine}></div>
        <figure className={styles.mainFrame}>
          <img src={mainImgPath ? mainImgPath : mainImg} alt='mainImg' />
        </figure>
        <input className={styles.mainImageInput} type='file' value={mainImgName} file={mainImg} name='mainImg' onChange={handleFileChange} placeholder='메인이미지파일' id='mainImg' />
        <input className={styles.subTitleInput} type='text' value={subTitle} name='subTitle' onChange={getValue} placeholder='프로젝트 부제목' id='subTitle' />
        <input className={styles.titleInput} type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트 제목' id='title' />
        {tag.length > 1 && (
          <div className={styles.skillSetEls}>
            {tag.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        )}
        <input className={styles.skillSetInput} type='text' value={tagArr} name='tagArr' onChange={getValue} placeholder='ex) React Js&&Node Js&&Express (단어 사이에 && 입력)' id='tagArr' />
        <input className={styles.periodInput} type='text' value={period} name='period' onChange={getValue} placeholder='프로젝트 기간 ex) 2021. 01 ~ 2021. 03' id='period' />
        <section className={styles.mainInfo}>
          <article>
            <input className={styles.siteLinkInput} type='text' value={siteLink} name='siteLink' onChange={getValue} placeholder='사이트 링크' id='siteLink' />
            <input className={styles.githubLinkInput} type='text' value={githubLink} name='githubLink' onChange={getValue} placeholder='깃허브 링크' id='githubLink' />
          </article>
          <article>
            <div>
              <label htmlFor='people' className={styles.projectRange}>
                참여인원
              </label>
              {people && <p className={styles.peopleEl}>{people}명</p>}
              <input className={styles.peopleInput} type='text' value={people} name='people' onChange={getValue} placeholder='ex) 2' id='people' />
            </div>
            <div>
              <label htmlFor='workRangeArr' className={styles.projectPeople}>
                내 업무범위
              </label>
              {workRange.length > 1 &&
                workRange.map((range, i) => (
                  <p className={styles.rangeEls} key={i}>
                    {range}
                  </p>
                ))}
              <input className={styles.rangeInput} type='text' value={workRangeArr} name='workRangeArr' onChange={getValue} placeholder='ex) 디자인 - 50%&&프론트엔드 - 100%&&(단어 사이에 && 입력)' id='workRangeArr' />
            </div>
          </article>
        </section>

        <figure className={styles.subFrame}>
          <img src={subImgPath ? subImgPath : subImg} alt='subImg' />
        </figure>
        <input className={styles.subImageInput} type='file' value={subImgName} file={subImg} name='subImg' onChange={handleFileChange} placeholder='서브이미지파일' id='subImg' />

        <section className={styles.summary}>
          <article>
            <h1 className={styles.summaryTitle}>About the Project</h1>
          </article>
          <article>
            <textarea className={styles.descInput} type='text' value={desc} name='desc' onChange={getValue} placeholder='프로젝트 설명' id='desc' />
          </article>
        </section>
        <label htmlFor='content'>내용</label>
        <div className={styles.contentWrap}>{content && <AdminWriteEditor content={content} setContent={setContent} />}</div>
        <button className={styles.submitBtn} type='submit'>
          수정
        </button>
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
