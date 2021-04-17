import React, { useState } from 'react';
import axios from 'axios';

const AdminWrite = () => {
  const [projectContent, setProjectContetns] = useState({
    title: '',
    content: '',
    thumb: '',
    tag: '',
  });

  const { title, content, thumb, tag } = projectContent;

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
        content: projectContent.content,
        thumb: projectContent.thumb,
        tag: projectContent.tag,
      })
      .then((response) => {
        console.log(response.data);
      });
    alert('등록 완료!');
  };

  return (
    <>
      <div>AdminWrite</div>
      <form>
        title
        <input type='text' value={title} name='title' onChange={getValue} placeholder='프로젝트제목' />
        <br />
        <br />
        content
        <input type='text' value={content} name='content' onChange={getValue} placeholder='프로젝트내용' />
        <br />
        <br />
        thumb
        <input type='text' value={thumb} name='thumb' onChange={getValue} placeholder='썸네일' />
        <br />
        <br />
        tag
        <input type='text' value={tag} name='tag' onChange={getValue} placeholder='태그' />
        <br />
        <br />
        <button
          onClick={(e) => {
            send(e);
          }}
        >
          등록
        </button>
      </form>
    </>
  );
};

export default AdminWrite;
