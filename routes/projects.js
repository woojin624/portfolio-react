const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Find All
router.get('/list', (req, res) => {
  Project.findAll()
    .then((projects) => {
      if (!projects.length) return res.status(404).send({ err: 'Project not found' });
      res.send(projects);
    })
    .catch((err) => res.status(500).send(err));
});

// Find One by Projectid
router.get('/detail/:id', (req, res) => {
  console.log(req.params);
  Project.findOneByProjectid(req.params.id)
    .then((project) => {
      if (!project) return res.status(404).send({ err: 'Project not found' });
      res.send(project);
    })
    .catch((err) => res.status(500).send(err));
});

// Create new project document
router.post('/add', (req, res) => {
  Project.findAll().then((projects) => {
    req.body._id = parseInt(projects[projects.length - 1]._id + 1);
    Project.create(req.body)
      .then((project) => res.send(project))
      .catch((err) => res.status(500).send(err));
  });
});

// Update by projectid
router.put('/update/:id', (req, res) => {
  Project.updateByProjectid(req.params.id, req.body)
    .then((project) => res.send(project))
    .catch((err) => res.status(500).send(err));
});

// Delete by projectid
router.delete('/delete/:id', (req, res) => {
  Project.deleteByProjectid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
