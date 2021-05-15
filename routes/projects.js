const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const upload = require('../modules/multer');

// post - Create new project document
router.post('/add', upload.any(), async (req, res) => {
  const images = req.files;
  console.log(req.body);

  // console.log(images);
  // const path = image.map((img) => img.location);
  // console.log(path);
  const thumbImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'thumbImg');
  const mainImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'mainImg');
  const subImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'subImg');

  Project.findAll().then((projects) => {
    req.body._id = parseInt(projects[projects.length - 1]._id + 1);
    req.body.number = parseInt(req.body.number);
    req.body.thumbImg = thumbImg[0] ? thumbImg[0].location : req.body.thumbImg;
    req.body.mainImg = mainImg[0] ? mainImg[0].location : req.body.mainImg;
    req.body.subImg = subImg[0] ? subImg[0].location : req.body.subImg;
    let params = { ...req.body };
    console.log(params);

    Project.create(params)
      .then((project) => res.send(project))
      .catch((err) => res.status(500).send(err));
  });
});

// put - Update by projectid
router.put('/editwork', upload.any(), async (req, res) => {
  const images = req.files;

  console.log(images);
  // const path = image.map((img) => img.location);
  // console.log(path);
  const thumbImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'thumbImg');
  const mainImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'mainImg');
  const subImg = [...images].filter((file) => file.fieldname.substr([...file.fieldname].indexOf('&') + 1) === 'subImg');
  req.body._id = parseInt(req.body._id);
  req.body.number = parseInt(req.body.number);
  req.body.thumbImg = thumbImg[0] ? thumbImg[0].location : req.body.thumbImg;
  req.body.mainImg = mainImg[0] ? mainImg[0].location : req.body.mainImg;
  req.body.subImg = subImg[0] ? subImg[0].location : req.body.subImg;

  let params = { ...req.body };
  console.log(params);

  Project.updateByProjectid(req.body._id, params)
    .then((project) => res.send(project))
    .catch((err) => res.status(500).send(err));
});

// get - Find All
router.get('/list', (req, res) => {
  Project.findAll()
    .then((projects) => {
      if (!projects.length) return res.status(404).send({ err: 'Project not found' });
      res.send(projects);
    })
    .catch((err) => res.status(500).send(err));
});

// get one - Find One by Projectid
router.get('/detail/:id', (req, res) => {
  console.log(req.params);
  Project.findOneByProjectid(req.params.id)
    .then((project) => {
      if (!project) return res.status(404).send({ err: 'Project not found' });
      res.send(project);
    })
    .catch((err) => res.status(500).send(err));
});

// delete - Delete by projectid
router.delete('/delete/:id', (req, res) => {
  Project.deleteByProjectid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
