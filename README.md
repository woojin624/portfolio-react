# PORTFOLIO - with React, NodeJs
---

## ✨ 프로젝트 소개

🙋‍♂️ 나를 소개하는 웹 사이트

배포 : https://jangwoojin.com

### 🛠 Used Tech
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=black"/></a>

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/></a>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/></a>
<img src="https://img.shields.io/badge/FramerMotion-0055FF?style=flat-square&logo=Framer&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Toast&nbsp;UI&nbsp;Editor-515CE6?style=flat-square&logo=&logoColor=white"/></a>

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>

<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Mongoose-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>


<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white"/></a>
<img src="https://img.shields.io/badge/AWS&nbsp;Elastic&nbsp;Beanstalk-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white"/></a>
<img src="https://img.shields.io/badge/AWS&nbsp;Route&nbsp;53-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white"/></a>
<img src="https://img.shields.io/badge/AWS&nbsp;S3-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white"/></a>

<br/>

## ✨ 프로젝트 구성

### 메인 페이지
  * Home
  * About
  * Projects
  * Games

### 어드민 페이지
  * Home
  * Write
  * List

<br/>

## ✨ 화면 구성 상세 및 주요 기능

###  리덕스를 통한 상태 관리

프로젝트 초기 단계에서 리덕스 없이 진행을 했었습니다. 
그러던 중 서버에서 구성한 프로젝트에 관한 API를 해당 데이터가 필요한 페이지에서 렌더가 될 때 마다 매번 GET 요청을 하며 불필요한 과정이 반복되고 있음을 인지하였습니다.

```javascript
// components/Projects/Projects.js

...

 useEffect(() => {
   axios
     .get('/api/projectlist')
     .then((res) => {
       setProjectsList(res.data);
       setIsLoading(false);
     })
     .catch((err) => {
       console.log(err);
     });
 }, []);
```

이런 식으로 프로젝트리스트, 상세페이지, 어드민리스트 등 프로젝트 관련 컴포넌트에서 useEffect를 통해 매번 get요청을 했었고 해당 데이터를 불러오는 과정에서 isLoading 또한 설정해주어야 했었습니다.

해당 데이터를 처음 웹이 열렸을 때 한 곳에 저장하여 props로 받아오는 방식이 가장 효율적일 것이라 생각되어 리덕스를 도입하였고 최초 웹이 열렸을 때 리덕스 스토어에 저장하는 방식으로 변경하였습니다.

```javascript
// redux/projects/action.js

import { GLOBAL_LOADED_FAILURE, GLOBAL_LOADED_SUCEESS, GLOBAL_LOADED_REQUEST } from './types';
import axios from 'axios';

...

// 프로젝트 목록을 디스패치로 받아와 스토어에 저장하는 부분
export const loadingProjects = () => {
  return (dispatch) => {
    dispatch(loadingRequest());
    axios
      .get('/api/projects/list')
      .then((response) => response.data)
      .then((data) => dispatch(loadingSuccess(data)))
      .catch((err) => {
        dispatch(loadingFailure(err));
      });
  };
};

```

프로젝트 상태를 관리하는 액션 부분입니다. loadingProjects 액션을 만들어 App.js 파일에서 useEffect로 최초 렌더시에 해당 액션이 작동하도록 하였습니다.

loadingProjects 액션을 웹이 처음 렌더될 때, 어드민 페이지에서 프로젝트가 CRUD될 때 작동하도록 하여 프로젝트 데이터의 상태관리를 간편하게 만들었습니다.

<br/>

### Framer Motion을 통한 페이지 전환에 부드러운 인터랙션 추가

화면을 구성하는 메뉴는 Home, About, Projects, Games 이렇게 네 가지입니다.

각 페이지에서 mount될 때 unmount될 때 트랜지션을 주어 router를 통한 페이지 전환이 부드럽게 진행되게 만들고 싶었고 이것을 보다 효과적으로 만들어주는 Framer Motion 라이브러리를 사용하여 인터랙션을 구현했습니다.

gif 넣는 구역

<br/>

### NodeJs로 RESTful API 구성

Projects 페이지에 작성될 데이터, Games에 기록되는 스코어, Admin에 로그인하기 위한 유저정보를 다루기 위한 API를 구성했습니다.

3가지 종류의 API로 구성을 하다보니 코드가 길어져 가독성이 떨어졌고 앞으로 추가적으로 작성하게 될 부분을 고려하여 유지보수가 용이하도록 express의 Router를 이용하여 라우팅 로직을 모듈화하는 리팩토링을 진행했습니다.

routes 폴더를 생성하여 projects.js, games.js, users.js 이렇게 3개의 파일을 만들어 server.js에서 작성했던 요청들을 나눈 후 연결시켰습니다.

```javascript
// server.js

...

// 프로젝트 API
app.use('/api/projects', require('./routes/projects'));
// 게임랭크 API
app.use('/api/gamerank', require('./routes/games'));
// 유저 API
app.use('/api/users', require('./routes/users'));
```

<br/>

### MongoDB를 통한 데이터베이스 관리

앞서 작성했던 API들을 통해 다룰 데이터들을 NoSQL 데이터베이스인 MongoDB에 연결하여 저장되게 하였습니다.

처음 데이터관리를 할 때에는 몽고DB 명령어만 사용하여 데이터를 다뤘었는데 NoSQL의 자유로움 때문에 원치않는 타입의 데이터가 입력되는 등 앞으로의 추가적인 기능 확장이나 유지보수 측면에서 좀 더 strict하게 관리를 하고자 mongoose를 도입했습니다.

