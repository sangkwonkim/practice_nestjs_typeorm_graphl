커밋 히스토리 조회하기

Git에서 히스토리를 조회하는 명령어 git log

commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Fri Aug 12 09:08:23 2022 +0900

    today done

commit 541945279ee4824b232db2f21ad5517302a49d44
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Thu Aug 11 17:13:02 2022 +0900

    today done

commit 35a024a6925e16fdce0f59fe329fae106c7160db
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Thu Aug 11 13:02:14 2022 +0900

특별한 아규먼트 없이 git log 명령을 실행하면 저장소의 커밋 히스토리를 최신순부터 보여줌

각 커밋의 SHA-1 체크섬, 저자 이름, 저자 이메일, 커밋한 날짜, 커밋 메시지를 보여줌

-p 는 각 커밋의 diff 결과를 보여줌 
-2는 최근 두 개의 결과만 보여주는 옵션


git log -p -2
commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Fri Aug 12 09:08:23 2022 +0900

    today done

diff --git "a/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts" "b/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts"
new file mode 100644
index 0000000..0d066ec
--- /dev/null
+++ "b/8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts"
@@ -0,0 +1,185 @@
+// Custom repositories
+// 데이터베이스 작업을 포함한 레포지토리를 커스텀할 수 있음. 

이처럼 diff 결과를 나타냄 => 이를 통해서 동료가 무엇을 커밋했는 지 리뷰하고 빨리 조회할 수 있음


--stat 옵션으로 각 커밋의 통계 정보를 조회할 수 있음

git log --stat -2
commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Fri Aug 12 09:08:23 2022 +0900

    today done

 "8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/\355\203\200\354\236\205orm10.ts" | 185 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 185 insertions(+)

commit 541945279ee4824b232db2f21ad5517302a49d44
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Date:   Thu Aug 11 17:13:02 2022 +0900

    today done

 "8\354\233\224\355\225\231\354\212\265/8\354\233\224\352\263\204\355\232\215.ts"                                                                 | 9 ++++++---
 "8\354\233\224\355\225\231\354\212\265/\355\203\200\354\236\205orm/Math.random().ts" => "8\354\233\224\355\225\231\354\212\265/Math.random().ts" | 0
 2 files changed, 6 insertions(+), 3 deletions(-)


 --stat 옵션은 어떤 파일이 수정됐는지, 
 얼마나 많은 파일이 변경됐는지, 또 얼마나 많은 라인을 추가하거나 삭제했는지 보여줌
 요약정보는 가장 뒤쪽에 보여줌


 -pretty 옵션을 통해 히스토리 내용을 보여줄 때 기본 형식 이외에 여러 가지 중에 하나를 선택할 수 있음
 oneline 옵션은 각 커밋을 한 라인으로 보여주며 이 옵션은 많은 커밋을 한 번에 조회할 때 유용함 
 추가로 short, full, fuller 옵션도 있는데 이것은 정보를 조금씩 가감해서 보여줌

 git log --pretty=oneline
 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD) today done
 541945279ee4824b232db2f21ad5517302a49d44 today done
 35a024a6925e16fdce0f59fe329fae106c7160db today done
 3add544a269857b2a65947219ed0904007f0b64f today done

 git log --pretty=short
commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author: SANGGWONGIM <sangkwon2212@gmail.com>

today done

commit 541945279ee4824b232db2f21ad5517302a49d44
Author: SANGGWONGIM <sangkwon2212@gmail.com>

today done


git log --pretty=full
commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author: SANGGWONGIM <sangkwon2212@gmail.com>
Commit: SANGGWONGIM <sangkwon2212@gmail.com>

today done


git log --pretty=fuller
commit 5f6da621e70846fb56698b55400f0b8f1a08623a (HEAD -> main, origin/main, origin/HEAD)
Author:     SANGGWONGIM <sangkwon2212@gmail.com>
AuthorDate: Fri Aug 12 09:08:23 2022 +0900
Commit:     SANGGWONGIM <sangkwon2212@gmail.com>
CommitDate: Fri Aug 12 09:08:23 2022 +0900

