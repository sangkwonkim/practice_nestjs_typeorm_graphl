// Multiple data sources, databases, schemas and replication setup

// Using multiple data sources
// 다른 데이터베이스에서 연결된 복수의 데이터 소스를 이용하는 방법 
// import { DataSource } from "typeorm"

// const db1DataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "admin",
//     database: "db1",
//     entities: [__dirname + "/entity/*{.js,.ts}"],
//     synchronize: true,
// })

// const db2DataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "admin",
//     database: "db2",
//     entities: [__dirname + "/entity/*{.js,.ts}"],
//     synchronize: true,
// })



// Using multiple databases within a single data source in mysql and mssql databases.
// 하나의 데이터 소스 내부의 복수 데이터 베이스를 사용하는 방법

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity({ database: "secondDB" })
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string
// }
// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity({ database: "thirdDB" })
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     url: string
// }

// 유저 엔티티는 secondDB 데이터베이스 내부에서 생성되고, 포토 엔티티는 thirdDB 데이터베이스에서 생성됨
// 다른 모든 엔티티는 데이터 소스 옵션에서 정의된 기본 데이터베이스 내부에서 생성됨

// 다른 데이터베이스에서 데이터를 선택하려면 엔티티만 제공하면 됨

// const users = await dataSource
//     .createQueryBuilder()
//     .select()
//     .from(User, "user")
//     .addFrom(Photo, "photo")
//     .andWhere("photo.userId = user.id")
//     .getMany() // userId is not a foreign key since its cross-database request

// 엔티티 대신 테이블 경로를 명시할 수도 있음

// const users = await dataSource
//     .createQueryBuilder()
//     .select()
//     .from("secondDB.user", "user")
//     .addFrom("thirdDB.photo", "photo")
//     .andWhere("photo.userId = user.id")
//     .getMany() // userId is not a foreign key since its cross-database request




// Using multiple schemas within a single data source in postgres and mssql databases

// 애플리케이션에서 복수의 스키마 사용하려면 각 엔티티에 스키마를 설정하면 됨

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity({ schema: "secondSchema" })
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string
// }
// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity({ schema: "thirdSchema" })
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     url: string
// }

// 유저 엔티티는 secondSchema 스키마에 생성되며, 포토 엔티티는 thirdSchema 스키마에 생성됨
// 다른 모든 엔티티는 데이터 소스 옵션에서 정의한 기본 데이터 베이스에서 생성됨

// 다른 스키마에서 데이터를 선택하려면 엔티티만 제공하면 됨
// const users = await dataSource
//     .createQueryBuilder()
//     .select()
//     .from(User, "user")
//     .addFrom(Photo, "photo")
//     .andWhere("photo.userId = user.id")
//     .getMany() // userId is not a foreign key since its cross-database request

// 엔티티 대신 테이블 경로를 명시할 수도 있음

// const users = await dataSource
//     .createQueryBuilder()
//     .select()
//     .from("secondSchema.user", "user") // in mssql you can even specify a database: secondDB.secondSchema.user
//     .addFrom("thirdSchema.photo", "photo") // in mssql you can even specify a database: thirdDB.thirdSchema.photo
//     .andWhere("photo.userId = user.id")
//     .getMany()


// 타입orm으로 읽기/쓰기 복제 생성하기
// {
//   type: "mysql",
//   logging: true,
//   replication: {
//     master: {
//       host: "server1",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     },
//     slaves: [{
//       host: "server2",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     }, {
//       host: "server3",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     }]
//   }
// }

// 모든 스키마 수정 및 쓰기 작업은 마스터 서버를 사용하여 실행됨
// find 메서드 또는 select query builder에서 수행되는 모든 단순 쿼리는 임의 슬레이브 인스턴스를 사용함
// 쿼리 메서드에 의해 수행되는 모든 쿼리는 마스터 인스턴스를 사용하여 수행됨

// 쿼리 작성기에서 만든 SELECT에서 마스터를 사용하려면 
// const masterQueryRunner = dataSource.createQueryRunner("master")
// try {
//     const postsFromMaster = await dataSource
//         .createQueryBuilder(Post, "post")
//         .setQueryRunner(masterQueryRunner)
//         .getMany()
// } finally {
//     await masterQueryRunner.release()
// }

// 로우쿼리에서 슬레이브 사용하기
// const slaveQueryRunner = dataSource.createQueryRunner("slave")
// try {
//     const userFromSlave = await slaveQueryRunner.query(
//         "SELECT * FROM users WHERE id = $1",
//         [userId],
//         slaveQueryRunner,
//     )
// } finally {
//     return slaveQueryRunner.release()
// }

// QueryRunner에서 만든 연결을 명시적으로 해제해야 함

// 복제는 mysql, postgres 및 sql 서버 데이터베이스에서 지원

// Mysql은 심층 구성을 지원

// {
//   replication: {
//     master: {
//       host: "server1",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     },
//     slaves: [{
//       host: "server2",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     }, {
//       host: "server3",
//       port: 3306,
//       username: "test",
//       password: "test",
//       database: "test"
//     }],

//     /**
//     * If true, PoolCluster will attempt to reconnect when connection fails. (Default: true)
//     */
//     canRetry: true,

//     /**
//      * If connection fails, node's errorCount increases.
//      * When errorCount is greater than removeNodeErrorCount, remove a node in the PoolCluster. (Default: 5)
//      */
//     removeNodeErrorCount: 5,

//     /**
//      * If connection fails, specifies the number of milliseconds before another connection attempt will be made.
//      * If set to 0, then node will be removed instead and never re-used. (Default: 0)
//      */
//      restoreNodeTimeout: 0,

//     /**
//      * Determines how slaves are selected:
//      * RR: Select one alternately (Round-Robin).
//      * RANDOM: Select the node by random function.
//      * ORDER: Select the first node available unconditionally.
//      */
//     selector: "RR"
//   }
// }
// poolCluster는 단일 DB를 연결하는 Connection Pool 외에 여러 개의 데이터 베이스를 연결하는 Conneciton Pool이다.
// 이 poolCluster는 동시에 여러 개의 ConnectionPool을 포함하는 일종의 집합이다.

