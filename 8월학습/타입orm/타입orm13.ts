// Select using Query Builder

// What is QueryBuilder
// QueryBuilder는 타입orm의 가장 강력한 특징 중 하나임 - 이는 편리한 syntax를 이용해서 sql 쿼리를 만들어주고, 실행하고, 자동으로 엔티티로 변경해줌

// const firstUser = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()

// 아래와 같은 쿼리를 만듬

// SELECT
//     user.id as userId,
//     user.firstName as userFirstName,
//     user.lastName as userLastName
// FROM users user
// WHERE user.id = 1

// User 인스턴스를 반환함

// User {
//     id: 1,
//     firstName: "Timber",
//     lastName: "Saw"
// }

// Important note when using the QueryBuilder
// QueryBuilder를 사용할 때, where 식에 고유한 파라미터를 제공해야함

// 아래의 코드는 동작하지 않음

// const result = await dataSource
//     .createQueryBuilder('user')
//     .leftJoinAndSelect('user.linkedSheep', 'linkedSheep')
//     .leftJoinAndSelect('user.linkedCow', 'linkedCow')
//     .where('user.linkedSheep = :id', { id: sheepId })
//     .andWhere('user.linkedCow = :id', { id: cowId });

// 하지만 아래의 코드는 동작함

// const result = await dataSource
//     .createQueryBuilder('user')
//     .leftJoinAndSelect('user.linkedSheep', 'linkedSheep')
//     .leftJoinAndSelect('user.linkedCow', 'linkedCow')
//     .where('user.linkedSheep = :sheepId', { sheepId })
//     .andWhere('user.linkedCow = :cowId', { cowId });

// 다른 파라미터에 동일한 id를 두번 사용하는 것이 아닌, :sheepId와 :cowId처럼 고유한 이름을 지어줘야함


// How to create and use a QueryBuilder
// 쿼리 빌더를 만들 수 있는 여러 방법이 있음

// 데이터 소스를 사용하는 방법
// const user = await dataSource
//     .createQueryBuilder()
//     .select("user")
//     .from(User, "user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()

// 엔티티 매니저를 사용하는 방법
// const user = await dataSource.manager
//     .createQueryBuilder(User, "user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()

// repository를 사용하는 방법
// const user = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()


// 사용 가능한 5가지 타입의 QueryBuilder가 있음

// SelectQueryBuilder - select 쿼리를 생성하고 실행함
// const user = await dataSource
//     .createQueryBuilder()
//     .select("user")
//     .from(User, "user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()


// InsertQueryBuilder - insert 쿼리를 생성하고 실행함
// await dataSource
//     .createQueryBuilder()
//     .insert()
//     .into(User)
//     .values([
//         { firstName: "Timber", lastName: "Saw" },
//         { firstName: "Phantom", lastName: "Lancer" },
//     ])
//     .execute()

// UpdateQueryBuilder - update 쿼리를 생성하고 실행함
// await dataSource
//     .createQueryBuilder()
//     .update(User)
//     .set({ firstName: "Timber", lastName: "Saw" })
//     .where("id = :id", { id: 1 })
//     .execute()

// DeleteQueryBuilder - delete 쿼리를 생성하고 실행함
// await dataSource
//     .createQueryBuilder()
//     .delete()
//     .from(User)
//     .where("id = :id", { id: 1 })
//     .execute()

// RelationQueryBuilder - 관계별 작업을 구축하고 실행함[TBD]
// await dataSource
//     .createQueryBuilder()
//     .relation(User,"photos")
//     .of(id)
//     .loadMany();

// 다른 메서드와 달리 다른 유형의 쿼리빌더 간에 전환 가능함 이렇게 하면 새 쿼리 빌더 인스턴스를 얻을 수 있음


// Getting values using QueryBuilder
// 사용자의 id나 name으로 데이터베이스에서 단일 결과를 찾기 위해서는 getOne을 써야함
// const timber = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id OR user.name = :name", { id: 1, name: "Timber" })
//     .getOne()


