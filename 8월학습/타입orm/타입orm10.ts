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


// delete - 엔티티 id나 id배열, 주어신 조건으로 엔티티를 삭제함
// await repository.delete(1)
// await repository.delete([1, 2, 3])
// await repository.delete({ firstName: "Timber" })

// softDelete and restore - id를 사용해서 soft delete하고 복원함 
// Soft deleting and restoring a row by id
// const repository = dataSource.getRepository(Entity)
// // Delete a entity
// await repository.softDelete(1)
// // And You can restore it using restore;
// await repository.restore(1)


// softRemove and recover - softDelete와 restore의 대안임
// // You can soft-delete them using softRemove
// const entities = await repository.find()
// const entitiesAfterSoftRemove = await repository.softRemove(entities)

// // And You can recover them using recover;
// await repository.recover(entitiesAfterSoftRemove)


// increment - 주어진 옵션과 일치하는 엔티티의 주어진 값을 기준으로 일부 컬럼을 증가시킴
// await repository.increment({ firstName: "Timber" }, "age", 3)


// decrement - 주어진 옵션과 일치하는 주어진 값의 일부 컬럼을 감소시킴
// await repository.decrement({ firstName: "Timber" }, "age", 3)


// count - 주어진 옵션과 일치하는 엔티티의 갯수를 셈. 페이지네이션에 유용함
// const count = await repository.count({
//     where: {
//         firstName: "Timber",
//     },
// })


// countBy - 주어진 옵션과 일치하는 엔티티의 갯수를 셈. 페이지네이션에 유용함
// const count = await repository.countBy({ firstName: "Timber" })


// find - 주어진 옵션과 일치하는 엔티티를  찾음
// const timbers = await repository.find({
//     where: {
//         firstName: "Timber",
//     },
// })
// findBy - 주어진 옵션과 일치하는 엔티티를 찾음
// const timbers = await repository.findBy({
//     firstName: "Timber",
// })

// => by가 들어가면 where 조건을 따로 지정하지 않고 객체로 count하거나 find할 수 있음


// findAndCount - 주어진 옵션과 일치한 엔티티를 찾고 주어진 조건과 일치하는 모든 엔티티의 갯수를 셈.
// 페이지네이션 세팅은 무시함
// const [timbers, timbersCount] = await repository.findAndCount({
//     where: {
//         firstName: "Timber",
//     },
// })


// findAndCountBy - 주어진 옵션과 일치한 엔티티를 찾고 주어진 조건과 일치하는 모든 엔티티의 갯수를 셈.
// 페이지네이션 세팅은 무시함
// const [timbers, timbersCount] = await repository.findAndCountBy({
//     firstName: "Timber",
// })


// findOne - 주어진 조건과 일치하는 첫번째 엔티티를 찾음
// const timber = await repository.findOne({
//     where: {
//         firstName: "Timber",
//     },
// })


// findOneBy - 주어진 조건과 일치하는 첫번째 엔티티를 찾음
// const timber = await repository.findOneBy({ firstName: "Timber" })


// findOneOrFail - 일부 id 또는 옵션과 일치하는 첫번째 엔티티를 찾음. 아무거도 일치하지 않다면 promise reject로 리턴함
// const timber = await repository.findOneOrFail({
//     where: {
//         firstName: "Timber",
//     },
// })


// findOneByOrFail - 주어진 조건과 일치하는 첫번째 엔티티를 찾음. 아무거도 일치하지 않다면 promise reject로 리턴함
// const timber = await repository.findOneByOrFail({ firstName: "Timber" })


// query - raw SQl 쿼리를 실행함
// const rawData = await repository.query(`SELECT * FROM USERS`)


// clear - 주어진 테이블의 모든 데이터를 clear함
// await repository.clear()


// Additional Options
// save의 파라미터로 SaveOptions를 입력할 수 있음

// data - persist method로 넣을 수 있는 추가적인 데이터. 그러면 subscribers로 이 데이터를 사용할 수 있음
// listeners: boolean - 이 작업으로 listeners나 subscribers를 호출할지 여부를 나타냄
// 기본값으로 둘 다 이용 가능함. save나 remove의 옵션으로 { listeners: false } 넣음으로써 사용하지 않을 수 있음
// transaction: boolean - 기본값으로 transactions 사용할 수 있고 지속성 작업의 모든 쿼리는 트랜젝션으로 래핑됨
// persistence options으로 { transaction: false } 함으로써 사용하지 않을 수 있음
// chunk: number - save 실행을 여러 청크 그룹으로 나눔
// 예를 들어 100.000개의 개체를 저장하려고 하는데 저장하는 데에 문제가 있는 경우 
// 해당 개체를 10개의 10.000개 개체 그룹으로 나누고({chunk:10000} 설정) 각 그룹을 별도로 저장할 수 있음 
// 이 옵션은 기본 드라이버 매개 변수 번호 제한에 문제가 있을 때 매우 큰 삽입을 수행하는 데 필요함.
// reload: boolean - persistence operation 중에 유지 중인 엔티티를 다시 로드해야 하는지 여부를 결정하는 표시임
// RETURNING/OUTPUT 문을 지원하지 않는 데이터베이스에서만 작동하며 기본적으로 사용 가능함


// Example:
// // users contains array of User Entities
// userRepository.save(users, { chunk: users.length / 1000 })


// Optional RemoveOptions를 remove나 delete 파라미터로 넣을 수 있음
// data - remove method로 넣을 수 있는 추가적인 데이터. 그러면 subscribers로 이 데이터를 사용할 수 있음
// listeners: boolean - 이 작업으로 listeners나 subscribers를 호출할지 여부를 나타냄
// 기본값으로 둘 다 이용 가능함. save나 remove의 옵션으로 { listeners: false } 넣음으로써 사용하지 않을 수 있음
// transaction: boolean - 기본값으로 transactions 사용할 수 있고 지속성 작업의 모든 쿼리는 트랜젝션으로 래핑됨
// persistence options으로 { transaction: false } 함으로써 사용하지 않을 수 있음

// chunk: number - remove 실행을 여러 청크 그룹으로 나눔
// 예를 들어 100.000개의 개체를 삭제하려고 하는데 문제가 있는 경우 
// 해당 개체를 10개의 10.000개 개체 그룹으로 나누고({chunk:10000} 설정) 각 그룹을 별도로 삭제할 수 있음 
// 이 옵션은 기본 드라이버 매개 변수 번호 제한에 문제가 있을 때 매우 큰 삭제를 수행하는 데 필요함.

// Example:

// // users contains array of User Entities
// userRepository.remove(users, { chunk: entities.length / 1000 })