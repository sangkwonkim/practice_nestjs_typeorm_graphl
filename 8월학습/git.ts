//부트캠프를 수료 이후 개발을 하면서 사용한 깃 명령어는 add, commit, push, pull, clone이 다였습니다.

//다양한 기능들이 있지만 제대로 사용하지 못하는 것 같아 8월 주말동안 열심히 학습해서 제대로 활용할 수 있도록 해보겠습니다.

//학습 자료는 git-scm.com 입니다.

//깃 상태 3가지

//1. Committed: 데이터가 로컬 데이터베이스에 안전하게 저장됐다는 것을 의미

//2. Modified: 수정한 파일을 아직 로컬 데이터베이스에 커밋하지 않은 것

//3. Staged: 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태를 의미


//깃 3가지 단계
//1. Git 디렉토리
//Git이 프로젝트의 메타데이터와 객체 데이터베이스를 저장하는 곳. 
//이 Git 디렉토리가 Git의 핵심이며 다른 컴퓨터에 있는 저장소를 Clone 할 때 Git 디렉토리가 만들어짐

//2. 워킹 트리
//프로젝트의 특정 버전을 Checkout 한 것 
//Git 디렉토리는 지금 작업하는 디스크에 있고 그 디렉토리 안에 압축된 데이터베이스에서 파일을 가져와서 워킹 트리를 만듬

//3. Staging Area
//Git 디렉토리에 있음. 단순한 파일이고 곧 커밋할 파일에 대한 정보를 저장함
//Git에서는 기술용어로는 “Index” 라고 하지만, “Staging Area” 라는 용어를 써도 상관 없음.



//Git으로 하는 일
//워킹 트리에서 파일을 수정

//Staging Area에 파일을 Stage 해서 커밋할 스냅샷을 제작. 모든 파일을 추가할 수도 있고 선택하여 추가할 수도 있음

//Staging Area에 있는 파일들을 커밋해서 Git 디렉토리에 영구적인 스냅샷으로 저장.


//git 설정 => 노트북에서 회사 폴더의 설정은 회사 계정으로 등록할 때 사용했었음
//'git config’라는 도구로 설정 내용을 확인하고 변경할 수 있음. 
//Git은 이 설정에 따라 동작하며 이때 사용하는 설정 파일은 세 가지임

//1. /etc/gitconfig 파일: 시스템의 모든 사용자와 모든 저장소에 적용되는 설정. 
//git config --system 옵션으로 이 파일을 읽고 쓸 수 있음. 이 파일은 시스템 전체 설정파일이기 때문에 수정하려면 시스템의 관리자 권한이 필요함

//2. ~/.gitconfig, ~/.config/git/config 파일: 특정 사용자(즉 현재 사용자)에게만 적용되는 설정. git config --global 옵션으로 이 파일을 읽고 쓸 수 있으며 특정 사용자의 모든 저장소 설정에 적용.

//3. .git/config : 이 파일은 Git 디렉토리에 있고 특정 저장소(혹은 현재 작업 중인 프로젝트)에만 적용. 
//--local 옵션을 사용하면 이 파일을 사용하도록 지정할 수 있지만 기본적으로 이 옵션이 적용되어 있음 (당연히, 이 옵션을 적용하려면 Git 저장소인 디렉토리로 이동 한 후 적용할 수 있다.)

//각 설정은 역순으로 우선시 된다. 그래서 .git/config 가 /etc/gitconfig 보다 우선한다.
//즉, local로 등록한 정보가 우선함

//학습 폴더의 git config 정보
//git config --list
//user.email=sangkwon2406@naver.com
//user.name=sangkwonkim
//core.editor=nano
//core.repositoryformatversion=0
//core.filemode=true
//core.bare=false
//core.logallrefupdates=true
//remote.origin.url=https://github.com/sangkwonkim/practice_nestjs_typeorm_graphl.git
////remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
//branch.main.remote=origin
//branch.main.merge=refs/heads/main


