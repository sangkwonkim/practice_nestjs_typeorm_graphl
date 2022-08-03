// 현재 진행 중인 프로젝트에서 eager 옵션으로 인해 Maximum call stack error가 발생해서 코드를 전반적으로 수정한 경험이 있습니다.

// 이번 시간에는 eager의 장단점과 lazy에 대해서 알아보겠습니다.

// eager 옵션은 관계 데이터를 relation 없이 한 번에 호출할 수 있는 옵션입니다.

// 공식홈페이지
// eager 관계는 find* 메서드에서만 이용 가능하며,
// QueryBuilder를 사용할 때는, leftJoinAndSelect를 사용하면 eager가 동작합니다.

// 마지막으로 양 쪽에서 eager: true 옵션을 사용할 수 없습니다.

// 진행 중인 프로젝트에서는 양 쪽에서 eager를 작성하진 않았는 데, eager 관계가 많다보니 call 사이즈가 초과하면서 에러가 발생했습니다.

// 이뿐만 아니라 eager는 다음과 같은 단점이 있습니다.

// relation 데이터를 모두 갖고 오다보니 초기 로딩 시간이 깁니다.
// 현재 호출에 필요한 데이터뿐만 아니라 불필요한 데이터도 함께 받는 오버 패칭이 발생할 수 있습니다.

// lazy relation 지연 관계

// 공식 홈페이지
// lazy relation는 엑세스하면 로드됩니다. 즉, 필요할 때 이용할 수 있다는 것을 의미합니다.
// lazy relation은 Promise 타입이여야 하며, lazy relation을 로드할 때는 promise로 리턴됩니다.

// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
// import { Question } from "./Question"

// @Entity()
// export class Category {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @ManyToMany((type) => Question, (question) => question.categories)
//     questions: Promise<Question[]>
// }


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

//     @ManyToMany((type) => Category, (category) => category.questions)
//     @JoinTable()
//     categories: Promise<Category[]>
// }

// categories는 promise로, 데이터를 promise로만 저장할 수 있습니다.

// Question 데이터를 불러오면, categories는 해당 데이터에서 async/await으로 정보를 불러올 수 있습니다.
// 이러한 작업이 없을 경우에는 categories 정보는 불러올 수 없습니다.

// lazy relation은 eager relation에 비해 쿼리가 많이 발생한다는 단점이 있지만,
// eager와 달리 연관된 데이터를 전부 가져오지 않기 때문에 초기 로딩 시간을 줄일 수 있어 효율적으로 이용할 수 있습니다.







// 자기 참조 관계
// 자기 참조 관계는 자신과 관계를 맺는 것입니다.
// 트리 구조에서 엔티티를 저장할 때 유용합니다.(tree-like structures가 정확하게 무슨 뜻인지 파악하기 어려웠습니다.)
// 또한 인접 리스트 패턴은 자기 참조 관계를 사용해서 구현됩니다.
// 예를 들어 카테고리 트리를 만들려는 경우 
// 범주는 범주를 중첩할 수 있고, 중첩 범주는 다른 범주를 중첩할 수 있습니다. 
// 여기서는 자기 참조 관계가 편리합니다. 
// 기본적으로 자기 참조 관계는 개체 자체를 대상으로 하는 규칙적인 관계일 뿐입니다.

// 다음과 같이 자기 참조 관계를 구현할 수 있습니다.

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from "typeorm"

// @Entity()
// export class Category {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column()
//   title: string

//   @Column()
//   text: string

//   @ManyToOne((type) => Category, (category) => category.childCategories)
//   parentCategory: Category

//   @OneToMany((type) => Category, (category) => category.parentCategory)
//   childCategories: Category[]
// }



// 조인 관계 없이 related object의 id를 사용하는 방법
// relation에 의해서 생성되는 컬럼명과 동일하게 @Column으로 추가하면 됩니다.

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToOne,
//   JoinColumn,
// } from "typeorm"
// import { Profile } from "./Profile"

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column()
//   name: string

//   @Column({ nullable: true })
//   profileId: number

//   @OneToOne((type) => Profile)
//   @JoinColumn()
//   profile: Profile
// }

// User {
//   id: 1,
//   name: "Umed",
//   profileId: 1
// }

// 그러면 이렇게 user에서 관계된 profile의 전체를 불러오지 않고도 id를 알 수 있습니다.



// 관계 속성 초기화 에러

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToMany,
//   JoinTable,
// } from "typeorm"
// import { Category } from "./Category"

// @Entity()
// export class Question {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column()
//   title: string

//   @Column()
//   text: string

//   @ManyToMany((type) => Category, (category) => category.questions)
//   @JoinTable()
//   categories: Category[] = [] // see = [] initialization here
// }

// 위와 같은 relation 프로퍼티의 초기화가 유용할 수도 있습니다.

// 하지만 초기화를 한 상태에서 저장을 할 경우, 이전에 설정한 모든 카테고리가 제거됩니다.

// 초기화를 할 경우, 해당 관계에서 그 안의 모든 항목이 삭제된 것으로 간주하기 때문입니다.

// 그래서 엔티티와 생성자에서 초기화를 하지 않아야 합니다.
