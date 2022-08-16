// // Transactions

// // Creating and using transactions

// // 트랜젝션은 DataSource 또는 EntityManager를 사용해서 만들 수 있음

// // await myDataSource.transaction(async (transactionalEntityManager) => {
// //     // execute queries using transactionalEntityManager
// // })

// // 또는

// // await myDataSource.manager.transaction(async (transactionalEntityManager) => {
// //     // execute queries using transactionalEntityManager
// // })

// // 트랜젝션에서 실행되기 원하는 동작은 콜백 안에서 실행되어야 함

// // await myDataSource.manager.transaction(async (transactionalEntityManager) => {
// //     await transactionalEntityManager.save(users)
// //     await transactionalEntityManager.save(photos)
// //     // ...
// // })

// // 트랜잭션에서 작업할 때 가장 중요한 제한은 항상 제공된 엔티티 관리자(transactionalEntityManager) 인스턴스를 사용하는 것임
// // 전역 엔티티 관리자를 사용하지 말고 제공된 트랜잭션 엔티티 관리자를 사용하여 모든 작업을 실행해야 함



// // Specifying Isolation Levels

// // 트랜젝션의 격리 level을 지정하려면 첫 번ㅂ째 매개변수로 제공할 수 있음

// // await myDataSource.manager.transaction(
// //     "SERIALIZABLE",
// //     (transactionalEntityManager) => {},
// // )

// // 격리 level 실행은 모든 데이터베이스를 걸쳐 불가지론적인 것은 아님(agnostic 뜻을 정확하게 모르겠음..)

// // 다음 데이터베이스 드라이버는 표준 격리 level을 지원함(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE)

// // MySQL
// // Postgres
// // SQL Server

// // SQLite 기본 트랜잭션 값은 SERIALIZABLE 이지만, 공유 cache 모드가 활성화된 경우, 트랜잭션은 READ UNCOMMITTED 격리 level을 사용할 수 있음

// // 오라클은 READ COMMITTED과 SERIALIZABLE 격리 level만을 제공함



// // Using QueryRunner to create and control state of single database connection

// // 쿼리러니는 단일 데이터베이스 연결을 제공함. 트랜잭션은 쿼리 러너를 사용해서 구성됨
// // 단일 트랜잭션은 단일 쿼리 러니에서만 설정할 수 있음. 쿼리 러너 인스턴스를 수동으로 생성하여 트랜잭션 상태를 수동으로 제어하는 데 사용할 수 있음

// // // create a new query runner
// // const queryRunner = dataSource.createQueryRunner()

// // // establish real database connection using our new query runner
// // await queryRunner.connect()

// // // now we can execute any queries on a query runner, for example:
// // await queryRunner.query("SELECT * FROM users")

// // // we can also access entity manager that works with connection created by a query runner:
// // const users = await queryRunner.manager.find(User)

// // // lets now open a new transaction:
// // await queryRunner.startTransaction()

// // try {
// //     // execute some operations on this transaction:
// //     await queryRunner.manager.save(user1)
// //     await queryRunner.manager.save(user2)
// //     await queryRunner.manager.save(photos)

// //     // commit transaction now:
// //     await queryRunner.commitTransaction()
// // } catch (err) {
// //     // since we have errors let's rollback changes we made
// //     await queryRunner.rollbackTransaction()
// // } finally {
// //     // you need to release query runner which is manually created:
// //     await queryRunner.release()
// // }

// // 쿼리 러너에서 트랜잭션을 조정하는 3가지 방법이 있음
// // There are 3 methods to control transactions in QueryRunner:

// // startTransaction - 쿼리 러너 내부에서 새로운 트랜잭션을 실행함
// // commitTransaction - 쿼리 러너 인스턴스를 사용해서 만들어진 모든 변화를 commit함
// // commits all changes made using the query runner instance.
// // rollbackTransaction - 쿼리 러너 인스턴스를 사용해서 변경된 내용을 모두 롤백함



// // Indices 색인

// // Column indices 컬럼 색인
// // 색인을 만들고 싶은 컬럼에서 @Index을 사용해서 특정 컬럼에 대한 데이터베이스 색인을 만들 수 있음
// // 엔티티의 모든 컬럼에 색인을 만들 수 있음

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index()
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index()
// //     lastName: string
// // }

