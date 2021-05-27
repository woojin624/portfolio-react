import React from 'react';
import styled, { css } from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const Footer = () => {
  const aTag = css`
    display: block;
    color: #f8f6f3;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    position: relative;

    &:after {
      content: '';
      transition: 0.2s ease;
      width: 100%;
      height: calc(3px);
      background-color: #f8f6f3;
      position: absolute;
      left: 0%;
      bottom: -0.15em;
      transform: scaleX(0);
    }

    &:hover {
      text-decoration: none;
      color: #f8f6f3;

      &:after {
        transform: scaleX(1);
      }
    }
  `;

  const Footer = styled.footer`
    background-color: #242424;
    color: #f8f6f3;
    width: 100%;
    text-align: left;

    span {
      width: 100%;
      height: 1px;
      display: block;
      background: #f8f6f3;
    }

    .footer {
      max-width: 1600px;
      width: 100%;
      margin: 0 auto;
      padding: 4rem 50px;
      display: flex;
      justify-content: space-between;

      section {
        h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        ul {
          display: flex;
          margin-bottom: 2rem;

          li {
            margin-right: 1rem;

            a {
              ${aTag}
            }
          }
        }

        .mail {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;

          .contact {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          a {
            width: fit-content;
            ${aTag}
          }
        }

        .copyright {
          font-size: 14px;
          font-weight: 700;
        }
      }

      figure {
        width: fit-content;
        height: auto;
        svg {
          font-size: 16rem;
          transform: rotate(45deg);
        }
      }
    }
  `;

  return (
    <Footer>
      <span></span>
      <div className='footer'>
        <section>
          <h1>JANGWOOJIN</h1>
          <ul>
            <li>
              <a target='_blank' rel='noopener noreferrer' href='https://github.com/woojin624'>
                Github
              </a>
            </li>
            <li>
              <a target='_blank' rel='noopener noreferrer' href='https://velog.io/@woojin'>
                Velog
              </a>
            </li>
            <li>
              <a target='_blank' rel='noopener noreferrer' href='https://codepen.io/woojin624'>
                Codepen
              </a>
            </li>
          </ul>
          <div className='mail'>
            <p className='contact'>Contact</p>
            <a href='mailto: 624jang@gmail.com' title='Contact Me!'>
              624jang@gmail.com
            </a>
          </div>
          <p className='copyright'>ⓒ 2021 Woojin. All rights reserved.</p>
        </section>
        <figure>
          <BiArrowBack />
        </figure>
      </div>
    </Footer>
  );
};

export default Footer;
