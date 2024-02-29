# TLONA CMS API

### Usage

```
yarn install
docker compose up -d
yarn migration:run
yarn seed:run
yarn start:dev
```

### TODO

- User filter 조건 AND 조건 적용 가능한가? 좀더 편리하게 사용하게 가능한가?
- 테스트 코드 어떻게 할지 동키와 논의하기
- Typeorm Replica 적용
- WebDB에 DB 구축 (잃어버리면 안되는 데이터) Ex. 우편, Push, 공지, 보상관련
- WebDB W/R (레플리카 기능) 구축 - 로컬은 필요없고 라이브에서 미리 연습해보기
- Redis Pub/Sub 구조 구축 (잃어버려도 되는 데이터, 실시간) Ex. 킥기능, 실시간 공지, ElasticCache 사용
- 로그데이터 샤드 정보 접근 (Global DB) 및 샤드 DB 접속 구축 Ex. 한 유저의 로그가 어디에 있는지 파악후 접근, 한번에 10개 DB에 붙어야 함
