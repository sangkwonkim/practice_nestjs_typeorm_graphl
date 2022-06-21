// @Field()
// @IsString()
// @Matches(/^\d{4}-(0[1-9]|1[0-2])$/) // yyyy-mm 으로 스트링이 들어오면 정규표현식으로 확인한다. => 만든 후에 string으로 처리되는 지 여부 확인하기
// targetYearAndMonth: string;

// 프로젝트를 진행하면서 관리자가 선생님의 월 정산 내역 별로 입력 가능한 제작비의 테이블을 만들었습니다.
// 클라이언트에서 연월에 조회하면 해당 연월에 해당하는 제작비를 넘겨줘야 하기 때문에
// 해당 테이블에서 targetYearAndMonth를 통해서 연월 정보를 저장했습니다.
// YYYY-MM 형태로 저장하면서 class-validator로 string만 확인하려다가
// 발생할 수 있는 에러를 줄이기 위해서 YYYY-MM 정규표현식으로 matches해줬습니다.
// 아직 정규표현식이 익숙하지 않지만 이번 기회에 잘 활용할 수 있도록 지속적으로 학습해야겠습니다.