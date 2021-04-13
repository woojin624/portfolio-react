import React from 'react';
import { Route, Switch, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryGame from './Games/MemoryGame';
import EtcGame from './Games/EtcGame';
const Games = () => {
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
                <motion.div
                  className='games-list'
                  initial='start' //
                  animate='in'
                  exit='end'
                  transition={{ duration: 0.3 }}
                  variants={gameListVariants}
                >
                  <div onClick={onCardClick} data-name='memorygame'>
                    <h2>Memory Games</h2>
                  </div>
                  <div onClick={onCardClick} data-name='etcgame'>
                    <h2>ETC Games</h2>
                  </div>
                </motion.div>
              </Route>
            </Switch>
          </AnimatePresence>
        </Router>
      </div>
    </motion.div>
  );
};

export default Games;
