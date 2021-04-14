import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryGame from './Games/MemoryGame/MemoryGame';
import EtcGame from './Games/EtcGame';
const Games = () => {
  const [gameRank, setGameRank] = useState([]);
  const [memoryRank, setMemoryRank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/gamerank`)
      .then((res) => {
        setGameRank(res.data);
        console.log(res.data);
        setMemoryRank(res.data[0].rank.slice(0, 5));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const location = useLocation();
  let history = useHistory();
  const gameTextMotion = {
    start: {
      opacity: 0,
      fontSize: '10px',
      fontWeight: '300',
      y: -400,
    },
    in: {
      opacity: 1,
      fontSize: '48px',
      fontWeight: '700',
      y: 0,
    },
    end: {
      opacity: 0,
      fontSize: '24px',
      fontWeight: '400',
      y: 600,
    },
  };

  const gameListVariants = {
    start: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    end: {
      opacity: 0,
    },
  };

  const onCardClick = (e) => {
    let gameId = e.target.dataset.name;
    console.log(gameId);
    history.push(`/games/${gameId}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className='games-back'>
      <div className='games-contain'>
        <Router>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path='/games/memorygame'>
                <MemoryGame />
              </Route>
              <Route path='/games/etcgame'>
                <EtcGame />
              </Route>
              <Route exact path='/games'>
                <motion.p initial='start' animate='in' exit='end' transition={{ duration: 0.3 }} variants={gameTextMotion}>
                  Games
                </motion.p>
                {!isLoading && (
                  <motion.div
                    className='games-list'
                    initial='start' //
                    animate='in'
                    exit='end'
                    transition={{ duration: 0.3 }}
                    variants={gameListVariants}
                  >
                    <div className='games-el' onClick={onCardClick} data-name='memorygame'>
                      <h2>Memory Games</h2>
                      <div className='games-desc'>
                        <article className='games-el-left'>
                          <img src='https://coding-woojin.s3.ap-northeast-2.amazonaws.com/memory-thumb.png' alt='' />
                        </article>
                        <article className='games-el-right'>
                          <h2>Ranking</h2>
                          <ul>
                            {memoryRank.map((rank, i) => {
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
                        </article>
                      </div>
                    </div>
                    <div className='games-el' onClick={onCardClick} data-name='etcgame'>
                      <h2>ETC Games</h2>
                    </div>
                  </motion.div>
                )}
              </Route>
            </Switch>
          </AnimatePresence>
        </Router>
      </div>
    </motion.div>
  );
};

export default Games;
