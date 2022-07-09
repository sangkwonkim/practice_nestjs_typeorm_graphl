// 이번에 맡은 기능은 실시간 class가 생성할 때 해당 class를 구성하는 강의의 시간 등 디테일한 부분을 저장하는 기능입니다.
// 이를 맡고 있는 엔티티에는 회차별 강의 시간 정보, 회차별 강의 명 등 회차 마다 다르게 적용되는 이름과 시간을 가지고 있어서
// transaction으로 class 생성 이후 구성하는 강의를 생성하는 함수를 실행시키는 로직으로 구현해봤습니다.

// 여기에서 회차별 강의 시간 정보는
// class가 가지고 있는 기간 ex 6주 에 맞춰 
// 강의별로 첫번째 강의의 날짜와 시간
// 마지막 강의의 날짜와 시간이 필요합니다.

// class를 생성할 때 input 되는 값에는 class의 기간 (YYYY-MM-DD ~ YYYY-MM-DD, 몇 주짜리 강의인지)이 존재하고
// 강의 별 input 값에는 요일과 시간 정보가 담겨있습니다.

// 여기서 첫번째 강의 날짜와 시간, 마지막 강의 날짜와 시간 계산에 moment를 사용했습니다.


// const date = moment(liveClassMain.classDateStart).day(); class가 시작하는 날짜로 찾은 요일 정보

// const matchedDate = matchDay[createExistPeriodStyleInput.day]; 강의의 요일 정보

// if(date > matchedDate) {
//   classStartDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classStartTime, 'hours')
//     .add(7 - date + matchedDate, 'days')
//     .subtract(9, 'hours');
//   classEndDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classEndTime, 'hours')
//     .add(7 - date + matchedDate, 'days')
//     .add((liveClassMain.period - 1) * 7, 'days')
//     .subtract(9, 'hours');
// } else if (date ===  matchedDate) {
//   classStartDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classStartTime, 'hours')
//     .subtract(9, 'hours');
//   classEndDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classEndTime, 'hours')
//     .add((liveClassMain.period - 1) * 7, 'days')
//     .subtract(9, 'hours');
// } else {
//   classStartDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classStartTime, 'hours')
//     .add(matchedDate - date, 'days')
//     .subtract(9, 'hours');
//   classEndDate = 
//     moment(liveClassMain.classDateStart)
//     .add(createExistPeriodStyleInput[0].classEndTime, 'hours')
//     .add(matchedDate - date, 'days')
//     .add((liveClassMain.period - 1) * 7, 'days')
//     .subtract(9, 'hours');
// };

// 이러한 코드를 구현하게 된 이유에는 먼저, class의 시작날과
// 첫 번째 강의의 시작날이 다를 수 있다는 점 때문입니다. (클라이언트 요청)
// class는 월요일부터 시작을 하지만, 첫 번째 강의는 수요일부터 시작할 수 있습니다.
// class가 수요일부터 시작하는 데 첫번째 강의가 월요일에 시작한다면,
// 그 다음 주 월요일이 첫 강의 날이 됩니다.
// 만약 class 시작날과 첫번째 강의의 요일이 동일하다면 해당 날짜에 강의가 시작되어야 합니다.

// 먼저 moment의 .day()는 특정 날짜의 요일을 숫자로 리턴해줍니다.

// const matchDay = {
//   SUN : 0,
//   MON : 1,
//   TUE : 2,
//   WED : 3,
//   THU : 4,
//   FRI : 5,
//   SAT : 6
// };

// 이는 일요일을 0으로 6인 토요일까지 하루에 1씩 증가하는 .day()의 리턴값을 객체로 표현한 것입니다.
// date와 matchedDate를 비교합니다.
// date가 matchedDate보다 크다면, 예를 들어 수요일에 class가 시작하는 데 첫 강의가 그 다음 주 월요일이라면,
// 7 - date + matchedDate을 통해서 class가 시작하는 날에 days를 추가해 첫번째 강의가 시작하는 날을 구합니다.

// date와 matchedDate가 같다면, class가 시작하는 날과 첫번째 강의일의 요일이 동일한 것으로,
// 별로의 처리를 하지 않습니다.

// 마지막으로 date가 matchedDate보다 작다면, 월요일에 class가 시작하고 수요일에 첫 강의가 시작한다면,
// matchedDate - date를 통해서 class가 시작하는 날에 days를 추가해 첫번째 강의가 시작하는 날을 구합니다.