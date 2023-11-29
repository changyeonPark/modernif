document.querySelector("#writeBtn").addEventListener("click", () => {
    location.href = "QnAWriteView.html"
})


/* localStorage에서 게시글 테이블로 받아오는 중 */
const tableBody = document.querySelector(".table-body")


registBoard()

function addBoardContent(boards, i) {
    const newTr = document.createElement("tr")
    const newBoardNoTd = document.createElement("td")
    const newBoardTitleTd = document.createElement("td")
    const newBoardTitleA = document.createElement("a")
    const newBoardWriterTd = document.createElement("td")
    const newBoardDateTd = document.createElement("td")
    newBoardTitleTd.appendChild(newBoardTitleA)

    newBoardTitleA.setAttribute("href", "#")
    newBoardTitleA.setAttribute("name", "boardTitleEla")

    newBoardNoTd.textContent = boards[i].boardNo
    newBoardTitleA.textContent = boards[i].boardTitle
    newBoardWriterTd.textContent = boards[i].boardWriter
    newBoardDateTd.textContent = boards[i].boardDate


    newTr.append(newBoardNoTd, newBoardTitleTd, newBoardWriterTd, newBoardDateTd)


    tableBody.appendChild(newTr)

    const boardTitleEla = document.querySelectorAll("a[name=boardTitleEla]")
    let boardDetailNo = 0
    boardTitleEla.forEach(el => {
        el.addEventListener("click", () => {

            const parentEl = el.parentElement.previousElementSibling.textContent

            boardDetailNo = parentEl
            console.log(boardDetailNo)

            sessionStorage.setItem("boardDetailNo", boardDetailNo)
            location.href = "BoardDetailView.html"
            return
        })
    })
}

function registBoard() {

    const boards = JSON.parse(localStorage.getItem("boards"))

    for (let i = 0; i < boards.length; i++) {
        if (boards[i].boardDelYn === "N") {
            addBoardContent(boards, i);
        }
    }
}

const searchBtn = document.querySelector("#searchBtn")      /* 게시글 검색 버튼 */
const options = document.querySelectorAll("option")       /* 게시글 상세 검색 */
const searchInput = document.querySelector("#boardSearch")  /* 게시글 검색 인풋태그 */

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const boards = JSON.parse(localStorage.getItem("boards"))

    for (let i = tableBody.children.length; i > 0; i--) {
        tableBody.childNodes[i].remove()
    }

    let optionVal = ""
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            optionVal = options[i].value
        }
    }

    if (optionVal === "title") {
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].boardTitle.includes(searchInput.value)) {
                addBoardContent(boards, i);
            }
        }
    } else if (optionVal === "content") {
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].boardContent.includes(searchInput.value)) {
                addBoardContent(boards, i);
            }
        }
    } else {
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].boardWriter.includes(searchInput.value)) {
                addBoardContent(boards, i);
            }
        }
    }
})

const resetBtn = document.querySelector("#resetBtn")

resetBtn.addEventListener("click", () => {
    for (let i = tableBody.children.length; i > 0; i--) {
        tableBody.childNodes[i].remove()
    }
    registBoard()
    searchInput.value = ""
})
