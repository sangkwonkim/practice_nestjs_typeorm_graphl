//커밋 히스토리 조회하기

//Git에서 히스토리를 조회하는 명령어 git log

//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Fri Aug 12 09:08:23 2022 +0900

//    today done

//commit 541945279ee4824b232db2f21ad5517302a49d44
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Thu Aug 11 17:13:02 2022 +0900

//    today done

//commit 35a024a6925e16fdce0f59fe329fae106c7160db
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Thu Aug 11 13:02:14 2022 +0900

//특별한 아규먼트 없이 git log 명령을 실행하면 저장소의 커밋 히스토리를 최신순부터 보여줌

//각 커밋의 SHA-1 체크섬, 저자 이름, 저자 이메일, 커밋한 날짜, 커밋 메시지를 보여줌

//-p 는 각 커밋의 diff 결과를 보여줌 
//-2는 최근 두 개의 결과만 보여주는 옵션


//git log -p -2
//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Fri Aug 12 09:08:23 2022 +0900

//    today done

//diff --git "a/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts" "b/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts"
//new file mode 100644
//index 0000000..0d066ec
//--- /dev/null
//+++ "b/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts"
//@@ -0,0 +1,185 @@
//+// Custom repositories
//+// 데이터베이스 작업을 포함한 레포지토리를 커스텀할 수 있음. 

//이처럼 diff 결과를 나타냄 => 이를 통해서 동료가 무엇을 커밋했는 지 리뷰하고 빨리 조회할 수 있음


//--stat 옵션으로 각 커밋의 통계 정보를 조회할 수 있음

//git log --stat -2
//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Fri Aug 12 09:08:23 2022 +0900

//    today done

// "8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts" | 185 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1 file changed, 185 insertions(+)

//commit 541945279ee4824b232db2f21ad5517302a49d44
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Date:   Thu Aug 11 17:13:02 2022 +0900

//    today done

// "8\354\233\224\355\225\231\354\212\265/8\354\233\224\352\263\204\355\232\215.ts"                                                                 | 9 ++++++---
// "8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/Math.random().ts" => "8\354\233\224\355\225\231\354\212\265/Math.random().ts" | 0
// 2 files changed, 6 insertions(+), 3 deletions(-)


// --stat 옵션은 어떤 파일이 수정됐는지, 
// 얼마나 많은 파일이 변경됐는지, 또 얼마나 많은 라인을 추가하거나 삭제했는지 보여줌
// 요약정보는 가장 뒤쪽에 보여줌


// -pretty 옵션을 통해 히스토리 내용을 보여줄 때 기본 형식 이외에 여러 가지 중에 하나를 선택할 수 있음
// oneline 옵션은 각 커밋을 한 라인으로 보여주며 이 옵션은 많은 커밋을 한 번에 조회할 때 유용함 
// 추가로 short, full, fuller 옵션도 있는데 이것은 정보를 조금씩 가감해서 보여줌

// git log --pretty=oneline
// 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD) today done
// 541945279ee4824b232db2f21ad5517302a49d44 today done
// 35a024a6925e16fdce0f59fe329fae106c7160db today done
// 3add544a269857b2a65947219ed0904007f0b64f today done

// git log --pretty=short
//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>

//today done

//commit 541945279ee4824b232db2f21ad5517302a49d44
//Author: SANGGWONGIM <sangkwon2212@gmail.com>

//today done


//git log --pretty=full
//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>
//Commit: SANGGWONGIM <sangkwon2212@gmail.com>

//today done


//git log --pretty=fuller
//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
//Author:     SANGGWONGIM <sangkwon2212@gmail.com>
//AuthorDate: Fri Aug 12 09:08:23 2022 +0900
//Commit:     SANGGWONGIM <sangkwon2212@gmail.com>
//CommitDate: Fri Aug 12 09:08:23 2022 +0900

//today done



//format 옵션은 나만의 포맷으로 결과를 출력하고 싶을 때 사용함.
//특히 결과를 다른 프로그램으로 파싱하고자 할 때 유용하며 이 옵션을 사용하면 포맷을 정확하게 일치시킬 수 있기 때문에 Git을 새 버전으로 바꿔도 결과 포맷이 바뀌지 않음

