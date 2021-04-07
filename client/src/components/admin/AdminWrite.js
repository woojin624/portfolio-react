import React, { useState } from 'react';
import axios from 'axios';

const AdminWrite = () => {
  const [projectContent, setProjectContetns] = useState({
    title: '',
    content: '',
  });

  const { title, content } = projectContent;

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setProjectContetns({
      ...projectContent,
      [name]: value,
    });
  };

  const send = () => {
    axios
      .post('/api/addproject', {
        title: projectContent.title,
        content: projectContent.content,
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
        <input type='text' value={title} name='title' onChange={getValue} />
        <br />
        <input type='text' value={content} name='content' onChange={getValue} />
        <br />
        <button
          onClick={() => {
            send();
          }}
        >
          등록
        </button>
      </form>
    </>
  );
};

export default AdminWrite;