//깃 저장소 만들기
//$ git init
//이 명령은 .git 이라는 하위 디렉토리를 만듬. 
//.git 디렉토리에는 저장소에 필요한 뼈대 파일(Skeleton)이 들어 있지만 이 명령만으로는 아직 프로젝트의 어떤 파일도 관리하지 않음

//Git이 파일을 관리하게 하려면 저장소에 파일을 추가하고 커밋해야 함
//git add 명령으로 파일을 추가하고 git commit 명령으로 커밋해서 파일을 관리할 수 있도록 함

//$ git add *.c
//$ git add LICENSE
//$ git commit -m 'initial project version'


//git clone 을 실행하면 프로젝트 히스토리를 전부 받아옴

//git clone <url> 명령으로 저장소를 Clone 함
//libgit2 라이브러리 소스코드를 Clone 하려면 아래과 같이 실행
//$ git clone https://github.com/libgit2/libgit2

//이 명령은 “libgit2” 라는 디렉토리를 만들고 그 안에 .git 디렉토리를 만듬 
//그리고 저장소의 데이터를 모두 가져와서 자동으로 가장 최신 버전을 Checkout 함 
//libgit2 디렉토리로 이동하면 Checkout으로 생성한 파일을 볼 수 있고 당장 하고자 하는 일을 시작할 수 있음

//다른 이름으로 클론하기
//$ git clone https://github.com/libgit2/libgit2 mylibgit
//mylibgit명의 폴더에 clone됨


//워킹 디렉토리의 모든 파일은 크게 Tracked(관리대상임)와 Untracked(관리대상이 아님)로 나뉨
//먼저, Tracked 파일은 이미 스냅샷에 포함돼 있던 파일로 
//Tracked 파일은 또 Unmodified(수정하지 않음)와 Modified(수정함) 그리고 Staged(커밋으로 저장소에 기록할) 상태 중 하나로 Git이 알고 있는 파일이라는 것이다.

//그리고 나머지 파일은 모두 Untracked 파일로 Untracked 파일은 워킹 디렉토리에 있는 파일 중 스냅샷에도 Staging Area에도 포함되지 않은 파일임

//오늘 학습하며 기록 중인 git.ts의 경우에는 아직 add를 하지 않아서 다음과 같이 상태가 나타남

//현재 브랜치 main
//브랜치가 'origin/main'에 맞게 업데이트된 상태입니다.

//커밋하도록 정하지 않은 변경 사항:
//  (무엇을 커밋할지 바꾸려면 "git add <파일>..."을 사용하십시오)
//  (작업 디렉토리의 변경을 무시하려면 "git restore <file>..."을 사용하시오)
//        수정함:        "8\354\233\224\355\225\231\354\212\265/8\354\233\224\352\263\204\355\232\215.ts"

//추적하지 않는 파일:
//  (커밋할 사항에 포함하려면 "git add <파일>..."을 사용하십시오)
//        "8\354\233\224\355\225\231\354\212\265/git.ts"

//커밋할 변경 사항을 추가하지 않았습니다 ("git add" 및/또는 "git commit -a"를
//사용하십시오)

//add .을 했을 때, tracked 파일로 변경되며 다음과 같이 나타님

//현재 브랜치 main
//브랜치가 'origin/main'에 맞게 업데이트된 상태입니다.

//커밋할 변경 사항:
//  (스테이지에서 제외하려면 "git restore --staged <file>..."을 사용하시오)
//        수정함:        "8\354\233\224\355\225\231\354\212\265/8\354\233\224\352\263\204\355\232\215.ts"
//        새 파일:       "8\354\233\224\355\225\231\354\212\265/git.ts"





//처음 저장소를 Clone 하면 모든 파일은 Checkout 하고 나서 아무것도 수정하지 않았기 때문에 Tracked이면서 Unmodified 상태임

//마지막 커밋 이후 아직 아무것도 수정하지 않은 상태에서 어떤 파일을 수정하면 Git은 그 파일을 Modified 상태로 인식함 
//실제로 커밋을 하기 위해서는 이 수정한 파일을 Staged 상태로 만들고, Staged 상태의 파일을 커밋하며 이런 라이프사이클을 계속 반복됨