//git log --pretty=format 에 쓸 몇가지 유용한 옵션
//%H 커밋 해시 
//%h 짧은 길이 커밋 해시 
//%T 트리 해시 
//%t 짧은 길이 트리 해시 
//%P 부모 해시 
//%p 짧은 길이 부모 해시 
//%an 저자 이름 
//%ae 저자 메일 
//%ad 저자 시각 (형식은 --date=옵션 참고) 
//%ar 저자 상대적 시각 
//%cn 커미터 이름 
//%ce 커미터 메일 
//%cd 커미터 시각 
//%cr 커미터 상대적 시각 
//%s 요약 


//저자(Author) 와 커미터(Committer)
//저자는 원래 작업을 수행한 원작자이고 
//커밋터는 마지막으로 이 작업을 적용한(저장소에 포함시킨) 사람임.
//만약 당신이 어떤 프로젝트에 패치를 보냈고 그 프로젝트의 담당자가 패치를 적용했다면 두 명의 정보를 모두 알 필요가 있음
//그래서 이 경우 당신이 저자고 그 담당자가 커미터다.


//oneline 옵션과 format 옵션은 --graph 옵션과 함께 사용할 때 유용함
//이 명령은 브랜치와 머지 히스토리를 보여주는 아스키 그래프를 출력함

//$ git log --pretty=format:"%h %s" --graph
//* 2d3acf9 ignore errors from SIGCHLD on trap
//*  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
//|\
//| * 420eac9 Added a method for getting the current branch.
//* | 30e367c timeout code and tests
//* | 5a09431 add timeout protection to grit
//* | e1193f8 support for heads with slashes in them
//|/
//* d6016bc require time for xmlschema
//*  11d191e Merge branch 'defunkt' into local


//git log 주요 옵션
//-p
//각 커밋에 적용된 패치를 보여준다.

//--stat
//각 커밋에서 수정된 파일의 통계정보를 보여준다.

//--shortstat
//--stat 명령의 결과 중에서 수정한 파일, 추가된 라인, 삭제된 라인만 보여준다.

//--name-only
//커밋 정보중에서 수정된 파일의 목록만 보여준다.

//--name-status
//수정된 파일의 목록을 보여줄 뿐만 아니라 파일을 추가한 것인지, 수정한 것인지, 삭제한 것인지도 보여준다.

//--abbrev-commit
//40자 짜리 SHA-1 체크섬을 전부 보여주는 것이 아니라 처음 몇 자만 보여준다.

//--relative-date
//정확한 시간을 보여주는 것이 아니라 “2 weeks ago” 처럼 상대적인 형식으로 보여준다.

//--graph
//브랜치와 머지 히스토리 정보까지 아스키 그래프로 보여준다.

//--pretty
//지정한 형식으로 보여준다. 이 옵션에는 oneline, short, full, fuller, format이 있다. format은 원하는 형식으로 출력하고자 할 때 사용한다.

//--oneline
//--pretty=oneline --abbrev-commit 두 옵션을 함께 사용한 것과 같다.


//조회 제한조건
//git log 명령은 조회 범위를 제한하는 옵션
//히스토리 전부가 아니라 부분만 조회. 
//앞 서 사용했던 -2 옵션의 실제 사용법은 -<n>으로 최근 n개의 커밋을 나타내줌

//--since 나 --until 같은 시간을 기준으로 조회하는 옵션도 있음

//지난 2주 동안 만들어진 커밋들만 조회하는 명령
//$ git log --since=2.weeks

//이 옵션은 다양한 형식을 지원함
//"2008-01-15" 같이 정확한 날짜도 사용할 수 있고 "2 years 1 day 3 minutes ago" 같이 상대적인 기간을 사용할 수도 있음
//$ git log --since=2.weeks

//--author 옵션으로 저자를 지정하여 검색할 수도 있고 --grep 옵션으로 커밋 메시지에서 키워드를 검색할 수도 있음

//노트
//--author`와 `--grep 옵션을 함께 사용하여 모두 만족하는 커밋을 찾으려면 --all-match 옵션도 반드시 함께 사용해야 한다.


