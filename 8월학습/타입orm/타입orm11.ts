// Transactions

// Creating and using transactions

// 트랜젝션은 DataSource 또는 EntityManager를 사용해서 만들 수 있음

// await myDataSource.transaction(async (transactionalEntityManager) => {
//     // execute queries using transactionalEntityManager
// })

// 또는

// await myDataSource.manager.transaction(async (transactionalEntityManager) => {
//     // execute queries using transactionalEntityManager
// })

// 트랜젝션에서 실행되기 원하는 동작은 콜백 안에서 실행되어야 함

// await myDataSource.manager.transaction(async (transactionalEntityManager) => {
//     await transactionalEntityManager.save(users)
//     await transactionalEntityManager.save(photos)
//     // ...
// })

// 트랜잭션에서 작업할 때 가장 중요한 제한은 항상 제공된 엔티티 관리자(transactionalEntityManager) 인스턴스를 사용하는 것임
// 전역 엔티티 관리자를 사용하지 말고 제공된 트랜잭션 엔티티 관리자를 사용하여 모든 작업을 실행해야 함



// Specifying Isolation Levels

// 트랜젝션의 격리 level을 지정하려면 첫 번ㅂ째 매개변수로 제공할 수 있음

// await myDataSource.manager.transaction(
//     "SERIALIZABLE",
//     (transactionalEntityManager) => {},
// )

// 격리 level 실행은 모든 데이터베이스를 걸쳐 불가지론적인 것은 아님(agnostic 뜻을 정확하게 모르겠음..)

// 다음 데이터베이스 드라이버는 표준 격리 level을 지원함(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE)

// MySQL
// Postgres
// SQL Server

// SQLite 기본 트랜잭션 값은 SERIALIZABLE 이지만, 공유 cache 모드가 활성화된 경우, 트랜잭션은 READ UNCOMMITTED 격리 level을 사용할 수 있음

// 오라클은 READ COMMITTED과 SERIALIZABLE 격리 level만을 제공함



// Using QueryRunner to create and control state of single database connection

// 쿼리러니는 단일 데이터베이스 연결을 제공함. 트랜잭션은 쿼리 러너를 사용해서 구성됨
// 단일 트랜잭션은 단일 쿼리 러니에서만 설정할 수 있음. 쿼리 러너 인스턴스를 수동으로 생성하여 트랜잭션 상태를 수동으로 제어하는 데 사용할 수 있음

// // create a new query runner
// const queryRunner = dataSource.createQueryRunner()

// // establish real database connection using our new query runner
// await queryRunner.connect()

// // now we can execute any queries on a query runner, for example:
// await queryRunner.query("SELECT * FROM users")

// // we can also access entity manager that works with connection created by a query runner:
// const users = await queryRunner.manager.find(User)

// // lets now open a new transaction:
// await queryRunner.startTransaction()

// try {
//     // execute some operations on this transaction:
//     await queryRunner.manager.save(user1)
//     await queryRunner.manager.save(user2)
//     await queryRunner.manager.save(photos)

//     // commit transaction now:
//     await queryRunner.commitTransaction()
// } catch (err) {
//     // since we have errors let's rollback changes we made
//     await queryRunner.rollbackTransaction()
// } finally {
//     // you need to release query runner which is manually created:
//     await queryRunner.release()
// }

// 쿼리 러너에서 트랜잭션을 조정하는 3가지 방법이 있음
// There are 3 methods to control transactions in QueryRunner:

// startTransaction - 쿼리 러너 내부에서 새로운 트랜잭션을 실행함
// commitTransaction - 쿼리 러너 인스턴스를 사용해서 만들어진 모든 변화를 commit함
// commits all changes made using the query runner instance.
// rollbackTransaction - 쿼리 러너 인스턴스를 사용해서 변경된 내용을 모두 롤백함



// Indices 색인

// Column indices 컬럼 색인
// 색인을 만들고 싶은 컬럼에서 @Index을 사용해서 특정 컬럼에 대한 데이터베이스 색인을 만들 수 있음
// 엔티티의 모든 컬럼에 색인을 만들 수 있음

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index()
//     @Column()
//     firstName: string

//     @Column()
//     @Index()
//     lastName: string
// }

// 색인의 이름도 지정할 수 있음

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index("name1-idx")
//     @Column()
//     firstName: string

//     @Column()
//     @Index("name2-idx")
//     lastName: string
// }


// Unique indices

// 색인 옵션으로 { unique: true }으로 사용해서 유일한 색인을 만들 수 있음

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index({ unique: true })
//     @Column()
//     firstName: string

//     @Column()
//     @Index({ unique: true })
//     lastName: string
// }


// Indices with multiple columns

// 여러 컬럼에 있는 색인을 만들려면 엔티티 자체에 @Index를 넣고 색인에 포함되어야 하는 모든 컬럼 property를 지정해야 함


// Indices
// Column indices
// Unique indices
// Indices with multiple columns
// Spatial Indices
// Disabling synchronization
// # Column indices
// You can create a database index for a specific column by using @Index on a column you want to make an index. You can create indices for any columns of your entity. Example:

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index()
//     @Column()
//     firstName: string

//     @Column()
//     @Index()
//     lastName: string
// }
// You can also specify an index name:

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index("name1-idx")
//     @Column()
//     firstName: string

//     @Column()
//     @Index("name2-idx")
//     lastName: string
// }
// # Unique indices
// To create an unique index you need to specify { unique: true } in the index options:

// Note: CockroachDB stores unique indices as UNIQUE constraints

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Index({ unique: true })
//     @Column()
//     firstName: string

//     @Column()
//     @Index({ unique: true })
//     lastName: string
// }
// # Indices with multiple columns
// To create an index with multiple columns you need to put @Index on the entity itself and specify all column property names which should be included in the index. Example:

// import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// @Entity()
// @Index(["firstName", "lastName"])
// @Index(["firstName", "middleName", "lastName"], { unique: true })
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     middleName: string

//     @Column()
//     lastName: string
// }


// Spatial Indices 공간 색인

// mysql에서 컬럼에 공간 색인을 만들기 위해서는, 색인의 타입을 사용하는 컬럼에 {spatial: true}를 추가
// (geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection)

// @Entity()
// export class Thing {
//     @Column("point")
//     @Index({ spatial: true })
//     point: string
// }


// Disabling synchronization 동기화 미사용

// 타입orm은 일부 색인 옵션과 정의를 지원하지 않음(lower, pg_trgm)
// 데이터베이스 사양이 다르고 기존 데이터베이스 색인에 대한 정보를 얻고 자동으로 동기화하는 여러 가지 문제 때문에!
// 이러한 경우 원하는 색인 서명을 사용해서 수동으로((for example in the migrations)) 색인을 만들어야함
// TypeORM이 이러한 색인을 무시하도록 하려면 @Index decorator에서 synchronize: false 옵션을 사용

// 예를 들어 대소문자를 구분하지 않는 비교가 포함된 색인을 만들 수 있음

// CREATE INDEX "POST_NAME_INDEX" ON "post" (lower("name"))

// 다음 스키마 sync 시 삭제되지 않으려면 이 색인에 대해 sync를 사용하지 않도록 설정

// @Entity()
// @Index("POST_NAME_INDEX", { synchronize: false })
// export class Post {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string
// }