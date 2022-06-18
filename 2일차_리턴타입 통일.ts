// 프로젝트 아트클래스의 리뷰 모듈을 만들면서..

// 리뷰에는 평가 체크리스트, 별점, 학생이 작성한 리뷰로 이뤄져 있음

// 서버 요청에 따른 응답 형태를 사전에 맞춰놓고 진행하던 중
// 평가 체크리스트 별, 별점 별로 카운트한 값의 경우 리턴 타입을 맞춰야 하는 상황이 발생
// 기존의 리턴 타입은 먼저 entity와 동일한 타입
// 다음으로 entity로 이루어진 배열, 전체 카운트로 이뤄진 배열
// 이 두가지와 에러, number, string 등등을 유니언타입을 선언한 최종 리턴 타입을 사용함

// 여기에서 체크리스트 별, 별점 별 카운트 값의 경우 entity나 number 형태로 넘겨지지 않기 때문에
// 새로운 리턴 타입을 만들어줌 
// service에서 구현한 countReviewByStars의 쿼리빌더에서 정한 별칭과 매칭이 되는 타입,
// 위의 타입들이 배열로 담긴 배열 타입
// 마지막으로 기존의 타입과 동일하게 에러, number 등등을 유니언 타입으로 선언 후 해당 타입으로 리턴 타입 설정

// review.graphql에서도 동일하게 리턴 타입과 쿼리를 설정

// 이를 통해서 모듈을 성공적으로 구현할 수 있었음

// const count = await this.artClassReviewRepository.createQueryBuilder('artClassReview')
// .where(`artClassMainId = ${artClassMainId}`)
// .select('artClassReview.evaluation AS evaluations')
// .addSelect('COUNT(*) AS evaluationsCount')
// .groupBy('artClassReview.evaluation')
// .getRawMany();

// 평가 체크리스트와 별점 별로 카운트하기 위해 사용한 쿼리빌더
// 처음에는 findAll 이후 reduce를 통해서 계산해야될 지 고민했는데,
// 구글링을 통해서 해당 방법 학습 후 직접 구현함

// typeorm을 사용하고 있지만, 이러한 상황을 대비해서 쿼리빌더나 mysql 쿼리도 꾸준히 학습해야겠다는 생각이 듦

// graphql 에서 소대문자를 틀리면서 에러가 발생함
// 수정했으나 아까의 코드를 이유로 계속 에러가 발생
// 서버 실행 시 src 폴더에 생성되는 graphql.ts 파일 삭제 후 재실행하니 실행됨

// 이러한 graphql의 동작 방식에 대해 궁금증이 생김