//-S 옵션이 있는데 이 옵션은 코드에서 추가되거나 제거된 내용 중에 특정 텍스트가 포함되어 있는지를 검색함. 
//예를 들어 어떤 함수가 추가되거나 제거된 커밋만을 찾아보려면 아래와 같은 명령을 사용
//$ git log -S function_name


//디렉토리나 파일 이름을 사용하여 그 파일이 변경된 log의 결과를 검색할 수 있음 
//이 옵션은 -- 와 함께 경로 이름을 사용하는데 명령어 끝 부분에 사용(git log —path1 path2).


//git log 조회 범위를 제한하는 옵션

//-(n)
//최근 n 개의 커밋만 조회한다.

//--since, --after
//명시한 날짜 이후의 커밋만 검색한다.

//--until, --before
//명시한 날짜 이전의 커밋만 조회한다.

//--author
//입력한 저자의 커밋만 보여준다.

//--committer
//입력한 커미터의 커밋만 보여준다.

//--grep
//커밋 메시지 안의 텍스트를 검색한다.

//-S
//커밋 변경(추가/삭제) 내용 안의 텍스트를 검색한다.

//Merge 커밋을 제외한 순수한 커밋을 확인해보는 명령
//Junio Hamano가 2008년 10월에 Git 소스코드 저장소에서 테스트 파일을 수정한 커밋들을 볼 수 있음

//$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
//   --before="2008-11-01" --no-merges -- t/

//머지 커밋 표시하지 않기
//--no-merges 옵션을 사용하면 검색 결과에서 머지 커밋을 표시하지 않도록 할 수 있음


//되돌리기

//되돌리기(undo) 할 경우, 다시 복구할 수 없기에 주의해야 함

//완료한 커밋을 수정하기
//너무 일찍 커밋했거나 어떤 파일을 빼먹었을 때 그리고 커밋 메시지를 잘못 적었을 때 사용할 수 있음
//다시 커밋하고 싶으면 파일 수정 작업을 하고 Staging Area에 추가한 다음 --amend 옵션을 사용하여 커밋을 재작성 할 수 있음

//$ git commit --amend

//이 명령어는 staging Area를 사용하여 커밋함
//만약 마지막으로 커밋하고 나서 수정한 것이 없다면(커밋하자마자 바로 이 명령을 실행하는 경우) 조금 전에 한 커밋과 모든 것이 같음 이때는 커밋 메시지만 수정함

//편집기가 실행되면 이전 커밋 메시지가 자동으로 포함되며 메시지를 수정하지 않고 그대로 커밋해도 기존의 커밋을 덮어씀.

//커밋을 했는데 Stage 하는 것을 깜빡하고 빠트린 파일이 있으면 아래와 같이 고칠 수 있음

//$ git commit -m 'initial commit'
//$ git add forgotten_file
//$ git commit --amend

//여기서 실행한 명령어 3개는 모두 커밋 한 개로 기록된다. 두 번째 커밋은 첫 번째 커밋을 덮어씀

//이렇게 --amend 옵션으로 커밋을 고치는 작업은, 추가로 작업한 일이 작다고 하더라도 이전의 커밋을 완전히 새로 고쳐서 새 커밋으로 변경하는 것을 의미함. 이전의 커밋은 일어나지 않은 일이 되는 것이고 당연히 히스토리에도 남지 않음

//--amend 옵션으로 커밋을 고치는 작업이 주는 장점은 마지막 커밋 작업에서 아주 살짝 뭔가 빠뜨린 것을 넣거나 변경하는 것을 새 커밋으로 분리하지 않고 하나의 커밋에서 처리하는 것임. “앗차, 빠진 파일 넣었음”, “이전 커밋에서 오타 살짝 고침” 등의 커밋을 만들지 않겠다는 말임.

//git log --pretty=short -2
//commit a6baa477085f92de9101ed816e01bce44d4b680d (HEAD -> main)
//Author: sangkwonkim <sangkwon2406@naver.com>

//    amend 테스트2

//commit 5f6da621e70846fb56698b55400f0b8f1a08623a (origin/main, origin/HEAD)
//Author: SANGGWONGIM <sangkwon2212@gmail.com>

