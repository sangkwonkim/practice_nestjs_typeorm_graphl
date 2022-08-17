// Logging

// Enabling logging
// 데이터 소스 옵션에 { logging: true }를 설정함으로써 모든 쿼리와 에러를 로그 할 수 있음
// {
//     name: "mysql",
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     ...
//     logging: true
// }


// Logging options
// 데이터 소스 옵션에서 다른 타입의 로깅을 할 수 있음

// {
//     host: "localhost",
//     ...
//     logging: ["query", "error"]
// }

// 실패한 쿼리만 로깅하길 원한다면 error만 추가해주면 됨

// {
//     host: "localhost",
//     ...
//     logging: ["error"]
// }

// log 옵션은 타입orm4.ts에서 학습했기에 넘어감

// { logging: "all" } 을 사용해서 모든 로깅을 할 수 있음

// {
//     host: "localhost",
//     ...
//     logging: "all"
// }


// Log long-running queries
// 성능 문제가 있을 경우에는, 데이터 소스 옵션에 maxQueryExecutionTime를 설정함으로써 쿼리 실행에 오랜 시간이 걸리는 쿼리를 로그할 수 있음

// {
//     host: "localhost",
//     ...
//     maxQueryExecutionTime: 1000
// }

// 이 코드는 1초 이상 실행되는 모든 쿼리를 로그할 것임


// 디폴트 로그 변경도 타입orm4.ts에서 다뤘기에 넘어감



// Using custom logger
// 로거 인터페이스를 구현함으로써 자신만의 로거 클래스를 만들 수 있음

// import { Logger } from "typeorm"

// export class MyCustomLogger implements Logger {
//     // implement all methods from logger class
// }


// 그리고 데이터 소스 옵션을 명시함


// import { DataSource } from "typeorm"
// import { MyCustomLogger } from "./logger/MyCustomLogger"

// const dataSource = new DataSource({
//     name: "mysql",
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     logger: new MyCustomLogger(),
// })

// Logger 메서드는 사용 가능한 QueryRunner를 허용할 수 있음
// 추가 데이터를 기록하려는 경우에 유용하며 쿼리 실행기를 통해 지속/제거 중에 전달된 추가 데이터에 접근할 수 있음

// // user sends request during entity save
// postRepository.save(post, { data: { request: request } });

// // in logger you can access it this way:
// logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
//     const requestUrl = queryRunner && queryRunner.data["request"] ? "(" + queryRunner.data["request"].url + ") " : "";
//     console.log(requestUrl + "executing query: " + query);
// }



// Active Record vs Data Mapper

// What is the Active Record pattern?
// 타입orm에서는 Active Record와 the Data Mapper patterns을 사용할 수 있음
// Active Record pattern을 사용하면 모델 자체 내에서 모든 쿼리 방법을 정의하고 모델 방법을 사용하여 개체를 저장, 제거 및 로드할 수 있음
// 간단하게 말하면, Active Record pattern은 모델 내부에서 데이터베이스에 접근하는 접근 방식임

// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @Column()
//     isActive: boolean
// }


// 모든 active-record 엔티티는 엔티티와 함께 작업하기 위한 BaseEntity class를 확장해야 함.

// 이러한 엔티티가 동작하는 방식임
// // example how to save AR entity
// const user = new User()
// user.firstName = "Timber"
// user.lastName = "Saw"
// user.isActive = true
// await user.save()

// // example how to remove AR entity
// await user.remove()

// // example how to load AR entities
// const users = await User.find({ skip: 2, take: 5 })
// const newUsers = await User.findBy({ isActive: true })
// const timber = await User.findOneBy({ firstName: "Timber", lastName: "Saw" })


// BaseEntity는 표준 레포지토리의 많은 메소드를 가지고 있음
// 대부분의 경우 active record entities와 Repository 또는 EntityManager를 함께 사용할 필요가 없음


// first와 last name으로 유저를 리턴하는 함수를 만들어봄
// User class 안에서 static method로 다음과 같은 함수를 만들면 됨

// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @Column()
//     isActive: boolean

//     static findByName(firstName: string, lastName: string) {
//         return this.createQueryBuilder("user")
//             .where("user.firstName = :firstName", { firstName })
//             .andWhere("user.lastName = :lastName", { lastName })
//             .getMany()
//     }
// }

// 그러면 이렇게 사용할 수 있음

// const timber = await User.findByName("Timber", "Saw")



// What is the Data Mapper pattern?
// Data Mapper 접근 방식을 사용하면 repositories라는 구별된 class안에 쿼리 메소드를 정의해서 레포지토리를 이용해서 저장하고 삭제하고 로드할 수 있음
// data mapper 내부의 엔티티는 매우 멍청함. 엔티티는 단순히 자기들의 프로퍼티를 정의하고, 몇몇 "확실한" 방법들을 가지고 있을 수 있음

// 간단하게 말하면 data mapper는 모델 대신에 레포지토리 내부에서 데이터베이스에 접근하는 접근 방식임

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @Column()
//     isActive: boolean
// }


// const userRepository = dataSource.getRepository(User)

// // example how to save DM entity
// const user = new User()
// user.firstName = "Timber"
// user.lastName = "Saw"
// user.isActive = true
// await userRepository.save(user)

// // example how to remove DM entity
// await userRepository.remove(user)

// // example how to load DM entities
// const users = await userRepository.find({ skip: 2, take: 5 })
// const newUsers = await userRepository.findBy({ isActive: true })
// const timber = await userRepository.findOneBy({
//     firstName: "Timber",
//     lastName: "Saw",
// })
// 커스텀 메소드로 표준 레포지토리를 확장하기 위해서 커스텀 레포지토리 패턴을 이용해야함


// Which one should I choose?
// 결정은 개발자한테 달려있음. 두 전략 모두 장단점이 있음

// 소프트웨어 개발과 관련하여 항상 염두에 두어야 할 한 가지는 애플리케이션을 어떻게 유지할 것인가 하는 것임
// Data Mapper 접근 방식은 유지보수에 도움이 되며, 이는 더 큰 앱에서 더 효과적임
// Active Record 접근 방식은 작은 앱에서 잘 작동하는 단순함을 유지하는 데 도움이 됨
// 그리고 단순성은 항상 더 나은 유지보수를 위한 열쇠임