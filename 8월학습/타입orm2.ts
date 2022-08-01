// Many-to-one / one-to-many relations

// Many-to-one / one-to-many 관계는 A가 여러 개의 B를 가지지만, B가 A의 하나의 인스턴스만 가지는 것입니다. 

// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
// import { User } from "./User"

// @Entity()
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     url: string

//     @ManyToOne(() => User, (user) => user.photos)
//     user: User
// }

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
// import { Photo } from "./Photo"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @OneToMany(() => Photo, (photo) => photo.user)
//     photos: Photo[]
// }

// 하나의 user가 여러 개의 photo를 가지지만 각 photo는 오직 하나의 user에만 귀속될 수 있습니다.

// @ManyToOne / @OneToMany 관계에서 @JoinColumn을 생략할 수 있습니다.

// @OneToMany는 @ManyToOne 없이는 존재할 수 없습니다. @OneToMany를 사용하려면 @ManyToOne이 필요합니다. 
// 하지만, @ManyToOne 관계만 쓰는 경우 관련 엔티티에 @OneToMany를 두지 않고 정의할 수 있습니다. 
// @Many-to-one을 설정한 곳에 "relation id" 컬럼이 생성되면 이 것이 외래키가 됩니다. 

// +-------------+--------------+----------------------------+
// |                         photo                           |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | url         | varchar(255) |                            |
// | userId      | int(11)      | FOREIGN KEY                |
// +-------------+--------------+----------------------------+

// +-------------+--------------+----------------------------+
// |                          user                           |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(255) |                            |
// +-------------+--------------+----------------------------+


// OneToMany에서 cascade: true를 할 경우
// {onDelete:'CASCADE'}를 @ManyToOne 선언할 경우, user을 삭제함으로써 관련된 photo들을 지울 수 있습니다.







// many-to-many relations

// Many-to-many 관계는 A가 여러 개의 B의 인스턴스를 포함하며, B도 여러 개의 A 인스턴스를 가지는 것입니니다.

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class Category {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string
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

//     @ManyToMany(() => Category)
//     @JoinTable()
//     categories: Category[]
// }

// @JoinTable()은 @ManyToMany 에서 꼭 필요합니다.  
// @JoinTable은 종속관계에서 소유하는 테이블에 선언합니다.

// +-------------+--------------+----------------------------+
// |                        category                         |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(255) |                            |
// +-------------+--------------+----------------------------+

// +-------------+--------------+----------------------------+
// |                        question                         |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | title       | varchar(255) |                            |
// | text        | varchar(255) |                            |
// +-------------+--------------+----------------------------+

// +-------------+--------------+----------------------------+
// |              question_categories_category               |
// +-------------+--------------+----------------------------+
// | questionId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
// | categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
// +-------------+--------------+----------------------------+

// 이렇게 선언된 테이블의 다음과 같은데,
// jointable을 선언한 곳이 manyToMany로 생성된 브릿지 테이블의 이름에서 우선하는 것을 알 수 있습니다.


// # Soft Deleting a relationship with cascade
// cascade를 이용한 softDelete

// const category1 = new Category()
// category1.name = "animals"

// const category2 = new Category()
// category2.name = "zoo"

// const question = new Question()
// question.categories = [category1, category2]
// const newQuestion = await dataSource.manager.save(question)

// await dataSource.manager.softRemove(newQuestion)

// 아래와 같은  cascade 옵션을 통해서 자동으로 category1과 category2를 저장하거나 softRemove할 수 있습니다.
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

//     @ManyToMany(() => Category, (category) => category.questions, {
//         cascade: true,
//     })
//     @JoinTable()
//     categories: Category[]
// }








// OneToOne과 같이 다음처럼 양방향 관계를 가질 수 있습니다

// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
// import { Question } from "./Question"

// @Entity()
// export class Category {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @ManyToMany(() => Question, (question) => question.categories)
//     questions: Question[]
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

//     @ManyToMany(() => Category, (category) => category.questions)
//     @JoinTable()
//     categories: Category[]
// }




// # Many-to-many relations with custom properties

// 앞 서 공유했었던 커스텀 프로퍼티에 대한 내용입니다.

// PostToCategory라는 테이블을 만들어서 양 방향과 ManyToOne 관계를 가지고 커스텀 컬럼을 추가할 수 있습니다.


// import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
// import { Post } from "./post"
// import { Category } from "./category"

// @Entity()
// export class PostToCategory {
//     @PrimaryGeneratedColumn()
//     public postToCategoryId!: number

//     @Column()
//     public postId!: number

//     @Column()
//     public categoryId!: number

//     @Column()
//     public order!: number

//     @ManyToOne(() => Post, (post) => post.postToCategories)
//     public post!: Post

//     @ManyToOne(() => Category, (category) => category.postToCategories)
//     public category!: Category
// }
// Additionally you will have to add a relationship like the following to Post and Category:

// // category.ts
// ...
// @OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
// public postToCategories!: PostToCategory[];

// // post.ts
// ...
// @OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
// public postToCategories!: PostToCategory[];





// remove and delete 차이
// remove - Removes a given entity or array of entities. It removes all given entities in a single transaction (in the case of entity, manager is not transactional).
// Example:

// await repository.remove(user);
// await repository.remove([
//     category1,
//     category2,
//     category3
// ]);

// delete - Deletes entities by entity id, ids or given conditions:
// Example:

// await repository.delete(1);
// await repository.delete([1, 2, 3]);
// await repository.delete({ firstName: "Timber" });

// 엔티티나 엔티티 배열을 가지고 있다면, remove를 사용하고
// 조건이나, id를 알고 있다면 delete를 사용할 수 있다.







// delete와 softRemove 차이점
// delete<Entity>(targetOrEntity: EntityTarget<Entity>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | any): Promise<DeleteResult>;

// 주어진 조건에 맞는 엔티티를 삭제한다.
// cascade가 없는 원시적인 동작이 실행되는 것과는 다르게, relation과 다른 동작들을 포함한다.
// 데이터베이스에서 해당 엔티티가 존재하는 지 여부를 확인하지 않으며, 조건이 공란으로 올 순 없다.

// softDelete<Entity>(targetOrEntity: EntityTarget<Entity>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | any): Promise<UpdateResult>;
// 주어진 조건에 맞는 엔티티의 delete date를 기록한다
// cascade가 없는 원시적인 동작이 실행되는 것과는 다르게, relation과 다른 동작들을 포함한다.
// 빠르고 효율적으로 delete 쿼리를 실행한다.
// 데이터 베이스에 해당 엔티티가 존재하는 지 여부를 확인하지 않으며, 조건이 공란으로 올 수 없다.





// @ManyToMany(() => StudentCart, (cart) => cart.artClasses, {
//   cascade: true,
//   onDelete: 'CASCADE',
// })
// studentCarts: StudentCart[];