//    today done

//해당 파일을 commit -m 'amend 테스트'로 커밋했다가
//텍스트 추가후 git commit --amend를 했을 때
//텍스트 입력 창이 나오고 커밋 메시지 변경 후(amend 테스트2) log했을 때 앞 번의 커밋에 덮어져서 나오는 것을 확인할 수 있었음


//파일 상태를 Unstage로 변경하기
//Staging Area와 워킹 디렉토리 사이를 넘나드는 방법
//예를 들어 파일을 두 개 수정하고서 따로따로 커밋하려고 했지만, 실수로 git add * 라고 실행함
//두 파일 모두 Staging Area에 들어 있다. 
//$ git add *
//$ git status
//On branch master
//Changes to be committed:
//  (use "git reset HEAD <file>..." to unstage)

//    renamed:    README.md -> README
//    modified:   CONTRIBUTING.md

//Changes to be commited 밑에 있는 git reset HEAD <file>…​ 이 명령으로 Unstaged 상태로 변경할 수 있음

//CONTRIBUTING.md 파일을 Unstaged 상태로 변경하기

//$ git reset HEAD CONTRIBUTING.md
//Unstaged changes after reset:
//M	CONTRIBUTING.md

//$ git status
//On branch master
//Changes to be committed:
//  (use "git reset HEAD <file>..." to unstage)

//    renamed:    README.md -> README

//Changes not staged for commit:
//  (use "git add <file>..." to update what will be committed)
//  (use "git checkout -- <file>..." to discard changes in working directory)

//    modified:   CONTRIBUTING.md

//CONTRIBUTING.md 파일은 Unstaged 상태가 됨

//git reset 명령은 매우 위험함. --hard 옵션과 함께 사용하면 더욱 위험함. 
//하지만 위에서 처럼 옵션 없이 사용하면 워킹 디렉토리의 파일은 건드리지 않음


//Modified 파일 되돌리기
//CONTRIBUTING.md 파일을 수정하고 나서 다시 되돌리는 방법
//최근 커밋된 버전으로(아니면 처음 Clone 했을 때처럼 워킹 디렉토리에 처음 Checkout 한 그 내용으로) 되돌리는 방법

//Unstaged 부분을 보면

//Changes not staged for commit:
//  (use "git add <file>..." to update what will be committed)
//  (use "git checkout -- <file>..." to discard changes in working directory)

//    modified:   CONTRIBUTING.md


//$ git checkout -- CONTRIBUTING.md

//$ git status
//On branch master
//Changes to be committed:
//  (use "git reset HEAD <file>..." to unstage)

//    renamed:    README.md -> README

//정상적으로 복원된 것을 알 수 있음

//git checkout — [file] 명령은 꽤 위험한 명령임.
//원래 파일로 덮어썼기 때문에 수정한 내용은 전부 사라짐. 수정한 내용이 진짜 마음에 들지 않을 때만 사용.



//리모트 저장소

//리모트 저장소는 인터넷이나 네트워크 어딘가에 있는 저장소를 의미함. 
//저장소는 여러 개가 있을 수 있는데 어떤 저장소는 읽고 쓰기 모두 할 수 있고 어떤 저장소는 읽기만 가능할 수 있음 
//간단히 말해서 다른 사람들과 함께 일한다는 것은 리모트 저장소를 관리하면서 데이터를 거기에 Push 하고 Pull 하는 것
//리모트 저장소를 관리한다는 것은 저장소를 추가, 삭제하는 것뿐만 아니라 브랜치를 관리하고 추적할지 말지 등을 관리하는 것을 말함

//원격 저장소라 하더라도 로컬 시스템에 위치할 수도 있음
//“remote” 저장소라고 이름이 붙어있어도 이 원격 저장소가 사실 같은 로컬 시스템에 존재할 수도 있음 
//여기서 “remote” 라는 이름은 반드시 저장소가 네트워크나 인터넷을 통해 어딘가 멀리 떨어져 있어야만 한다는 것을 의미하지 않음 
//물론 일반적인 원격 저장소와 마찬가지로 Push, Pull 등의 기능은 동일하게 사용함

