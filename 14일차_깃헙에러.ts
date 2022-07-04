// E325: ATTENTION
// Found a swap file by the name "~/Desktop/artrooms_server/.git/.MERGE_MSG.swp"
//           owned by: flexweb   dated: 수  6 29 14:30:10 2022
//          file name: ~flexweb/Desktop/artrooms_server/.git/MERGE_MSG
//           modified: YES
//          user name: flexweb   host name: minkyeongjun-ui-iMac.local
//         process ID: 55672
// While opening file "/Users/flexweb/Desktop/artrooms_server/.git/MERGE_MSG"
//              dated: 금  7 01 14:00:25 2022
//       NEWER than swap file!

// (1) Another program may be editing the same file.  If this is the case,
//     be careful not to end up with two different instances of the same
//     file when making changes.  Quit, or continue with caution.
// (2) An edit session for this file crashed.
//     If this is the case, use ":recover" or "vim -r /Users/flexweb/Desktop/artrooms_server/.git/MERGE_MSG"
//     to recover the changes (see ":help recovery").
//     If you did this already, delete the swap file "/Users/flexweb/Desktop/artrooms_server/.git/.MERGE_MSG.swp"


// 지난 주에 프로젝트 코드를 풀 받는 과정에서 발생한 에러입니다.
// 해당 에러는 터미널이 동작 중에 종료될 경우 발생하는 에러임을 확인했습니다.
// /.git/ 다음에 있는 파일을 편집하던 중 vi가 종료하지 않고 터미널이 종료될 경우 저러한 파일이 생성된다고 합니다.
// git pull 이후 conflict 발생 시 commit 메세지 작성하는 vi가 떴을 때 강제종료 후 conflict 해제하다 보니 발생한 것으로 판단됩니다.
// 해당 파일이 위치한 폴더에 진입 후 ls -a 로 파일 목록 확인후 rm -f .MERGE_MSG.swp로 파일 삭제하여 에러를 해결했습니다.