today done



format 옵션은 나만의 포맷으로 결과를 출력하고 싶을 때 사용함.
특히 결과를 다른 프로그램으로 파싱하고자 할 때 유용하며 이 옵션을 사용하면 포맷을 정확하게 일치시킬 수 있기 때문에 Git을 새 버전으로 바꿔도 결과 포맷이 바뀌지 않음

git log --pretty=format 에 쓸 몇가지 유용한 옵션
%H 커밋 해시 
%h 짧은 길이 커밋 해시 
%T 트리 해시 
%t 짧은 길이 트리 해시 
%P 부모 해시 
%p 짧은 길이 부모 해시 
%an 저자 이름 
%ae 저자 메일 
%ad 저자 시각 (형식은 --date=옵션 참고) 
%ar 저자 상대적 시각 
%cn 커미터 이름 
%ce 커미터 메일 
%cd 커미터 시각 
%cr 커미터 상대적 시각 
%s 요약 


저자(Author) 와 커미터(Committer)
저자는 원래 작업을 수행한 원작자이고 
커밋터는 마지막으로 이 작업을 적용한(저장소에 포함시킨) 사람임.
만약 당신이 어떤 프로젝트에 패치를 보냈고 그 프로젝트의 담당자가 패치를 적용했다면 두 명의 정보를 모두 알 필요가 있음
그래서 이 경우 당신이 저자고 그 담당자가 커미터다.


oneline 옵션과 format 옵션은 --graph 옵션과 함께 사용할 때 유용함
이 명령은 브랜치와 머지 히스토리를 보여주는 아스키 그래프를 출력함

$ git log --pretty=format:"%h %s" --graph
* 2d3acf9 ignore errors from SIGCHLD on trap
*  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
|\
| * 420eac9 Added a method for getting the current branch.
* | 30e367c timeout code and tests
* | 5a09431 add timeout protection to grit
* | e1193f8 support for heads with slashes in them
|/
* d6016bc require time for xmlschema
*  11d191e Merge branch 'defunkt' into local


git log 주요 옵션
-p
각 커밋에 적용된 패치를 보여준다.

--stat
각 커밋에서 수정된 파일의 통계정보를 보여준다.

--shortstat
--stat 명령의 결과 중에서 수정한 파일, 추가된 라인, 삭제된 라인만 보여준다.

--name-only
커밋 정보중에서 수정된 파일의 목록만 보여준다.

--name-status
수정된 파일의 목록을 보여줄 뿐만 아니라 파일을 추가한 것인지, 수정한 것인지, 삭제한 것인지도 보여준다.

--abbrev-commit
40자 짜리 SHA-1 체크섬을 전부 보여주는 것이 아니라 처음 몇 자만 보여준다.

--relative-date
정확한 시간을 보여주는 것이 아니라 “2 weeks ago” 처럼 상대적인 형식으로 보여준다.

--graph
브랜치와 머지 히스토리 정보까지 아스키 그래프로 보여준다.

--pretty
지정한 형식으로 보여준다. 이 옵션에는 oneline, short, full, fuller, format이 있다. format은 원하는 형식으로 출력하고자 할 때 사용한다.

--oneline
--pretty=oneline --abbrev-commit 두 옵션을 함께 사용한 것과 같다.


조회 제한조건
git log 명령은 조회 범위를 제한하는 옵션
히스토리 전부가 아니라 부분만 조회. 
앞 서 사용했던 -2 옵션의 실제 사용법은 -<n>으로 최근 n개의 커밋을 나타내줌

--since 나 --until 같은 시간을 기준으로 조회하는 옵션도 있음

지난 2주 동안 만들어진 커밋들만 조회하는 명령
$ git log --since=2.weeks

이 옵션은 다양한 형식을 지원함
"2008-01-15" 같이 정확한 날짜도 사용할 수 있고 "2 years 1 day 3 minutes ago" 같이 상대적인 기간을 사용할 수도 있음
$ git log --since=2.weeks

