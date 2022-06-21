// what is difference between insert and save in typeorm?

// The documentation's grammar needs improving, 
// but it means that invoking .insert will save a single entity (i.e. a single row in a single table), 
// whereas .save will insert all pending entities in all affected tables. 
// This difference is useful when you need to work-around limitations in different databases 
// w.r.t. deferred-constraints.

// 지난 주에 프로젝트에서 학생이 수강 중인 강의를 저장하고 조회, 생성하는 모듈을 구현했습니다.
// 생성의 경우, 이후 결제 모듈이 완성되면 transaction으로 진행하기 위해 임의로 만들었습니다.
// 당시에 다른 코드를 보면서 코드를 구현하면서 insert와 save의 차이를 학습하지 못했습니다.

// 이번에 학생들의 후기를 작성하고 조회하는 모듈을 작성하면서 그 때 당시와 동일하게 ManyToMany로 구현했는데
// 다른 코드를 참고하지 않으며 구현하다가 insert를 사용했고, 그 결과 create가 정상적으로 작동하지 않는 에러가 발생했습니다.

// 이후 ManyToMany에 문제가 있는 지 앞 번 코드를 참고하면서 insert가 아닌 save임을 확인했습니다.

// 그렇게 에러는 해결했지만, 제대로 학습하기 위해 알아보았습니다.

// 스택오버플로우에서 위의 답변을 찾았습니다.

// insert의 경우에는, 단일 엔티티만을 추가해주지만,
// save의 경우에는 영향을 미치는 모든 엔티티를 저장하며, 제약 조건이 걸린 다른 데이터베이스에서 문제를 해결할 때 사용할 수 있습니다.

// 꾸준히 학습한다고 생각을 했지만, 이런 부분에서 에러가 발생하고, 구현에 오랜 시간이 걸린 게 너무 아쉬웠습니다.