//리모트 저장소 확인하기
//git remote 명령으로 현재 프로젝트에 등록된 리모트 저장소를 확인할 수 있음 
//이 명령은 리모트 저장소의 단축 이름을 보여줌 
//저장소를 Clone 하면 `origin`이라는 리모트 저장소가 자동으로 등록되기 때문에 `origin`이라는 이름을 볼 수 있음

//git remote
//origin
//git remote -v
//origin  https://github.com/sangkwonkim/practice_nestjs_typeorm_graphl.git (fetch)
//origin  https://github.com/sangkwonkim/practice_nestjs_typeorm_graphl.git (push)


//리모트 저장소 추가하기
//기존 워킹 디렉토리에 새 리모트 저장소 추가하기 
//git remote add <단축이름> <url> 명령을 사용

//$ git remote
//origin
//$ git remote add pb https://github.com/paulboone/ticgit
//$ git remote -v
//origin	https://github.com/schacon/ticgit (fetch)
//origin	https://github.com/schacon/ticgit (push)
//pb	https://github.com/paulboone/ticgit (fetch)
//pb	https://github.com/paulboone/ticgit (push)

//이제 URL 대신에 pb 라는 이름을 사용할 수 있으며 로컬 저장소에는 없지만 Paul의 저장소에 있는 것을 아래와 같이 가져올 수 있음

//$ git fetch pb
//remote: Counting objects: 43, done.
//remote: Compressing objects: 100% (36/36), done.
//remote: Total 43 (delta 10), reused 31 (delta 5)
//Unpacking objects: 100% (43/43), done.
//From https://github.com/paulboone/ticgit
// * [new branch]      master     -> pb/master
// * [new branch]      ticgit     -> pb/ticgit
// * 
//로컬에서 pb/master 가 Paul의 master 브랜치임. 
//이 브랜치를 로컬 브랜치중 하나에 Merge 하거나 Checkout 해서 브랜치 내용을 자세히 확인할 수 있음


//리모트 저장소를 Pull 하거나 Fetch 하기
//앞서 설명했듯이 리모트 저장소에서 데이터를 아래와 같이 가져올 수 있음

//$ git fetch <remote>

//이 명령은 로컬에는 없지만, 리모트 저장소에는 있는 데이터를 모두 가져옴 
//그러면 리모트 저장소의 모든 브랜치를 로컬에서 접근할 수 있어서 언제든지 Merge를 하거나 내용을 살펴볼 수 있음.

//저장소를 Clone 하면 명령은 자동으로 리모트 저장소를 “origin” 이라는 이름으로 추가함. 
//그래서 나중에 git fetch origin 명령을 실행하면 Clone 한 이후에(혹은 마지막으로 가져온 이후에) 수정된 것을 모두 가져옴

//git fetch 명령은 리모트 저장소의 데이터를 모두 로컬로 가져오지만, 자동으로 Merge 하지 않음 
//그래서 로컬에서 하던 작업을 정리하고 나서 수동으로 Merge 해야 함

//그냥 쉽게 git pull 명령으로 리모트 저장소 브랜치에서 데이터를 가져올 뿐만 아니라 자동으로 로컬 브랜치와 Merge 시킬 수 있음
//먼저 git clone 명령은 자동으로 로컬의 master 브랜치가 리모트 저장소의 master 브랜치를 추적하도록 함
//(물론 리모트 저장소에 master 브랜치가 있다는 가정에서). 
//그리고 git pull 명령은 Clone 한 서버에서 데이터를 가져오고 그 데이터를 자동으로 현재 작업하는 코드와 Merge 시킴


//리모트 저장소에 Push 하기
//프로젝트를 공유하고 싶을 때 Upstream 저장소에 Push 할 수 있음. 
//git push <리모트 저장소 이름> <브랜치 이름>

//$ git push origin master

//이 명령은 Clone 한 리모트 저장소에 쓰기 권한이 있고, Clone 하고 난 이후 아무도 Upstream 저장소에 Push 하지 않았을 때만 사용할 수 있음. 다시 말해서 Clone 한 사람이 여러 명 있을 때, 다른 사람이 Push 한 후에 Push 하려고 하면 Push 할 수 없음. 
//먼저 다른 사람이 작업한 것을 가져와서 Merge 한 후에 Push 할 수 있음.


