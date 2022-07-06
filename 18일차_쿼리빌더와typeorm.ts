// 10일차 페이지에서 언급했었던 typeorm "Cannot query across one-to-many for property 가 이번에도 발생했습니다.
// blahClassMain에 blahPeriodStyle과 notblahPeriodStyle가 존재하고, 학생은 이 둘 중에서 하나를 수강할 수 있습니다.
// 여기에서 notblahPeriodStyle과 notblahPeriodStyleItems는 One-To_Many로 관계되어집니다.

// 처음에 코드를 구현할 때는 다음과 같이 구현했습니다. 닉네임과 아티스트네임, 클래스네임을 검색하면 관계 테이블을 타고 들어가서 검색합니다.

// 아티스트와 클래스 네임에서 배열은 typeorm where 절에서 배열을 이용할 경우 or 처럼 사용할 수 있기에 사용했습니다.

// 앞 서 말씀드렸던 것처럼 notblahPeriodStyle과 notblahPeriodStyleItems가 One-To_Many로 관계되어있어서 아래의 코드로는 검색이 불가능했습니다.

// 첫번째 에러 notblahPeriodStyle과 notblahPeriodStyleItems의 One-To_Many 관계 => cannot query across one-to-many for property

// private getSearchWhere = (input: blahblah) => {
//     const result = {
//       NICKNAME: {
//         blahblahForm: {
//           student: { nickname: Like(`%${input.keyword}%`) },
//         },
//       },
//       ARTIST_NAME: [
//         {
//           blahPeriodStyle: {
//             blahClassMain: { artist: { nameKo: Like(`%${input.keyword}%`) } },
//           },
//         },
//         {
//           blahPeriodStyle: {
//             blahClassMain: { artist: { nameEn: Like(`%${input.keyword}%`) } },
//           },
//         },
//         {
//           notblahPeriodStyle: {
//             blahClassMain: { artist: { nameKo: Like(`%${input.keyword}%`) } },
//           },
//         },
//         {
//           notblahPeriodStyle: {
//             blahClassMain: { artist: { nameEn: Like(`%${input.keyword}%`) } },
//           },
//         },
//       ],
//       CLASS_NAME: [
//         {
//           blahPeriodStyle: {
//             className: Like(`%${input.keyword}%`),
//           },
//         },
//         {
//           notblahPeriodStyle: {
//             notblahPeriodStyleItems: { className: Like(`%${input.keyword}%`) },
//           },
//         },
//       ],
//     };
//     return result[input.column];
//   };





// 클래스네임 검색은 쿼리빌더로 구현했습니다.

// private async getSearchFromNotblahWithClassName (input: CounselingApplicantSearchInput) {
//     const result = await this.blahblahCounselingApplicantRepository
//       .createQueryBuilder('blahblahCounselingApplicant')
//       .leftJoinAndSelect('blahblahCounselingApplicant.blahblahCounselingForm', 'blahblahCounselingForm')
//       .leftJoinAndSelect('blahblahCounselingForm.student', 'student')
//       .leftJoinAndSelect('blahblahCounselingForm.images', 'images')
//       .leftJoinAndSelect('blahblahCounselingApplicant.blahPeriodStyle', 'blahPeriodStyle')
//       .leftJoinAndSelect('blahPeriodStyle.blahblahMain', 'blahblahblahMain')
//       .leftJoinAndSelect('blahblahblahMain.artist', 'blahArtist')
//       .leftJoinAndSelect('blahblahCounselingApplicant.notblahPeriodStyle', 'notblahPeriodStyle')
//       .leftJoinAndSelect('notblahPeriodStyle.blahblahMain', 'notblahblahblahMain')
//       .leftJoinAndSelect('notblahblahblahMain.artist', 'notblahArtist')
//       .leftJoinAndSelect('notblahPeriodStyle.notblahPeriodStyleItems', 'notblahPeriodStyleItem')
//       .where('notblahPeriodStyleItem.className LIKE :keyword',
//       { keyword: `%${input.keyword}%`})
//       .orWhere('blahPeriodStyle.className LIKE :keyword',
//       { keyword: `%${input.keyword}%`})
//       .getMany();
//     return result;
//   };

// typeorm 메소드인 find~ 의 경우에는 relations 할 때, 본인 테이블.관계 테이블을 하지 않고 [관계 테이블]과 같이 relation을 걸 수 있었습니다.
// 하지만 쿼리빌더의 경우에는, join하기 위해서 leftJoinAndSelect(본인테이블.관계테이블, 별칭) 이 필요했습니다.
// 필요한 모든 join 테이블을 전부 leftJoinAndSelect로 추가해주었습니다.

