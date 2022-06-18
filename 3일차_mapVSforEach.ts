// 지난 주에 리뷰 서비스를 만들면서 리뷰에 포함된 평가 체크 항목과 별점의 총 갯수를 리턴하는 로직을 구현했습니다.
// db에서 groupBy와 count 쿼리를 통해서 값을 받아오고
// groupBy로 받은 결과값을 Number 형태 만들고, 총 합, 즉 리뷰의 갯수를 리턴하는 로직입니다.

// 1. groupBy 결과값을 Number형태로 만드는 과정에서 map을 사용했는데,
// map과 forEach의 리턴 값 차이로 forEach를 사용하는 것이 좋다는 피드백을 받았습니다.
// 학습 당시에 배웠던 map이 익숙해서 map을 주로 사용하는 편이었고 forEach는 작동 방식만 알고 주로 사용하진 않았습니다.
// 이번 기회에 두 메소드에 대해서 학습하여 더 상황에 맞는 메소드를 사용해보겠습니다.

// map은 배열의 각 요소를 변환하는 데 사용되는 반면, forEach은 배열을 변경하지 않고 각 요소에서 함수를 실행하는 데 사용됩니다.

// 실무에서 사용한 코드 일부

// counts.forEach((count) => { count.starsCount = Number(count.evaluationsCount) });

// 예제 코드
// let arr = [1, 2, 3, 4];


// let result = arr.forEach((a) => {
//   return a * a
// });

// console.log(result);
// forEach는 변수에 할당을 하더라도 undefiend가 된다.
// console.log(arr)

// let result2 = arr.map((b) => {
  // map은 각 요소를 변경하는 데 사용할 수 있다.
//   return b * b
// });

// console.log(result2);
// console.log(arr);

// Definition 
//!forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
//Calls a defined callback function on each element of an array, and returns an array that contains the results.
//@param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
//@param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
//  
//!map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
//Returns the elements of an array that meet the condition specified in a callback function.
//@param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
//@param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

// 구현한 코드에서는 리턴할 값이 필요없기 때문에 굳이 map을 쓰기보단 forEach를 쓰는 것이 나았습니다.


// let arr = [1, 2, 3, 4];


// arr.forEach((a) => {
//   return a * a
// });

// console.log(arr) // [ 1, 2, 3, 4 ]

// arr.map((b) => {
  // return b * b
// }); // [ 1, 4, 9, 16 ]

// console.log(arr) // [ 1, 2, 3, 4 ]

// forEach는 변수에 할당하지 않고 동작시키더라도 타입스크립트에서 리턴값이 void로 아무 것도 리턴하지 않으며,
// map은 변수에 할당하지 않고 동작시키더라도 리턴값이 새로운 배열이기에 map 내부 코드가 동작된 배열을 리턴함.