//리모트 저장소 살펴보기
//git remote show <리모트 저장소 이름> 명령으로 리모트 저장소의 구체적인 정보를 확인할 수 있음. 
//origin 같은 단축이름으로 이 명령을 실행하면 아래와 같은 정보를 볼 수 있다.

//$ git remote show origin
//* remote origin
//  Fetch URL: https://github.com/schacon/ticgit
//  Push  URL: https://github.com/schacon/ticgit
//  HEAD branch: master
//  Remote branches:
//    master                               tracked
//    dev-branch                           tracked
//  Local branch configured for 'git pull':
//    master merges with remote master
//  Local ref configured for 'git push':
//    master pushes to master (up to date)

//리모트 저장소의 URL과 추적하는 브랜치를 출력. 
//이 명령은 git pull 명령을 실행할 때 master 브랜치와 Merge 할 브랜치가 무엇인지 보여줌. 

//git pull 명령은 리모트 저장소 브랜치의 데이터를 모두 가져오고 나서 자동으로 Merge 하며 가져온 모든 리모트 저장소 정보도 출력함

//$ git remote show origin
//* remote origin
//  URL: https://github.com/my-org/complex-project
//  Fetch URL: https://github.com/my-org/complex-project
//  Push  URL: https://github.com/my-org/complex-project
//  HEAD branch: master
//  Remote branches:
//    master                           tracked
//    dev-branch                       tracked
//    markdown-strip                   tracked
//    issue-43                         new (next fetch will store in remotes/origin)
//    issue-45                         new (next fetch will store in remotes/origin)
//    refs/remotes/origin/issue-11     stale (use 'git remote prune' to remove)
//  Local branches configured for 'git pull':
//    dev-branch merges with remote dev-branch
//    master     merges with remote master
//  Local refs configured for 'git push':
//    dev-branch                     pushes to dev-branch                     (up to date)
//    markdown-strip                 pushes to markdown-strip                 (up to date)
//    master                         pushes to master                         (up to date)

//브랜치명을 생략하고 git push 명령을 실행할 때 어떤 브랜치가 어떤 브랜치로 Push 되는지 보여줌. 
//또 아직 로컬로 가져오지 않은 리모트 저장소의 브랜치는 어떤 것들이 있는지, 서버에서는 삭제됐지만 아직 가지고 있는 브랜치는 어떤 것인지, git pull 명령을 실행했을 때 자동으로 Merge 할 브랜치는 어떤 것이 있는지 보여줌


//리모트 저장소 이름을 바꾸거나 리모트 저장소를 삭제하기
//git remote rename 명령으로 리모트 저장소의 이름을 변경할 수 있음
//예를 들어 pb 를 paul 로 변경하려면 git remote rename 명령을 사용

//$ git remote rename pb paul
//$ git remote
//origin
//paul

//로컬에서 관리하던 리모트 저장소의 브랜치 이름도 바뀜
//여태까지 pb/master 로 리모트 저장소 브랜치를 사용했으면 이제는 paul/master 라고 사용해야 함

//리모트 저장소를 삭제해야 한다면 git remote remove 나 git remote rm 명령을 사용 
//서버 정보가 바뀌었을 때, 더는 별도의 미러가 필요하지 않을 때, 더는 기여자가 활동하지 않을 때 필요

//$ git remote remove paul
//$ git remote
//origin

//위와 같은 방법으로 리모트 저장소를 삭제하면 해당 리모트 저장소에 관련된 추적 브랜치 정보나 모든 설정 내용도 함께 삭제됨



//태그
//다른 VCS처럼 Git도 태그를 지원함. 사람들은 보통 릴리즈할 때 사용(v1.0, 등등).

//태그 조회하기
//우선 git tag 명령으로 (-l, `--list`는 옵션) 이미 만들어진 태그가 있는지 확인할 수 있음

//$ git tag
//v0.1
//v1.3

//이 명령은 알파벳 순서로 태그를 보여줌

