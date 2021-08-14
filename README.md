# OKYA 소개

<h2>오키야! 우린 뭐든 오케이야!</h2>
긍정적인 포부를 담은 팀 이름입니다.

글로벌 가구 사이트, `IKEA`를 모티브로 한 팀 프로젝트를 진행 했습니다. 

# 👩‍👩‍👧‍👦 팀원 구성
- [김지현 (BE)](https://github.com/hxyxneee)
- [최민기 (FE)](https://github.com/samankey)
- [김민성 (FE)](https://github.com/Minseongkimm)
- [오송미 (FE)](https://github.com/songmiO)

# 🗓 프로젝트 기간
2021.07.26 ~ 2021.8.10

# Skills
- `Frontend`: React, React-Hooks, React-Router, Styled-Component, Javascript

- `Backend`: Node.js, Express, Prisma, MySQL, Jest, Bcrypt, Json Web Token

# OKYA Frontend Repository
- [OKYA FE](https://github.com/wecode-bootcamp-korea/fullstack1-2nd-OKYA-frontend)

# Modeling

<img width="1433" alt="스크린샷 2021-08-14 오전 12 19 07" src="https://user-images.githubusercontent.com/81766172/129381350-6457ab2a-a2e9-4e75-8277-7b7a9e277a0b.png">

# Backend 구현 기능 상세

### 1. 공통 구현 사항
- Layered Pattern에 입각하여 코드의 기능, 역할 별로 Route, Controller, Service, Model을 나누어 코드 설계 

### 2. Modeling / Database
- Aquery Tool을 이용하여 전체적인 모델링 구조 설계
- Prisma schema 모델을 이용하여 MySQL Database 입력
- DB로의 데이터 삽입을 위해 csv file 및 dataUploader/readData.js 파일 사용

### 3. 일반 로그인 API
- prisma orm 문법 도입 및 적용
- JSON WEB TOKEN을 활용하여 유저 로그인 시 토큰 발행
- 회원 가입 시 입력된 정보와 비교 후 일치하는 유저라면 로그인 성공 메세지와 함께 token 발행, 그렇지 않다면 오류 메세지 출력
- 필수 `key value`인 이메일, 패스워드 미 입력 시 오류 메세지 출력
- JEST를 활용한 유닛 테스트 수행

### 4. 일반 회원가입 API
- prisma orm 문법 도입 및 적용
- 유저의 이메일, 비밀번호, 이름, 도로명 주소, 상세 주소, 우편 번호, 휴대폰 번호 입력 유도
- 필수 `key value` 누락 시, `KEY ERROR` 오류 출력
- 이미 존재하는 유저의 정보로 가입 시도 시, 오류 메세지 출력
- bcrypt를 활용하여 유저 비밀번호 암호화 
- JEST를 활용한 유닛 테스트 수행

### 5. 카카오 소셜 로그인 API
- prisma orm 문법 도입 및 적용
- 외부 API인 카카오 API를 통해 유저의 로그인, 회원 가입 진행
- 클라이언트로부터 전달 받은 access token을 가지고 카카오 측 API를 호출
- 카카오 API 호출 후 카카오 측에게 유저 정보 요청 
- 카카오 측으로 전달 받은 유저 정보가 database에 저장된 유저라면 바로 로그인 실행 및 백엔드 토큰을 클라이언트로 전달
- database에 저장되지  않은 유저라면 회원 가입 진행 후 백엔드 토큰을 클라이언트로 전달

### 6. 토큰 인가 미들웨어
- prisma orm 문법 도입 및 적용
- 토큰을 가진 유저만 장바구니에 물건을 담을 수 있다. 따라서 장바구니 API 실행 전 반드시 유효한 유저인지 토큰을 식별하는 토큰 인가 미들웨어가 필요.
- 공통 사용을 위한 토큰 인가 미들웨어를 따로 생성하여 여러 기능에서 재사용

### 7. 장바구니 CREATE API
- prisma orm 문법 도입 및 적용
- create (post) method 실행 전, 유효한 유저인지 (로그인 된 유저인 지) 판별하는 과정을 거침
- 만약 로그인 된 유저라면 create method가 실행된다. 
- 리스트 페이지에서 해당 item의 장바구니 버튼을 클릭하게 되면, 그 시점에 create가 실행
- 상품의 아이디, 수량이 필수 key이며 로그인 한 유저가 특정 상품의 장바구니를 클릭하게 되면
상품의 아이디 및 수량 (default 1개)가 담기게 되고, 
해당 정보를 바탕으로 create가 실행

### 8. 장바구니 READ API
- prisma orm 문법 도입 및 적용
- read (get) method 실행 전, 유효한 유저인지 (로그인 된 유저인 지) 판별하는 과정을 거침
- 로그인 된 유저에 한해서 read method가 실행된다. 
- 리스트 페이지에서 create가 실행된 후, 장바구니 (cart) 페이지로 이동하게 되면 create 된 상품 리스트를 확인 가능
- 상품 아이디, 이미지 url, 상품 이름, 상품 설명, 상품 가격 등의 정보와 함께 
해당 상품의 cart id까지 함께 출력

### 9. 장바구니 UPDATE API
- prisma orm 문법 도입 및 적용
- update (patch) method 실행 전, 유효한 유저인지 (로그인 된 유저인 지) 판별하는 과정을 거침
- 로그인 된 유저에 한해서 update method가 실행된다. 
- 클라이언트로부터 `isIncrement`라는 인자를 받아온다. 만약 인자의 값이 true 라면 수량의 증가가, false 라면 수량의 감소가 이루어진다.

### 10. 장바구니 DELETE API
- prisma orm 문법 도입 및 적용
- delete method 실행 전, 유효한 유저인지 (로그인 된 유저인 지) 판별하는 과정을 거침
- 로그인 된 유저에 한해서 delete method가 실행된다. 
- read API 실행 시, 상품 카트 아이디를 함께 받아왔기 때문에 
해당 상품 카드의 아이디를 삭제해주는 (즉, 상품 정보 자체를 모두 삭제하는) 과정을 거친다. 


# References
- 이 프로젝트는 [IKEA](https://www.ikea.com/kr/ko/) 사이트를 참조하여 학습목적으로 만들었습니다. 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진과 동영상은 [unsplash](https://unsplash.com/)와 [pixabay](https://pixabay.com/)에서 공유받은 Free 이미지 및 동영상이므로 해당 프로젝트 외부인이 사용할 수 없습니다.


