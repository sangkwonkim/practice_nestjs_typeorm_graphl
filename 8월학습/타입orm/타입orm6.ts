// DataSource API

// options = 데이터 소스를 생성할 때 사용할 옵션 타입orm4에서 학습함
// const dataSourceOptions: DataSourceOptions = dataSource.options

// isInitialized: boolean = 데이터소스가 초기화되었고 데이터베이스와의 초기 연결/연결 풀이 설정되었는 지 여부를 나타냄
// const isInitialized: boolean = dataSource.isInitialized

// driver = 해당 데이터소스에서 사용되는 기본 데이터 베이스 드라이버
// const driver: Driver = dataSource.driver

// manager = 엔티티 관련 작업에서 사용되는 EntityManager
// const manager: EntityManager = dataSource.manager
// // you can call manager methods, for example find:
// const users = await manager.find()

// initialize = 데이터 소스를 초기화하고, 데이터 베이스 연결 풀을 개방
// await dataSource.initialize()

// destroy = 데이터 소스를 삭제하고, 모든 데이터베이스 연결을 닫음. 애플리케이션을 shut down할 때 사용함
// await dataSource.destroy()

// synchronize = 데이터베이스 스키마와 일치시킴. 데이터 소스 옵션에서 synchronize: true 설정할 경우, 이 메소드가 호출됨. 대게 애플리케이션이 시작될 때 이 메소드를 호출하게 된다
// await dataSource.synchronize()

// dropDatabase = 데이터베이스와 모든 데이터를 삭제시킴. 이 방법을 사용하면 데이터베이스 테이블과 해당 데이터가 모두 지워지므로 프로덕션에서 이 방법을 주의해야 함. 데이터베이스에 대한 연결이 설정된 후에만 사용할 수 있음.
// await dataSource.dropDatabase()

// runMigrations = 보류 중인 모든 마이그레이션을 실행
// await dataSource.runMigrations()

// undoLastMigration = 마지막으로 실행된 마이그레이션을 되돌림
// await dataSource.undoLastMigration()

// hasMetadata = 지정된 엔티티에 대한 메타데이터가 등록되어 있는 지 여부를 확인.
// if (dataSource.hasMetadata(User))
//     const userMetadata = dataSource.getMetadata(User)

//     엔티티 메타데이터 = 엔티티 메타데이터 및 모든 관련 메타데이터 클래스에는 엔티티, 해당 열, 인덱스, 관계 및 Type ORM에 대한 보다 복잡한 응용 프로그램 또는 확장을 생성하는 데 사용할 수 있는 기타 엔티티 관련 정보가 포함되어 있습니다.

// getMetadata = 지정된 엔티티의 엔티티메타데이터를 조회. 테이블 명을 지정할 수 있으며, 해당 테이블 이름을 가진 엔티티 메타데이터가 반환됨
//     const userMetadata = dataSource.getMetadata(User)
//     // now you can get any information about User entity

// getRepository = 지정된 엔티티의 레포지토리를 갖고 옴.
//     const repository = dataSource.getRepository(User)
//     // now you can call repository methods, for example find:
//     const users = await repository.find()

//     repository는 EntityManager와 동일하지만 운영은 구체적인 엔티티로 제한됨. 엔티티 관리자를 통해 저장소에 액세스할 수 있음.

//     repository 타입
//     Repository - 엔티티의 일반 레포지토리
//     TreeRepository - @Tree decorator로 표시된 엔티티와 같이 트리 엔티티 구조에서 사용되는 레포지토리 확장. 트리 구조 작업에서 사용되는 특별한 메소드를 가짐
//     MongoRepository - MongoDB에서 사용되는 특별한 기능을 가진 레포지토리

// getTreeRepository - 주이진 엔티티의 트리레포지토리를 가져옴.
//     const repository = dataSource.getTreeRepository(Category)
//     // now you can call tree repository methods, for example findTrees:
//     const categories = await repository.findTrees()