// getOneOrFail 데이터베이스에서 단일 결과를 받아오지만, 만약 결과가 존재하지 않다면 EntityNotFoundError를 리턴함
// const timber = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id OR user.name = :name", { id: 1, name: "Timber" })
//     .getOneOrFail()


// 데이터베이스에서 다수의 결과를 받기 위해서는, 데이터베이스에서 모든 유저의 정보를 받기 위해서는 getMany를 사용
// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .getMany()

// select query builder를 사용해서 정보를 얻을 때 결과는 엔티티 또는 raw 결과로 두가지 타입을 가짐
// 대게 데이터베이스의 실제 엔티티를 select하는 게 필요한데 이럴 때는 getOne이나 getMany를 사용할 수 있음

// 하지만 때때로 특정의 데이터를 select해야 할 때도 있음. 모든 유저의 photo의 합은 엔티티가 아니면, raw 데이터라고 부름. raw data를 얻기 위해서는 

// Most of the time, you need to select real entities from your database, for example, users. 
// For this purpose, you use getOne and getMany. But sometimes you need to select some specific data, getRawOne와 getRawMany를 사용해야함

// const { sum } = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("SUM(user.photosCount)", "sum")
//     .where("user.id = :id", { id: 1 })
//     .getRawOne()
// const photosSums = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("user.id")
//     .addSelect("SUM(user.photosCount)", "sum")
//     .groupBy("user.id")
//     .getRawMany()

// // result will be like this: [{ id: 1, sum: 25 }, { id: 2, sum: 13 }, ...]


// What are aliases for?

// 우리는 이렇게 createQueryBuilder("user")를 사용하는데, 여기서 user는 일반적인 sql 가칭임. 어디든지 가칭을 사용할 수 있고, 선택한 데이터로 작업하는 경우를 제외하곤 모든 곳에서 별칭을 사용함


// createQueryBuilder("user") 다음과 동일함

// createQueryBuilder().select("user").from(User, "user")

// 다음과 같은 쿼리의 결과와 동일함
// SELECT ... FROM users user

// 이 sql 쿼리에서는, users는 테이블 이름이며, user는 이 테이블에 할당한 별칭임. 이후에 그 테이블에 접근할 때 이 별칭을 사용함

// createQueryBuilder()
//     .select("user")
//     .from(User, "user")
//     .where("user.name = :name", { name: "Timber" })

// 위의 작업은 다음과 같이 동작함
// SELECT ... FROM users user WHERE user.name = 'Timber'

// 쿼리 빌더를 만들 때 할당한 user라는 별칭으로 users라는 테이블을 사용하고 있음

// 하나의 쿼리 빌더는 하나의 별칭에 제한되지 않음. 다수의 별칭도 사용 가능함
// 각각의 select는 자체 별칭을 가질 수 있음. 다수의 테이블에서도 각각의 별칭을 사용할 수 있고, 다수의 테이블을 각각의 별칭으로 join할 수 있음
// 이러한 별칭들은 select된 테이블이나 데이터에 접근할 때 사용할 수 있음



// Using parameters to escape data
// where("user.name = :name", { name: "Timber" }) 이 구문을 사용하는데 
// { name: "Timber" }는 무엇을 나타냄?
// 이는 sql 주입을 방지하기 위해 사용한 매개 변수임. 

// 우리는 이렇게도 쓸 수 있음("user.name = "" + name + "")
// 하지만 이건 sql 주입에 대한 코드를 열기 때문에 안전하지 않음

// 안전하게 사용하는 방법은 where("user.name = :name", { name: "Timber" })라는 특별한 syntax를 사용하는 것임
// 여기서 :name은 매개 변수 이름이고 값은 { name: "Timber" } 객체에 지정됨


// .where("user.name = :name", { name: "Timber" })
// 이건 아래의 코드를 간단하게 표현한 것임

// .where("user.name = :name")
// .setParameter("name", "Timber")

