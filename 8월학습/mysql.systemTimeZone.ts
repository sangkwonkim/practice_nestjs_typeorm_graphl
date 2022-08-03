// class는 기간이 존재하는 강의(exist)와 기간이 존재하지 않는 강의(notExist)로 이루어질 수 있음

// exist의 경우, 강의가 시작하는 시간과 끝나는 시간, 요일을 계산해서 강의 기간에 맞춰 강의 날짜와 시간을 생성함

// local mysql의 time_zone은 KST이고, rds의 time_zone이 UTC로 서로 달라 강의 날짜와 시간을 생성하는 데 시간이 맞지 않는 문제가 발생함

// mysql local의 시간 UTC로 변경

// mysql에 접속 후 select @@global.time_zone, @@session.time_zone,@@system_time_zone 을 검색하면 mysql 시간이 확인됨

// global.time_zone, session.time_zone이 system을 따르고 있고, system time zone은 KST로 확인됨

// global.time_zone, session.time_zone를 UTC로 변경함

// SET GLOBAL time_zone='UTC' 쿼리는 동작하지 않아 MySql 홈페이지에서 Time zone description tables에 접속,
// timezone_2022a_leaps.zip - Non POSIX with leap seconds   [md5 | signature] 다운받음

// 압출을 풀면 mysql에 쿼리문들이 자동으로 작성되며, 실행 시키면, SET GLOBAL time_zone='UTC' 쿼리가 동작함
// 글로벌 타임과 세션타임을 변경 해줌으로써 local도 UTC로 변경할 수 있음.





// Ignoring invalid timezone passed to Connection: UTC. This is currently a warning, but in future versions of MySQL2, an error will be thrown if you pass an invalid configuration option to a Connection

// mysql 타임존 변경 후 서버를 실행시킬 때 다음과 같은 에러가 발생했습니다.

// 구글링으로 알아보니 typeorm.cofig에서 타임존을 문자열로 넣을 경우, 인식이 안되서 발생하는 에러로, 이를 시간으로 변경하여 해결할 수 있다는 것을 알게되었습니다.