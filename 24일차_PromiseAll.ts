
// const result = await manager.find(LiveClassMain, 
//   {
//    where: (qb) => {
//       qb.where('blahMain.id = :id',
//         { id: blahMain.id })
//       .andWhere('blahMain__lectureStyle.isValid = true')
//       .orWhere('blahMain__notlectureStyle__notlectureStyleItems.isValid = true')
//     },
//     relations: [
//       'artist',
//       'artist.user',
//       'blahCategory',
//       'thumbnailImage',
//       'blahMainDescription',
//       'blahMainDescription.tags',
//       'lectureStyle',
//       'notlectureStyle',
//       'notlectureStyle.notlectureStyleItems'],
//   }
// );

// blahMain을 수정할 때 Many-To-One, One-To-One 관계를 각각 맺고 있는 lectureStyle, notlectureStyle(notlectureStyleItems과 One-To-Many 관계)또한 수정할 수 있습니다.
// lectureStyle, notlectureStyle은 isValid를 통해서 현재 해당 수업이 유효한지 여부를 확인할 수 있습니다.
// One-To-Many 관계에서 where 옵션을 적용할 수 없기에 쿼리빌더를 이용해서 where 조건을 만들어 주었습니다.
// MainId가 입력값과 동일하고, lectureStyle 또는 notlectureStyle.notlectureStyleItems의 isValid가 true여야 하기 때문에
// orWhere을 추가해 주었습니다.