// // 색인의 이름도 지정할 수 있음

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index("name1-idx")
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index("name2-idx")
// //     lastName: string
// // }


// // Unique indices

// // 색인 옵션으로 { unique: true }으로 사용해서 유일한 색인을 만들 수 있음

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index({ unique: true })
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index({ unique: true })
// //     lastName: string
// // }


// // Indices with multiple columns

// // 여러 컬럼에 있는 색인을 만들려면 엔티티 자체에 @Index를 넣고 색인에 포함되어야 하는 모든 컬럼 property를 지정해야 함


// // Indices
// // Column indices
// // Unique indices
// // Indices with multiple columns
// // Spatial Indices
// // Disabling synchronization
// // # Column indices
// // You can create a database index for a specific column by using @Index on a column you want to make an index. You can create indices for any columns of your entity. Example:

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index()
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index()
// //     lastName: string
// // }
// // You can also specify an index name:

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index("name1-idx")
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index("name2-idx")
// //     lastName: string
// // }
// // # Unique indices
// // To create an unique index you need to specify { unique: true } in the index options:

// // Note: CockroachDB stores unique indices as UNIQUE constraints

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Index({ unique: true })
// //     @Column()
// //     firstName: string

// //     @Column()
// //     @Index({ unique: true })
// //     lastName: string
// // }
// // # Indices with multiple columns
// // To create an index with multiple columns you need to put @Index on the entity itself and specify all column property names which should be included in the index. Example:

// // import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

// // @Entity()
// // @Index(["firstName", "lastName"])
// // @Index(["firstName", "middleName", "lastName"], { unique: true })
// // export class User {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Column()
// //     firstName: string

// //     @Column()
// //     middleName: string

// //     @Column()
// //     lastName: string
// // }


// // Spatial Indices 공간 색인

// // mysql에서 컬럼에 공간 색인을 만들기 위해서는, 색인의 타입을 사용하는 컬럼에 {spatial: true}를 추가
// // (geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection)

// // @Entity()
// // export class Thing {
// //     @Column("point")
// //     @Index({ spatial: true })
// //     point: string
// // }


// // Disabling synchronization 동기화 미사용

// // 타입orm은 일부 색인 옵션과 정의를 지원하지 않음(lower, pg_trgm)
// // 데이터베이스 사양이 다르고 기존 데이터베이스 색인에 대한 정보를 얻고 자동으로 동기화하는 여러 가지 문제 때문에!
// // 이러한 경우 원하는 색인 서명을 사용해서 수동으로((for example in the migrations)) 색인을 만들어야함
// // TypeORM이 이러한 색인을 무시하도록 하려면 @Index decorator에서 synchronize: false 옵션을 사용

// // 예를 들어 대소문자를 구분하지 않는 비교가 포함된 색인을 만들 수 있음

// // CREATE INDEX "POST_NAME_INDEX" ON "post" (lower("name"))

// // 다음 스키마 sync 시 삭제되지 않으려면 이 색인에 대해 sync를 사용하지 않도록 설정

// // @Entity()
// // @Index("POST_NAME_INDEX", { synchronize: false })
// // export class Post {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Column()
// //     name: string
// // }


// Entity Listeners and Subscribers

// 모든 엔티티는 특정 엔티티 이벤트를 수신하는 커스텀 로직을 가진 method를 가질 수 있음
// 어떤 이벤트를 수신할 지에 따라 그 방법들을 특별헌 데코레이터로 표시해야함

// listener 내부에서 데이터베이스를 호출하지 말고 대신 subscribers를 선태하셈


// @AfterLoad
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterLoad로 표시할 수 있음
// 그러면 타입orm은 엔티티가 쿼리빌더나 repository/manager의 find 메소드에 의해 로드될 때마다 호출할 것임

// @Entity()
// export class Post {
//     @AfterLoad()
//     updateCounters() {
//         if (this.likesCount === undefined) this.likesCount = 0
//     }
// } // view 카운트 올리기, 방문 기록 등 여부 확인 가능할 듯


