// data source Option

// type - RDBMS 타입, 필수

// extra - 기본 드라이버에 전달할 추가 옵션, 기본 데이터베이스 드라이버에 추가 설정을 전달하려면 이 옵션을 사용

// entities - 데이터 소스에 로드하고 사용할 엔티티, 엔티티 스키마 지정

// subscribers - 데이터 소스에 로드하고 사용할 Subscribers. 자세한 Subscribers는 추후에 학습할 예정

// migrations - 데이터 소스에 로드하고 사용할 migrations. 자세한 migrations은 추후에 학습할 예정

// logging - 쿼리나 에러를 로그
//     - query - logs all queries.
//     - error - logs all failed queries and errors.
//     - schema - logs the schema build process.
//     - warn - logs internal orm warnings.
//     - info - logs internal orm informative messages.
//     - log - logs internal orm log messages.

// logger - 로그를 나타내는 곳
//     advanced-console - this is the default logger which logs all messages into the console using color and sql syntax highlighting (using chalk).
//     simple-console - this is a simple console logger which is exactly the same as the advanced logger, but it does not use any color highlighting. This logger can be used if you have problems / or don't like colorized logs.
//     file - this logger writes all logs into ormlogs.log in the root folder of your project (near package.json).
//     debug - this logger uses debug package, to turn on logging set your env variable DEBUG=typeorm:* (note logging option has no effect on this logger).

// maxQueryExecutionTime - 특정 쿼리의 실행 시간이 이 옵션에서 정한 시간보다 초과할 경우, 해당 쿼리가 Log

// namingStrategy - 테이블과 컬럼의 명을 정할 때 사용할 규칙

// entityPrefix - 데이터 소스의 모든 테이블 또는 컬렉션에 지정한 문자열이 접두사로 지정됨

// entitySkipConstructor - 데이터베이스의 엔티티를 deserializing할 때 constructors를 생략할지 여부, 생성자를 호출하지 않으면 개별 프로퍼티나 default 프로퍼티가 제대로 동작하지 않을 수 있음
// Serialization means to convert an object into that string, and deserialization is its inverse operation (convert string -> object).

// dropSchema - 데이터 소스가 초기화 될 때마다 스키마 삭제 여부

// synchronize - 코드와 데이터베이스의 싱크 여부