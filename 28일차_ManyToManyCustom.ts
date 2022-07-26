// 지지난 달에 입사하고 현재 진행 중인 프로젝트에 투입된 지 얼마 안되었을 때 학생의 myClass 테이블을 만들고 service, resolver, dto 등을 만들었습니다.
// 만들 당시에는 클래스의 삭제 로직에 대해서 큰 고민을 하지 않고 두 종료의 클래스를 ManyToMany로 myClass와 관계를 맺었습니다.

// 어제 클래스 중 하나는 자체가 삭제가 되어도 학생이 구매한 강의이기 때문에 볼 수 있어야함으로 entity 수정이 요구되었습니다.
// 이렇게 하기 위해서는 해당 클래스의 제목과 선생님명, 썸네일, 동영상 강의가 저장되는 테이블과 관계가 추가적으로 필요했습니다.

// 이미 기존의 테이블과 relation을 이용하는 로직이 많았고 최대한 로직의 수정을 줄이고 해당 방법대로 구현하기 위해
// manyToMany로 인해 자동으로 생기는 브릿지 테이블을 커스텀하여 클래스 제목, 선생님명을 컬럼으로 추가하고 동영상 강의 테이블이 담긴 테이블과 relation을 걸어주기로 했습니다.

// blahClass.entity.ts
// 기존 코드
// @ManyToMany(
//   () => StudentMyClass,
//   (studentMyClass) => studentMyClass.blahClasses
// )
// appliedStudents: StudentMyClass[];

// studentMyClass.entity.ts
// 기존 코드
// @ManyToMany(
//   () => blahClassMain,
//   (blahClassMain) => blahClassMain.appliedStudents
// )
// @JoinTable()
// blahClasses: blahClassMain[];

// 기존에는 위와 같이 blahClass와 studentMyClass가 ManyToMany로 관계를 가지며 하나의 학생이 여러가지 강의를 들을 수 있고, 이를 해당 테이블에 저장했습니다.

// 여기에서 ManyToMany를 사용하면 자동으로 생성되는 브릿지 테이블을 별도로 선언해주고
// blahClass와 oneToMany, StudentMyClass와 oneToMany 관계로 수정해주었습니다.

// 브릿지 테이블에는 
// @ManyToOne(() => StudentMyClass, (myClass) => myClass.myClassToblahClasses)
// @JoinColumn()
// studentMyClass: StudentMyClass;

// @Column({ 
//   type: 'int', 
//   nullable: false, 
//   comment: '연결된 학생의 MyClass id',
// })
// studentMyClassId: number;

// @ManyToOne(() => blahClassMain, (myClass) => myClass.appliedStudents)
// @JoinColumn()
// blahClassMain: blahClassMain;

// @Column({ 
//   type: 'int', 
//   nullable: false, 
//   comment: '연결된 블라 클래스의 id',
// })
// blahClassMainId: number;

// 이처럼 ManyToOne으로 위의 테이블들과 관계를 맺어주고 추가적으로 필요한 컬럼과 관계를 맺어주었습니다.

// 이미 많은 부분에서 활용되고 있어서 처음에는 수정하는 것이 막막했지만, 입사 후 학습했던 부분을 기억해서 브릿지 테이블을 별로도 생성해줌으로써
// 손 쉽게 수정할 수 있었습니다.

// 한참 바쁜 와중에 중간 투입되기도 했고, 아직 미숙해서 전체적인 흐름보다는 피그마 상에서 단면적인 부분만 보다보니 이런 문제가 발생했습니다.
// 이번 기회를 바탕으로 entity를 설계할 때 여러 방면으로 고민하고 설계할 수 있는 개발자가 될 수 있도록 노력해야겠습니다.