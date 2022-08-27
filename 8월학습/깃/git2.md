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

Git Branching => Creating a New Branch부터 하기


