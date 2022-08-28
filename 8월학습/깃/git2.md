Git Aliases

Git은 명령을 부분적으로 입력해도 자동으로 추론하지 않음 
각 Git 명령의 전체 텍스트를 입력하지 않으려면 git config를 사용하여 각 명령에 대한 별칭을 쉽게 설정할 수 있음.

$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status

이렇게 별칭을 사용하면 Git 다른 명령도 자주 사용할 수 있음.

또한 이 기술은 존재해야 한다고 생각하는 명령을 만드는 데 매우 유용할 수 있음. 
예를 들어, 파일 unstaging 시 발생한 사용성 문제를 수정하기 위해 Git에 자신만의 스테이지 별칭을 추가할 수 있음

$ git config --global alias.unstage 'reset HEAD --'

이렇게 하면 다음 두 명령이 동일함.

$ git unstage fileA
$ git reset HEAD -- fileA

다음과 같은 마지막 명령을 추가하는 것이 일반적임.

$ git config --global alias.last 'log -1 HEAD'

이렇게하면 마지막 커밋을 쉽게 볼 수 있음

$ git last
commit 66938dae3329c7aebe598c2246a8e6af90d04646
Author: Josh Goebel <dreamer3@example.com>
Date:   Tue Aug 26 19:48:51 2008 +0800

    Test for current head

    Signed-off-by: Scott Chacon <schacon@example.com>

Git은 단순히 어떤 별칭을 붙이든지 새 명령을 변경함 

Git 하위 명령이 아닌 외부 명령을 실행할 수도 있음 
이 경우 '!' 문자로 명령을 시작함 
이것은 Git 저장소와 함께 작동하는 도구를 직접 작성할 때 유용함. 
gitk을 git visual을 실행시키는 별칭으로 지정하여 시연할 수 있음

$ git config --global alias.visual '!gitk'


Git Branching - Branches in a Nutshell

거의 모든 VCS는 어떤 형태로든 branching을 지원함. 
branching는 주요 개발 라인에서 벗어나 그 주요 라인을 망치지 않고 일을 계속하는 것을 의미함.
많은 VCS 도구에서 이 프로세스는 다소 비용이 많이 들기 때문에 종종 소스 코드 디렉토리의 복사본을 새로 만들어야 하므로 대규모 프로젝트의 경우 시간이 오래 걸릴 수 있음.

일부 사람들은 Git의 분기 모델을 "killer feature"이라고 부르는데, 이는 VCS 커뮤니티에서 Git을 확실히 차별화함. 
Git의 분기 방식은 믿을 수 없을 정도로 가벼워서 분기 작업을 거의 즉각적으로 만들고 일반적으로 branches 간을 빠르게 전환할 수 있음. 
다른 많은 VCS와 달리 Git는 하루에 여러 번 분기 및 병합을 자주 수행하는 워크플로우를 권장함.
이 기능을 이해하고 마스터하면 강력하고 고유한 도구를 얻을 수 있으며 개발 방식을 완전히 바꿀 수 있음.

Branches in a Nutshell

Git이 분기를 수행하는 방식을 진정으로 이해하려면 Git이 데이터를 저장하는 방법을 알아야함
Git은 데이터를 일련의 변경사항 집합이나 차이로 저장하지 않고 스냅샷으로 저장함.

커밋하면 Git은 스테이징한 콘텐츠의 스냅샷에 대한 포인터가 포함된 커밋 객체를 저장함. 
또한 이 객체에는 작성자의 이름 및 email 주소, 입력한 메시지, 그리고 이 커밋 바로 앞에 온 커밋(부모들 또는 부모)에 대한 포인터(최초 커밋에 대한 zero parents, normal 커밋에 대한 one parent, 두 개 이상의 branches가 병합된 커밋에 대한 여러 multiple parents)가 포함됨.