//검색 패턴을 사용하여 태그를 검색할 수 있음 
//Git 소스 저장소는 500여 개의 태그가 있음. 만약 1.8.5 버전의 태그들만 검색하고 싶으면 아래와 같이 실행.

//$ git tag -l "v1.8.5*"
//v1.8.5
//v1.8.5-rc0
//v1.8.5-rc1
//v1.8.5-rc2
//v1.8.5-rc3
//v1.8.5.1
//v1.8.5.2
//v1.8.5.3
//v1.8.5.4
//v1.8.5.5

//와일드카드를 사용하여 Tag 리스트를 확인하려면 -l, --list 옵션을 지정
//단순히 모든 Tag 목록을 확인하기 위해 git tag 명령을 실행했을 때 -l 또는 --list 옵션이 적용된 것과 동일한 결과가 출력.
//하지만 와일드카드를 사용하여 태그 목록을 검색하는 경우에는 반드시 -l 또는 --list 옵션을 같이 써 줘야 원하는 결과를 얻을 수 있음

//태그 붙이기
//Git의 태그는 Lightweight 태그와 Annotated 태그로 두 종류가 있음

//Lightweight 태그
//브랜치와 비슷한데 브랜치처럼 가리키는 지점을 최신 커밋으로 이동시키지 않음. 
//단순히 특정 커밋에 대한 포인터일 뿐임.

//Annotated 태그
//Git 데이터베이스에 태그를 만든 사람의 이름, 이메일과 태그를 만든 날짜, 그리고 태그 메시지도 저장함. 
//GPG(GNU Privacy Guard)로 서명할 수도 있음. 
//일반적으로 Annotated 태그를 만들어 이 모든 정보를 사용할 수 있도록 하는 것이 좋음.
//하지만 임시로 생성하는 태그거나 이러한 정보를 유지할 필요가 없는 경우에는 Lightweight 태그를 사용할 수도 있음

//Annotated 태그
//tag 명령을 실행할 때 -a 옵션을 추가

//$ git tag -a v1.4 -m "my version 1.4"
//$ git tag
//v0.1
//v1.3
//v1.4

//-m 옵션으로 태그를 저장할 때 메시지를 함께 저장할 수 있음. 
//명령을 실행할 때 메시지를 입력하지 않으면 Git은 편집기를 실행시킴.

//git show 명령으로 태그 정보와 커밋 정보를 모두 확인할 수 있음

//$ git show v1.4
//tag v1.4
//Tagger: Ben Straub <ben@straub.cc>
//Date:   Sat May 3 20:19:12 2014 -0700

//my version 1.4

//commit ca82a6dff817ec66f44342007202690a93763949
//Author: Scott Chacon <schacon@gee-mail.com>
//Date:   Mon Mar 17 21:52:11 2008 -0700

//    changed the version number

//커밋 정보를 보여주기 전에 먼저 태그를 만든 사람이 누구인지, 언제 태그를 만들었는지, 그리고 태그 메시지가 무엇인지 보여줌


//Lightweight 태그
//Lightweight 태그는 기본적으로 파일에 커밋 체크섬을 저장하는 것뿐이며 다른 정보는 저장하지 않음 
//Lightweight 태그를 만들 때는 -a, -s, -m 옵션을 사용하지 않고 이름만 달아줄 뿐임

//$ git tag v1.4-lw
//$ git tag
//v0.1
//v1.3
//v1.4
//v1.4-lw
//v1.5

//이 태그에 git show 를 실행하면 별도의 태그 정보를 확인할 수 없음 이 명령은 단순히 커밋 정보만을 보여줌

//$ git show v1.4-lw
//commit ca82a6dff817ec66f44342007202690a93763949
//Author: Scott Chacon <schacon@gee-mail.com>
//Date:   Mon Mar 17 21:52:11 2008 -0700

//    changed the version number


//나중에 태그하기

//예전 커밋에 대해서도 태그할 수 있음

//9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile

//특정 커밋에 태그하기 위해서 명령의 끝에 커밋 체크섬을 명시(긴 체크섬을 전부 사용할 필요는 없음).

//$ git tag -a v1.2 9fceb02

