// remote: Repository not found.
// fatal: repository 'https://github.com/username/repositoryName.git/' not found 

// 월요일에 출근해서 dev 브랜치 Pull 과정에서 에러가 발생했습니다.
// 레포 낫 파운드의 경우 pull 시에는 -f 하는 방법, clone 시에는 유저명@레포주소 등 다양한 방법이 있지만
// 저의 경우에는

// git remote remove origin
// git remote add origin https://유저명@github.com/유저명/레포명.git
// git remote set-url origin https://유저명@github.com/유저명/레포명.git

// 이처럼 git repo origin을 삭제하고 다시 등록함으로써 해결할 수 있었습니다.