// @BeforeInsert
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @BeforeInsert로 표시할 수 있음
// 그러면 타입orm은 repository/manager save에 의해 엔티티에 insert되기 전에 호출할 것임 

// @Entity()
// export class Post {
//     @BeforeInsert()
//     updateDates() {
//         this.createdDate = new Date()
//     }
// }


// @AfterInsert
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterInsert으로 표시할 수 있음
// 그러면 타입orm은 repository/manager save에 의해서 엔티티에 insert된 후에 호출할 것임

// @Entity()
// export class Post {
//     @AfterInsert()
//     resetCounters() {
//         this.counters = 0
//     }
// }


// @BeforeUpdate
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @BeforeUpdate로 표시할 수 있음
// 그러면 타입orm은 repository/manager save에 의해서 존재하는 엔티티를 업데이트하기 전에 호출할 것임
// 그러나, 모델 내부의 정보가 바뀔 때에만 한해서 실행될 것임
// 모델에서 아무것도 수정하지 않고 저장을 실행하면 @BeforeUpdate 및 @AfterUpdate가 실행되지 않음

// @Entity()
// export class Post {
//     @BeforeUpdate()
//     updateDates() {
//         this.updatedDate = new Date()
//     }
// }


//  @AfterUpdate
//  엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterUpdate로 표시할 수 있음
//  그러면 타입orm은 repository/manager save에 의해서 존재하는 엔티티를 업데이트한 후에 호출할 것임

// @Entity()
// export class Post {
//     @AfterUpdate()
//     updateCounters() {
//         this.counter = 0
//     }
// }


// @BeforeRemove
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @BeforeRemove로 표시할 수 있음
// 그러면 타입orm은 repository/manager remove에 의해서 엔티티를 삭제하기 전에 호출할 것임


// @Entity()
// export class Post {
//     @BeforeRemove()
//     updateStatus() {
//         this.status = "removed"
//     }
// }


// @AfterRemove
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterRemove로 표시할 수 있음
// 그러면 타입orm은 repository/manager remove에 의해서 엔티티를 삭제한 후에 호출할 것임

// @Entity()
// export class Post {
//     @AfterRemove()
//     updateStatus() {
//         this.status = "removed"
//     }
// }


// @BeforeSoftRemove
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @BeforeSoftRemove로 표시할 수 있음
// 그러면 타입orm은 repository/manager softRemove에 의해서 엔티티를 soft-delete하기 전에 호출할 것임

// @Entity()
// export class Post {
//     @BeforeSoftRemove()
//     updateStatus() {
//         this.status = "soft-removed"
//     }
// }


// @AfterSoftRemove
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterSoftRemove로 표시할 수 있음
// 그러면 타입orm은 repository/manager softRemove에 의해서 엔티티를 soft-delete한 후에 호출할 것임

// @Entity()
// export class Post {
//     @AfterSoftRemove()
//     updateStatus() {
//         this.status = "soft-removed"
//     }
// }


// @BeforeRecover
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @BeforeRecover로 표시할 수 있음
// 그러면 타입orm은 repository/manager recover에 의해서 엔티티를 recover하기 전에 호출할 것임

// @Entity()
// export class Post {
//     @BeforeRecover()
//     updateStatus() {
//         this.status = "recovered"
//     }
// }


// @AfterRecover
// 엔티티에 임의의 이름을 가진 메서드를 정의하고 @AfterRecover로 표시할 수 있음
// 그러면 타입orm은 repository/manager recover에 의해서 엔티티를 recover한 후에 호출할 것임

// @Entity()
// export class Post {
//     @AfterSoftRemove()
//     updateStatus() {
//         this.status = "recovered"
//     }
// }



// What is a Subscriber
// 특정 엔티티의 이벤트나, 엔티티 이벤트를 listen할 수 있는 event subscriber로 class를 표시함.
// QueryBuilder와 repository/manager methods를 사용함으로써 이벤트가 발생함

// @EventSubscriber()
// export class PostSubscriber implements EntitySubscriberInterface<Post> {
//     /**
//      * Indicates that this subscriber only listen to Post events.
//      */
//     listenTo() {
//         return Post
//     }

