// 이번에 맡은 모듈은 대기 신청서를 저장하고, 이를 바탕으로 대기 신청자를 저장하는 로직입니다.
// 신청서가 저장되더라도 신청자가 저장이 안되면 전부를 취소해야되기 때문에 transaction으로 해당 함수를 구현했습니다.
// 여기에서 신청서가 저장될 수 없는 조건이 여러 개 있습니다.
// 비슷한 모듈을 맡은 직원은 조건을 판단하는 로직 또한 트랜잭션에 포함했고,
// 저는 트랜잭션과는 별도로 분리를 하고, 신청서와 신청자를 저장하는 로직만 트랜잭션으로 감쌌습니다.
// 제가 이렇게 구현한 이유는 앞 번에 트랜잭션은 규모가 크지 않고, 필요한 부분에만 적용해야되는 다는 것을 학습한 경험이 있어서 입니다.
// 학습한지 오래되기도 했고, 다음에 이러한 상황이 왔을 때, 더 나은 판단을 하기 위해 트랜잭션을 복습해 보았습니다. 

// 트랜잭션이란? 데이터베이스의 상태를 변화시키기 위해 수행하는 작업의 단위, 하나의 트랜잭션은 commit 되거나 rollback 됨

// commit 연산, 트랜잭션에 대한 작업이 성공적으로 끝났을 때 수행하며, 트랜잭션 관리자에게 이를 알려주는 연산
// rollback 연산, 트랜잭션 처리가 비정상적으로 종료되었을 때 수행하며, 원자성 구현하기 위해 트랜잭션이 행한 모든 연산을 취소하는 연산

// Lock, 동시에 여러 Connection이 동일한 자원 요청 시, 한 번에 하나의 Connection만 변경 가능

// 트랜잭션의 특징
// 원자성 Atomicity 트랜잭션이 DB에 모두 반영되거나, 아니면 전혀 반영되지 않아야함
// 일관성 Consistency 트랜잭션의 처리 결과가 항상 일관성을 가짐 => 트랜잭션 진행 동안 DB에 변화가 생기더라도, 트랜잭션이 실행될 당시 최초의 DB를 기준으로 진행
// 독립성 Isolation 다수의 트랜잭션이 동시에 실행될 경우, 각각의 트랜잭션은 타 트랜잭션 연산에 끼어들 수 없음
// 지속성 Durability 트랜잭션이 성공적으로 완료되었을 경우, 결과는 영구적으로 반영

// 이러한 트랜잭션을 적용할 때의 주의사항은 다음과 같습니다.
// 데이터베이스의 Connection 개수가 제한적이기 때문에 트랜잭션의 범위는 최소화할 필요가 있다
// Connection을 소유하는 시간이 길어질 수록 사용가능한 Connection 수는 줄어듬
// 트랜잭션 각각의 크기도 최소하는 것이 좋다 => 모든 작업에 트랜잭션이 필요하다고 해서 큰 작업 전체를 트랜잭션으로 묶는 거보단, 분리 가능한 범위로 트랜잭션을 나누는 것이 좋다
// 

// 두 개 이상의 트랜잭션이 특정 자원의 Lock을 가진 채 다른 트랜잭션이 소유한 Lock된 자원을 요구하면 아무리 기다려도 상황이 바뀌지 않는 상태가 발생할 수 있으며
// 이를 교착상태라고 함

// 추후에 더 학습해서 더 나은 코드를 구현할 수 있도록 노력해야겠습니다.