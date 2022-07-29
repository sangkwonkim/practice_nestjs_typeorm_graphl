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

// 이러한 One-To-One은 단방향(uni-directional)과 양방향(bi-directional)일 수 있습니다.

// 양뱡항은 decorator가 관계의 양 쪽 모두에 존재합니다.

// @JoinColumn은 외부 키를 소유할 테이블에서 관계의 한 쪽에만 있어야 합니다.

// 양방향 관계를 사용하면 QueryBuilder를 사용하여 양쪽에서 관계를 결합할 수 있습니다.

// @JoinColumn을 설정한 곳에 외래키가 추가되기 때문에 해당 부분에 외래키 생성 false 옵션을 추가할 수 있음







// [Update]: adding {onDelete:'CASCADE'} to the @ManyToOne decorators, as shown in the code above, does solves the problem.
