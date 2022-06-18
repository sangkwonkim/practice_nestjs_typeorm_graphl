// 북담 프로젝트 개발 당시에 사용자가 작성한 article을 저장할 때 createdAt 저장 타입을 문자열로
// 서버에서 해당 날짜를 계산해서 입력해줬습니다.
// 저장 타입을 yyyy-mm-dd 로 회의 단계에서 정하면서
// const now = new Date();
// const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
// const koreaTimeDiff = 9 * 60 * 60 * 1000;
// const koreaNow = new Date(utcNow + koreaTimeDiff);
// const today = `${koreaNow.getFullYear()}-${koreaNow.getMonth() + 1}-${koreaNow.getDate()}`;
// const createArticle = await ArticleModel.create({
//   user_Id: id,
//   book_Title: articleInfo.book_Title,
//   book_Author: articleInfo.book_Author,
//   book_Thumbnail: articleInfo.book_Thumbnail,
//   book_Publisher: articleInfo.book_Publisher,
//   sentence: articleInfo.sentence,
//   comment: articleInfo.comment,
//   createdAt: today
// });
// 처리 로직이 불필요하게 발생했습니다.
// 입사해서 프로젝트에 투입된 후 moment를 알게 되면서 학습해보았습니다.
// import * as moment from 'moment-timezone';
// let today = moment().format();
// let today = moment().year();
// console.log(today); 
// 2022-06-18T19:24:51+09:00
// let testToday = new Date();
// console.log(testToday);
// 2022-06-18T10:24:51.778Z
var moment = require('moment-timezone');
var today = moment().tz("America/Los_Angeles").format();
console.log(today);
