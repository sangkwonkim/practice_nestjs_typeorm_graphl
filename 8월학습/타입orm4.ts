// data source Option

// type - RDBMS 타입, 필수

// extra - 기본 드라이버에 전달할 추가 옵션, 기본 데이터베이스 드라이버에 추가 설정을 전달하려면 이 옵션을 사용

// entities - 데이터 소스에 로드하고 사용할 엔티티, 엔티티 스키마 지정

// subscribers - 데이터 소스에 로드하고 사용할 Subscribers. 자세한 Subscribers는 추후에 학습할 예정

// migrations - 데이터 소스에 로드하고 사용할 migrations. 자세한 migrations은 추후에 학습할 예정

// migrationsRun - 애플리케이션을 실행할 때마다 자동으로 마이그레이션을 할지 여부

// migrationsTableName - 실행될 마이그레이션에 대한 정보를 포함할 데이터베이스의 테이블 이름, 기본적으로 이 테이블명은 '마이그레이션'

// migrationsTransactionMode - migrations의 트랜젝션을 조정 default: all이며, all | none | each 중 선택

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

// metadataTableName - 데이터베이스에서 테이블 메타데이터를 가지는 테이블명, 기본적으로 이 테이블명은 typeorm_metadata

// cache - 엔티티의 결과를 캐싱할 수 있음, true 여부 or { duration: ****ms }로 설정 가능 
//     - QueryBuilder : getMany, getOne, getRawMany, getRawOne and getCount.
//     - Repository and EntityManager : find* and count* methods 

//     캐시할 경우, CLI, migrations, synchronize를 이용해서 데이터 스키마와 싱크를 맞춰야함

//     const users = await dataSource
//     .createQueryBuilder(User, "user")
//     .where("user.isAdmin = :isAdmin", { isAdmin: true })
//     .cache(true)
//     .getMany()

//     const users = await dataSource.getRepository(User).find({
//         where: { isAdmin: true },
//         cache: true,
//     })

//     default 캐시 시간은 1000ms로 1초임, 캐시가 되는 동안에는 삽입된 정보는 캐시된 정보에 포함되어 있지 않아 리턴되지 않음

//     이럴 때는 cache_Id를 설정해서 조정할 수 있음

//     const users = await dataSource
//     .createQueryBuilder(User, "user")
//     .where("user.isAdmin = :isAdmin", { isAdmin: true })
//     .cache("users_admins", 25000)
//     .getMany()

//     const users = await dataSource.getRepository(User).find({
//         where: { isAdmin: true },
//         cache: {
//             id: "users_admins",
//             milliseconds: 25000,
//         },
//     })

//     await dataSource.queryResultCache.remove(["users_admins"])

//     이렇게 cache_Id를 관리함으로써 새로운 값이 추가되었을 때는 캐시를 삭제함으로써 관리할 수 있음

//     query-result-cache라는 별도의 테이블을 사용하며 모든 쿼리와 결과를 저장, tableName 속성에 다른 값을 지정하여 테이블명 변경 가능

//     {
//         type: "mysql",
//         host: "localhost",
//         username: "test",
//         ...
//         cache: {
//             type: "database",
//             tableName: "configurable-table-query-result-cache"
//         }
//     }

//     단일 데이터베이스 테이블에 캐시를 저장하는 것이 효과적이지 않은 경우 캐시 유형을 "redis" 또는 "ioredis"로 변경할 수 있으며 TypeORM은 캐시된 모든 레코드를 redis로 저장

//     {
//         type: "mysql",
//         host: "localhost",
//         username: "test",
//         ...
//         cache: {
//             type: "redis",
//             options: { 상황에 맞는 옵션을 사용 가능
//                 host: "localhost",
//                 port: 6379
//             }
//         }
//     }

//     provider factory 함수를 사용해서 캐시 관련 정보를 직접 만들 수 있음

//     class CustomQueryResultCache implements QueryResultCache {
//         constructor(private dataSource: DataSource) {}
//         ...
//     }



//     {
//         ...
//         cache: {
//             provider(dataSource) {
//                 return new CustomQueryResultCache(dataSource);
//             }
//         }
//     }

//     에러 캐싱 거부

//     {
//         type: "mysql",
//         host: "localhost",
//         username: "test",
//         ...
//         cache: {
//             type: "redis",
//             options: {
//                 host: "localhost",
//                 port: 6379
//             },
//             ignoreErrors: true
//         }
//     }

//     typeorm cache:clear 를 통해서 저장된 캐시를 삭제할 수 있음

// cli.entitiesDir - CLI에 의해 생성되는 엔티티가 저장되는 디렉토리

// cli.subscribersDir - CLI에 의해 생성되는 subscribers가 저장되는 디렉토리


// mysql data source options

// dateStrings - TIMESTAMP, DATETIME, DATE와 같은 날짜 유형을 자바스크립트 Date 객체가 아닌 문자열로 리턴 여부, true/false 또는 문자열로 변경할 타입을 배열에 담아서 설정 가능

// debug - 프로토콜 세부 정보를 stdout에 출력. true/false 또는 출력 패킷 유형 이름을 배열에 담아서 설정 가능
//     - 표준 스트림(standard stream)이라고 하며 운영 체제에서 기본적으로 제공하는 추상화된 입출력 장치
//         - 표준입력(STDIN): 표준 입력 장치의 ID 는 숫자로는 0 이며 일반적으로는 키보드가 됩니다.
//         - 표준출력(STDOUT):  출력을 위한 스트림으로 표준 출력 장치의 ID 는 1이며 일반적으로는 현재 쉘을 실행한 콘솔(console)이나 터미널(terminal)이 됩니다.
//         - 표준에러(STDERR):  에러를 위한 스트림으로 표준 에러 장치의 ID 는 2이며 일반적으로는 표준 출력과 동일합니다.





    









