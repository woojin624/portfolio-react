const express = require('express');
const router = express.Router();
const GameRank = require('../models/Game');

// Find All
router.get('/', (req, res) => {
  GameRank.findAll()
    .then((gamerank) => {
      if (!gamerank.length) return res.status(404).send({ err: 'Project not found' });
      res.send(gamerank);
    })
    .catch((err) => res.status(500).send(err));
});

//
// Memory Game
//
// Find MemoryGame Ranking
router.get('/memorygame', (req, res) => {
  console.log(req.params);
  GameRank.findOneByGameName({ name: 'memorygame' })
    .then((memoryrank) => {
      if (!memoryrank) return res.status(404).send({ err: 'Rank not found' });
      res.send(memoryrank);
    })
    .catch((err) => res.status(500).send(err));
});

// Update by Memory Ranking
router.put('/memorygame/update', (req, res) => {
  const rank = req.body.rank;
  GameRank.updateByGameName({ name: 'memorygame' }, { $set: { rank } })
    .then((memoryrank) => res.send(memoryrank))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
