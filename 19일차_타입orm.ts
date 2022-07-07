// typeorm에서 테이블 간 relation 때 cascade 옵션은 프로젝트에서 자주 사용해서 학습하고 이해를 했지만, 다른 옵션들은 사용하질 않아서 깊이 있게 학습하질 않았습니다.
// 이번 기회에 조금 더 자세하게 학습해서 다른 옵션들도 필요한 상황에서 활용해보겠습니다.

// eager 옵션
// eager: boolean - If set to true, the relation will always be loaded with the main entity when using find* methods or QueryBuilder on this entity
// true로 설정 시 find* 메소드 또는 QueryBuilder를 사용할 때 relation이 항상 로드됩니다.


// Eager relations
// Eager relations are loaded automatically each time you load entities from the database.

// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     ManyToMany,
//     JoinTable,
// } from "typeorm"
// import { Category } from "./Category"

// @Entity()
// export class Question {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     title: string

//     @Column()
//     text: string

//     @ManyToMany((type) => Category, (category) => category.questions, {
//         eager: true,
//     })
//     @JoinTable()
//     categories: Category[]
// }

// when you load questions you don't need to join or specify relations you want to load. They will be loaded automatically:
// Eager relations only work when you use find* methods. If you use QueryBuilder eager relations are disabled and have to use leftJoinAndSelect to load the relation. 
// Eager relations can only be used on one side of the relationship, using eager: true on both sides of relationship is disallowed.

// find 메소드를 사용할 경우 조인이나 relation을 사용하지 않아도 함께 로드됩니다.

// Typeorm 공식문서에 서 What is Relations? 에서는 QueryBuilder나 find 사용할 때 다 eager가 적용된다고 하는데,
// Eager and Lazy Relations 에서는 find*에서만 동작한다고 나와있습니다. => 어떤 차이를 설명하는 건지 이해하게 된다면 추가적으로 공유하겠습니다.
// 그리고 Eager relations가 양 쪽 테이블에서 사용될 경우 동작하지 않을 수 있기에 한 쪽에서만 정의해야합니다.

// 다음에 진행하는 모듈에서 Eager 옵션을 사용해보고 결과를 공유하도록 하겠습니다.