//     /**
//      * Called before post insertion.
//      */
//     beforeInsert(event: InsertEvent<Post>) {
//         console.log(`BEFORE POST INSERTED: `, event.entity)
//     }
// }

// EntitySubscriberInterface에서 모든 메소드를 실행할 수 있음. 아무 엔티티를 listen하려면 listenTo를 생략하고 다음을 사용하면 됨

// @EventSubscriber()
// export class PostSubscriber implements EntitySubscriberInterface {
//     /**
//      * Called after entity is loaded.
//      */
//     afterLoad(entity: any) {
//         console.log(`AFTER ENTITY LOADED: `, entity)
//     }

//     /**
//      * Called before post insertion.
//      */
//     beforeInsert(event: InsertEvent<any>) {
//         console.log(`BEFORE POST INSERTED: `, event.entity)
//     }

//     /**
//      * Called after entity insertion.
//      */
//     afterInsert(event: InsertEvent<any>) {
//         console.log(`AFTER ENTITY INSERTED: `, event.entity)
//     }

//     /**
//      * Called before entity update.
//      */
//     beforeUpdate(event: UpdateEvent<any>) {
//         console.log(`BEFORE ENTITY UPDATED: `, event.entity)
//     }

//     /**
//      * Called after entity update.
//      */
//     afterUpdate(event: UpdateEvent<any>) {
//         console.log(`AFTER ENTITY UPDATED: `, event.entity)
//     }

//     /**
//      * Called before entity removal.
//      */
//     beforeRemove(event: RemoveEvent<any>) {
//         console.log(
//             `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called after entity removal.
//      */
//     afterRemove(event: RemoveEvent<any>) {
//         console.log(
//             `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called before entity removal.
//      */
//     beforeSoftRemove(event: SoftRemoveEvent<any>) {
//         console.log(
//             `BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called after entity removal.
//      */
//     afterSoftRemove(event: SoftRemoveEvent<any>) {
//         console.log(
//             `AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called before entity removal.
//      */
//     beforeRecover(event: RecoverEvent<any>) {
//         console.log(
//             `BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called after entity removal.
//      */
//     afterRecover(event: RecoverEvent<any>) {
//         console.log(
//             `AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `,
//             event.entity,
//         )
//     }

//     /**
//      * Called before transaction start.
//      */
//     beforeTransactionStart(event: TransactionStartEvent) {
//         console.log(`BEFORE TRANSACTION STARTED: `, event)
//     }

//     /**
//      * Called after transaction start.
//      */
//     afterTransactionStart(event: TransactionStartEvent) {
//         console.log(`AFTER TRANSACTION STARTED: `, event)
//     }

//     /**
//      * Called before transaction commit.
//      */
//     beforeTransactionCommit(event: TransactionCommitEvent) {
//         console.log(`BEFORE TRANSACTION COMMITTED: `, event)
//     }

//     /**
//      * Called after transaction commit.
//      */
//     afterTransactionCommit(event: TransactionCommitEvent) {
//         console.log(`AFTER TRANSACTION COMMITTED: `, event)
//     }

//     /**
//      * Called before transaction rollback.
//      */
//     beforeTransactionRollback(event: TransactionRollbackEvent) {
//         console.log(`BEFORE TRANSACTION ROLLBACK: `, event)
//     }

//     /**
//      * Called after transaction rollback.
//      */
//     afterTransactionRollback(event: TransactionRollbackEvent) {
//         console.log(`AFTER TRANSACTION ROLLBACK: `, event)
//     }
// }

// TypeORM이 subscribers를 로드하도록 DataSourceOptions에 subscribers 속성이 설정되어 있는지 확인해야함


// Event Object
// listenTo를 제외하고 모든 EntitySubscriberInterface 메소드는 다음과 같은 기본 속성을 가진 이벤트 객체에 전달됨

// dataSource: DataSource - 이벤트에서 사용할 DataSource
// queryRunner: QueryRunner - 이벤트 트랜잭션에서 사용할 쿼리러너
// manager: EntityManager - 이벤트 트랜잭션에서 사용할 EntityManager

// subscribe된 event listeners의 모든 데이터베이스 작업은 이벤트 객체의 queryRunner 또는 manager 인스턴스를 사용하여 수행해야 함