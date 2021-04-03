const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ mainTitle: 'Hello React!' });
});

app.post('/api/user', function (req, res) {
  console.log(req.body);
  const content = req.body;
  res.send({ content });
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