//$ git tag
//v0.1
//v1.2
//v1.3
//v1.4
//v1.4-lw
//v1.5

//$ git show v1.2
//tag v1.2
//Tagger: Scott Chacon <schacon@gee-mail.com>
//Date:   Mon Feb 9 15:32:16 2009 -0800

//version 1.2
//commit 9fceb02d0ae598e95dc970b74767f19372d61af8
//Author: Magnus Chacon <mchacon@gee-mail.com>
//Date:   Sun Apr 27 20:43:35 2008 -0700

//    updated rakefile
//...


//태그 공유하기

//git push 명령은 자동으로 리모트 서버에 태그를 전송하지 않음. 
//태그를 만들었으면 서버에 별도로 Push 해야 함. 
//브랜치를 공유하는 것과 같은 방법으로 할 수 있음. 

//`git push origin <태그 이름>`

//$ git push origin v1.5
//Counting objects: 14, done.
//Delta compression using up to 8 threads.
//Compressing objects: 100% (12/12), done.
//Writing objects: 100% (14/14), 2.05 KiB | 0 bytes/s, done.
//Total 14 (delta 3), reused 0 (delta 0)
//To git@github.com:schacon/simplegit.git
// * [new tag]         v1.5 -> v1.5

//만약 한 번에 태그를 여러 개 Push 하고 싶으면 --tags 옵션을 추가하여 git push 명령을 실행. 
//이 명령으로 리모트 서버에 없는 태그를 모두 전송할 수 있음.

//$ git push origin --tags
//Counting objects: 1, done.
//Writing objects: 100% (1/1), 160 bytes | 0 bytes/s, done.
//Total 1 (delta 0), reused 0 (delta 0)
//To git@github.com:schacon/simplegit.git
// * [new tag]         v1.4 -> v1.4
// * [new tag]         v1.4-lw -> v1.4-lw
// * 
//이제 누군가 저장소에서 Clone 하거나 Pull을 하면 모든 태그 정보도 함께 전송됨


//태그를 Checkout 하기
//예를 들어 태그가 특정 버전을 가리키고 있고, 특정 버전의 파일을 체크아웃 해서 확인하고 싶다면 다음과 같이 실행 

//단 태그를 체크아웃하면(브랜치를 체크아웃 하는 것이 아니라면) “detached HEAD”(떨어져나온 HEAD) 상태가 되며 일부 Git 관련 작업이 브랜치에서 작업하는 것과 다르게 동작할 수 있음

//$ git checkout 2.0.0
//Note: checking out '2.0.0'.

//You are in 'detached HEAD' state. You can look around, make experimental
//changes and commit them, and you can discard any commits you make in this
//state without impacting any branches by performing another checkout.

//If you want to create a new branch to retain commits you create, you may
//do so (now or later) by using -b with the checkout command again. Example:

//  git checkout -b <new-branch>

//HEAD is now at 99ada87... Merge pull request #89 from schacon/appendix-final

//$ git checkout 2.0-beta-0.1
//Previous HEAD position was 99ada87... Merge pull request #89 from schacon/appendix-final
//HEAD is now at df3f601... add atlas.json and cover image

//“detached HEAD”(떨어져나온 HEAD) 상태에서는 작업을 하고 커밋을 만들면, 태그는 그대로 있으나 새로운 커밋이 하나 쌓인 상태가 되고 새 커밋에 도달할 수 있는 방법이 따로 없게 됨. 
//물론 커밋의 해시 값을 정확히 기억하고 있으면 가능하긴 하지만 특정 태그의 상태에서 새로 작성한 커밋이 버그 픽스와 같이 의미있도록 하려면 반드시 브랜치를 만들어서 작업하는 것이 좋음

//$ git checkout -b version2 v2.0.0
//Switched to a new branch 'version2'

//물론 이렇게 브랜치를 만든 후에 version2 브랜치에 커밋하면 브랜치는 업데이트됨. 
//하지만, v2.0.0 태그는 가리키는 커밋이 변하지 않았으므로 두 내용이 가리키는 커밋이 다르다는 것을 알 수 있음


//Git의 기초 - Git Alias 부터 하기