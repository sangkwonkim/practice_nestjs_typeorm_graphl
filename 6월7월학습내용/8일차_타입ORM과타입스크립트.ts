// @Column({
//     type: 'int',
//     nullable: false,
//     comment: 'ManyToOne으로 relation을 설정할 때 JoinColumn을 하는 곳에 relation + Id로 column이 생성됨'
//     // 별도로 blahblah Id라는 이름의 column을 만들어 주는 이유
//     // 1. 조회할 경우, relation 테이블의 전체 데이터를 원하지 않고 id 값만 받길 원할 때,
//     // 2. save 할 경우, id값을 별도로 넣어주지 않으면 relation entity의 id 값을 받고 해당 테이블에서 find 후 데이터를 찾아서 save해야되지만,
//     // id column 추가 시 id 값으로 save 가능함
//     // 3. ts ignore나 ts 에러가 발생할 우려가 있음 => 이 부분은 추가적으로 학습 요구됨
//   })
//   blahblahId: number;

//   @ManyToOne(
//     () => blahblah,
//     (blahblah) => blahblah.연결될 column, {
//       onDelete: 'CASCADE',
//   })
//   @JoinColumn()
//   blahblah: blahblah;