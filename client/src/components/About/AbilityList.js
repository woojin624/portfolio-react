import React from 'react';
import styles from './About.module.scss';

const AbilityList = ({ ability }) => {
  return (
    <ul className={styles.skillWrap}>
      {ability.map((skill, i) => (
        <li className={styles.skill} key={i}>
          <div className={styles.title}>
            <img src={skill.icon} alt='' />
            <h4 style={{ color: skill.color }}>{skill.name}</h4>
          </div>
          <div className={styles.desc}>
            <p>{skill.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AbilityList;