이를 시각화하기 위해 세 개의 파일이 들어 있는 디렉토리가 있다고 가정하고 모두 스테이징하고 커밋함. 
파일을 스테이징하면 각 파일의 체크섬이 계산되고 해당 버전의 파일이 Git 저장소에 저장되며(Git은 이를 blobs이라고 함) 해당 체크섬이 스테이징 영역에 추가됨.

$ git add README test.rb LICENSE
$ git commit -m 'Initial commit'

git commit으로 커밋을 생성하면 Git은 각 하위 디렉토리(이 경우 루트 프로젝트 디렉토리만)를 확인하고 이를 Git 저장소에 트리 객체로 저장함. 
그런 다음 Git은 필요할 때 해당 스냅샷을 다시 생성할 수 있도록 루트 프로젝트 트리에 대한 포인터와 메타데이터가 있는 커밋 개체를 생성함.

Git 저장소에는 이제 세 개의 blobs(각각 세 개의 파일 중 하나의 내용을 나타냄), 디렉터리의 내용을 나열하고 blobs으로 저장할 파일 이름을 지정하는 트리, 루트 트리와 모든 커밋 메타데이터에 대한 포인터를 사용하여 커밋하는 트리 등 다섯 개의 객체가 포함되어 있음.

일부 내용을 변경한 후 다시 커밋하면 다음 커밋에는 바로 전에 나온 커밋에 대한 포인터가 저장됨.

Git의 branch는 단순히 이러한 커밋 중 하나에 대한 가벼운 이동 포인터임. 
Git의 기본 branch 이름은 마스터임. 
커밋을 시작하면 마지막으로 커밋을 가리키는 마스터 branch가 제공됨. 

커밋할 때마다 마스터 branch 포인터가 자동으로 앞으로 이동함.

NOTE : Git의 "마스터" branch은 특별한 branch이 아님. 그것은 다른 branch와 똑같음. 
거의 모든 리포지토리가 하나를 가지고 있는 유일한 이유는 git init 명령이 기본적으로 그것을 만들고 대부분의 사람들이 그것을 변경하려고 하지 않기 때문임.



Creating a New Branch
What happens when you create a new branch? Well, doing so creates a new pointer for you to move around. Let’s say you want to create a new branch called testing. You do this with the git branch command:

새 branch를 만들면 이동할 수 있는 새로운 포인터가 만들어짐. 
테스트라는 새 분기를 생성하기 위해 git branch 명령을 사용하여 수행.

$ git branch testing

이렇게 하면 현재 진행 중인 커밋에 대한 새 포인터가 만들어짐.

Git은 HEAD라고 불리는 특별한 포인터를 유지하면서 현재의 위치를 할 수 있음 
이는 Subversion 또는 CVS와 같은 다른 VCS의 HEAD 개념과는 매우 다름. 
Git에서 이것은 현재 당신이 있는 로컬 branch로의 포인터임. 

branch 포인터가 가리키는 위치를 보여주는 간단한 git log 명령을 실행하면 쉽게 확인할 수 있음. 
--decorate

$ git log --oneline --decorate
036c9c8 (HEAD -> main, origin/main, origin/HEAD) today done
dbdcf9a today done
757a5b0 today done

036c9c8 커밋 옆에서 main과 branch를 확인할 수 있음


Switching Branches
branch로 전환하려면 git checkout 명령을 실행.

$ git checkout testing

$ git log --oneline --decorate
036c9c8 (HEAD -> testing, origin/main, origin/HEAD, main) today done

브랜치를 변경하고 아까 명령어를 사용하면 다음과 같이 변경됨을 확인할 수 있음

브랜치 변경 후 새로운 커밋을 해보면 기존의 main 브랜치는 직전의 커밋을 가르키게 됨

Note : git log는 항상 모든 branches를 보여주지 않음
브랜치를 main으로 이동 후 gitlog를 실행하면 출력에 나타나지 않기 때문에 방금 만든 "테스트" branches가 어디로 갔는지 궁금할 수 있음.
branches는 사라지지 않음. 
Git은 단지 여러분이 그 branches에 관심이 있다는 것을 모르고 여러분이 무엇에 관심이 있다고 생각하는지 보여주려고 함. 
즉, 기본적으로 git 로그는 체크아웃한 branches 아래에 커밋 기록만 표시함.
원하는 분기에 대한 커밋 기록을 표시하려면 명시적으로 지정해야 함. 
git log testing. 모든 분기를 표시하려면 gitlog 명령에 --all을 추가하면 됨.

