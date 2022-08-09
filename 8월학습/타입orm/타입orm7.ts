//Embedded Entities

//내장된 엔티티를 사용하여 앱에서 중복을 줄일 수 있음.
//Embedded Column은 자체 컬럼이 있는 클래스를 수락하고 해당 컬럼을 현재 엔티티의 데이터베이스 테이블로 병합하는 컬럼임

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//@Entity()
//export class User {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column()
//    firstName: string

//    @Column()
//    lastName: string

//    @Column()
//    isActive: boolean
//}
//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//@Entity()
//export class Employee {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column()
//    firstName: string

//    @Column()
//    lastName: string

//    @Column()
//    salary: string
//}
//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//@Entity()
//export class Student {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column()
//    firstName: string

//    @Column()
//    lastName: string

//    @Column()
//    faculty: string
//}

//새로운 class에 firstName과 lastName 담아서 컬럼의 중복을 줄일 수 있음

//import { Column } from "typeorm"

//export class Name {
//    @Column()
//    first: string

//    @Column()
//    last: string
//}

//name class를 만들고 다음과 같이 연결 시킬 수 있음

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
//import { Name } from "./Name"

//@Entity()
//export class User {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column(() => Name)
//    name: Name

//    @Column()
//    isActive: boolean
//}
//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
//import { Name } from "./Name"

//@Entity()
//export class Employee {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column(() => Name)
//    name: Name

//    @Column()
//    salary: number
//}
//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
//import { Name } from "./Name"

//@Entity()
//export class Student {
//    @PrimaryGeneratedColumn()
//    id: string

//    @Column(() => Name)
//    name: Name

//    @Column()
//    faculty: string
//}

//name 엔티티에서 정의된 모든 컬럼은  user, employee, student에 병합됨

//+-------------+--------------+----------------------------+
//|                          user                           |
//+-------------+--------------+----------------------------+
//| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
//| nameFirst   | varchar(255) |                            |
//| nameLast    | varchar(255) |                            |
//| isActive    | boolean      |                            |
//+-------------+--------------+----------------------------+

//+-------------+--------------+----------------------------+
//|                        employee                         |
//+-------------+--------------+----------------------------+
//| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
//| nameFirst   | varchar(255) |                            |
//| nameLast    | varchar(255) |                            |
//| salary      | int(11)      |                            |
//+-------------+--------------+----------------------------+

//+-------------+--------------+----------------------------+
//|                         student                         |
//+-------------+--------------+----------------------------+
//| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
//| nameFirst   | varchar(255) |                            |
//| nameLast    | varchar(255) |                            |
//| faculty     | varchar(255) |                            |
//+-------------+--------------+----------------------------+


//이렇게 하면 엔티티 클래스의 코드 중복이 줄어들고,
//포함된 클래스에서 필요한 만큼 컬럼(또는 관계)을 사용할 수 있음 
//내장된 클래스 내에 중첩되고 내장된 열을 가질 수도 있음


//엔티티 상속
//Concrete Table Inheritance
//엔티티 상속 패턴을 이용해서 코드의 중복을 줄일 수 있음. 가장 간단하고 효과적인 것은 concrete table 상속임

//코드의 중복을 줄이고, 더 나은 추상화를 제공할 수 있음

//export abstract class Content {
//  @PrimaryGeneratedColumn()
//  id: number

//  @Column()
//  title: string

//  @Column()
//  description: string
//}
//@Entity()
//export class Photo extends Content {
//  @Column()
//  size: string
//}
//@Entity()
//export class Question extends Content {
//  @Column()
//  answersCount: number
//}
//@Entity()
//export class Post extends Content {
//  @Column()
//  viewCount: number
//}

//부모 엔티티의 모든 컬럼(관계, 포함 등)이 상속되어 최종 엔티티를 생성함

//Single Table Inheritance

//TypeORM은 single table inheritance도 제공함. single table inheritance은 
//고유한 속성을 가진 클래스가 여러 개 있지만 데이터베이스에 동일한 테이블에 저장할 경우의 패턴임