// getMongoRepository - 몽고db 레포지토리를 가져옴
//     const repository = dataSource.getMongoRepository(User)
//     // now you can call mongodb-specific repository methods, for example createEntityCursor:
//     const categoryCursor = repository.createEntityCursor()
//     const category1 = await categoryCursor.next()
//     const category2 = await categoryCursor.next()

// transaction - 단일 데이터 베이스 트랜젝션에서 여러 데이터베이스 요청이 실행되는 단일 트랜잭션을 제공
//     await dataSource.transaction(async (manager) => {
//         // NOTE: you must perform all database operations using given manager instance
//         // its a special instance of EntityManager working with this transaction
//         // and don't forget to await things here
//     })

//  query - sql 쿼리를 실행
//     const rawData = await dataSource.query(`SELECT * FROM USERS`)

// createQueryBuilder - 쿼리를 빌드할 때 사용할 수 있는 쿼리 빌더를 생성.
//     const users = await dataSource
//         .createQueryBuilder()
//         .select()
//         .from(User, "user")
//         .where("user.name = :name", { name: "John" })
//         .getMany()

// createQueryRunner - 단일 실제 데이터베이스 dataSource를 관리하고 작업하는 데 사용되는 쿼리 실행기를 생성.
//     const queryRunner = dataSource.createQueryRunner()
    
//     // you can use its methods only after you call connect
//     // which performs real database connection
//     await queryRunner.connect()
    
//     // .. now you can work with query runner and call its methods
    
//     // very important - don't forget to release query runner once you finished working with it
//     await queryRunner.release()

//Entity
//엔티티는 데이터베이스 테이블에 매핑되는 클래스. (몽고db에서는 컬렉션)
//엔티티는 새로운 클래스를 만들고 @Entity():를 이용해서 생성할 수 있음

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryGeneratedColumn()
//    id: number

//    @Column()
//    firstName: string

//    @Column()
//    lastName: string

//    @Column()
//    isActive: boolean
//}
//This will create following database table:

//+-------------+--------------+----------------------------+
//|                          user                           |
//+-------------+--------------+----------------------------+
//| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
//| firstName   | varchar(255) |                            |
//| lastName    | varchar(255) |                            |
//| isActive    | boolean      |                            |
//+-------------+--------------+----------------------------+

//기본 엔티티는 컬럼과 관계로 구성
//각 엔티티에는 primary column가 필수로 있어야함

//각 엔티티는 데이터 소스 옵션에 등록되어야 함

//import { DataSource } from "typeorm"
//import { User } from "./entity/User"

//const myDataSource = new DataSource({
//    type: "mysql",
//    host: "localhost",
//    port: 3306,
//    username: "test",
//    password: "test",
//    database: "test",
//    entities: [User],
//})

//또는 모든 엔티티가 포함된 전체 디렉토리를 특정할 수 있고 전체 엔티티를 로드할 수 있음

//import { DataSource } from "typeorm"

//const dataSource = new DataSource({
//    type: "mysql",
//    host: "localhost",
//    port: 3306,
//    username: "test",
//    password: "test",
//    database: "test",
//    entities: ["entity/*.js"],
//})

//user 엔터티에 대해 대체 테이블 이름을 사용하려면 @Entity: @Entity("my_users")로 테이블 이름을 지정할 수 있음.


//응용 프로그램의 모든 데이터베이스 테이블에 대한 기본 prefix를 설정하려면 데이터 소스 옵션에 entityPrefix를 지정할 수 있음

//엔티티 constructor를 사용하는 경우 해당 인수는 선택 사항이어야 함
//ORM은 데이터베이스에서 로드할 때 엔티티 클래스의 인스턴스를 만들기 때문에 생성자 인수를 인식하지 못함

//엔티티 컬럼
//데이터베이스 테이블은 열로 구성되므로 엔티티도 열로 구성. @Column으로 표시한 각 엔티티 클래스 속성은 데이터베이스 테이블 열에 매핑.

//Primary columns
//각 엔티티는 적어도 한 개의 primary column을 가져야함. 

