//What is EntityManager

//EntityManager를 이용해서 엔티티를 관리할 수 있음(insert, update, delete, load, etc.)
//EntityManager 한 곳에서 모든 엔티티의 레포지토리의 모음과 같음.

//entity manager는 데이터소스를 통해서 엔티티 관리자에 접근할 수 있음

//import { DataSource } from "typeorm"
//import { User } from "./entity/User"

//const myDataSource = new DataSource(/*...*/)
//const user = await myDataSource.manager.findOneBy(User, {
//    id: 1,
//})
//user.name = "Umed"
//await myDataSource.manager.save(user)



//What is Repository
//Repository는 EntityManager와 동일하지만 운영은 구체적인 엔티티로 제한됨. 엔티티 관리자를 통해서 레포지토리에 접근할 수 있음

//import { User } from "./entity/User"

//const userRepository = dataSource.getRepository(User)
//const user = await userRepository.findOneBy({
//    id: 1,
//})
//user.name = "Umed"
//await userRepository.save(user)

//레포지토리의 3가지 타입
//Repository - 엔티티의 일반 

//TreeRepository - 트리 엔티티를 사용하기 위한 레포지토리나 레포지토리의 확장(@Tree decorator를 사용한 엔티티와 같은)
//tree 구조에 작업하는 특별한 메소드를 가짐

//MongoRepository - MongoDB에 사용되는 특별한 기능을 가진 레포지토리



//Find Options

//Basic options
//모든 repository와 manager .find* 메소드는 QueryBuilder를 사용하지 않고 원하는 데이트를 쿼리할 수 있는 특별한 옵션을 가지고 있음

//select - 메인 객체에서 반드시 포함되어야 하는 프로퍼티를 지시함

//userRepository.find({
//  select: {
//      firstName: true,
//      lastName: true,
//  },
//})
//=  SELECT "firstName", "lastName" FROM "user"

//relations - 메인 엔티티와 함께 로드되어야 하는 관계. Sub-relations 또한 로드될 수 있음(join과 leftjoinAndSelect의 약어)

//userRepository.find({
//  relations: {
//      profile: true,
//      photos: true,
//      videos: true,
//  },
//})
//userRepository.find({
//  relations: {
//      profile: true,
//      photos: true,
//      videos: {
//          videoAttributes: true,
//      },
//  },
//})

//이처럼 객체로 표현할 수 있지만, []에 요소로 관계를 맺을 관계 맺은 관계를 정의할 수 있음

//아래의 쿼리와 동일하게 동작함
//SELECT * FROM "user"
//LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
//LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
//LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"

//SELECT * FROM "user"
//LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
//LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
//LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"
//LEFT JOIN "video_attributes" ON "video_attributes"."id" = "videos"."video_attributesId"


//where - 엔티티를 쿼리해야 하는 간단한 조건

//userRepository.find({
//  where: {
//      firstName: "Timber",
//      lastName: "Saw",
//  },
//})
//= SELECT * FROM "user" WHERE "firstName" = 'Timber' AND "lastName" = 'Saw'

//내장된 엔티티에서 컬럼을 쿼리하는 작업은 컬럼이 정의된 계층과 관련하여 수행함

//userRepository.find({
//  relations: {
//      project: true,
//  },
//  where: {
//      project: {
//          name: "TypeORM",
//          initials: "TORM",
//      },
//  },
//})
//= SELECT * FROM "user"
//LEFT JOIN "project" ON "project"."id" = "user"."projectId"
//WHERE "project"."name" = 'TypeORM' AND "project"."initials" = 'TORM'

//OR을 사용한 쿼리
//userRepository.find({
//  where: [
//      { firstName: "Timber", lastName: "Saw" },
//      { firstName: "Stan", lastName: "Lee" },
//  ],
//})

//= SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')


//order - 정렬 방법을 선택

//userRepository.find({
//  order: {
//      name: "ASC",
//      id: "DESC",
//  },
//})

//= SELECT * FROM "user" ORDER BY "name" ASC, "id" DESC


//withDeleted - softDelete or softRemove를 사용해서 soft-delete하는 엔티티를 지시함(예 @DeleteDateColumn column이 설정되어있음) 
//기본적으로 soft 삭제 엔티티는 포함되지 않음

