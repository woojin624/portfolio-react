import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as framer from '../../framer/games';

import MemoryGame from './MemoryGame/MemoryGame';
import EtcGame from './EtcGame';

import styles from './Games.module.css';

const Games = () => {
  const [memoryRank, setMemoryRank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/gamerank`)
      .then((res) => {
        // console.log(res.data);
        setMemoryRank(res.data[0].rank.slice(0, 5));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const location = useLocation();
  let history = useHistory();

  const onCardClick = (e) => {
    let gameId = e.target.dataset.name;
    // console.log(gameId);
    history.push(`/games/${gameId}`);
  };

  return (
    <motion.div variants={framer.games} initial='hidden' animate='visible' exit='out' className={styles.games}>
      <motion.h3 variants={framer.pageTitle} className={styles.pageTitle}>
        Games
      </motion.h3>
      <div className={styles.gamesContain}>
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
                <motion.p initial='start' animate='in' exit='end' transition={{ duration: 0.3 }} variants={framer.gameText}>
                  Games
                </motion.p>
                {!isLoading && (
                  <motion.div
                    className={styles.gamesList}
                    initial='start' //
                    animate='in'
                    exit='end'
                    transition={{ duration: 0.3 }}
                    variants={framer.gamesList}
                  >
                    <div className={styles.gamesEl} onClick={onCardClick} data-name='memorygame'>
                      <h2>Memory Games</h2>
                      <div className={styles.gamesDesc}>
                        <article className={styles.gamesElLeft}>
                          <img src='https://coding-woojin.s3.ap-northeast-2.amazonaws.com/memory-thumb.png' alt='' />
                        </article>
                        <article className={styles.gamesElRight}>
                          <h2>Ranking</h2>
                          <ul>
                            {memoryRank.map((rank, i) => {
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
                        </article>
                      </div>
                    </div>
                    <div className={styles.gamesEl} onClick={onCardClick} data-name='etcgame'>
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