//@PrimaryColumn()  모든 유형의 값을 사용하는 primary column을 생성. 컬럼의 타입을 지정할 수 있음.
//만약 컬럼 타입을 정하지 않을 경우, 속성 유형에서 추론됨. 

//아래의 코드는 저장하기 전에 수동으로 할당해야 되는 int 타입의 primary column을 생성함

//import { Entity, PrimaryColumn } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryColumn()
//    id: number
//}

//@PrimaryGeneratedColumn()은 자동으로 증가하며 생성되는 값을 생성함.

//import { Entity, PrimaryGeneratedColumn } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryGeneratedColumn()
//    id: number
//}

//@PrimaryGeneratedColumn("uuid") uuid가 자동으로 생성되는 primary column을 생성함. Uuid는 고유한 문자열 id임.
//저장 전에 따로 생성할 필요가 없이 자동으로 생성됨

//import { Entity, PrimaryGeneratedColumn } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryGeneratedColumn("uuid")
//    id: string
//}

//복합 primary columns 또한 가질 수 있음

//import { Entity, PrimaryColumn } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryColumn()
//    firstName: string

//    @PrimaryColumn()
//    lastName: string
//}

//save로 엔티티를 저장하면 항상 데이터베이스에서 지정된 엔티티 Id(또는 Ids)를 가진 엔티티를 찾는데 해당 id/ids가 발견되면 데이터베이스에서 해당 행을 업데이트하고 id/ids가 있는 행이 없으면 새 행이 삽입됨.

//id를 이용해서 엔티티를 찾을 대는 manager.findOne이나 repository.findOne.을 사용할 수 있음
//// find one by id with single primary key
//const person = await dataSource.manager.findBy(Person, { id: 1 })
//const person = await dataSource.getRepository(Person).findOneBy({ id: 1 })

//// find one by id with composite primary keys
//const user = await dataSource.manager.findOneBy(User, {
//    firstName: "Timber",
//    lastName: "Saw",
//})
//const user = await dataSource.getRepository(User).findOneBy({
//    firstName: "Timber",
//    lastName: "Saw",
//})

//Special columns
//@CreateDateColumn는 엔티티의 삽입 날짜에 자동으로 설정되는 특수 열로 자동으로 설정되므로 설정할 필요가 없음

//@UpdateDateColumn entity manager 또는 repository의 저장을 호출할 때마다 엔티티의 업데이트 시간으로 자동 설정되는 특수 열로 자동으로 설정되므로 설정할 필요가 없음

//@DeleteDateColumn entity manager 또는 repository의 soft-delete을 호출할 때마다 엔티티의 삭제 시간으로 자동 설정되는 특수 열로, @DeleteDateColumn로 설정할 경우, 기본 범위는 비삭제가 되며, 이 열은 자동으로 설정되기 때문에 설정할 필요가 없음

//@VersionColumn은 entity manager 또는 repository의 저장을 호출할 때마다 엔티티 버전(incremental number)으로 자동 설정되는 특수 열로, 자동으로 설정되므로 설정할 필요가 없음

//Column types

//TypeORM은 가장 일반적으롤 사용되는 데이터베이스의 컬럼 타입을 모두 지원함. 컬럼 타입은 데이터 베이스 유형에 따라 다르므로 데이터베이스 스키마의 형태를 유연하게 정할 수 있음.

//컬럼의 타입은 @Column의 첫번째 파라미터로 정할 수도 있고, 컬럼의 옵션으로 지정할 수도 있음.

//@Column("int")

//@Column({ type: "int" })


//If you want to specify additional type parameters you can do it via column options. For example:
//@Column("varchar", { length: 200 })

//@Column({ type: "int", width: 200 })

//bigint 타입 주의 사항 => SQL 데이터베이스에서 사용되는 bigint 열 유형은 정규 번호 유형에 맞지 않고 대신 문자열에 속성을 매핑.

//# Column types for mysql / mariadb
//bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year, char, nchar, national char, varchar, nvarchar, national varchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary, varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection

//enum column type부터 하기