// 이렇게 정의해준 별칭으로 검색을 할 수 있었습니다.

// typeorm에서는 leftJoinAndSelect과 leftJoin이 있습니다.
// 공식문서에서 leftJoinAndSelect은 
// The first argument is the relation you want to load and the second argument is an alias you assign to this relation's table. 
// You can use this alias anywhere in query builder. For example, let's take all Timber's photos which aren't removed.

// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .where("user.name = :name", { name: "Timber" })
//     .andWhere("photo.isRemoved = :isRemoved", { isRemoved: false })
//     .getOne()

// 이렇게 나와있으며, sql 쿼리는 다음과 같습니다.
// SELECT user.*, photo.* FROM users user
//     LEFT JOIN photos photo ON photo.user = user.id
//     WHERE user.name = 'Timber' AND photo.isRemoved = FALSE

// 클래스네임을 검색하는 쿼리빌더는 BlahbalhCounselingApplicant와 OneToMany로 Relation 되어 있는 existPeriodStyle에서 className을 검색하고 있습니다.
// leftJoinAndSelect으로 existPeriodStyle과 BlahbalhCounselingForm(BlahbalhCounselingApplicant와 OneToOne 관계)을 할 경우
// 아래와 같이 조건에 충족하는 BlahbalhCounselingApplicant 뿐만 아니라 existPeriodStyle과 BlahbalhCounselingForm 데이터 모두를 갖고 옵니다.
// 
//   [
//     BlahbalhCounselingApplicant {
//       __typename: 'BlahbalhCounselingApplicant',
//       id: 8,
//       createdAt: 2022-07-05T09:00:16.300Z,
//       updatedAt: 2022-07-05T09:00:16.300Z,
//       isViewAdmin: false,
//       counselingFormStatus: 'NONE',
//       BlahbalhCounselingFormId: 8,
//       memo: null,
//       existPeriodStyleId: 35,
//       notExistPeriodStyleId: null,
//       BlahbalhCounselingForm: BlahbalhCounselingForm {
//         __typename: 'BlahbalhCounselingForm',
//         id: 8,
//         createdAt: 2022-07-05T09:00:16.283Z,
//         updatedAt: 2022-07-05T09:00:16.283Z,
//         studentId: 35,
//         name: 'test',
//         age: 1992,
//         phoneNumber: 1012345678,
//         job: 'test',
//         detail: 'test',
//         student: [Student],
//         images: []
//       },
//       existPeriodStyle: BlahbalhExistPeriodStyle {
//         __typename: 'BlahbalhExistPeriodStyle',
//         id: 35,
//         createdAt: 2022-07-04T07:18:37.385Z,
//         updatedAt: 2022-07-04T07:18:37.385Z,
//         status: 'ONGOING',
//         cancelReason: 'Unbranded homogeneous Face to face Jordanian Dinar next-generation',
//         expectedOpeningDate: 2023-04-02T00:22:47.000Z,
//         className: 'Investment Account',
//         classLimit: 23,
//         classWaitedLimit: 12,
//         period: 2,
//         day: 'MON',
//         classStartTime: '2022-06-01',
//         classEndTime: '2022-07-01',
//         BlahbalhMainId: 35,
//         classStartDate: 2022-12-11T05:08:29.000Z,
//         classEndDate: 2023-01-23T12:58:22.000Z,
//         BlahbalhMain: [BlahbalhMain]
//       },
//       notExistPeriodStyle: null
//     }
//   ]



// 반면 select가 없는 것은
// const user = await createQueryBuilder("user")
//     .innerJoin("user.photos", "photo")
//     .where("user.name = :name", { name: "Timber" })
//     .getOne()

// 이며 sql 쿼리는 다음과 같습니다. 
// SELECT user.* FROM users user
//     INNER JOIN photos photo ON photo.user = user.id
//     WHERE user.name = 'Timber'

// 그리고 공식문서에서는 This will select Timber if he has photos, but won't return his photos.로 표현하고 있습니다.

// 클래스 네임 검색 쿼리빌더에서 leftJoin으로 변경했을 때 나오는 결과는 다음과 같았습니다.

