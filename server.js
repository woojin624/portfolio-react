const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

let db;
// mongoDB가 연결되면 실행
MongoClient.connect(process.env.DB_URL, function (err, client) {
  //연결되면 할 일
  if (err) {
    return console.log(err);
  }

  // mongoDB의 jang이라는 데이터베이스에 연결
  db = client.db('jang');
});

app.get('/api/projectlist', function (req, res) {
  // DB에 저장된 work라는 collection안의 모든 데이터를 꺼내주세요
  db.collection('projects')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.send(result);
    });
});

// 어떤 사람이 /addwork경로로 POST 요청을 하면...
app.post('/api/addproject', function (req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const thumb = req.body.thumb;
  // console.log(req.body);

  // DB중 counter라는 collection을 찾아 name이 게시물갯수인 데이터를 받아온다
  db.collection('counter').findOne({ name: 'ProjectIndex' }, function (err, result) {
    console.log(result.totalWorks);
    // 게시물갯수를 변수에 저장
    let totalProjectIndex = result.totalWorks;

    // DB.work에 새 게시물을 기록함
    // 위에서 완료되면 _id : 총게시물갯수+1 해서 새로운 데이터를 work collection에 저장(insert)
    db.collection('projects').insertOne({ _id: totalProjectIndex + 1, title, content, thumb }, function (err, result) {
      console.log('저장완료');
      // counter라는 collection에 있는 totalWorks라는 항목도 1증가시켜야함.
      // 몽고DB에서 데이터를 수정하고 싶을 때 updateOne() 함수를 사용한다.
      // db.collection('counter').updateOne({어떤데이터를 수정할지},{수정값},function(){})
      // $inc operator를 통해 DB.counter내의 총게시물갯수 +1
      db.collection('counter').updateOne({ name: 'ProjectIndex' }, { $inc: { totalWorks: 1 } }, function (err, result) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });
});

// /deletework 경로로 delete요청을 하면 실행될 코드
app.delete('/api/deleteproject', function (req, res) {
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  // req.body에 담겨온 게시물번호를 가진 글을 db에서 찾아서 삭제해주세요.
  db.collection('projects').deleteOne(req.body, function (err, result) {
    console.log(req.body._id);
  });
});

// 'edit/:id'로 접속하면 id번 게시물의 데이터를 결과로 보냄
app.get('/api/projectDetail/:id', function (req, res) {
  db.collection('projects').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
    console.log(req.params);
    res.send(result);
  });
});

// 게임랭킹
app.get('/api/gamerank', function (req, res) {
  db.collection('games')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.send(result);
    });
});

// 메모리게임 랭킹
app.get('/api/gamerank/memorygame', function (req, res) {
  db.collection('games').findOne({ name: 'memorygame' }, function (err, result) {
    console.log(req.params);
    res.send(result);
  });
});

// 메모리게임 랭킹 수정
app.put('/api/gamerank/memorygame/update', function (req, res) {
  console.log(req.body);
  const rank = req.body.rank;

  //폼에담긴 데이터를 가지고 db.collection에다가 업데이트함
  db.collection('games').updateOne({ name: 'memorygame' }, { $set: { rank } }, function (err, result) {});
});

//
//
//

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// 파일들 담긴 곳 명시
app.use(express.static(path.join(__dirname, 'client/build')));
// 페이지 열기
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
