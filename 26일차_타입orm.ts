// return await this.blahblahNotExistPeriodStyleItemRepository.update(
//     {
//       isValid: true,
//       classEndDate: Raw((alias) => `${alias} < NOW()`),
//     }, {
//       isValid: false,
//     });
// };


// 현재는 매일 00시에 강의가 정상적으로 진행되었다면 수강 종료상태로 변경해주는 api를 구현하고 있습니다.
// 프로젝트 전반이 graphql을 이용하여 resover, service로 이루어져 있지만,
// 해당 기능의 경우, AWS 람다를 이용해서 매일 00시가 되는 것을 트리거로 동작할 함수이기 때문에
// controller를 별도로 만들어서 구현했습니다.

// 위의 코드는 구현한 함수의 일부로, classEndDate: Raw((alias) => `${alias} < NOW()`), 부분은
// update의 첫번째 인자로 where의 코드 입니다. classEndDate가 NOW()보다 작고, isValid가 true인 데이터들을 찾아서
// isValid를 false로 변경합니다.

// AWS 람다와 cloudWatch Event까지 직접 만들어보게 된다면 추가적으로 공유해보겠습니다.
