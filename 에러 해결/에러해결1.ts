// EntityColumnNotFound: No entity column "__typename" was found.
// => 먼저 유저 테이블에서 찾은 정보에는 __typename이 함께 리턴되었는데, 삭제 시킬 때는 해당 컬럼이 존재하지 않아 발생한 에러

// 현재 진행 중인 프로젝트에서 학생이 탈퇴할 경우, 학생 테이블에서 삭제되고 유저 테이블에서 삭제되어야합니다.
// (relation이 유저에 대해 학생이 종속 관계일 경우, cascade로 삭제 가능하겠지만, 프로젝트 초기에 설계가 잘 못되어 각각 삭제 시켜주고 있음)

// 유저의 id를 받아 학생을 찿아 삭제시키고, 이후에 찾은 유저 정보로 유저 테이블에 삭제했습니다.

// return await manager.delete(User, user);
// 기존에는 찾았던 유저 자체를 delete 메소드의 두 번째 인자로 넘겨줬는데, 구현할 때는 잘 동작하다가
// 어제 테스트해보니 위와 같은 에러가 발생했습니다.

// return await manager.delete(User, user.id);
// 이렇게 수정하니 에러를 해결할 수 있었습니다.



// Nest can't resolve dependencies of the blahClassService  blahClassRepository, ?, blahClassEvaluationRepository). Please make sure that the argument StudentRepository at index [1] is available in the SettlementModule context.

// Potential solutions:
// - If StudentRepository is a provider, is it part of the current SettlementModule?
// - If StudentRepository is exported from a separate @Module, is that module imported within SettlementModule?
//   @Module({
//     imports: [ /* the Module containing StudentRepository */ ]
//   })

// => 다른 모듈에서 사용하는 엔티티를 갖고 왔을 때 module.ts 파일에서 import하지 않아 발생한 에러

// 다른 모듈에서 가져온 엔티티를 import에 추가함으로써 해결할 수 있었습니다.
