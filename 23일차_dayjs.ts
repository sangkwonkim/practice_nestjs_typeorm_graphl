// Why Day.js?
// 2kB
// Less JavaScript to download, parse and execute, leaving more time for your code.
// 다운로드, 파스, 실행 자바스크립트를 줄여 코드에 더 많은 시간을 사용할 수 있다.

// Simple
// Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
// Day.js는 Moment 호환 API로 날짜와 시간을 분석, 검증, 조작, 표시하는 미니멀리스트 자바스크립트 라이브러리 
// If you use Moment.js, you already know how to use Day.js.

// Immutable
// All API operations that change the Day.js object will return a new instance instead.
// 모든 API 작업은 새로운 인스턴스를 리턴하는 Day.js로 변경함.

// This helps prevent bugs and avoid long debugging sessions.

// I18n
// Day.js has great support for internationalization. But none of them will be included in your build unless you use them.

// 오늘은 Day.js에 대해 학습해보았습니다.

// 타입스크립트를 이용할 경우에는 아래의 코드와 같이 dayjs를 import 할 수 있습니다.
// import * as dayjs from 'dayjs'
// dayjs().format()

// tsconfig.json 에 따라 일반적으로 사용하는 import dayjs from 'dayjs'로 이용할 수도 있습니다.

// Have trouble importing Day.js?
// If your tsconfig.json contains the following config, you must do the default import workflow import dayjs from 'dayjs':

// { //tsconfig.json
//   "compilerOptions": {
//     "esModuleInterop": true,
//     "allowSyntheticDefaultImports": true,
//   }
// }
// If you don't have these config above, the default import won't work, and you'll continue to have to use import * as dayjs from 'dayjs'





// 직접 몇 가지 메소드를 이용해봤습니다.

// import * as dayjs from 'dayjs';
// import 'dayjs/locale/ko'

// dayjs.locale('ko')

// 시간이나 날짜를 더해주는 메소드 add
// console.log(dayjs().add(1, 'hour').format()) // 2022-07-12T09:56:07+09:00

// console.log(dayjs().add(30, 'minute').format('YYYY-MM-DD:hh:mm:ss')) // 2022-07-12:09:33:38
// console.log(dayjs().add(30, 'm').format('YYYY-MM-DD:hh:mm:ss')) // 약어로 계산도 가능

// 시간이나 날짜를 빼주는 메소드 subtract
// console.log(dayjs().subtract(20, 'y').format('YYYY-MM-DD:hh:mm:ss')) // 2002-07-12:09:08:01

// 특정 날짜를 dayjs 객체로 출력할 경우
// console.log(dayjs('2022-10-01').format('YYYY-MM-DD:hh:mm:ss')) // 2022-10-01:12:00:00

// 원하는 형태로 시간 및 날짜 출력
// console.log(dayjs().format('YYYY-MM-DD:hh:mm:ss')) // 2022-07-12:08:55:13
// console.log(dayjs().format('YYYY-MM-DD')) // 2022-07-12

// startOf를 통해서 특정 시간 단위의 시작 시간을 리턴
// console.log(dayjs().startOf('y').format()) // 2022-01-01T00:00:00+09:00

// dayjs는 immutable 하기 때문에 날짜를 변경하는 메소드를 사용할 경우 변수에 할당을 해줘야지 원하는 값을 가질 수 있다.

// const now = dayjs()

// console.log(now.format()) // 2022-07-12:09:22:41
// now.add(20, 'y');
// console.log(now.format()) // 2022-07-12T09:23:25+09:00 동일하게 시간이 출력됨

// const test = now.add(20, 'y');
// console.log(test.format()) // 2042-07-12T09:24:09+09:00