// 주의 : 쿼리 빌더 내부에서 다른 값에 동일한 파라미터 이름을 사용하면 안됨! 몇 차례에 걸쳐서 동일한 값을 쓰면 덮어씌워짐

// 값의 배열을 지원할 수 있음. 특수 확장 구문을 사용해 sql 문의 값 리스트로 변환할 수 있음

// .where("user.name IN (:...names)", { names: [ "Timber", "Cristal", "Lina" ] })

// 이는 다음과 같음

// WHERE user.name IN ('Timber', 'Cristal', 'Lina')



// Adding WHERE expression
// 다음과 같이 where식을 쉽게 추가할 수 있음

// createQueryBuilder("user").where("user.name = :name", { name: "Timber" })

// SELECT ... FROM users user WHERE user.name = 'Timber'

// 존재하는 where 식을 통해 and를 추가할 수 있음
// createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .andWhere("user.lastName = :lastName", { lastName: "Saw" })

// 이는 다음 sql문으로 동작함
// SELECT ... FROM users user WHERE user.firstName = 'Timber' AND user.lastName = 'Saw'

// 존재하는 where 식을 통해 or를 추가할 수 있음
// createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })

// SELECT ... FROM users user WHERE user.firstName = 'Timber' OR user.lastName = 'Saw'

// where 식과 in 쿼리를 쓸 수 있음
// createQueryBuilder("user").where("user.id IN (:...ids)", { ids: [1, 2, 3, 4] })

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user WHERE user.id IN (1, 2, 3, 4)

// where에 Brackets을 사용해서 복합 where식을 추가할 수 있음
// createQueryBuilder("user")
//     .where("user.registered = :registered", { registered: true })
//     .andWhere(
//         new Brackets((qb) => {
//             qb.where("user.firstName = :firstName", {
//                 firstName: "Timber",
//             }).orWhere("user.lastName = :lastName", { lastName: "Saw" })
//         }),
//     )

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user WHERE user.registered = true AND (user.firstName = 'Timber' OR user.lastName = 'Saw')

// where에 NotBrackets을 사용해서 부정 복합 where식을 추가할 수 있음

// createQueryBuilder("user")
//     .where("user.registered = :registered", { registered: true })
//     .andWhere(
//         new NotBrackets((qb) => {
//             qb.where("user.firstName = :firstName", {
//                 firstName: "Timber",
//             }).orWhere("user.lastName = :lastName", { lastName: "Saw" })
//         }),
//     )
    
// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user WHERE user.registered = true AND NOT((user.firstName = 'Timber' OR user.lastName = 'Saw'))

// 필요만큼 and와 or을 결합할 수 있음. 하지만 .where를 두 번 이상 사용하면 이전 WHERE 식을 덮어씀

// Note: orWhere을 사용할 때 주의해야되는 게, and와 or 둘 다 사용해서 복합 식을 사용할 때 해당 식은 어떤 주장도 없이 쌓이게 됨
// 때때로 where 스트링 대신에 만들 경우, orWhere 사용은 피해 => or가 제대로 된 역할을 못할 수도 있다는 것으로 해석 중. 앞 선 프로젝트에서 orWhere을 사용했을 때 다행스럽게도 이와 같은 문제는 발생하지 않았음


// Adding HAVING expression
// HAVING 식을 다음과 같이 쉽게 추가할 수 있음
// createQueryBuilder("user").having("user.name = :name", { name: "Timber" })

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user HAVING user.name = 'Timber'

// 존재하는 HAVING 식에 and를 추가할 수 있음
// createQueryBuilder("user")
//     .having("user.firstName = :firstName", { firstName: "Timber" })
//     .andHaving("user.lastName = :lastName", { lastName: "Saw" })

// 이는 다음 sql문으로 동작함
// SELECT ... FROM users user HAVING user.firstName = 'Timber' AND user.lastName = 'Saw'

