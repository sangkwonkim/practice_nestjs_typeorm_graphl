/**
     * Deletes entities by a given criteria.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
//  delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>): Promise<DeleteResult>;

/**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
//  update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>;

// 현재 진행 중인 모듈이
// 1. 해당 월 선생님 별 정산 내역 목록 묶음으로 다운로드 
// 2. 묶음 별 세부 선생님 정산 정보

// 1이 부모 테이블, 2가 자식 테이블로 연관 되어 있고      
// 2의 정산 상태가 완료되면 1의 정산 상태도 완료로 변경됨
// 2 테이블의 각 요소들을 복수 형태로 상태를 변경할 수 있음
// 1 테이블의 정보는 복수 선택 후 삭제 가능함

// 네번째 조건에 맞춰서 delete service를 구현하던 중 
// 인자 값으로 number[]을 받으면 Map 으로 각 요소를 순회하면서 delete를 계획
// map의 return 배열 확인이 어려워 정의를 보니 배열도 인자를 받을 수 있었고
// 해당 배열의 affected를 통해 삭제된 갯수를 확인할 수 있었음

// update도 인자로 배열을 받을 수 있어서
// 세번째 조건 service 만들 때 사용해볼 예정