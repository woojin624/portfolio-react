import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadingProjects } from '../../redux';
import { useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import styles from './AdminWrite.module.css';
import AdminWriteEditor from './AdminWriteEditor';
import ColorTab from './ColorTab';

const AdminWrite = ({ loadingProjects }) => {
  const history = useHistory();

  const [projectContent, setProjectContetns] = useState({
    number: '',
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

  const { number, thumbImg, thumbImgName, thumbImgPath, mainImg, mainImgName, mainImgPath, title, subTitle, period, siteLink, githubLink, subImg, subImgName, subImgPath, desc, tagArr, people, workRangeArr } = projectContent;

  const [content, setContent] = useState('콘텐츠 입력');
  const [color, setColor] = useColor('hex', '#fff');
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
      loadingProjects();
    });
    alert('등록 완료!');
    history.push(`/admin/list`);
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
    e.preventDefault();
    const { name, value, files } = e.target;

    setProjectContetns({
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
    const url = '/api/projects/add';
    const formData = new FormData();

    formData.append(`${title}&thumbImg`, thumbImg);
    formData.append(`${title}&mainImg`, mainImg);
    formData.append(`${title}&subImg`, subImg);
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
    return axios.post(url, formData, config);
  };

  return (
    <div className={styles.AdminWrite}>
      <h1 className={styles.pageTitle}>프로젝트 글 작성</h1>
      <form onSubmit={handleFormSubmit}>
        <section className={styles.defaultInfo}>
          <article>
            <div>
              <label htmlFor='number'>프로젝트 넘버</label>
              <input className={styles.number} type='number' min='0' required value={number} name='number' onChange={getValue} placeholder='프로젝트 넘버' id='number' />
            </div>
            <div className={styles.colorWrap}>
              <h3>메인 컬러</h3>
              <ColorTab color={color} setColor={setColor} />
            </div>
          </article>
          <figure className={styles.thumbFrame}>
            {/* <label htmlFor='thumb'>썸네일</label> */}
            {thumbImg ? <img src={thumbImgPath} alt='thumbnail' /> : <div className={styles.thumbTemp}>Thumbnail</div>}
            <input className={styles.thumbInput} type='file' value={thumbImgName} file={thumbImg} name='thumbImg' onChange={handleFileChange} placeholder='썸네일이미지파일' id='thumbImg' />
          </figure>
          <div className={styles.divLine}></div>
          <figure className={styles.mainFrame}>
            {/* <label htmlFor='mainImg'>메인 이미지</label> */}
            {mainImg ? <img src={mainImgPath} alt='mainImg' /> : <div className={styles.mainTemp}>Main</div>}
            {/* <h1>{title}</h1> */}
          </figure>
          <input className={styles.mainImageInput} type='file' value={mainImgName} file={mainImg} name='mainImg' onChange={handleFileChange} placeholder='메인이미지파일' id='mainImg' />
        </section>

        <input className={styles.subTitleInput} type='text' value={subTitle} name='subTitle' onChange={getValue} placeholder='프로젝트 부제목' id='subTitle' />
        <input className={styles.titleInput} type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트 제목' id='title' />
        {/* <label htmlFor='tagArr'>기술스택</label> */}
        {tag.length > 1 && (
          <div className={styles.skillSetEls}>
            {tag.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        )}
        <input className={styles.skillSetInput} type='text' value={tagArr} name='tagArr' onChange={getValue} placeholder='기술 스택 ex) React Js,Node Js,Express (단어 사이에 "," 입력)' id='tagArr' />
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
              <input className={styles.rangeInput} type='text' value={workRangeArr} name='workRangeArr' onChange={getValue} placeholder='ex) 디자인 - 50%,프론트엔드 - 100% (단어 사이에 "," 입력)' id='workRangeArr' />
            </div>
          </article>
        </section>

        <figure className={styles.subFrame}>
          {/* <label htmlFor='subImg'>서브 이미지</label> */}
          {subImg ? <img src={subImgPath} alt='subImg' /> : <div className={styles.subTemp}>Sub</div>}
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
        <div className={styles.contentWrap}>
          <AdminWriteEditor content={content} setContent={setContent} />
        </div>
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
