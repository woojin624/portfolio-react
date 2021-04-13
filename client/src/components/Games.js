import React from 'react';
import { motion } from 'framer-motion';
import MemoryGame from './Games/MemoryGame';
const Games = () => {
  const gameTextMotion = {
    start: {
      fontSize: '10px',
      fontWeight: '300',
      y: -400,
    },
    in: {
      fontSize: '48px',
      fontWeight: '700',
      y: 0,
    },
    end: {
      fontSize: '24px',
      fontWeight: '400',
      y: 600,
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className='games-back'>
      <div className='games-contain'>
        <motion.p initial='start' animate='in' exit='end' transition={{ duration: 0.3 }} variants={gameTextMotion}>
          Games
        </motion.p>
        <MemoryGame />
      </div>
    </motion.div>
  );
};

export default Games;
