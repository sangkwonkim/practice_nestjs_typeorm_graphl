// One-to-one relations
// One-to-one 관계는 A가 B의 인스턴스를 하나만 포함하고 B가 A의 인스턴스를 하나만 포함하는 관계입니다.

// 사용자 및 프로필 엔터티를 예로 들어 보겠습니다. 사용자는 하나의 프로필만 가질 수 있습니다. 하나의 프로필은 하나의 사용자만 소유합니다.

// @Entity()
// export class Profile {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     gender: string

//     @Column()
//     photo: string
// }

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @OneToOne(() => Profile)
//     @JoinColumn()
//     profile: Profile
// }

// 여기서는 프로필에 @OneToOne을 추가하고 대상 관계 유형을 프로필로 지정합니다. 또한 필수이자 관계의 한 쪽에만 설정되어야 하는 @JoinColumn을 추가했습니다. 
// @JoinColumn을 설정한 쪽의 테이블에는 대상 엔티티 테이블에 대한 "관계 ID" 컬럼과 외래 키가 생성됩니다.

// +-------------+--------------+----------------------------+
// |                        profile                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | gender      | varchar(255) |                            |
// | photo       | varchar(255) |                            |
// +-------------+--------------+----------------------------+

// +-------------+--------------+----------------------------+
// |                          user                           |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(255) |                            |
// | profileId   | int(11)      | FOREIGN KEY                |  @JoinColumn을 설정한 곳에 "관계 ID" 컬럼과 외래 키가 생성됩니다.
// +-------------+--------------+----------------------------+

// cascade를 통해서 한 번의 save로 이 관계를 저장할 수 있습니다.

// eager 옵션을 사용하면 find 명령에서 relations 옵션을 지정하지 않아도 데이트를 불러올 수 있습니다.




// @JoinColumn은 외부 키를 소유할 테이블에서 관계의 한 쪽에만 있어야 합니다.

// @JoinColumn에서 name 옵션을 사용해서 외래키의 이름의 설정할 수 있습니다.




// 이러한 One-To-One은 단방향(uni-directional)과 양방향(bi-directional)일 수 있습니다.
// 양뱡항은 decorator가 관계의 양 쪽 모두에 존재합니다.

// @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
// user: User

// @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
// @JoinColumn()
// profile: Profile

// 이처럼 양 쪽에 decorator를 정의함으로써 양방향 관계를 정의할 수 있습니다.

// 양방향 관계를 사용하면 QueryBuilder를 사용하여 양쪽에서 관계를 결합할 수 있습니다.



// @JoinColumn 옵션

// Join Column은 항상 다른 일부 컬럼의 외래 키를 사용한 참조입니다.
// 참조는 기본값으로 관계된 테이블의 primary column을 참조합니다. 만약 관계 테이블의 다른 컬럼을 참조하길 원한다면
// @JoinColumn({ referencedColumnName: "name" }) 이렇게 정의할 수 있습니다.
// 이 관계는 category의 id가 아닌 name을 참조합니다. 관계의 컬럼명은 categoryName가 됩니다.

// 여러 열을 조인할 수도 있습니다. default로 관련 엔터티의 primary column을 참조하지 않습니다. 참조된 열 이름을 제공해야 합니다.

// @ManyToOne(type => Category)
// @JoinColumn([
//     { name: "category_id", referencedColumnName: "id" },
//     { name: "locale_id", referencedColumnName: "locale_id" }
// ])
// category: Category;


// @JoinColumn을 설정한 곳에 외래키가 추가되기 때문에 해당 부분에 외래키 생성 false 옵션을 추가할 수 있음










// [Update]: adding {onDelete:'CASCADE'} to the @ManyToOne decorators, as shown in the code above, does solves the problem.
