const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');

require('dotenv').config();
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      //   console.log(extension);
      let field = file.fieldname;
      let cutField = [...field].indexOf('&');
      cb(null, `${field.substr(0, cutField)}/` + field.substr(cutField + 1) + '-' + Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),

  limits: { fileSize: 5 * 4096 * 4096 }, // 용량 제한
});
module.exports = upload;
