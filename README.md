# JWT-Refresh-Token

`Access Token`의 유효기간을 짧게 가져가고, 유효기간이 조금 더 긴 `Refresh Token`을 발급함으로써 더 나은 보안을 가져 갈 수 있다.

## Process Overview

1. 요청이 들어오면 토큰을 확인한다.
2. 토큰이 없으면 별다른 처리 없이 **NEXT** 👉
3. 유효한 토큰이면 토큰에 저장되어 있는 정보를 `req` 객체에 접근하여 **PASS** 👍
4. 유효하지 않은 토큰이면 Refresh 토큰을 가지고 디코딩!
5. 디코딩 결과 error 가 있다면, 로그인을 해야하고, 없다면, 디코딩 결과를 가지고 사용자🧑‍💼를 찾는다.
6. 사용자도 있다면, 새로운 토큰을 생성하고 쿠키🍪에 세팅

## Setting `.env`

```js
JWT_ACCESS_SECRET= // Access 토큰 키
JWT_REFRESH_SECRET= // Refresh 토큰 키
JWT_ACCESS_EXPIRES_IN= // Access 토큰 유효기간
JWT_REFRESH_EXPIRES_IN= // Refresh 토큰 유효기간
```

> 실제 개발에서는 `.env` 파일은 절대 형상관리를 하면 안된다. `.env.smaple` 과 같은 파일을 생성하여 키만 관리한다.

## How to Start

```bash
$ git clone https://github.com/parkoon/jwt-refresh-token

$ npm i

set .env file

$ npm start
```
