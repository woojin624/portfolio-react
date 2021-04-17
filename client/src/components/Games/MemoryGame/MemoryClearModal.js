import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './MemoryGame.module.css';

const MemoryClearModal = ({ time, rankList, setIsClear }) => {
  const [newRankList, setNewRankList] = useState(rankList);
  const [newRank, setNewRank] = useState({
    name: '',
    time: time,
  });
  const { name } = newRank;
  const [isRankRecord, setIsRankRecord] = useState(true);

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setNewRank({
      ...newRank,
      [name]: value,
    });
  };

  const rankRecordHandler = () => {
    console.log(newRankList);
    let arr = [...newRankList, newRank];
    arr.sort(function (a, b) {
      return a.time - b.time;
    });
    setNewRankList(arr);
    setIsRankRecord(false);
  };

  useEffect(() => {
    axios
      .put('/api/gamerank/memorygame/update', {
        rank: newRankList,
      })
      .then((response) => {
        // console.log(response.data);
      });
  }, [isRankRecord]);

  return (
    <div className={styles.cardClearPop}>
      <div className={styles.cardClearModal}>
        <h3>CLEAR!</h3>
        <article className={styles.memoryTimer}>
          <span>You left - </span>
          {time > 60000 && <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>}
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}s</span>
        </article>
        {isRankRecord ? (
          <div className={styles.cardModalRank}>
            <h2>Record Your Score!</h2>
            <article className={styles.memoryTimer}>
              {time > 60000 && <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>}
              <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
              <span>{('0' + ((time / 10) % 100)).slice(-2)}s</span>
            </article>
            <div>
              <input className={styles.cardRankInput} type='text' value={name} name='name' onChange={getValue} placeholder='Your Name' />
            </div>
            <button className={styles.cardRankConfirm} onClick={rankRecordHandler}>
              Confirm
            </button>
          </div>
        ) : (
          <div className={`${styles.cardModalRank} ${styles.rankZone}`}>
            <h2>Ranking</h2>
            <ul className={styles.rankList}>
              {newRankList &&
                newRankList.map((rank, i) => {
                  return (
                    <li key={i}>
                      <span className={styles.rankRate}>{i + 1}.</span>
                      <span className={styles.rankName}>{rank.name}</span>
                      <span className={styles.rankScore}>
                        {rank.time > 60000 && <span>{('0' + Math.floor((rank.time / 60000) % 60)).slice(-2)}m </span>}
                        <span>{('0' + Math.floor((rank.time / 1000) % 60)).slice(-2)}.</span>
                        <span>{('0' + ((rank.time / 10) % 100)).slice(-2)}s</span>
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        <button className={styles.cardModalClose} onClick={() => setIsClear(false)}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MemoryClearModal;
