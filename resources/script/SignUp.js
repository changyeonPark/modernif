const signUpBtn = document.querySelector("#signUpBtn") /* 가입하기 버튼 */
const inputId = document.querySelector("#userId")
const inputPw = document.querySelector("#userPw")
const inputRwPw = document.querySelector("#userRePw")
const inputName = document.querySelector("#userName")
const roadAddr = document.querySelector("#roadAddress")
const detailAddr = document.querySelector("#detailAddress")
const postCode = document.querySelector("#postcode")
const extraAddr = document.querySelector("#extraAddress")
const phoneNum = document.getElementsByName("phone[]")
const inputMail = document.querySelector("#userEmail")

// 아이디 정규 표현식
const idCheck = /^[a-z0-9]{4,16}$/;

// 메일 형식 정규 표현식
const mailCheck = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

let idFlag = true
let pwFlag = true
let rePwFlag = true
let mailFlag = true

// 아이디 조건 체크
inputId.addEventListener("keyup", () => {

    if (!idCheck.exec(inputId.value)){
        document.querySelector(".userIdDiv > p").style.color = "red";
        idFlag = false
    } else {
        idFlag = true
        document.querySelector(".userIdDiv > p").style.color = "#999";
    }
})

// 비밀번호 조건 체크
inputPw.addEventListener("keyup", () => {
    if (!idCheck.exec(inputPw.value)){
        document.querySelector(".userMailDiv > p").style.color = "red";
        mailFlag = false
    } else {
        document.querySelector(".userMailDiv > p").style.color = "#999";
        mailFlag = true
    }
})

// 비밀번호 재입력 조건체크
inputRwPw.addEventListener("keyup", () => {
    if (inputPw.value === inputRwPw.value){
        document.querySelector(".userPwReDiv > p").textContent = "영문 소문자/숫자, 4-16자";
        document.querySelector(".userPwReDiv > p").style.color = "#999";
        rePwFlag = true
    } else {
        document.querySelector(".userPwReDiv > p").textContent = "비밀번호가 일치하지 않습니다.";
        document.querySelector(".userPwReDiv > p").style.color = "red";
        rePwFlag = false
    }
})

/* 우편 번호 클릭시 주소 검색 창 */


// 이메일 조건 체크
inputMail.addEventListener("keyup", () => {
    if (!mailCheck.exec(inputMail.value)){
        document.querySelector(".userMailDiv > p").style.display = "block";
        document.querySelector(".userMailDiv > p").style.color = "red";
        pwFlag = false
    } else {
        document.querySelector(".userMailDiv > p").style.display = "none";
        document.querySelector(".userMailDiv > p").style.color = "#999";
        pwFlag = true
    }
})

let userPhoneNum = [];


/* 최종 submit */
signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // 아이디 체크
    if (idFlag === false || inputId.value === ""){
        inputId.focus()
        return
    }

    // 비밀번호 체크
    if (pwFlag === false || inputPw.value === ""){
        inputPw.focus()
        return
    }

    // 비밀번호 재입력 조건 체크
    if (rePwFlag === false || inputRwPw.value === ""){
        inputRwPw.focus()
        return
    }

    if (inputName.value === ""){
        document.querySelector(".userNameDiv > p").style.display = "block"
        inputName.focus()
        return
    }

    if (inputMail.value === "" || mailFlag === false){
        inputMail.focus()
        return
    }

    if (phoneNum[1].value.length < 3){
        phoneNum[1].focus()
        return
    }

    if (phoneNum[2].value.length < 4){
        phoneNum[2].focus()
        return
    }

    phoneNum.forEach( (el) => {
        userPhoneNum.push(el.value)
    })

    registUser()

    location.href = "LoginView.html"

})

function registUser(){

    let users = JSON.parse(localStorage.getItem("users")) || []
    users.push({"userId": inputId.value, "password": inputPw.value, "userName": inputName.value, "roadAddr": roadAddr.value, "detailAddr": detailAddr.value, "userPhone": userPhoneNum, "userMail": inputMail.value, "postCode": postCode.value, "extraAddr": extraAddr.value})

    localStorage.setItem("users", JSON.stringify(users))
}