//.gitignore 파일을 만들고 그 안에 git이 무시할 파일 패턴을 적음 
//=> 단순히 파일명을 적는 것으로 알고 있었는데, 학습함으로써 패턴에 대해서도 알게되었습니다.

//.gitignore 파일의 예

//$ cat .gitignore
//*.[oa]
//*~

//ignore 설명
//첫번째 라인은 확장자가 “.o” 나 “.a” 인 파일을 Git이 무시하라는 것
//둘째 라인은 ~ 로 끝나는 모든 파일을 무시하라는 것

//보통 대부분의 텍스트 편집기에서 임시파일로 사용하는 파일 이름이기 때문이다. “.o” 와 “.a” 는 각각 빌드 시스템이 만들어내는 오브젝트와 아카이브 파일이고 ~ 로 끝나는 파일은 Emacs나 VI 같은 텍스트 편집기가 임시로 만들어내는 파일이다. 또 log, tmp, pid 같은 디렉토리나, 자동으로 생성하는 문서 같은 것들도 추가할 수 있다. .gitignore 파일은 보통 처음에 만들어 두는 것이 편리하다. 그래서 Git 저장소에 커밋하고 싶지 않은 파일을 실수로 커밋하는 일을 방지할 수 있다.

//.gitignore 파일에 입력하는 패턴 규칙
//1. 아무것도 없는 라인이나, `#`로 시작하는 라인은 무시한다.

//2. 표준 Glob 패턴을 사용한다. 이는 프로젝트 전체에 적용된다.

//3. 슬래시(/)로 시작하면 하위 디렉토리에 적용되지(Recursivity) 않는다.

//4. 디렉토리는 슬래시(/)를 끝에 사용하는 것으로 표현한다.

//5. 느낌표(!)로 시작하는 패턴의 파일은 무시하지 않는다.

//Glob 패턴은 정규표현식을 단순하게 만든 것으로 생각하면 되고 보통 쉘에서 많이 사용한다. 애스터리스크(*)는 문자가 하나도 없거나 하나 이상을 의미하고, [abc] 는 중괄호 안에 있는 문자 중 하나를 의미한다(그러니까 이 경우에는 a, b, c). 물음표(?)는 문자 하나를 말하고, [0-9] 처럼 중괄호 안의 캐릭터 사이에 하이픈(-)을 사용하면 그 캐릭터 사이에 있는 문자 하나를 말한다. 애스터리스크 2개를 사용하여 디렉토리 안의 디렉토리 까지 지정할 수 있다. a/**/z 패턴은 a/z, a/b/z, a/b/c/z 디렉토리에 사용할 수 있다.


//아래는 .gitignore 파일의 예시

//# 확장자가 .a인 파일 무시
//*.a

//# 윗 라인에서 확장자가 .a인 파일은 무시하게 했지만 lib.a는 무시하지 않음
//!lib.a

//# 현재 디렉토리에 있는 TODO파일은 무시하고 subdir/TODO처럼 하위디렉토리에 있는 파일은 무시하지 않음
///TODO

//# build/ 디렉토리에 있는 모든 파일은 무시
//build/

//# doc/notes.txt 파일은 무시하고 doc/server/arch.txt 파일은 무시하지 않음
//doc/*.txt

//# doc 디렉토리 아래의 모든 .pdf 파일을 무시
//doc/**/*.pdf


//git diff 명령어
//어떤 내용이 변경됐는지 확인할 수 있음

//'수정했지만, 아직 Staged 파일이 아닌 것?'과 '어떤 파일이 Staged 상태인지?'를 알아볼 때는 git status를 사용
//더 자세하게 볼 때는 git diff 명령을 사용하는데 Patch처럼 어떤 라인을 추가했고 삭제했는지가 궁금할 때 사용

//git diff
//diff --git "a/8\354\233\224\355\225\231\354\212\265/git.ts" "b/8\354\233\224\355\225\231\354\212\265/git.ts"
//index 4a4677b..5847014 100644
//--- "a/8\354\233\224\355\225\231\354\212\265/git.ts"
//+++ "b/8\354\233\224\355\225\231\354\212\265/git.ts"


