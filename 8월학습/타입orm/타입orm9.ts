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