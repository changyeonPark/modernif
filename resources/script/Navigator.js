(function () {
    const footer = document.querySelector(".footer");


    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', "include/Footer.html", false);  // 비동기가 아닌 동기 통신 (AJAX 실행 다 끝나고 다음 코드로 넘어감)

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                footer.innerHTML = this.responseText;
            } else {
                footer.innerHTML = '불러오기 실패';
            }
        }
    };

    xhttp.send();

})();


(function () {
    const navigator = document.querySelector(".navigator");


    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', "include/Navigator.html", false);  // 비동기가 아닌 동기 통신 (AJAX 실행 다 끝나고 다음 코드로 넘어감)

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                navigator.innerHTML = this.responseText;
            } else {
                navigator.innerHTML = '불러오기 실패';
            }
        }
    };

    xhttp.send();

})();


(function () {
    const modal = document.querySelector(".modal");


    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', "include/Modal.html", false);  // 비동기가 아닌 동기 통신 (AJAX 실행 다 끝나고 다음 코드로 넘어감)

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                modal.innerHTML = this.responseText;
            } else {
                modal.innerHTML = '불러오기 실패';
            }
        }
    };

    xhttp.send();

})();

const loginBtn = document.querySelector("#loginBtn")
const signUpBtn = document.querySelector("#signUpBtn")

/* 모달 */
const myPageBtn = document.querySelector("#myPage")
const modalInputId = document.querySelector("#modal_id")
const modalInputNm = document.querySelector("#modal_nm")
const modalInputMail = document.querySelector("#modal_mail")
const modalModify = document.querySelector(".modal_modify")
const modalClose = document.querySelector(".modal_close")
const phoneNum = document.getElementsByName("phone[]")
const phone1 = document.querySelector("#phone1")
const phone2 = document.querySelector("#phone2")
const phone3 = document.querySelector("#phone3")
const postCode = document.querySelector("#postcode")
const roadAddress = document.querySelector("#roadAddress")
const detailAddress = document.querySelector("#detailAddress")
const extraAddress = document.querySelector("#extraAddress")


modalModify.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users"))
    let loginUser = JSON.parse(sessionStorage.getItem("loginInfo"))

    for (let i = 0; i < users.length; i++) {
        if (loginUser[0].loginId === users[i].userId){
            users[i].userMail = modalInputMail.value
            users[i].postCode = postCode.value
            users[i].roadAddr = roadAddress.value
            users[i].roadAddr = roadAddress.value
            users[i].detailAddr = detailAddress.value
            users[i].extraAddr = extraAddress.value

            let userPhoneNum = [];
            phoneNum.forEach( (el) => {
                userPhoneNum.push(el.value)
            })
            users[i].userPhone = userPhoneNum

        }
    }

    localStorage.setItem("users", JSON.stringify(users))

    alert("수정 성공")

    const modal = document.querySelector(".modal");

    modal.style.display = "none";

})

modalClose.addEventListener("click", () => {

    const modal = document.querySelector(".modal");

    modal.style.display = "none";
})


loginBtn.addEventListener("click", () => {
    location.href = "include/LoginView.html"
})

signUpBtn.addEventListener("click", () => {
    location.href = "include/SignUpView.html"
})

let loginCheck = JSON.parse(sessionStorage.getItem("loginInfo"))
if (loginCheck[0].loginState) {

    loginBtn.style.display = "none"
    signUpBtn.style.display = "none"
    myPageBtn.style.display = "inline-block"
    myPageBtn.style.position = "relative"

    if (loginCheck[0].loginId === 'admin'){
        myPageBtn.innerHTML = `${loginCheck[0].userName}님<div class="dropdown-content"><a href="#" id="cartBtn">CART  <img src="https://modernif.co.kr/web/upload/top_ico4.png"></a><a href="#" id="myProfile">My Profile</a><a href="#" id="productBtn">상품 관리</a><a href="#" id="logoutBtn">로그아웃</a></div>`
    } else {
        myPageBtn.innerHTML = `${loginCheck[0].userName}님<div class="dropdown-content"><a href="#" id="myProfile">My Profile</a><a href="#" id="logoutBtn">로그아웃</a></div>`
    }


}


document.querySelector("#myProfile").addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    const users = JSON.parse(localStorage.getItem("users"))
    const loginUser = JSON.parse(sessionStorage.getItem("loginInfo"))

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === loginUser[0].loginId) {
            modalInputId.value = users[i].userId
            modalInputNm.value = users[i].userName
            modalInputMail.value = users[i].userMail
            phone2.value = users[i].userPhone[1]
            phone3.value = users[i].userPhone[2]
            postCode.value = users[i].postCode
            roadAddress.value = users[i].roadAddr
            detailAddress.value = users[i].detailAddr
            extraAddress.value = users[i].extraAddr
            for (let j = 0; j < phone1.length; j++) {
                if (users[i].userPhone[0] === phone1.options[j].value) {
                    phone1.options.selectedIndex = j
                }
            }
        }
    }

    modal.style.display = "flex";
})

document.querySelector("#logoutBtn").addEventListener("click", () => {
    loginCheck[0].loginState = false;

    sessionStorage.setItem("loginInfo", JSON.stringify(loginCheck));

    location.href = "index.html"
})

document.querySelector("#productBtn").addEventListener("click", () => {
    location.href = "ProductListView.html"
})

document.querySelector("#cartBtn").addEventListener("click", () => {
    location.href = "Cart.html"
})