//userRepository.find({
//  withDeleted: true,
//})


// 복수의 엔티티를 반환하는 find* methods는 다음과 같은 옵션을 가질 수 있음

// skip - 엔티티를 가져올 위치에서 offset(페이지구분)

// userRepository.find({
//     skip: 5,
// })
// = SELECT * FROM "user" OFFSET 5


// take - 가져올 엔티티의 최대 갯수를 제한함(페이지구분)
// userRepository.find({
//     take: 10,
// })
// = SELECT * FROM "user" LIMIT 10

// skip과 take는 같이 사용해야함.



// cache - 쿼리 결과를 캐싱할 지 여부. 
// 캐싱 옵션에 대해서는 다음에 자세하게 알아볼 예정

// userRepository.find({
//     cache: true,
// })


// lock - 쿼리에 대한 locking mechanism을 사용함. findOne과 findOneBy methods에서만 사용 가능함. 
// lock의 다음과 같이 정의될 수 있는 객체임

// { mode: "optimistic", version: number | Date }

// 또는

// {
//     mode: "pessimistic_read" |
//         "pessimistic_write" |
//         "dirty_read" |
//         "pessimistic_partial_write" |
//         "pessimistic_write_or_fail" |
//         "for_no_key_update" |
//         "for_key_share"
// }


// userRepository.findOne({
//     where: {
//         id: 1,
//     },
//     lock: { mode: "optimistic", version: 1 },
// })


// 잠금 모드 지원 및 변환되는 SQL 문은 아래 표와 같음
// 지정된 잠금 모드가 지원되지 않으면 LockNotSupportedOnGivenDriverError 오류가 발생함

// |                 | pessimistic_read         | pessimistic_write       | dirty_read    | pessimistic_partial_write   | pessimistic_write_or_fail   | for_no_key_update   | for_key_share |
// | --------------- | --------------------     | ----------------------- | ------------- | --------------------------- | --------------------------- | ------------------- | ------------- |
// | MySQL           | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED      | FOR UPDATE NOWAIT           |                     |               |
// | Postgres        | FOR SHARE                | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED      | FOR UPDATE NOWAIT           | FOR NO KEY UPDATE   | FOR KEY SHARE |
// | Oracle          | FOR UPDATE               | FOR UPDATE              | (nothing)     |                             |                             |                     |               |
// | SQL Server      | WITH (HOLDLOCK, ROWLOCK) | WITH (UPDLOCK, ROWLOCK) | WITH (NOLOCK) |                             |                             |                     |               |
// | AuroraDataApi   | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     |                             |                             |                     |               |
// | CockroachDB     |                          | FOR UPDATE              | (nothing)     |                             | FOR UPDATE NOWAIT           | FOR NO KEY UPDATE   |               |




// Advanced options

// Not - 해당 조건과 일치하지 않는 데이터를 찾을 수 있음
// import { Not } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: Not("About #1"),
// })
// = SELECT * FROM "post" WHERE "title" != 'About #1'


// LessThan - 미만의 값을 찾을 수 있음
// import { LessThan } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: LessThan(10),
// })
// = SELECT * FROM "post" WHERE "likes" < 10


// LessThanOrEqual - 이하의 값을 찾을 수 있음
// import { LessThanOrEqual } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: LessThanOrEqual(10),
// })
// = SELECT * FROM "post" WHERE "likes" <= 10


// MoreThan - 초과하는 값을 찾을 수 있음
// import { MoreThan } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: MoreThan(10),
// })
// = SELECT * FROM "post" WHERE "likes" > 10


// MoreThanOrEqual - 이상의 값을 찾을 수 있음
// import { MoreThanOrEqual } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: MoreThanOrEqual(10),
// })
// = SELECT * FROM "post" WHERE "likes" >= 10


// Equal - 동일한 값을 찾을 수 있음
// import { Equal } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: Equal("About #2"),
// })
// = SELECT * FROM "post" WHERE "title" = 'About #2'


// Like - 포함하는 값을 찾을 수 있음(%를 잘 붙여줘야함)
// import { Like } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: Like("%out #%"),
// })
// = SELECT * FROM "post" WHERE "title" LIKE '%out #%'


