// "message": "Abstract type \"LiveClassWaitingApplicantResult\" was resolved to a type \"ILiveClassWaitingApplicantList\" that does not exist inside the schema.",

// nestjs typeorm 을 사용하면서 리턴타입 정의하는 type 파일에서 사용하는 __typename를 graphql 과 맞추지 못하면서 발생한 에러입니다.

// The __typename field
// Every object type in your schema automatically has a field named __typename (you don't need to define it). 
// The __typename field returns the object type's name as a String (e.g., Book or Author).

// GraphQL clients use an object's __typename for many purposes, 
// such as to determine which type was returned by a field that can return multiple types (i.e., a union or interface). Apollo Client relies on __typename when caching results, so it automatically includes __typename in every object of every query.

// Because __typename is always present, this is a valid query for any GraphQL server:

// 해당 모듈의 type 파일에서 __typename과 Graphql 에서 정의한 리턴 타입을 맞춤으로써 해결할 수 있었습니다.