--author 옵션으로 저자를 지정하여 검색할 수도 있고 --grep 옵션으로 커밋 메시지에서 키워드를 검색할 수도 있음

노트
--author`와 `--grep 옵션을 함께 사용하여 모두 만족하는 커밋을 찾으려면 --all-match 옵션도 반드시 함께 사용해야 한다.


-S 옵션이 있는데 이 옵션은 코드에서 추가되거나 제거된 내용 중에 특정 텍스트가 포함되어 있는지를 검색함. 
예를 들어 어떤 함수가 추가되거나 제거된 커밋만을 찾아보려면 아래와 같은 명령을 사용
$ git log -S function_name


디렉토리나 파일 이름을 사용하여 그 파일이 변경된 log의 결과를 검색할 수 있음 
이 옵션은 -- 와 함께 경로 이름을 사용하는데 명령어 끝 부분에 사용(git log —path1 path2).


git log 조회 범위를 제한하는 옵션

-(n)
최근 n 개의 커밋만 조회한다.

--since, --after
명시한 날짜 이후의 커밋만 검색한다.

--until, --before
명시한 날짜 이전의 커밋만 조회한다.

--author
입력한 저자의 커밋만 보여준다.

--committer
입력한 커미터의 커밋만 보여준다.

--grep
커밋 메시지 안의 텍스트를 검색한다.

-S
커밋 변경(추가/삭제) 내용 안의 텍스트를 검색한다.

Merge 커밋을 제외한 순수한 커밋을 확인해보는 명령
Junio Hamano가 2008년 10월에 Git 소스코드 저장소에서 테스트 파일을 수정한 커밋들을 볼 수 있음

$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/

머지 커밋 표시하지 않기
--no-merges 옵션을 사용하면 검색 결과에서 머지 커밋을 표시하지 않도록 할 수 있음


되돌리기

되돌리기(undo) 할 경우, 다시 복구할 수 없기에 주의해야 함

완료한 커밋을 수정하기
너무 일찍 커밋했거나 어떤 파일을 빼먹었을 때 그리고 커밋 메시지를 잘못 적었을 때 사용할 수 있음
다시 커밋하고 싶으면 파일 수정 작업을 하고 Staging Area에 추가한 다음 --amend 옵션을 사용하여 커밋을 재작성 할 수 있음

$ git commit --amend

이 명령어는 staging Area를 사용하여 커밋함
만약 마지막으로 커밋하고 나서 수정한 것이 없다면(커밋하자마자 바로 이 명령을 실행하는 경우) 조금 전에 한 커밋과 모든 것이 같음 이때는 커밋 메시지만 수정함

편집기가 실행되면 이전 커밋 메시지가 자동으로 포함되며 메시지를 수정하지 않고 그대로 커밋해도 기존의 커밋을 덮어씀.

커밋을 했는데 Stage 하는 것을 깜빡하고 빠트린 파일이 있으면 아래와 같이 고칠 수 있음

$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend

여기서 실행한 명령어 3개는 모두 커밋 한 개로 기록된다. 두 번째 커밋은 첫 번째 커밋을 덮어씀

이렇게 --amend 옵션으로 커밋을 고치는 작업은, 추가로 작업한 일이 작다고 하더라도 이전의 커밋을 완전히 새로 고쳐서 새 커밋으로 변경하는 것을 의미함. 이전의 커밋은 일어나지 않은 일이 되는 것이고 당연히 히스토리에도 남지 않음

--amend 옵션으로 커밋을 고치는 작업이 주는 장점은 마지막 커밋 작업에서 아주 살짝 뭔가 빠뜨린 것을 넣거나 변경하는 것을 새 커밋으로 분리하지 않고 하나의 커밋에서 처리하는 것임. “앗차, 빠진 파일 넣었음”, “이전 커밋에서 오타 살짝 고침” 등의 커밋을 만들지 않겠다는 말임.

amend 테스트2