// ILike - 패턴과의 비교를 기준으로 문자열을 찾음. LIKE 함수와 달리 문자열 일치는 대소문자를 구분하지 않음.
// import { ILike } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: ILike("%out #%"),
// })
// = SELECT * FROM "post" WHERE "title" ILIKE '%out #%'

// 사용하는 패턴에서(like도 동일)
// 밑줄(_)은 특정 위치에 한 문자만 대신할 때 사용.
// 백분율 기호(%)는 임의의 문자열을 대신할 때 사용.



// Between - 조건의 사잇값을 찾음
// import { Between } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: Between(1, 10),
// })
// = SELECT * FROM "post" WHERE "likes" BETWEEN 1 AND 10


// In - 배열로 제시된 값들 중 하나라도 일치하는 데이터를 찾음
// import { In } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: In(["About #2", "About #3"]),
// })
// = SELECT * FROM "post" WHERE "title" IN ('About #2','About #3')


// Any - 하위 쿼리 값이 조건을 충족하면 ANY 명령은 true를 반환함.
// import { Any } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: Any(["About #2", "About #3"]),
// })
// = SELECT * FROM "post" WHERE "title" = ANY(['About #2','About #3'])


// 예시
// 아래의 SQL 문은 TRUE를 반환하고 OrderDetails 테이블에서 수량이 10개인 레코드를 찾을 경우 제품 이름을 나열합

// SELECT ProductName
// FROM Products
// WHERE ProductID = ANY (SELECT ProductID FROM OrderDetails WHERE Quantity = 10);


// IsNull - 해당 컬럼이 널인 데이터를 찾음
// import { IsNull } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     title: IsNull(),
// })
// = SELECT * FROM "post" WHERE "title" IS NULL


// ArrayContains
// import { ArrayContains } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     categories: ArrayContains(["TypeScript"]),
// })
// = SELECT * FROM "post" WHERE "categories" @> '{TypeScript}'
// // @는 어떤 의미를 갖는 지 학습 후 추가할 예정


// ArrayContainedBy
// import { ArrayContainedBy } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     categories: ArrayContainedBy(["TypeScript"]),
// })
// = SELECT * FROM "post" WHERE "categories" <@ '{TypeScript}'



// ArrayOverlap
// import { ArrayOverlap } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     categories: ArrayOverlap(["TypeScript"]),
// })
// = SELECT * FROM "post" WHERE "categories" && '{TypeScript}'
// // &&도 어떤 의미를 갖는 지 학습 후 추가할 예정



// Raw
// import { Raw } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     likes: Raw("dislikes - 4"),
// })
// = SELECT * FROM "post" WHERE "likes" = "dislikes" - 4

// 가장 간단하게는, raw 쿼리가 = 의 바로 뒤에 삽입됨
// 함수를 사용해서 비교 논리를 완전히 다시 작성할 수 있음

// import { Raw } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     currentDate: Raw((alias) => `${alias} > NOW()`),
// })
// = SELECT * FROM "post" WHERE "currentDate" > NOW()

// 만약 사용자의 입력을 제공해야 하는 경우, SQL injection vulnerability(SQL 주입 취약성)이 발생할 수 있으므로 쿼리에 사용자 입력을 직접 포함해서는 안 됨.
// 대신 Raw function의 두 번째 인수를 사용하여 쿼리에 바인딩할 매개 변수 목록을 제공할 수 있음.

// import { Raw } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findBy({
//     currentDate: Raw((alias) => `${alias} > :date`, { date: "2020-10-06" }),
// })
// = SELECT * FROM "post" WHERE "currentDate" > '2020-10-06'

// 사용자의 입력을 배열로 사용할 경우,
// 특별한 표현 syntax를 이용해서 sql 구문에 배열을 바인딩 할 수 있음.
// If you need to provide user input that is an array, 

// import { Raw } from "typeorm"

// const loadedPosts = await dataSource.getRepository(Post).findby({
//     title: Raw((alias) => `${alias} IN (:...titles)`, {
//         titles: [
//             "Go To Statement Considered Harmful",
//             "Structured Programming",
//         ],
//     }),
// })
// = SELECT * FROM "post" WHERE "titles" IN ('Go To Statement Considered Harmful', 'Structured Programming')