// 존재하는 HAVING 식에 or를 추가할 수 있음
// createQueryBuilder("user")
//     .having("user.firstName = :firstName", { firstName: "Timber" })
//     .orHaving("user.lastName = :lastName", { lastName: "Saw" })

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user HAVING user.firstName = 'Timber' OR user.lastName = 'Saw'

// 필요만큼 and와 or을 결합할 수 있음. 하지만 .having을 두 번 이상 사용하면 이전 HAVING 식을 덮어씀


// Adding ORDER BY expression
// ORDER BY는 다음과 같이 쉽게 추가할 수 있음

// createQueryBuilder("user").orderBy("user.id")

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user ORDER BY user.id

// 정렬 방향을 오름차순에서 내림차순으로(또는 그 반대로) 변경할 수 있음
// createQueryBuilder("user").orderBy("user.id", "DESC") 내림차순

// createQueryBuilder("user").orderBy("user.id", "ASC") 오름차순

// 여러가지 정렬 기준을 추가할 수 있음
// createQueryBuilder("user").orderBy("user.name").addOrderBy("user.id")

// order-by 필드에서 맵을 사용할 수도 있음
// createQueryBuilder("user").orderBy({
//     "user.name": "ASC",
//     "user.id": "DESC",
// })

// .orderBy을 한 번 이상 쓰게 되면 덮어씀



// Adding GROUP BY expression
// 다음과 같이 쉽게 GROUP BY 식을 추가할 수 있음

// createQueryBuilder("user").groupBy("user.id")

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user GROUP BY user.id

// addGroupBy을 사용해서 group-by 조건을 추가할 수 있음
// createQueryBuilder("user").groupBy("user.name").addGroupBy("user.id")

// .groupBy을 한 번 이상 쓰면 GROUP BY를 덮어쓰게 됨

// # Adding LIMIT expression
// 다음과 같이 쉽게 LIMIT 식을 추가할 수 있음

// createQueryBuilder("user").limit(10)

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user LIMIT 10

// sql 쿼리 결과는 데이터베이스 타입에 따라 결정됨
// 주의: 예상했던 대로 LIMIT가 동작하지 않을 경우, joins이나 subqueries와 같은 복합 쿼리를 사용하는 지 봐야함
// 만약 페이지네이션을 사용한다면 take를 대신 사용하는 것을 추천함

// # Adding OFFSET expression
// 다음과 같이 SQL OFFSET를 쉽게 추가할 수 있음

// createQueryBuilder("user").offset(10)

// 이는 다음 sql문으로 동작함

// SELECT ... FROM users user OFFSET 10

// sql 쿼리 결과는 데이터베이스 타입에 따라 결정됨
// 주의: 예상했던 대로 OFFSET이 동작하지 않을 경우, joins이나 subqueries와 같은 복합 쿼리를 사용하는 지 봐야함
// 만약 페이지네이션을 사용한다면 skip을 대신 사용하는 것을 추천함



// Joining relations
// 다음과 같은 엔티티들을 가지고 있을 경우

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
// import { Photo } from "./Photo"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @OneToMany((type) => Photo, (photo) => photo.user)
//     photos: Photo[]
// }


// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
// import { User } from "./User"

// @Entity()
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     url: string

//     @ManyToOne((type) => User, (user) => user.photos)
//     user: User
// }


// Timber의 모든 사진과 함께 로드하고 싶을 경우

// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()


// 다음과 같은 결과가 나옴

// {
//     id: 1,
//     name: "Timber",
//     photos: [{
//         id: 1,
//         url: "me-with-chakram.jpg"
//     }, {
//         id: 2,
//         url: "me-with-trees.jpg"
//     }]
// }

// leftJoinAndSelect가 자동적으로 Timber의 모든 사진을 로드함
// 첫번째 인자는 함께 로드하길 원하는 relation이며, 두번째 인자는 이 relation 테이블에 할당한 별칭임
// 쿼리빌더 내부 어디든지 이 별칭을 이용할 수 있음.
// Timber의 삭제되지 않은 사진들을 찾으려면

// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .where("user.name = :name", { name: "Timber" })
//     .andWhere("photo.isRemoved = :isRemoved", { isRemoved: false })
//     .getOne()

// 이는 다음 sql문으로 동작함

// SELECT user.*, photo.* FROM users user
//     LEFT JOIN photos photo ON photo.user = user.id
//     WHERE user.name = 'Timber' AND photo.isRemoved = FALSE

// join 식에 where을 사용하는 것 대신에 조건을 추가할 수 있음

// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo", "photo.isRemoved = :isRemoved", {
//         isRemoved: false,
//     })
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()

// 이는 다음 sql문으로 동작함

// SELECT user.*, photo.* FROM users user
//     LEFT JOIN photos photo ON photo.user = user.id AND photo.isRemoved = FALSE
//     WHERE user.name = 'Timber'




// Inner and left joins
// LEFT JOIN 대신에 INNER JOIN을 사용하길 원할 경우, innerJoinAndSelect를 사용하면 됨

// const user = await createQueryBuilder("user")
//     .innerJoinAndSelect(
//         "user.photos",
//         "photo",
//         "photo.isRemoved = :isRemoved",
//         { isRemoved: false },
//     )
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()


// SELECT user.*, photo.* FROM users user
//     INNER JOIN photos photo ON photo.user = user.id AND photo.isRemoved = FALSE
//     WHERE user.name = 'Timber'


// LEFT JOIN과 INNER JOIN의 차이점은 INNER JOIN은 포토를 갖고 있지 않은 user를 리턴하지 않음
// LEFT JOIN은 포토를 갖고 있지 않은 유저도 리턴함


// Join without selection
// selection 없는 join

// selection 없이 데이터를 join할 수 있움. leftJoin 이나 innerJoin을 사용하면 됨

// const user = await createQueryBuilder("user")
//     .innerJoin("user.photos", "photo")
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()

// SELECT user.* FROM users user
//     INNER JOIN photos photo ON photo.user = user.id
//     WHERE user.name = 'Timber'

// 이 쿼리는 Timber가 포토를 갖고 있다면 Timber를 select할 것임. 하지만 포토는 리턴하지 않음


// Joining any entity or table
// relation에서만 join을 할 수 있는 게 아니라, unrelated 엔티티나 테이블에서도 가능함
// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect(Photo, "photo", "photo.userId = user.id")
//     .getMany()
// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect("photos", "photo", "photo.userId = user.id")
//     .getMany()
    

// Joining and mapping functionality 결합 및 매핑 기능
// profilePhoto를 user 엔티티에 추가하고 QueryBuilder를 사용해서 property를 통해 아무 데이터에나 map할 수 있음

// export class User {
//     /// ...
//     profilePhoto: Photo
// }

// const user = await createQueryBuilder("user")
//     .leftJoinAndMapOne(
//         "user.profilePhoto",
//         "user.photos",
//         "photo",
//         "photo.isForProfile = TRUE",
//     )
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()

// 이건 Timber의 profile 사진을 로드하고, user.profilePhoto로 설정함
// leftJoinAndMapOne을 사용해서 단일 엔티티를 로드하고 map할 수 있음
// leftJoinAndMapMany를 사용하면 복수의 엔티티를 로드하고 map할 수 있음


// Getting the generated query 생성된 쿼리 가져오기

// QueryBuilder에 의해 만들어진 sql 쿼리를 사용하길 원할 수 있음 getSql를 사용하면 됨

// const sql = createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .getSql()

// 디버깅을 목적으로 할 경우 printSql를 사용

// const users = await createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .printSql()
//     .getMany()

// 이 쿼리는 사용자를 반환하고 사용된 sql 문을 콘솔에 출력할 것임



// Getting raw results raw 결과 가져오기
// select query builder를 사용하면 엔티티와 raw 결과로 두 가지 타입의 결과를 얻을 수 있음
// 대부분 getOne and getMany를 사용해서 데이터베이스에서 실제 엔티티를 select하지만
// 종종 sum이나 user의 사진과 같은 특정 데이터를 지정할 수 있음
// 이러한 데이터는 엔티티가 아니며, 이를 raw data라 부름.
// raw 테이터를 얻기 위해서는 getRawOne나 getRawMany를 사용해야 함

