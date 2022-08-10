// View Entities

// view 엔티티는 데이터베이스 view에 매핑되는 클래스임. 새로운 클래스를 @ViewEntity()로 정의하면 사용할 수 있음

// @ViewEntity() 옵션

// name - view 이름으로, 지정하지 않으면 엔티티의 클래스명으로 생성됨
// database - db 서버에서 선택된 데이터베이스 이름
// schema - 스키마명
// expression - 뷰의 정의로, 파라미터가 필요함
// dependsOn - 현재 뷰가 종속된 다른 뷰의 목록, 뷰가 해당 정의 내에서 다른 뷰를 사용할 경우, 여기에 추가하여 마이그레이션이 올바른 순서대로 생성되도록 여기에 추가할 수 있음

// expression은 적절한 escaped columns과 테이블이 있는 문자열일 수 있음

// @ViewEntity({
//     expression: (dataSource: DataSource) => dataSource
//         .createQueryBuilder()
//         .select("post.id", "id")
//         .addSelect("post.name", "name")
//         .addSelect("category.name", "categoryName")
//         .from(Post, "post")
//         .leftJoin(Category, "category", "category.id = post.categoryId")
// })

// 파라미터 바인딩은 드라이버 제한으로 지원되지 않음. 대신 리터럴 파라미터를 사용할 수 있음

// @ViewEntity({
//     expression: (dataSource: DataSource) => dataSource
//         .createQueryBuilder()
//         .select("post.id", "id")
//         .addSelect("post.name", "name")
//         .addSelect("category.name", "categoryName")
//         .from(Post, "post")
//         .leftJoin(Category, "category", "category.id = post.categoryId")
//         .where("category.name = :name", { name: "Cars" })  // <-- this is wrong
//         .where("category.name = 'Cars'")                   // <-- and this is right
// })


// 뷰 엔티티는 데이터 소스 옵션에 등록되어야 함

// import { DataSource } from "typeorm"
// import { UserView } from "./entity/UserView"

// const dataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     entities: [UserView],
// })



// # View Entity columns

// 뷰가 올바른 엔티티 컬럼의 데이터와 매핑하기 위해서는 엔티티 컬럼에 @ViewColumn() 데코레이터를 사용하고, 선택한 구문 별칭으로 컬럼을 지정해야 함

// import { ViewEntity, ViewColumn } from "typeorm"

// @ViewEntity({
//     expression: `
//         SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
//         FROM "post" "post"
//         LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
//     `,
// })
// export class PostCategory {
//     @ViewColumn()
//     id: number

//     @ViewColumn()
//     name: string

//     @ViewColumn()
//     categoryName: string
// }

// import { ViewEntity, ViewColumn } from "typeorm"

// @ViewEntity({
//     expression: `
//         SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
//         FROM "post" "post"
//         LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
//     `,
// })
// export class PostCategory {
//     @ViewColumn()
//     id: number

//     @ViewColumn()
//     name: string

//     @ViewColumn()
//     categoryName: string
// }

// View Column options
// @ViewColumn 내부에 view column options을 추가할 수 있음

// name: string - 데이터베이스 뷰에서 컬럼명
// transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType } - 
// 임의 유형의 데이터베이스 속성을 unmarshal하는 데에 사용됨
// 데이터베이스에서 지원하는 유형을 EntityType 유형에 입력
// transformers 배열 또한 지원되며, 읽을 때 역순으로 적용됨. 
// 데이터베이스 뷰는 읽기 전용이기 때문에 transformer.to(value)는 사용되지 않음



// Complete example

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
//     ManyToOne,
//     JoinColumn,
// } from "typeorm"
// import { Category } from "./Category"

// @Entity()
// export class Post {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @Column()
//     categoryId: number

//     @ManyToOne(() => Category)
//     @JoinColumn({ name: "categoryId" })
//     category: Category
// }
// import { ViewEntity, ViewColumn, DataSource } from "typeorm"

// @ViewEntity({
//     expression: (dataSource: DataSource) =>
//         dataSource
//             .createQueryBuilder()
//             .select("post.id", "id")
//             .addSelect("post.name", "name")
//             .addSelect("category.name", "categoryName")
//             .from(Post, "post")
//             .leftJoin(Category, "category", "category.id = post.categoryId"),
// })
// export class PostCategory {
//     @ViewColumn()
//     id: number

//     @ViewColumn()
//     name: string

//     @ViewColumn()
//     categoryName: string
// }

// 데이터를 채우고 PostCategory view를 요청하며

// import { Category } from "./entity/Category"
// import { Post } from "./entity/Post"
// import { PostCategory } from "./entity/PostCategory"

// const category1 = new Category()
// category1.name = "Cars"
// await dataSource.manager.save(category1)

// const category2 = new Category()
// category2.name = "Airplanes"
// await dataSource.manager.save(category2)

// const post1 = new Post()
// post1.name = "About BMW"
// post1.categoryId = category1.id
// await dataSource.manager.save(post1)

// const post2 = new Post()
// post2.name = "About Boeing"
// post2.categoryId = category2.id
// await dataSource.manager.save(post2)

// const postCategories = await dataSource.manager.find(PostCategory)
// const postCategory = await dataSource.manager.findOneBy(PostCategory, { id: 1 })

// // postCategories
// [ PostCategory { id: 1, name: 'About BMW', categoryName: 'Cars' },
//   PostCategory { id: 2, name: 'About Boeing', categoryName: 'Airplanes' } ]

// // postCategory
// PostCategory { id: 1, name: 'About BMW', categoryName: 'Cars' }




// Separating Entity Definition

