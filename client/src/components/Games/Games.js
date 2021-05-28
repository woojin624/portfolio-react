import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import * as framer from '../../framer/games';

import MemoryGame from './MemoryGame/MemoryGame';
import EtcGame from './EtcGame';

import styles from './Games.module.css';
import Footer from '../Footer';

const Games = ({ games }) => {
  const [memoryRank, setMemoryRank] = useState([]);
  const gameText = ['G', 'A', 'M', 'E', 'S'];

  useEffect(() => {
    setMemoryRank(games[0].rank.slice(0, 5));
  }, [games]);

  const location = useLocation();
  let history = useHistory();

  const onCardClick = (e) => {
    let gameId = e.target.dataset.name;
    history.push(`/games/${gameId}`);
  };

  return (
    <>
      <motion.main variants={framer.games} initial='hidden' animate='visible' exit='out' className={styles.games}>
        <motion.h1 variants={framer.pageTitle} className={styles.pageTitle}>
          Games
        </motion.h1>
        <section className={styles.gamesContain}>
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
                  <motion.h2 variants={framer.gameText} className={styles.gameText}>
                    {gameText.map((text, i) => (
                      <span key={i}>{text}</span>
                    ))}
                  </motion.h2>
                  <motion.div className={styles.gamesList} variants={framer.gamesList}>
                    <article className={styles.gamesEl} onClick={onCardClick} data-name='memorygame'>
                      <h3>Memory Games</h3>
                      <div className={styles.gamesDesc}>
                        <div className={styles.gamesElLeft}>
                          <img src='https://coding-woojin.s3.ap-northeast-2.amazonaws.com/memory-thumb.png' alt='' />
                        </div>
                        <div className={styles.gamesElRight}>
                          <h3>Ranking</h3>
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
                        </div>
                      </div>
                    </article>
                    <article className={styles.gamesEl} data-name='etcgame'>
                      <h3>Coming Soon</h3>
                    </article>
                  </motion.div>
                </Route>
              </Switch>
            </AnimatePresence>
          </Router>
        </section>
      </motion.main>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ games }) => {
  return {
    games: games.games,
  };
};

export default connect(mapStateToProps)(Games);