// const { sum } = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("SUM(user.photosCount)", "sum")
//     .where("user.id = :id", { id: 1 })
//     .getRawOne()
// const photosSums = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("user.id")
//     .addSelect("SUM(user.photosCount)", "sum")
//     .groupBy("user.id")
//     .getRawMany()
// // result will be like this: [{ id: 1, sum: 25 }, { id: 2, sum: 13 }, ...]



// Streaming result data
// stream으로 반환하는 것을 사용할 수 있는데, Streaming은 raw data를 리턴하고, 엔티티 변환을 수동으로 처리해야 함
// const stream = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id", { id: 1 })
//     .stream()


// Using pagination
// 서비스에 pagination, page slider, 또는 infinite scroll components 기능이 있을 때 사용할 수 있음

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .take(10)
//     .getMany()
// This will give you the first 10 users with their photos.

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .skip(10)
//     .getMany()

// 이건 처음 10명의 user를 제외하고 사진과 함께 나머지 user를 리턴함

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .skip(5)
//     .take(10)
//     .getMany()

// 처음의 5명의 user를 제외하고 10명의 유저를 리턴함

// take나 skip은 limit나 offset을 사용하는 것처럼 보임
// 하지만 limit나 offset은 join이나 섭쿼리를 사용한 복잡한 쿼리에서는 원하는 대로 결과를 리턴하지 않을 수 있음
// 이러한 이슈를 피하기 위해 take나 skip을 사용함


// Set locking
// QueryBuilder는 optimistic(낙관적) 잠금과 pessimistic(비관적) 잠금을 모두 지원함. 

// pessimistic(비관적) 읽기 잠금을 사용하려면 다음 방법을 사용함
// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .setLock("pessimistic_read")
//     .getMany()


// pessimistic(비관적) 쓰기 잠금을 사용하려면 다음 방법을 사용함
// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .setLock("pessimistic_write")
//     .getMany()


// dirty 읽기 잠금을 사용하려면 다음 방법을 사용함
// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .setLock("dirty_read")
//     .getMany()


// optimistic(낙관적) 쓰기 잠금을 사용하려면 다음 방법을 사용함
// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .setLock("optimistic", existUser.version)
//     .getMany()

// optimistic(낙관적) 잠금은 @Version 및 @UpdateDate decorator와 함께 작동함

// Use custom index
// 몇 가지 경우에 데이터베이스 서버에서 사용할 수 있는 색인을 제공할 수 있음
// mysql에서만 제공하는 기능임

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .useIndex("my_index") // name of index
//     .getMany()


// # Max execution time
// 서버 충돌을 막기 위해 느린 쿼리는 취소할 수 있음

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .maxExecutionTime(1000) // milliseconds.
//     .getMany()


// Partial selection 부분 선택
// 몇 개의 엔티티 프로퍼티만 선택하고 싶을 경우, 다음과 같은 syntax를 사용할 수 있음

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select(["user.id", "user.name"])
//     .getMany()

// user의 id와 name만 선택할 것임

// Using subqueries
// FROM, WHERE과 JOIN에서 섭쿼리를 사용할 수 있음

// const qb = await dataSource.getRepository(Post).createQueryBuilder("post")

// const posts = qb
//     .where(
//         "post.title IN " +
//             qb
//                 .subQuery()
//                 .select("user.name")
//                 .from(User, "user")
//                 .where("user.registered = :registered")
//                 .getQuery(),
//     )
//     .setParameter("registered", true)
//     .getMany()

// 더 좋은 방법은
// const posts = await dataSource
//     .getRepository(Post)
//     .createQueryBuilder("post")
//     .where((qb) => {
//         const subQuery = qb
//             .subQuery()
//             .select("user.name")
//             .from(User, "user")
//             .where("user.registered = :registered")
//             .getQuery()
//         return "post.title IN " + subQuery
//     })
//     .setParameter("registered", true)
//     .getMany()

