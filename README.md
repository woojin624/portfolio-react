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
// Projects.js

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

const loadingSuccess = (data) => {
  return {
    type: GLOBAL_LOADED_SUCEESS,
    payload: data,
  };
};

const loadingFailure = (err) => {
  return {
    type: GLOBAL_LOADED_FAILURE,
    payload: err,
  };
};

const loadingRequest = () => {
  return {
    type: GLOBAL_LOADED_REQUEST,
  };
};

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


### NodeJs로 RESTful API 구성


### MongoDB를 통한 데이터베이스 관리


### 어드민 페이지를 통한 프로젝트 관리









