# TripMate 여행 동반자 with NEXT.js

🔗 Deployment URL
https://travel-webapp-eta.vercel.app/


## 프로젝트 소개
_" 다채롭고 아름다운 국내여행지 찾기 "_

> 'TripMate'는 사용자 맞춤 여행 서치 웹 애플리케이션으로, 여행 계획을 쉽게 생성하고 관리할 수 있는 기능을 제공합니다. 초기에는 React와 JavaScript로 구축되어 있었으나, 최신 기술 도입 및 성능 최적화를 위해 Next.js와 TypeScript로 마이그레이션하였습니다.


## 프로젝트 특징


- **TypeScript 도입으로 코드 안정성 강화**
  - 기존 JavaScript에서 TypeScript로 변환함으로써 타입 검사를 통해 코드의 안정성을 높였으며, 런타임 에러를 줄이고 유지보수를 용이하게 하였습니다.
  

- **코드 구조 개선**
  - 모듈화된 구조와 컴포넌트 기반 설계로 코드의 재사용성을 높이고, 확장성과 가독성을 크게 개선하였습니다.


- **유연한 배포 환경**
  - Next.js의 하이브리드 기능을 활용해 정적 페이지와 서버 사이드 페이지를 동시에 처리할 수 있어 다양한 배포 환경에 맞게 유연한 대응이 가능해졌습니다.


## 기술 스택

> `React` `Redux` `SCSS` `JavaScript` `Vercel` `NEXT.js` `typescrpt` `react-query`


## 주요 기능
- 서버 사이드 렌더링(SSR): Next.js의 SSR 기능을 활용하여 초기 로딩 시간 1초 이내로 단축.

- 데이터 패칭 최적화: React-Query를 도입해 여행지 데이터 조회 시 캐싱 및 비동기 처리 속도 약 30% 개선.

- OAuth 소셜 로그인: OAuth를 통해 Google, Github, Kakao 등 소셜 로그인 기능을 구현하여 로그인 편의성을 제공.

- MongoDB 사용: 데이터 저장소로 MongoDB를 사용하여 데이터를 효율적으로 관리하고 확장 가능하게 만듦.


## 성과
- 타입 안정성: TypeScript 도입으로 타입 오류를 줄이고 코드 품질을 높여 전체 프로젝트 안정성 강화.

- 로딩 속도: SSR과 React-Query로 API 호출 시 1.5초에서 0.7초로 단축

## 배운 점
서버 사이드 렌더링의 중요성을 체감했고, 타입 안정성을 확보하면서 오류를 줄이는 방법을 이해함.

MongoDB 및 React-Query와의 비동기 데이터 처리 경험을 통해 확장 가능한 API 패턴 설계 능력 향상.


## 프로젝트 구성
### 기존 TripMate와 동일
- 메인화면
- 관광지 탐색 페이지
- 내 주변 장소 찾기
- 상세페이지
  
🔗 [참고](https://github.com/solasolabeam/travel-web/blob/main/README.md)

###  로그인 / 로그오프 / 회원가입
![image.jpg1](https://velog.velcdn.com/images/so2i/post/3cf2d0ae-6f73-4ee9-81a6-e4f8e02993ae/image.PNG) |![image.jpg2](https://velog.velcdn.com/images/so2i/post/9bb98593-30b3-4450-aa78-f59552c79b45/image.PNG) | ![image.jpg3](https://velog.velcdn.com/images/so2i/post/e7d83354-3437-4375-964b-b125682c3bf3/image.PNG)
--- | --- | --- |


Credentials Provider를 사용해 만든 로그인 페이지는 이메일, 사용자 이름, 비밀번호 등 사용자 제공 데이터를 사용해 서버 측에서 인증을 수행하는 방식입니다. 
Google, Github, Kakao로 **OAuth** 인증을 통한 로그인도 가능합니다.



###  북마크 기능
![](https://velog.velcdn.com/images/so2i/post/4c333217-06f7-45f8-9d8d-d37b3f1d19c2/image.PNG)

MongoDB를 사용한 북마크 기능은 사용자가 특정 콘텐츠를 북마크할 수 있게 하고, 이 정보를 MongoDB에 저장하여 필요한 시점에 다시 불러오는 기능입니다. MongoDB의 문서 기반 구조 덕분에 북마크 데이터를 유연하게 저장하고 관리할 수 있습니다.


###  마이페이지
<p text-align="center">
<img src="https://velog.velcdn.com/images/so2i/post/2ca45f89-80a0-449c-8eca-035284aa0b52/image.PNG" width="80%" height="50%" /></p>
  

마이페이지는 사용자 개인의 정보를 한눈에 확인하고 관리할 수 있는 공간입니다. 이 페이지에서는 **회원 정보**, **북마크**, **최근 본 장소**를 확인할 수 있어 사용자의 편리한 경험을 제공합니다.