main 브랜치로 이동하면 HEAD 포인터를 다시 이동하여 main branch를 가리키고 작업 디렉터리의 파일을 main이 가리키는 스냅샷으로 되돌림.
이 시점부터 변경한 내용이 이전 버전의 프로젝트와 다르다는 것을 의미함. 
기본적으로 testing branch에서 수행한 작업을 되감아 다른 방향으로 진행할 수 있음.

Note
branches 전환은 작업 디렉토리의 파일을 변경함.
Git에서 branches를 전환하면 작업 디렉터리의 파일이 변경됨. 
이전 branches로 전환하면 작업 디렉토리가 해당 branches에서 마지막으로 커밋할 때처럼 되돌아감. 

main에서 수정하고 커밋을 하면

Now your project history has diverged (see Divergent history). 
You created and switched to a branch, did some work on it, 
and then switched back to your main branch and did other work. 
Both of those changes are isolated in separate branches: 
you can switch back and forth between the branches and merge them together when you’re ready. 
And you did all that with simple branch, checkout, and commit commands.

이제 프로젝트 기록이 분기됨. 
branch을 만들고 전환한 후 해당 branch에 대한 작업을 수행한 다음 다시 main으로 전환하여 다른 작업을 수행함 
이러한 변경 사항은 모두 별도의 branch로 분리됩니다. branch 간에 앞뒤로 전환하고 준비가 되면 함께 병합할 수 있음. 
간단한 branch, 체크아웃 및 커밋 명령으로 이 모든 작업을 수행함.

You can also see this easily with the git log command. 
If you run git log --oneline --decorate --graph --all it will print out the history of your commits, 
showing where your branch pointers are and how your history has diverged.

git log 명령으로도 쉽게 볼 수 있음.
git log --oneline --decorate --graph --all을 실행하면 커밋의 이력이 출력되어 branch 포인터가 어디에 있고 
이력이 어떻게 나뉘었는지 보여줌.

Git의 브랜치는 실제로 그것이 가리키는 커밋의 40자 SHA-1 체크섬을 포함하는 단순한 파일이기 때문에 브랜치를 만들고 파괴하는 것이 저렴힘
새 branch를 만드는 것은 파일에 41바이트(40자 및 새 줄)를 쓰는 것만큼 빠르고 간단함.
이는 프로젝트의 모든 파일을 두 번째 디렉토리에 복사하는 작업을 수반하는 대부분의 이전 VCS 도구 branch의 방식과 큰 대조를 이룸. 
이 작업은 프로젝트의 크기에 따라 몇 초 또는 몇 분 정도 걸릴 수 있지만, Git에서는 프로세스가 항상 순간적임. 
또한 parents를 기록할 때 적절한 병합 기반을 찾는 것은 자동으로 수행되며 일반적으로 매우 쉬움 
이러한 기능은 개발자가 브런치를 자주 만들고 사용하도록 장려하는 데 도움이 됨.

Note : 새 branch 생성과 동시에 branch 전환
일반적으로 새 branch를 만들고 동시에 해당 branch로 전환하려고 함. 
이 작업은 git checkout -b <new branchname>을 사용하여 한 번의 작업으로 수행할 수 있음.


Note : Git 버전 2.23 이후부터는 git checkout 대신 git switch를 사용하여 다음을 수행할 수 있음.
- 기존 switch(git switch testing-branch)로 전환함.
- 새 switch를 생성하고 git switch -c new-branch로 전환함. -c 플래그는 create를 의미하며 전체 플래그 --create를 사용할 수도 있음.
- 이전에 체크아웃한 switch(git switch -)로 돌아감.