도입했던 가장 큰 이유 중 하나는 스키마를 사용하는 것이었고 models 폴더를 생성하여 앞서 만들었던 API들에 적용시켜주고자 똑같이 Project.js, Game.js, User.js 파일을 만들어 스키마를 정의해주었습니다.

또한 아직 적용은 못했지만 추후 Games 페이지를 확장하여 유저정보를 도입하고 검색 등 기능을 넣을 때 몽구스의 쿼리 빌더로 쉽게 쿼리를 작성하여 데이터관리를 효율적으로 해보려고 합니다.

```javascript
// models/Game.js

const mongoose = require('mongoose');

const gameRankSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    rank: { type: Array, required: true },
  },
  {
    versionKey: false,
  },
  { collection: 'games' }
);

gameRankSchema.set('collection', 'games');

// 전체 게임의 정보를 받아오는 부분
gameRankSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// 특정 게임의 랭크정보를 받아오는 부분
gameRankSchema.statics.findOneByGameName = function (gameName) {
  return this.findOne(gameName);
};

// 게임 클리어 후 스코어와 플레이어네임을 저장하여 랭크를 업데이트 하는 부분
gameRankSchema.statics.updateByGameName = function (gameName, payload) {
  return this.findOneAndUpdate(gameName, payload, { new: true });
};

module.exports = mongoose.model('games', gameRankSchema);
```
Games 페이지에서 게임을 한 후 기록을 남겨 데이터베이스에 저장될 때 사용되는 모델입니다. 

<br/>

### 어드민 페이지를 통한 프로젝트 관리

현재의 포트폴리오 프로젝트를 만들기 전, 학교 졸업을 준비하며 만들었던 포트폴리오 프로젝트가 있었습니다.

당시에는 서버, 데이터베이스 등에 관한 지식이 부족했던터라 해당 포트폴리오 페이지 내부에 제가 했던 프로젝트들을 보여주기 위해 프로젝트 리스트와 프로젝트 상세페이지들을 하나씩 코딩하고 스타일 입혀가며 작업을 했었습니다. 내용을 추가하거나 수정하기 위해서는 VScode를 열어 다시 코드를 수정하고 재배포하여야 했고 이러한 비효율적인 과정을 줄이고자 이번 포트폴리오 프로젝트에는 어드민 페이지를 도입하여 프로젝트를 관리하고자 합니다.

우선 프로젝트 상세페이지로 쓰일 부분을 디자인하고 컴포넌트를 제작해본 후 해당 규격에 맞추어 Write페이지를 만들었습니다. 사실상 개인 포트폴리오 페이지의 어드민 영역은 작성자 혼자만 보는 곳이고 작성자만 알아보면 되는 것이라는 글을 어드민 페이지 공부를 하며 봤었는데 내가 아닌 다른 사용자들이 보았을 때 사용법을 읽지 않아도 사용할 수 있는 글쓰기 페이지를 만들고 싶었습니다.

Write페이지의 화면은 ProjectDetail의 화면과 거의 유사하게 보이도록 만들었고 내가 지금 쓰는 글이 발행이 되면 어떻게 보이게 될지 바로 유추할 수 있게 하였습니다.

해당 페이지에서 작성한 글 내용은 MongoDB에 저장되며 썸네일, 메인이미지, 서브이미지 같은 이미지 파일은 aws의 s3에 해당 프로젝트명으로 폴더가 자동으로 생성되어 파일이 저장되게 구성하였고 s3에 저장된 이미지의 path를 string으로 받아와 MongoDB에 함께 저장되게 했습니다.

```javascript
// modules/multer.js

const aws = require('aws-sdk');

...

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      let field = file.fieldname;
      let cutField = [...field].indexOf('&');
      cb(null, `${field.substr(0, cutField)}/` + field.substr(cutField + 1) + '-' + Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),

  limits: { fileSize: 5 * 4096 * 4096 }
});

module.exports = upload;

```

위와 같이 multer.js 파일에서 s3에 저장되는 파일의 저장방식을 잡아주어 이미지 파일을 업로드 시켰습니다.

Write페이지에서 필수적으로 입력되어야하는 정보들은 틀을 만들어 작성하도록 하였지만 프로젝트에 대해 자세하게 설명하는 영역에서는 형식에 따르지 않고 자유로운 흐름으로 글을 작성하고자 이미지 에디터 라이브러리를 사용하였습니다. 

사용된 에디터는 Toast UI의 Editor입니다. 리액트로 프로젝트를 진행하다보니 react-editor로 만들었습니다.

참조 : [Toast UI Editor](https://ui.toast.com/tui-editor)

작성된 글 내용을 .getHtml() 함수로 받아와 html형식으로 데이터베이스에 저장하였으며 프로젝트 상세페이지에서는 해당 데이터를 받아와 react-html-parser 라이브러리로 파싱하여 페이지에 뿌려주었고 프로젝트를 수정할 떄 진입하는 AdminEdit페이지에서는 node-html-markdown를 통해 html로 저장된 데이터를 다시 마크다운으로 가져와 처음 글을 작성할 때와 동일한 모습을 보이도록 하였습니다.

리스트 페이지에서는 프로젝트를 수정하거나 삭제할 수 있게 하였고 프로젝트 양이 좀 더 많아지면 정렬과 검색기능을 추가하여 가독성을 높여보려고 합니다.

<br />

### AWS를 통한 배포



