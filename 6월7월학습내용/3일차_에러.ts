// "message": "Abstract type \"StudentMyClassResult\" must resolve to an Object type at runtime for field \"Query.studentMyClasses\". Either the \"StudentMyClassResult\" type should provide a \"resolveType\" function or each possible type should provide an \"isTypeOf\" function.",
// "locations": [
//   {
//     "line": 2,
//     "column": 3
//   }
// ],
// "path": [
//   "studentMyClasses"
// ],

// 학생들이 수강 중인 강의를 저장하기 위해 student와 class들을 ManyToMany로 관계를 설정해주었습니다.
// ManyToMany와 JoinTable를 통해서 조인테이블이 생성되었습니다.
// typeorm에서 relation으로 클래스와 학생의 정보를 조회하면서
// 정상적으로 학생들이 수강 중인 클래스의 정보를 수집할 수 있었습니다.


// 위의 에러는 studentMyClass.type.ts 파일에서 typename 설정 시 오타에 의한 에러였습니다.

// export class IStudentMyClassList {
//   __typename : 'StudentMyClassList';

// =가 아닌 :를 사용하면서 에러가 발생함
// typescript나 다른 라이브러리, 프레임워크의 에러가 아닌 오탈자에 의한 에러가 발생치 않도록 주의해야겠습니다.
