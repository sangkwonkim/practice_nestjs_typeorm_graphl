// 집에서도 깃헙 개인 계정과, 회사 계정을 로그인해서 사용하고 있고
// 회사에서도 개인 계정과 회사 계정 둘 다 로그인해서 사용하다 보니 계정 정보 관련 에러가 발생했습니다. 

// 주말동안 집에서 작업하다가 Personal token을 바꾸는 일이 있었고, 이로 인해서 회사에서 계정 정보가 반영되지 않아 문제가 발생했습니다.

// blahblah@blahblah-ui-iMac blahblah % git pull origin dev
// remote: Invalid username or password.
// fatal: Authentication failed for 'https://github.com/blahblah/blahblah.git/'

// 회사 계정의 Personal token을 새로 발급받고
// git config --system --unset credential.helper 
// 터미널에 위의 코드 입력 후 (만약 permisson denied일 경우 앞에 Sudo를 붙여준다.)
// pull하면 비밀번호 입력 창이 나오고 여기에 token을 붙여 넣기 하면 됩니다.

