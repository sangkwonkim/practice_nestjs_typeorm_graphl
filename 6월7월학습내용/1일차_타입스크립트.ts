// interface
// 상호 간의 정의한 약속 혹은 규칙

// 함수 인자 정의하기

// interface personAge {
//   age: number;
// };

// function logAge(obj: personAge) {
//   console.log(obj.age);
// };

// let person = { name: 'sangkwon', age: 30 };

// logAge(person); 

// logAge는 personAge라는 타입을 가짐
// interface를 인자로 받아 사용할 때 interface의 속생 갯수와 인자로 받는 객체의 속성 갯수가 일치하지 않아도 됨

// => interface에 정의도니 속성, 타입의 조건만 만족하면 몇 개의 인자가 들어와도 상관없고, interface의 속성 순서를 맞추지 않아도 된다
// 이러한 것을 옵션 속성이라고 함

// 옵션 속성 => 해당 속성 끝에 ?를 붙인다

// interface CraftBeer {
//   name: string;
//   hop?: number;
// }

// let myBeer = {
//   name: 'Tera'
// };

// function brewBeer (beer: CraftBeer) {
//   console.log(beer.name);
  // Tera
// }

// brewBeer(myBeer);

// 이처럼 interface의 속성명 끝에 ?를 붙임으로써 옵션 속성으로 정의하여 인자의 속성에 포함하지 않을 수도 있다

// 옵션 속성을 통해서 interface에 정의되어 있지 않은 속성에 대해서 인지시켜줄 수 있다.

// function brewBeer2 (beer: CraftBeer) {
//   console.log(beer.nam); // 오탈자나
//   console.log(beer.price);  // 존재하지 않는 속성의 경우 에러로 확인할 수 있다
// }

// 이러한 타입 추론을 무시하고 싶다면 as 를 사용한다

// interface CraftBeer {
//   name?: string; 해당 속성을 옵션 속성으로 정의하고
//   hop?: number;
// }


// let myBeer = { nam: 'what' };
// brewBeer(myBeer as CraftBeer) 이처럼 as interface명을 넣으면 추론을 무시할 수 있다.

// interface에서 정의하지 않은 속성들을 추가로 사용하길 원할 경우
// interface CraftBeer {
//   brand?: string;
//   [propName: string]: any;
// }


// 읽기 전용 속성
// interface로 객체를 처음 생성할 때만 값을 할당, 이후에 변경할 수 없는 속성

// interface CraftBeer {
//   readonly brand: string;
// }

// let myBeer: CraftBeer = {
//   brand: 'Begian Monk'
// };

// myBeer.brand = 'Korean Beer'; // readonly라는 에러가 발생한다

// ReadonlyArray<T> 타입을 사용하면 읽기 전용 배열 생성
// 선언 시점에 정의된 할당된 값을 변경할 수 없다
// splice, push, 벨류값 변경 등등

// 함수 타입 선언하기

// interface login {
//   (username: string, password: string): boolean;
// }

// // 함수의 인자 타입과 반환 타입

// let loginUser: login;
// loginUser = function(id: string, pw: string) {
//   console.log('로그인 했습니다.');
//   return true;
// }

// interface로 함수의 인자와 반환 타입 지정 시 이외의 타입이 들어가면 에러가 발생한다.

// interface CraftBeer {
//   beerName: string;
//   nameBeer(beer: string): void;
// }

// class myBeer implements CraftBeer {
//   beerName: string = 'Baby Guinness';
//   nameBeer(b: string) {
//     this.beerName = b;
//   }
//   constructor() {}
//   log() {
//     console.log(this.beerName);
//   }

//   change() {
//     this.nameBeer('other');
//   }
// };

// let mine = new myBeer();

// mine.log();
// mine.change();
// mine.log();

// Baby Guinness
// other

// 인터페이스 확장부터 다시 하기