// Defining Schemas
// 모델에 바로 엔티티와 컬럼을 정의하고 데코레이터를 사용할 수 있음. 하지만 몇몇의 사람들은 엔티티와 컬럼을 타입orm에서 entity schemas라고 불리는 분리된 파일에 정의하는 걸 선호함

// 정의 예제
// import { EntitySchema } from "typeorm"

// export const CategoryEntity = new EntitySchema({
//     name: "category",
//     columns: {
//         id: {
//             type: Number,
//             primary: true,
//             generated: true,
//         },
//         name: {
//             type: String,
//         },
//     },
// })

// 관계 예제
// import { EntitySchema } from "typeorm"

// export const PostEntity = new EntitySchema({
//     name: "post",
//     columns: {
//         id: {
//             type: Number,
//             primary: true,
//             generated: true,
//         },
//         title: {
//             type: String,
//         },
//         text: {
//             type: String,
//         },
//     },
//     relations: {
//         categories: {
//             type: "many-to-many",
//             target: "category", // CategoryEntity
//         },
//     },
// })

// 복합 예제
// import { EntitySchema } from "typeorm"

// export const PersonSchema = new EntitySchema({
//     name: "person",
//     columns: {
//         id: {
//             primary: true,
//             type: "int",
//             generated: "increment",
//         },
//         firstName: {
//             type: String,
//             length: 30,
//         },
//         lastName: {
//             type: String,
//             length: 50,
//             nullable: false,
//         },
//         age: {
//             type: Number,
//             nullable: false,
//         },
//     },
//     checks: [
//         { expression: `"firstName" <> 'John' AND "lastName" <> 'Doe'` },
//         { expression: `"age" > 18` },
//     ],
//     indices: [
//         {
//             name: "IDX_TEST",
//             unique: true,
//             columns: ["firstName", "lastName"],
//         },
//     ],
//     uniques: [
//         {
//             name: "UNIQUE_TEST",
//             columns: ["firstName", "lastName"],
//         },
//     ],
// })


// 엔티티를 typesafe로 만들 기 원한다면, 모델을 정의하고 스키마 정의에 지정할 수 있음
// import { EntitySchema } from "typeorm"

// export interface Category {
//     id: number
//     name: string
// }

// export const CategoryEntity = new EntitySchema<Category>({
//     name: "category",
//     columns: {
//         id: {
//             type: Number,
//             primary: true,
//             generated: true,
//         },
//         name: {
//             type: String,
//         },
//     },
// })



// Extending Schemas
// 데코레이터 approach를 사용하면 abstract 클래스로 기본 컬럼을 쉽게 확장하고, 이를 간단하게 확장할 수 있음
// 예를 들어 id, createdAt, updatedAt column들은 이러한 기본 엔티티에 정의할 수 있음

// EntitySchema를 사용할 경우 이러한 것들이 불가능한데, 스프래드 오프레이터를 사용할 수 있음.
// 기본 컬럼 설명을 추출해서 다른 스키마에서 재사용할 수 있음

// import { EntitySchemaColumnOptions } from "typeorm"

// export const BaseColumnSchemaPart = {
//     id: {
//         type: Number,
//         primary: true,
//         generated: true,
//     } as EntitySchemaColumnOptions,
//     createdAt: {
//         name: "created_at",
//         type: "timestamp with time zone",
//         createDate: true,
//     } as EntitySchemaColumnOptions,
//     updatedAt: {
//         name: "updated_at",
//         type: "timestamp with time zone",
//         updateDate: true,
//     } as EntitySchemaColumnOptions,
// }

// BaseColumnSchemaPart를 다른 스키마 모델에서 사용할 수 있음
// export const CategoryEntity = new EntitySchema<Category>({
//     name: "category",
//     columns: {
//         ...BaseColumnSchemaPart,
//         // the CategoryEntity now has the defined id, createdAt, updatedAt columns!
//         // in addition, the following NEW fields are defined
//         name: {
//             type: String,
//         },
//     },
// })

// embedded entities를 스키마 모델에서 사용할 수 있음
// export interface Name {
//     first: string
//     last: string
// }

// export const NameEntitySchema = new EntitySchema<Name>({
//     name: "name",
//     columns: {
//         first: {
//             type: "varchar",
//         },
//         last: {
//             type: "varchar",
//         },
//     },
// })

// export interface User {
//     id: string
//     name: Name
//     isActive: boolean
// }

// export const UserEntitySchema = new EntitySchema<User>({
//     name: "user",
//     columns: {
//         id: {
//             primary: true,
//             generated: "uuid",
//             type: "uuid",
//         },
//         isActive: {
//             type: "boolean",
//         },
//     },
//     embeddeds: {
//         name: {
//             schema: NameEntitySchema,
//             prefix: "name_",
//         },
//     },
// })

// Category interface에도 extended columns을 추가해야 함(e.g., via export interface Category extend BaseEntity).



// Using Schemas to Query / Insert Data
// 정의한 스키마를 데코레이터를 사용하는 거처럼 repositories나 entity manager에서 사용할 수 있음
// 이전에 정의한 카테고리 예시처럼(일부 데이터를 가져오거나 데이터베이스를 조작하기 위해 인터페이스 및 CategoryEntity schema 예시)

// // request data
// const categoryRepository = dataSource.getRepository<Category>(CategoryEntity)
// const category = await categoryRepository.findOneBy({
//     id: 1,
// }) // category is properly typed!

// // insert a new category into the database
// const categoryDTO = {
//     // note that the ID is autogenerated; see the schema above
//     name: "new category",
// }
// const newCategory = await categoryRepository.save(categoryDTO)