//@Entity()
//@TableInheritance({ column: { type: "varchar", name: "type" } })
//export class Content {
//    @PrimaryGeneratedColumn()
//    id: number

//    @Column()
//    title: string

//    @Column()
//    description: string
//}
//@ChildEntity()
//export class Photo extends Content {
//    @Column()
//    size: string
//}
//@ChildEntity()
//export class Question extends Content {
//    @Column()
//    answersCount: number
//}
//@ChildEntity()
//export class Post extends Content {
//    @Column()
//    viewCount: number
//}

//위의 코드로 content라는 단일 테이블을 만들 수 있으며, photos, questions, posts의 모든 인스턴스는 이 테이블에 저장됨



//Tree Entities

//Nested set
//Nested set은 데이터베이스에 트리 구조를 저장하는 다른 패턴임.
//읽기에 효율적이지만, 쓰기에는 좋지않음. nested set에서는 복수의 root를 가질 수 없음

//import {
//  Entity,
//  Tree,
//  Column,
//  PrimaryGeneratedColumn,
//  TreeChildren,
//  TreeParent,
//  TreeLevelColumn,
//} from "typeorm"

//@Entity()
//@Tree("nested-set")
//export class Category {
//  @PrimaryGeneratedColumn()
//  id: number

//  @Column()
//  name: string

//  @TreeChildren()
//  children: Category[]

//  @TreeParent()
//  parent: Category
//}


//Materialized Path (aka Path Enumeration)
//Materialized Path(Path Enumeration이라고도 함)는 데이터베이스에 트리 구조를 저장하는 또 다른 패턴으로, 간단하고 효과적임

//import {
//  Entity,
//  Tree,
//  Column,
//  PrimaryGeneratedColumn,
//  TreeChildren,
//  TreeParent,
//  TreeLevelColumn,
//} from "typeorm"

//@Entity()
//@Tree("materialized-path")
//export class Category {
//  @PrimaryGeneratedColumn()
//  id: number

//  @Column()
//  name: string

//  @TreeChildren()
//  children: Category[]

//  @TreeParent()
//  parent: Category
//}

//Closure table

//import {
//    Entity,
//    Tree,
//    Column,
//    PrimaryGeneratedColumn,
//    TreeChildren,
//    TreeParent,
//    TreeLevelColumn,
//} from "typeorm"

//@Entity()
//@Tree("closure-table")
//export class Category {
//    @PrimaryGeneratedColumn()
//    id: number

//    @Column()
//    name: string

//    @TreeChildren()
//    children: Category[]

//    @TreeParent()
//    parent: Category
//}

//You can specify closure table name and / or closure table columns names by setting optional parameter options 
//into @Tree("closure-table", options). ancestorColumnName and descandantColumnName are callback functions, 
//which receive primary column's metadata and return column's name.

//optional parameter options으로 @Tree("closure-table", 옵션)를 설정하여 closure table 이름과 / 또는 closure table 컬럼명을 
//지정할 수 있음.
//ancestorColumnName 및 descrandColumnName은 primary column의 metadata를 받고 컬럼의 이름을 반환하는 콜백 함수입니다.

//@Tree("closure-table", {
//    closureTableName: "category_closure",
//    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
//    descendantColumnName: (column) => "descendant_" + column.propertyName,
//})


//Working with tree entities

//트리 엔티티를 서로 바인딩하려면 하위 엔티티에 부모를 설정한 다음 저장해야 함.

//const a1 = new Category()
//a1.name = "a1"
//await dataSource.manager.save(a1)

//const a11 = new Category()
//a11.name = "a11"
//a11.parent = a1
//await dataSource.manager.save(a11)

//const a12 = new Category()
//a12.name = "a12"
//a12.parent = a1
//await dataSource.manager.save(a12)

//const a111 = new Category()
//a111.name = "a111"
//a111.parent = a11
//await dataSource.manager.save(a111)

//const a112 = new Category()
//a112.name = "a112"
//a112.parent = a11
//await dataSource.manager.save(a112)

