import React from 'react';
import styled from 'styled-components';

const HiddenProject = () => {
  const HiddenProject = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgb(204, 204, 204);
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 6vw;
      font-weight: 700;
    }
  `;

  return (
    <HiddenProject>
      <h1>비공개 프로젝트입니다.🤔</h1>
    </HiddenProject>
  );
};

export default HiddenProject;
