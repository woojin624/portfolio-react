import React from 'react';
import { motion } from 'framer-motion';
import ability from './abilityData';

import styles from './About.module.css';
import AbilityList from './AbilityList';

const About = (props) => {
  console.log(ability.frontEnd);

  const aboutMotion = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    out: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0,
      },
    },
  };

  const pageTitleMotion = {
    hidden: {
      x: '-50%',
      y: '-450%',
    },
    visible: {
      x: '-50%',
      y: '-50%',
    },
    out: {
      x: '-50%',
      y: '-450%',
    },
  };

  return (
    <>
      <motion.div variants={aboutMotion} initial='hidden' animate='visible' exit='out' className={styles.about}>
        <motion.h3 variants={pageTitleMotion} className={styles.pageTitle}>
          About
        </motion.h3>
        <div className={styles.aboutContain}>
          <section className={styles.introSec}>
            <article className={styles.introLeft}>
              <h1>ABOUT</h1>
              <h2>개발자를 위한 개발을 하는 개발자</h2>
              <div className={styles.introDesc}>
                <div className={styles.line}></div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga qui nam sit excepturi rerum ullam, nihil ipsam incidunt minus esse itaque eaque tempore facilis quam animi assumenda adipisci, corrupti consectetur?</p>
                <p>Maiores expedita deserunt at aliquid totam, unde quidem consequuntur dolore? Vitae blanditiis tempore accusamus odio natus dicta repellat ex voluptatum quibusdam laudantium?</p>
                <p>numquam vero quam pariatur voluptates fuga eum culpa fugit voluptas fugiat!</p>
              </div>
            </article>
            <article className={styles.introRight}>
              <figure>
                <img src='/images/profile-img1.png' alt='' />
              </figure>
              <div className={styles.contactDetails}>
                <h2>Contact Details</h2>
                <p>장우진</p>
                <p>624jang@gmail.com</p>
                <p>https://github.com/woojin624</p>
              </div>
            </article>
          </section>
          <section className={styles.abilityLine}>
            <h2>Ability</h2>
            <div>
              <div className={styles.line}></div>
            </div>
          </section>
          <section className={styles.abilitySec}>
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
          </section>
        </div>
      </motion.div>
    </>
  );
};
export default About;
