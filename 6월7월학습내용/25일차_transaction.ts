// 이번에 lassMain과 여기에 이어진 styleLecture를 함께 create, update하는 로직을 구현했습니다.
// main과 함께 styleLecture가 만들어져야 하기때문에 transaction으로 만들었습니다.

// transaction 내부에서 manager가 아닌 resolver에 inject한 repo를 이용할 경우
// transaction 결과가 반영되지 않은, transaction 직전의 db 데이터를 이용한다는 것을 알게 되었습니다.
// transaction을 위해서 Connection을 이용하고, manager 사용하는 것을 알고 있었고
// 실수를 한 것이지만 이를 통해서 이러한 내용을 알게 되었습니다.
// 다음부터는 이런 실수를 하지 않도록 주의해야겠습니다.