//git diff 명령을 실행하면 수정했지만 아직 staged 상태가 아닌 파일을 비교해 볼 수 있음
//이 명령은 워킹 디렉토리에 있는 것과 Staging Area에 있는 것을 비교함. 
//그래서 수정하고 아직 Stage 하지 않은 것을 보여줌

//git diff --staged
//만약 커밋하려고 Staging Area에 넣은 파일의 변경 부분 확인 가능
//이 명령은 저장소에 커밋한 것과 Staging Area에 있는 것을 비교

//git diff 명령은 마지막으로 커밋한 후에 수정한 것들 전부를 보여주지 않음! 
//git diff 는 Unstaged 상태인 것들만 보여줌 수정한 파일을 모두 Staging Area에 넣었다면 git diff 명령은 아무것도 출력하지 않음(git add하기 전에는 수정한 부분을 확인 가능함)



//git commit 에 -v 옵션을 추가하면 편집기에 diff 메시지도 추가할 수 있음

//git commit 명령을 실행할 때 -a 옵션을 추가하면 Git은 Tracked 상태의 파일을 자동으로 Staging Area에 넣어줌.

//Staging Area는 커밋할 파일을 정리한다는 점에서 매우 유용하지만 복잡하기만 하고 필요하지 않은 때도 있다. 아주 쉽게 Staging Area를 생략할 수 있으며 git add 명령을 실행하지 않을 수 있음



//Git에서 파일을 제거하려면 git rm 명령으로 Tracked 상태의 파일을 삭제한 후에(정확하게는 Staging Area에서 삭제하는 것) 커밋해야 함. 

//이 명령은 워킹 디렉토리에 있는 파일도 삭제하기 때문에 실제로 파일도 지워짐

//Git 명령을 사용하지 않고 단순히 워킹 디렉터리에서 파일을 삭제하고 git status 명령으로 상태를 확인하면 Git은 현재 “Changes not staged for commit” (즉, Unstaged 상태)라고 표시함

//그리고 git rm 명령을 실행하면 삭제한 파일은 Staged 상태가 됨.

//커밋하면 파일은 삭제되고 Git은 이 파일을 더는 추적하지 않음. 

//이미 파일을 수정했거나 Staging Area에(역주 - Git Index라고도 부른다) 추가했다면 -f 옵션을 주어 강제로 삭제해야 함. 이 점은 실수로 데이터를 삭제하지 못하도록 하는 안전장치로 커밋 하지 않고 수정한 데이터는 Git으로 복구할 수 없기 때문임.

//또 Staging Area에서만 제거하고 워킹 디렉토리에 있는 파일은 지우지 않고 남겨둘 수 있음
//다시 말해서 하드디스크에 있는 파일은 그대로 두고 Git만 추적하지 않게 하는 명령어는 --cached

//.gitignore 파일에 추가하는 것을 빼먹었거나 대용량 로그 파일이나 컴파일된 파일인 .a 파일 같은 것을 실수로 추가했을 때 사용

//$ git rm --cached README


//파일 이름을 변경 명령어
//$ git mv file_from file_to

//$ git mv README.md README
//$ git status
//On branch master
//Your branch is up-to-date with 'origin/master'.
//Changes to be committed:
//  (use "git reset HEAD <file>..." to unstage)

//    renamed:    README.md -> README
    
//사실 git mv 명령은 아래 명령어를 수행한 것과 완전 동일함.

//$ mv README.md README
//$ git rm README.md
//$ git add README

//git mv 명령은 일종의 단축 명령어로 이 명령으로 파일 이름을 바꿔도 되고 mv 명령으로 파일 이름을 직접 바꿔도 됨. 
//단지 git mv 명령은 편리하게 명령을 세 번 실행해주는 것 뿐으로, 어떤 도구로 이름을 바꿔도 상관없음. 중요한 것은 이름을 변경하고 나서 꼭 rm/add 명령을 실행해야 한다는 것임.

커밋 히스토리부터 시작하기