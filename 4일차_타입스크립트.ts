// 함수 타입 interface
// 함수의 타입을 설명할 수 있다

// interface로 함수 타입을 기술하기 위해 인터페이스에 호출 서명을 전달
// 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷.


interface SearchFunc {
    (source: string, subString: string): boolean;
};


// let mySearch: SearchFunc;
// mySearch = function(src: string, sub: string): boolean {
//     let result = src.search(sub);
//     return result > -1;
// };

// console.log(mySearch('world', 'rld'));

// 함수의 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사


// let mySearch: SearchFunc;
// mySearch = function(src, sub) {
//     let result = src.search(sub);
//     return result > -1;
// };

// console.log(mySearch('world', 'rld'));

// 함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사합니다. 만약 타입을 전혀 지정하지 않고 싶다면, SearchFunc 타입의 변수로 직접 함수 값이 할당되었기 때문에 
// TypeScript의 문맥상 타이핑 (contextual typing)이 인수 타입을 추론할 수 있습니다. 이 예제에서, 함수 표현의 반환 타입이 반환하는 값으로 추론됩니다. (여기서는 false와 true)

interface StringArray {
    [index: string]: string;
}

// let myArray: StringArray;
// myArray = ["Bob", "Fred"];

// let myStr: string = myArray[1];
// console.log(myStr)

let arr: string[] = ["Bob", "Fred"];

let myArr: string = arr[1];

console.log(myArr);