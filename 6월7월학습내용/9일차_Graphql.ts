// 에러
// return new _GraphQLError.GraphQLError(`Syntax Error: ${description}`, {

// 프로젝트에서 관리자가 매달 선생님들의 정산 정보를 저장하고 정산 완료를 진행하는 모듈을 제작 중에 발생했던 에러입니다.
// service와 resolver에 구현한 query 중 findAll이 다른 모듈들과 달리 인자 값이 없었습니다.(다른 모듈들은 무한스크롤이 필요하지만 해당 모듈은 필요 없음)
// .graphql 파일에 해당 쿼리를 다음과 같이 작성했습니다.

// blahblah.graphql
// type Query {
//     뭐든찾는함수(): 리턴타입
// }

// 이렇게 작성하니 위와 같은 에러가 발생했고, 다른 파일에서 { }, ( ) 중에 잘 못 들어간 게 있어서 찾다가 
// 보이지 않아 구글에 검색하니 스택오버플로우에서 해답을 찾을 수 있었습니다. 

// stackoverflow 

// Curly brackets serve three purposes in a GraphQL document. In executable documents, 
// they identify a selection set, or a set of fields being requested. In type definitions, 
// they either identify a set of fields (for an object type, an input object type or an interface) 
// or they identify a set of values for an enum. In all three cases, the provided set cannot be empty. 
// That is to say, if you use curly brackets, you must provide at least one item inside them.

// An empty pair of curly brackets ({}) will always provide a syntax error.

// If you don't need to provide a selection set/set of fields/set of enum values, just omit the curly brackets:

// # Invalid
// type Query {
// }

// # Valid (at least syntactically)
// type Query

// Curly brackets은 다음과 같은 세 가지 용도로 사용됨
// 먼저 실행 파일 문서에서는 선택 집합 또는 요청 중인 필드 집합 식별
// 형식 정의에서는, 필드 집합(객체 유형, 입력 객체 유형 또는 인터페이스) 식별
// 또는 열거형 값의 집합을 식별

// 세 가지 모두 집합을 비워둘 수 없음. 즉, Curly brackets를 빈 값으로 둘 수 없음
// 적어도 하나의 값은 들어가야함

// 이 답변을 통해서 위의 쿼리를 다음과 같이 바꿔줬습니다.

// blahblah.graphql
// type Query {
//     뭐든찾는함수: 리턴타입
// }
// 이를 통해 에러를 해결할 수 있었습니다.


