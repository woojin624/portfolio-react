import React from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import ability from './abilityData';

import styles from './About.module.scss';

import * as framer from '../../framer/about';
import AbilityList from './AbilityList';
import Footer from '../Footer';

const About = () => {
  const aboutTitle = ['A', 'B', 'O', 'U', 'T'];

  return (
    <>
      <motion.main variants={framer.about} initial='hidden' animate='visible' exit='out' className={styles.about}>
        <motion.h1 variants={framer.pageTitle} className={styles.pageTitle}>
          About
        </motion.h1>
        <motion.div variants={framer.aboutContain} className={styles.aboutContain}>
          <section className={styles.introSec}>
            <article className={styles.introLeft}>
              <h2>
                {aboutTitle.map((text, i) => {
                  return (
                    <motion.span variants={framer.mainText} custom={i} key={i}>
                      {text}
                    </motion.span>
                  );
                })}
              </h2>
              <motion.h3 variants={framer.opacity}>개발자를 위한 개발을 하는 개발자</motion.h3>
              <motion.div variants={framer.opacity} className={styles.introDesc}>
                <div className={styles.line}></div>
                <p>프론트엔드 개발자로서 사용자와 맞닿는 화면을 구성하여 빠르고 정확한 데이터 전달과 흥미로운 인터랙션으로 최고의 사용자 경험을 남기는 것을 우선시 목표로 두고 나아가고 있습니다.</p>
                <p>또한, 이러한 개발을 할 때 직접 로직을 짜고 화면단을 구성을 하기도 하지만 많은 라이브러리와 오픈소스의 도움을 받으며 혼자 감당하기 힘든 부분을 해결하기도 했습니다. 오픈소스를 뜯어보며 개발자가 개발자를 위해 만든 코드를 보고 저 또한 이러한 것을 만들고 싶다는 생각이 들었습니다.</p>
                <p>사용자의 경험과 개발자의 경험을 모두 이해하고 있는 사람. 그런 개발자가 제가 바라는 목표입니다.</p>
              </motion.div>
            </article>
            <motion.article variants={framer.opacity} className={styles.introRight}>
              <div className={styles.card}>
                <figure>
                  <img src='/images/profile-img1.png' alt='' />
                </figure>
                <div className={styles.contactDetails}>
                  <h2>Contact Details</h2>
                  <p>
                    <AiOutlineUser /> 장우진
                  </p>
                  <p>
                    <AiOutlineMail /> 624jang@gmail.com
                  </p>
                  <p>
                    <AiFillGithub /> https://github.com/woojin624
                  </p>
                </div>
              </div>
            </motion.article>
          </section>
          <motion.section variants={framer.ability} className={styles.abilityLine}>
            <h2>Ability</h2>
            <div>
              <div className={styles.line}></div>
            </div>
          </motion.section>
          <motion.section variants={framer.ability} className={styles.abilitySec}>
            <article>
              <h3>Front-End</h3>
              <AbilityList ability={ability.frontEnd} />

              <h3>Back-End</h3>
              <AbilityList ability={ability.backEnd} />

              <h3>Database</h3>
              <AbilityList ability={ability.database} />

              <h3>ETC</h3>
              <AbilityList ability={ability.etc} />
            </article>
          </motion.section>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  );
};
export default About;
