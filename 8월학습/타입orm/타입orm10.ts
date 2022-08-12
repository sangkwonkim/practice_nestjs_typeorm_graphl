// Custom repositories
// 데이터베이스 작업을 포함한 레포지토리를 커스텀할 수 있음. 

// How to create custom repository
// 일반적으로 레포지토리 인스턴스를 변수에 할당해서 전역으로 export하고, 이 변수를 사용할 수 있음

// // user.repository.ts
// export const UserRepository = dataSource.getRepository(User)

// // user.controller.ts
// export class UserController {
//     users() {
//         return UserRepository.find()
//     }
// }

// UserRepository 기능을 확장하려면 Repository 클래스의 .extend 메서드를 사용할 수 있음

// // user.repository.ts
// export const UserRepository = dataSource.getRepository(User).extend({
//     findByName(firstName: string, lastName: string) {
//         return this.createQueryBuilder("user")
//             .where("user.firstName = :firstName", { firstName })
//             .andWhere("user.lastName = :lastName", { lastName })
//             .getMany()
//     },
// })

// // user.controller.ts
// export class UserController {
//     users() {
//         return UserRepository.findByName("Timber", "Saw")
//     }
// }


// Using custom repositories in transactions

// 트랜잭션은 자신만의 query runner, entity manager와 repository instances를 가지는 실행 스코프를 가지고 있음
// 이로 인해서 global (data source) entity manager와 repositories가 트랜잭션 내부에서는 동작하지 않는 이유임
// 트랜잭션의 스코프 내부에서 적절하게 쿼리를 실행하기 위해서는 제공된 entity manager와 트랜잭션의 getRepository method를 사용해야함
// 트랜잭션 내부에서 커스텀 레포지토리를 사용하기 위해서는 제공된 엔티티 매니저 인스턴스의 withRepository method를 사용해야함

// await connection.transaction(async (manager) => {
//     // in transactions you MUST use manager instance provided by a transaction,
//     // you cannot use global entity managers or repositories,
//     // because this manager is exclusive and transactional

//     const userRepository = manager.withRepository(UserRepository)
//     await userRepository.createAndSave("Timber", "Saw")
//     const timber = await userRepository.findByName("Timber", "Saw")
// })



// EntityManager API

// dataSource - EntityManager에서 사용하는 데이터소스
// const dataSource = manager.DataSource


// queryRunner - EntityManager에서 사용하는 쿼리 러너. EntityManager의 트랜잭션 인트스턴스에서만 사용됨
// const queryRunner = manager.queryRunner


// transaction - 단일 데이터베이스 트랜젝션에서 실행될 복수의 데이터베이스 요청 실행될 트랜잭션을 제공함.
// // 트랜잭션에 대해서는 다음에 더 자세하게 학습할 예정
// await manager.transaction(async (manager) => {
//     // NOTE: you must perform all database operations using the given manager instance
//     // it's a special instance of EntityManager working with this transaction
//     // and don't forget to await things here
// })


// query - raw SQL query를 실행함
// const rawData = await manager.query(`SELECT * FROM USERS`)


// createQueryBuilder - SQL queries를 생성하는 쿼리 빌더를 만듬.
// // 쿼리 빌더에 대해서는 다음에 더 자세하게 학습할 예정
// const users = await manager
//     .createQueryBuilder()
//     .select()
//     .from(User, "user")
//     .where("user.name = :name", { name: "John" })
//     .getMany()



// hasId - 제공된 엔티티가 primary column property가 정의되어 있는지 여부 확인
// if (manager.hasId(user)) {
//     // ... do something
// }


// getId - 제공된 엔티티의 primary column property 값을 가져옴. 
// 만약 엔티티가 합성 primary keys를 갖고 있다면, primary columns의 이름과 값을 가진 객체를 리턴함
// const userId = manager.getId(user) // userId === 1


// create - User의 새로운 인스턴스를 생성함. 선택적으로 새로 생성된 user 객체에 쓰여질 사용자 속성이 있는 객체 리터럴을 허용함
// const user = manager.create(User) // same as const user = new User();
// const user = manager.create(User, {
//     id: 1,
//     firstName: "Timber",
//     lastName: "Saw",
// }) // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";


// merge - 복수의 엔티티를 하나의 엔티티로 합성함
// const user = new User()
// manager.merge(User, user, { firstName: "Timber" }, { lastName: "Saw" }) // same as user.firstName = "Timber"; user.lastName = "Saw";


// preload - 주어진 일반 자바스크립트 객체로 새로운 엔티티를 생성함.
// 만약 엔티티가 데이터베이스에 이미 존재한다면, 엔티티와 관련된 모든 정보를 로드하고,
// 주어진 객체의 새 값으로 바꾼 다음 새로운 엔티티를 반환함
// 새로운 엔티티는 새 객체로부터 교체된 모든 property를 가지고 데이터베이스에서 실제로 로드된 엔티티임.

// const partialUser = {
//     id: 1,
//     firstName: "Rizzrak",
//     profile: {
//         id: 1,
//     },
// }
// const user = await manager.preload(User, partialUser)
// // user will contain all missing data from partialUser with partialUser property values:
// // { id: 1, firstName: "Rizzrak", lastName: "Saw", profile: { id: 1, ... } }



// save - 주어진 엔티티나 엔티티 배열을 저장함.
// 엔티티가 데이터베이스에 이미 존재한다면, 해당 엔티티를 업데이트함.엔티티가 존재하지 않으면, 입력됨.
// 단일 트랜잭션으로 모든 엔티티를 저장함(엔티티 매니저의 경우에는 트랜잭션이 아님). 값을 null로 만들기 위해서는, 직접 프로퍼티가 Null이 되도록 해야함
// await manager.save(user)
// await manager.save([category1, category2, category3])


// remove - 주어진 엔티티나 엔티티 배열을 제거함. 단일 트랜잭션에서 주어진 모든 엔티티를 삭제함(엔티티의 경우 트랙잰션이 아님)
// await manager.remove(user)
// await manager.remove([category1, category2, category3])


// insert - 새로운 엔티티나 엔티티 배열을 삽입함
// await manager.insert(User, {
//     firstName: "Timber",
//     lastName: "Timber",
// })

// await manager.insert(User, [
//     {
//         firstName: "Foo",
//         lastName: "Bar",
//     },
//     {
//         firstName: "Rizz",
//         lastName: "Rak",
//     },
// ])


// update - 주어진 업데이트 옵션이나 엔티티 id로 엔티티를 부분적으로 업데이트함
// await manager.update(User, { firstName: "Timber" }, { firstName: "Rizzrak" })
// // executes UPDATE user SET firstName = Rizzrak WHERE firstName = Timber
// await manager.update(User, 1, { firstName: "Rizzrak" })
// // executes UPDATE user SET firstName = Rizzrak WHERE id = 1


// upsert - 새로운 엔티티나 엔티티 배열이 이미 존재하는 경우 외에는 업데이트하는 대신 삽입함. 
// await manager.upsert(
//     User,
//     [
//         { externalId: "abc123", firstName: "Rizzrak" },
//         { externalId: "bca321", firstName: "Karzzir" },
//     ],
//     ["externalId"],
// )
// /** executes
//  *  INSERT INTO user
//  *  VALUES
//  *      (externalId = abc123, firstName = Rizzrak),
//  *      (externalId = cba321, firstName = Karzzir),
//  *  ON CONFLICT (externalId) DO UPDATE firstName = EXCLUDED.firstName
//  **/