//tree와 같이 로드하기 위해서 TreeRepository을 사용함
//const trees = await dataSource.manager.getTreeRepository(Category).findTrees()

//[
//  {
//      "id": 1,
//      "name": "a1",
//      "children": [
//          {
//              "id": 2,
//              "name": "a11",
//              "children": [
//                  {
//                      "id": 4,
//                      "name": "a111"
//                  },
//                  {
//                      "id": 5,
//                      "name": "a112"
//                  }
//              ]
//          },
//          {
//              "id": 3,
//              "name": "a12"
//          }
//      ]
//  }
//]

//TreeRepository 메소드

//findTrees - 데이터베이스의 모든 tree를 모든 자식과, 그 자식의 자식 등을 리턴. 
//const treeCategories = await dataSource.manager.getTreeRepository(Category).findTrees()
//// returns root categories with sub categories inside

//const treeCategoriesWithLimitedDepth = await dataSource.manager.getTreeRepository(Category).findTrees({ depth: 2 })
//// returns root categories with sub categories inside, up to depth 2


//findRoots - 자식을 포함하지 않고 루트 노드만 리턴함
//const rootCategories = await dataSource.manager.getTreeRepository(Category).findRoots()
//// returns root categories without sub categories inside


//findDescendants - 엔티티의 모든 자식을 리턴함. 깊이가 없는 배열에 모든 자식이 담겨서 리턴됨
//const children = await dataSource.manager.getTreeRepository(Category).findDescendants(parentCategory)
//// returns all direct subcategories (without its nested categories) of a parentCategory

//findDescendantsTree - 모든 자식을 트리 구조로 리턴함
//const childrenTree = await repository.findDescendantsTree(parentCategory)
//// returns all direct subcategories (with its nested categories) of a parentCategory

//const childrenTreeWithLimitedDepth = await repository.findDescendantsTree(
//    parentCategory,
//    { depth: 2 },
//)
//// returns all direct subcategories (with its nested categories) of a parentCategory, up to depth 2


//createDescendantsQueryBuilder - 트리에서 최하단의 자식을 찾는 쿼리 빌더를 생성함
//const children = await repository
//    .createDescendantsQueryBuilder(
//        "category",
//        "categoryClosure",
//        parentCategory,
//    )
//    .andWhere("category.type = 'secondary'")
//    .getMany()


//countDescendants - 최하단 자식의 수를 리턴함
//const childrenCount = await dataSource.manager.getTreeRepository(Category).countDescendants(parentCategory)


//findAncestors - 모든 부모 노드를 단일 배열에 리턴함
//const parents = await repository.findAncestors(childCategory)
//// returns all direct childCategory's parent categories (without "parent of parents")


//findAncestorsTree - 모든 부모 노드를 트리 구조로 리턴함
//const parentsTree = await dataSource.manager.getTreeRepository(Category).findAncestorsTree(childCategory)
//// returns all direct childCategory's parent categories (with "parent of parents")


//createAncestorsQueryBuilder - 트리에서 루트 노드를 찾는 쿼리 빌더를 생성함
//const parents = await repository
//    .createAncestorsQueryBuilder("category", "categoryClosure", childCategory)
//    .andWhere("category.type = 'secondary'")
//    .getMany()


//countAncestors - 엔티티의 조상 노드의 갯수를 리턴함
//const parentsCount = await dataSource.manager.getTreeRepository(Category).countAncestors(childCategory)


//아래의 메소드들은 옵션을 전달할 수 있음

//findTrees
//findRoots
//findDescendants
//findDescendantsTree
//findAncestors
//findAncestorsTree

//옵션
//relations
//const treeCategoriesWithRelations = await dataSource.manager.getTreeRepository(Category).findTrees({
//    relations: ["sites"],
//})
//// automatically joins the sites relation

//const parentsWithRelations = await dataSource.manager.getTreeRepository(Category).findAncestors(childCategory, {
//    relations: ["members"],
//})
//// returns all direct childCategory's parent categories (without "parent of parents") and joins the 'members' relation