// [
//     BlahbalhCounselingApplicant {
//       __typename: 'BlahbalhCounselingApplicant',
//       id: 8,
//       createdAt: 2022-07-05T09:00:16.300Z,
//       updatedAt: 2022-07-05T09:00:16.300Z,
//       isViewAdmin: false,
//       counselingFormStatus: 'NONE',
//       BlahbalhCounselingFormId: 8,
//       memo: null,
//       existPeriodStyleId: 35,
//       notExistPeriodStyleId: null
//     }
//   ]

// 검색하려는 ClassName을 existPeriodStyle 에서 찾고 해당 BlahbalhCounselingApplicant을 리턴하지만,
// select 하지 않았기 때문에 join한 테이블의 정보는 갖고 오지 않았습니다.

// 이 방법은 위의 코드를 구현하기 전에 구현했었던 클래스네임 검색 코드입니다.
// qb.where은 잘 동작하지만,
// orWhere이 정상적으로 동작하지 않아 위의 코드로 변경하게 되었습니다.

//   const findSearchList = await this.waitingApplicantRepository.findAndCount({
//     relations : [
//       'blahblahForm',
//       'blahblahForm.student',
//       'blahPeriodStyle',
//       'blahPeriodStyle.blahClassMain',
//       'blahPeriodStyle.blahClassMain.artist',
//       'notblahPeriodStyle',
//       'notblahPeriodStyle.blahClassMain',
//       'notblahPeriodStyle.blahClassMain.artist',
//       'notblahPeriodStyle.notblahPeriodStyleItems',
//     ],
//     where :
//       (qb) => {
//         qb.where('LiClWaAp__noExPeSt__noExPeStIt.className LIKE :keyword', { keyword: `%${waitingApplicantSearchInput.keyword}%`})
//         // .orWhere('blahPeriodStyle.className LIKE :keyword',
//         //   { keyword: `%${waitingApplicantSearchInput.keyword}%`})
//     },
//   }
//   );

// 에러 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '.className LIKE %ary%' at line 1

// qb.where 구문을 통해서 where 조건이 붙을 Column을 찾을 때 별칭이 이용되다 보니 해당 별칭을 찾아야 하는 어려움이 있었습니다.
// orWhere의 경우, 해당 별칭이 정확하게 확인되지 않는 문제가 있었습니다. 
// 별칭을 찾았던 sql문 입니다.
// sql: "SELECT `blahClassWaitingApplicant`.`id` AS `blahClassWaitingApplicant_id`, `blahClassWaitingApplicant`.`createdAt` AS `blahClassWaitingApplicant_createdAt`, 
// `blahClassWaitingApplicant`.`updatedAt` AS `blahClassWaitingApplicant_updatedAt`, `blahClassWaitingApplicant`.`isViewAdmin` AS `blahClassWaitingApplicant_isViewAdmin`, 
// `blahClassWaitingApplicant`.`applicationFormStatus` AS `blahClassWaitingApplicant_applicationFormStatus`, `blahClassWaitingApplicant`.`blahblahFormId` 
// AS `blahClassWaitingApplicant_blahblahFormId`, `blahClassWaitingApplicant`.`memo` AS `blahClassWaitingApplicant_memo`, `blahClassWaitingApplicant`.`blahPeriodStyleId` 
// AS `blahClassWaitingApplicant_blahPeriodStyleId`, `blahClassWaitingApplicant`.`notblahPeriodStyleId` AS `blahClassWaitingApplicant_notblahPeriodStyleId`, 
// `blahClassWaitingApplicant__notblahPeriodStyle`.`id` AS `blahClassWaitingApplicant__notblahPeriodStyle_id`, `blahClassWaitingApplicant__notblahPeriodStyle`.`createdAt` 
// AS `blahClassWaitingApplicant__notblahPeriodStyle_createdAt`, `blahClassWaitingApplicant__notblahPeriodStyle`.`updatedAt` AS `blahClassWaitingApplicant__notblahPeriodStyle_updatedAt`, 
// `blahClassWaitingApplicant__notblahPeriodStyle`.`status` AS `blahClassWaitingApplicant__notblahPeriodStyle_status`, `blahClassWaitingApplicant__notblahPeriodStyle`.`cancelReason` 
// AS `blahClassWaitingApplicant__notblahPeriodStyle_cancelReason`, `blahClassWaitingApplicant__notblahPeriodStyle`.`expectedOpeningDate` 
// AS `03507e6c9dcf5d090a29eb1c591a69c89e8e29e6af555b766c655550ec17add`, `blahClassWaitingApplicant__notblahPeriodStyle`.`classLimit` AS `blahClassWaitingApplicant__notblahPeriodStyle_classLimit`, 
// `blahClassWaitingApplicant__notblahPeriodStyle`.`classWaitedLimit` AS `blahClassWaitingApplicant__notblahPeriodStyle_classWaitedLimit`, 
// `blahClassWaitingApplicant__notblahPeriodStyle`.`blahClassMainId` AS `blahClassWaitingApplicant__notblahPeriodStyle_blahClassMainId`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`id` 
// AS `773533f1c4038fcdd3cee3a3e342df58d7bb133e7096bcca9b9dc2b3a878a01`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`createdAt` 
// AS `8e318de66bebd69abe9a3d046ab0d4860e507ce8cc5e21b07ad5786a2725dcb`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`updatedAt` 
// AS `de6827a6759f506829de468b1e3b95ef3ff46899b63c182babc5e6c338ac74a`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`status` 
// S `73ebb04b9b632453ded668d9d35eca988776d65c46255a31d5fc8d44388ea16`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`cancelReason` 
// AS `f404ec2b20f975c201b5419620c44553058115cc1fb4b475143c5efc6ab2e30`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`expectedOpeningDate` 
// AS `1d1e0d542680bd03cff02fae596bc6be976f21ef815b17fcd094386a7519779`, `blahClassWaitingApplicant__notblahPeriodStyle__blahClassMain`.`classIntroduce` 
// ... 양이 많아서 중략했습니다.

