// 지난 주에 대표님께서 aws ec2 cpu 사용량과 cpu 크레딧 관련 내용을 공유해주셨습니다.
// 해당 부분은 추가적으로 학습해서 공유하겠습니다.

// 위의 내용에 추가해서 aws rds에서 count나 sum 쿼리를 사용하는 트래픽이 증가하게 되면 rds의 부담이 커지고
// 서버의 다운으로 이어질 수 있다며, 부피가 큰 count(단순히 갯수를 계산하는 거뿐만 아니라 데이터들을 합치는!)나 sum 쿼리의 경우 전체를 받아서 코드로 데이터를 찾는 게
// 효율적일 수 있다는 말씀을 해주셨습니다.

// 저러한 내용을 공유 받고 조건이 두가지인 where 절의 경우, 하나의 조건으로 db에서 데이터를 가져오고
// 나머지 조건은 Js코드로 찾는 것이 더 나을까? 라는 의문이 들었습니다.

// 스택오버플로우에서 한 개발자가 이름을 검색할 경우 이름으로 이루어진 미리 로드된 자바스크립트 배열에서 검색하는 것과
// like 쿼리 중 어떤 것이 효율적인지에 대한 질문을 올렸습니다.

// how many times will the user use this functionality in an average session? how frequently? I'm voting for mysql.

// Just a question: What's faster? Dumping 22k of data from the DB into an array AND have JS go over them? Or a trip to the DB looking for a single value?

// I would definitely use MySQL in this case - especially with mobile users, you can't always guarantee the speed of their device, whereas with MySQL you've got full visibility and can choose to optimize where necessary.

// Another way to put forward this question, "Which one is faster and better on a mobile website, (1) executing an SQL query, yielding ~22,000 results, on each page visit and embed ~22,000 names in response every time a page is visited OR (2) make an ajax call to run an SQL query, yielding ~20 results, only when user wants to?" ?

// This is just speculation, but without testing, immediately I'd go for the MySQL query. MySQL has been optimised by its developers for the best search/sort algorithms - that's its job (one look at their benchmark manual will give you an idea as to just how much they care). The people who write the JavaScript interpreters won't have had as much time to devote to optimising their search/sort algorithms.
// As an added plus, the Javascript option is dependent on the client's computer speed and browser - a slow device with a poorly implemented interpreted will take a much longer time. However, the MySQL option depends on your server, and therefore is completely under your control.
// Some tests
// JavaScript array with 10,000 values, comparing against a set value (jsfiddle.net/c6rpK/) - I get approximately 12ms
// For the same test using MySQL I get 2.3ms

// 그리고 동료 개발자분께 여쭤봤을 때, where 조건이 2개인 경우에 직접 큰 데이터를 넣고 Mysql에서 걸리는 시간과, 코드를 돌렸을 때 걸리는 시간을 보고 고민을 해볼 수 있다고 했습니다.

// 동료분께 한 질문과 스택오버플로우를 봤을 때, 모든 상황을 통달하는 정확한 답은 없지만, 효율적인 코드를 구현하여서 쿼리와 비교했을 때 상황 별로 권고되는 방법이 다를 수 있겠다는 것을 알았습니다.

// 프로젝트가 끝나면 여유롭게 회사에 와서 큰 데이터를 넣고 직접 비교하면서 제가 가진 의문에 답을 할 수 있는 시간을 가져봐야겠으며, 단순히 코드나 쿼리를 짜는 게 아니라 최적화할 수 있는 방법을 고민하는 개발자가 되어야겠습니다.