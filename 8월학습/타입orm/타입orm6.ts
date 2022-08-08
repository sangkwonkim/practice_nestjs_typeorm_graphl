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