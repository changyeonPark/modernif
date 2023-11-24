/*
* 게시글 작성 페이지 들어왔을 때 로그인 상태 확인
* true 글 작성 페이지
* false 로그인 페이지
* */
window.addEventListener("DOMContentLoaded", () => {
    if(sessionStorage.getItem("loginInfo") === null){
        alert("게시글 작성은 로그인 후 이용해 주세요.")
        location.href = "../../include/LoginView.html"
    }
})

const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))       /* 로그인 정보 */
const listBtn = document.querySelector("#listBtn")                  /* LIST버튼 태크 */
const writeBtn = document.querySelector("#writeBtn")                /* WRITE버튼 태그 */

/* 게시글 작성 데이터 */
const boardTitle = document.querySelector("#boardTitle")            /* 게시글 제목 태그 */
const boardWriter = document.querySelector("#boardWriter")          /* 작성자 인풋태그 */
const boardContent = document.querySelector("#boardContent")        /* 게시글 내용 태그 */
/* 작성 일자 데이터 */
const nowDate = new Date();
const boardDate = `${nowDate.getFullYear()}-${("0"+nowDate.getMonth()).slice(-2)}-${("0"+nowDate.getDate()).slice(-2)} `
    + `${("0"+nowDate.getHours()).slice(-2)}:${("0"+nowDate.getMinutes()).slice(-2)}:${("0"+nowDate.getSeconds()).slice(-2)}`

boardWriter.value = loginInfo[0].userName

/* LIST 버튼 클릭 이벤트 */
listBtn.addEventListener("click", () => {
    console.log(history.back())
})

/* WIRTE 버튼 클릭 이벤트 */
writeBtn.addEventListener("click", () => {
    if (boardTitle.value === ""){
        boardTitle.focus()
        return
    }

    alert("게시글 작성 성공")
    registBoard()

    location.href = "Community.html"

})

function registBoard(){

    /* localStorage board 담을 그릇 */
    let boards = JSON.parse(localStorage.getItem("boards")) || []
    let users = JSON.parse(localStorage.getItem("users"))
    let userId = ""

    for (let i = 0; i < users.length; i++) {
        if (users[i].userName === boardWriter.value){
            userId = users[i].userId
        }
    }

    boards.push( {"boardNo": boards.length+1, "boardTitle": boardTitle.value, "userId": userId, "boardWriter": boardWriter.value, "boardContent": boardContent.value, "boardDate": boardDate, "boardHit": 0} )

    localStorage.setItem("boards", JSON.stringify(boards))
}

