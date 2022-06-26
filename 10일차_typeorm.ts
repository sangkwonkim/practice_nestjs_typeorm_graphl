// typeorm "Cannot query across one-to-many for property

// 1. 해당 월 선생님 별 정산 내역 목록 묶음으로 다운로드 
// 2. 묶음 별 세부 선생님 정산 정보

// 1이 부모 테이블, 2가 자식 테이블로 연관 되어 있고 OneToMany     
// 2의 정산 상태가 완료되면 1의 정산 상태도 완료로 변경됨
// 2 테이블의 각 요소들을 복수 형태로 상태를 변경할 수 있음
// 1 테이블의 정보는 복수 선택 후 삭제 가능함

// 이러한 테이블 관계에서 부모 테이블에서 조건 하나가 충족되고 자식 테이블에서 또 다른 조건이 충족되는
// 데이터를 찾기 위해 부모테이블에서 검색을 하니 위와 같은 에러가 발생했습니다.

// We need to use queryBuilder for cases like this since find doesn't allow filtering relations.

// 이러한 답변도 있고, find 외의 메소드는 개발자가 코드를 잘 못 구현해서 발생하는 듯한 stackoverflow 게시글들을 봤습니다.

// 저는 이러한 에러를 자식 테이블에서 find 하며 해결할 수 있었는데
// 앞 번의 코드를 기록했었더라면 더 공부해볼 수 있었을텐데 아쉽습니다.