import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MemoryGame.css';

const MemoryClearModal = ({ time, rankList, setIsClear }) => {
  const [newRankList, setNewRankList] = useState(rankList);
  const [displayRankList, setDisplayRankList] = useState([]);
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
    // setDisplayRankList(newRankList);
    // displayRankList.length = 5;
    axios
      .put('/api/gamerank/memorygame/update', {
        rank: newRankList,
      })
      .then((response) => {
        console.log(response.data);
      });
  }, [isRankRecord]);

  return (
    <div className='card-clear-pop'>
      <div className='card-clear-modal'>
        <h3>CLEAR!</h3>
        <article className='memory-timer'>
          <span>You left - </span>
          {time > 60000 && <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>}
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}s</span>
        </article>
        {isRankRecord ? (
          <div className='card-modal-rank'>
            <h2>Record Your Score!</h2>
            <article className='memory-timer'>
              {time > 60000 && <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>}
              <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
              <span>{('0' + ((time / 10) % 100)).slice(-2)}s</span>
            </article>
            <div>
              <input className='card-rank-input' type='text' value={name} name='name' onChange={getValue} placeholder='Your Name' />
            </div>
            <button className='card-rank-confirm' onClick={rankRecordHandler}>
              Confirm
            </button>
          </div>
        ) : (
          <div className='card-modal-rank'>
            <h2>Ranking</h2>
            <ul className='rank-list'>
              {newRankList &&
                newRankList.map((rank, i) => {
                  return (
                    <li key={i}>
                      <span className='rank-rate'>{i + 1}.</span>
                      <span className='rank-name'>{rank.name}</span>
                      <span className='rank-score'>
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

        <button className='card-modal-close' onClick={() => setIsClear(false)}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MemoryClearModal;
