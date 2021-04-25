const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const { uploadFile, getFileStream } = require('../utils/s3');

router.get('/images/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// post - Create new project document
router.post(
  '/add',
  upload.fields([
    { name: 'thumbImg', maxCount: 1 },
    { name: 'mainImg', maxCount: 1 },
    { name: 'subImg', maxCount: 1 },
  ]),
  async (req, res) => {
    const thumbImg = req.files.thumbImg[0];
    const mainImg = req.files.mainImg[0];
    const subImg = req.files.subImg[0];
    const result = await uploadFile(thumbImg);
    console.log(result);
    // console.log(req.files.thumbImg[0]);
    // console.log(req.files.mainImg[0]);
    // console.log(req.files.subImg[0]);
    Project.findAll().then((projects) => {
      req.body._id = parseInt(projects[projects.length - 1]._id + 1);
      // req.body.image = '/image/' + req.files[0].filename;
      let params = { ...req.body };
      console.log(params);

      // Project.create(params)
      //   .then((project) => res.send(project))
      //   .catch((err) => res.status(500).send(err));
    });
  }
);

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

// put - Update by projectid
router.put('/update/:id', (req, res) => {
  Project.updateByProjectid(req.params.id, req.body)
    .then((project) => res.send(project))
    .catch((err) => res.status(500).send(err));
});

// delete - Delete by projectid
router.delete('/delete/:id', (req, res) => {
  Project.deleteByProjectid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