// 대안으로 별도의 쿼리 빌더를 만들고 생성된 sql을 사용할 수 있음

// const userQb = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("user.name")
//     .where("user.registered = :registered", { registered: true })

// const posts = await dataSource
//     .getRepository(Post)
//     .createQueryBuilder("post")
//     .where("post.title IN (" + userQb.getQuery() + ")")
//     .setParameters(userQb.getParameters())
//     .getMany()


// FROM에서는 다음과 같이 만들 수 있음

// const userQb = await dataSource
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .select("user.name", "name")
//     .where("user.registered = :registered", { registered: true })

// const posts = await dataSource
//     .createQueryBuilder()
//     .select("user.name", "name")
//     .from("(" + userQb.getQuery() + ")", "user")
//     .setParameters(userQb.getParameters())
//     .getRawMany()

// 또는 더 좋은 방법으로,

// const posts = await dataSource
//     .createQueryBuilder()
//     .select("user.name", "name")
//     .from((subQuery) => {
//         return subQuery
//             .select("user.name", "name")
//             .from(User, "user")
//             .where("user.registered = :registered", { registered: true })
//     }, "user")
//     .getRawMany()

// addFrom를 사용해서 "second from"로써 추가할 수 있음
// 또한 SELECT 구문에서 subselects를 사용할 수 있음

// const posts = await dataSource
//     .createQueryBuilder()
//     .select("post.id", "id")
//     .addSelect((subQuery) => {
//         return subQuery.select("user.name", "name").from(User, "user").limit(1)
//     }, "name")
//     .from(Post, "post")
//     .getRawMany()


// Hidden Columns
// 쿼리하는 모델에 { select: false } 컬럼이 있는 경우 컬럼에서 정보를 검색하려면 addSelect 함수를 사용해야 함

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @Column({ select: false })
//     password: string
// }

// 표준 find 또는 쿼리를 사용할 경우, 모델로 부터 비밀번호 프로퍼티를 받지 못함
// 다음과 같이 해야함

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder()
//     .select("user.id", "id")
//     .addSelect("user.password")
//     .getMany()

// Querying Deleted rows
// 쿼리하는 모델에 @DeleteDateColumn 속성이 설정된 컬럼이 있는 경우 쿼리 빌더는 자동으로 'soft deleted'인 행을 쿼리함

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @DeleteDateColumn()
//     deletedAt?: Date
// }

// 표준 find나 쿼리를 사용할 경우, 저 행의 값을 갖고 있는 rows를 받지 못함
// 다음과 같이 해야함

// const users = await dataSource
//     .getRepository(User)
//     .createQueryBuilder()
//     .select("user.id", "id")
//     .withDeleted()
//     .getMany()

// 삭제된 행이 하나 포함되어 있을 것임


// Common table expressions
// 쿼리 빌더 인스턴스는 데이터베이스가 최소 버전을 지원할 경우, 표준 테이블 식을 지원함.

// const users = await connection.getRepository(User)
//     .createQueryBuilder('user')
//     .select("user.id", 'id')
//     .addCommonTableExpression(`
//       SELECT "userId" FROM "post"
//     `, 'post_users_ids')
//     .where(`user.id IN (SELECT "userId" FROM 'post_users_ids')`)
//     .getMany();

// InsertQueryBuilder 또는 UpdateQueryBuilder 의 결과값은 postgres에서 사용할 수 있음

// const insertQueryBuilder = connection.getRepository(User)
//     .createQueryBuilder()
//     .insert({
//         name: 'John Smith'
//     })
//     .returning(['id']);

// const users = await connection.getRepository(User)
//     .createQueryBuilder('user')
//     .addCommonTableExpression(insertQueryBuilder, 'insert_results')
//     .where(`user.id IN (SELECT "id" FROM 'insert_results')`)
//     .getMany();