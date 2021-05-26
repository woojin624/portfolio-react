import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import styled from 'styled-components';

const ToTopBtn = () => {
  const toTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TopBtn = styled.button`
    position: absolute;
    font-size: 1.5rem;
    font-weight: 500;
    top: -5rem;
    right: 50px;
    transition: 0.5s;

    svg {
      font-size: 2rem;
      margin-top: -2px;
      opacity: 0;
      transition: 0.5s;
    }

    &:hover {
      letter-spacing: 0.5px;

      svg {
        opacity: 1;
      }
    }

    @media all and (max-width: 767px) {
      top: -3.5rem;
      right: 1rem;
      font-size: 1.2rem;

      svg {
        font-size: 1.3rem;
        opacity: 1;
      }
    }
  `;

  return (
    <TopBtn onClick={toTopHandler}>
      <BsArrowUp />
      Back To Top
    </TopBtn>
  );
};

export default ToTopBtn;