// 아티스트 네임은 기존의 클래스네임과 동일한 방법으로 구현되었는데, 여기에서는 별칭이 잘 확인되었지만, 어떤 이유에서 클래스 네임에서는 확인되지 않는 지 알아봐야겠습니다.

// ARTIST_NAME: 
// (qb) => {
//   qb.where('LiClCoAp__noExPeSt__liClMa__artist.nameKo LIKE :keyword', { keyword: `%${input.keyword}%`})
//   .orWhere('LiClCoAp__noExPeSt__liClMa__artist.nameEn LIKE :keyword', { keyword: `%${input.keyword}%`})
//   .orWhere('LiClCoAp__exPeSt__liClMa__arti.nameKo LIKE :keyword', { keyword: `%${input.keyword}%`})
//   .orWhere('LiClCoAp__exPeSt__liClMa__arti.nameEn LIKE :keyword', { keyword: `%${input.keyword}%`})
// },

// 마지막으로, where: []을 통해서 or로 where 을 사용할 때, relations 배열에 정의된 순서에 따라 검색이 되고, 일정 갯수가 넘어가면 반환이 되는 에러가 있었습니다.
// 분명 parameter에는 4개의 where 검색이 나타나지만, 출력은 relations 배열에서 앞 쪽에 있는 관계 테이블에서만 나왔습니다.
// relations 배열의 순서를 바꾸면 바뀐 순서에 맞게만 나왔는데, 조만간에 원인을 파악해서 공유해보도록 하겠습니다.

// => 이 부분은 where: [] 내부에서 묶는 방법이 잘 못되어 검색이 정상적으로 작동하지 않았던 것으로 확인되었습니다.
// 오늘 다시 코드를 수정하니 정상적으로 검색되는 것을 확인할 수 있었습니다.

// ARTIST_NAME: [
//     {
//       existPeriodStyle : {
//         liveClassMain : {
//           artist : [
//             { nameKo: Like(`%${input.keyword}%`) },
//             { nameEn: Like(`%${input.keyword}%`) }
//           ]
//         }
//       },
//       notExistPeriodStyle : {
//         liveClassMain : {
//           artist : [
//             { nameKo: Like(`%${input.keyword}%`) },
//             { nameEn: Like(`%${input.keyword}%`) }
//           ]
//         }
//       },
//     }
//   ],

// 기존에는 existPeriodStyle.liveClassMain.artist.nameKo와 existPeriodStyle.liveClassMain.artist.nameEn을 별도로 Where의 배열 요소로 넣었는데,
// 공통된 테이블은 묶고 제일 하단 검색 컬럼을 배열의 요소로 넣으니 (qb)와 동일하게 검색되는 것을 확인했습니다.
// 이번 기회에 다양한 방법으로 Selct하는 것을 학습할 수 있었습니다.
// 추후에 새로운 방법으로 쿼리를 짤 경우 공유해보도록 하겠습니다.