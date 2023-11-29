const registerBtn = document.querySelector("#registerProd")

registerBtn.addEventListener("click", (e) => {
    location.href = "ProductRegistView.html"
})

const product = JSON.parse(localStorage.getItem("product"))

for (let i = 0; i < product.length; i++) {
    const prodNo = product[i].prodNo
    const prodName = product[i].prodName
    const prodPrice = product[i].prodPrice
    const prodCategory = product[i].prodCategory
    const mainImgUrl = product[i].mainImgUrl
    const prodSize = product[i].prodSize /* 2중 배열임 */
    const detailImgUrl = product[i].detailImgUrl /* 배열임 */
    const prodDelYn = product[i].prodDelYn

    const table = document.querySelector(".table-body")

    const trEl = document.createElement("tr")

    /* 1번컬럼 상품 체크 */
    const checkboxTdEl = document.createElement("td")
    const checkboxInputEl = document.createElement("input")
    checkboxInputEl.setAttribute("type", "checkbox")
    checkboxInputEl.setAttribute("name", "prodCheck")
    checkboxTdEl.appendChild(checkboxInputEl)

    /* 2번 컬럼 상품 번호 */
    const noTdEl = document.createElement("td")
    noTdEl.textContent = prodNo

    /* 3번 컬럼 상품 이름 */
    const nameTdEl = document.createElement("td")
    const prodNameAEl = document.createElement("a")
    prodNameAEl.setAttribute("href", "#")
    prodNameAEl.textContent = prodName
    nameTdEl.appendChild(prodNameAEl)

    /* 4번 컬럼 상품 카테고리 */
    const categoryTdEl = document.createElement("td")
    categoryTdEl.textContent = prodCategory

    /* 5번 컬럼 상품 가격 */
    const priceTdEl = document.createElement("td")
    priceTdEl.textContent = prodPrice+"원"

    /* 6번 컬럼 상품 등록 여부 */
    const prodDelYnEl = document.createElement("td")
    prodDelYnEl.textContent = prodDelYn

    trEl.append(checkboxTdEl, noTdEl, nameTdEl, categoryTdEl, priceTdEl, prodDelYnEl)

    table.appendChild(trEl)

}

function addProductContent(product, i) {
    const prodNo = product[i].prodNo
    const prodName = product[i].prodName
    const prodPrice = product[i].prodPrice
    const prodCategory = product[i].prodCategory
    const mainImgUrl = product[i].mainImgUrl
    const prodSize = product[i].prodSize /* 2중 배열임 */
    const detailImgUrl = product[i].detailImgUrl /* 배열임 */
    const prodDelYn = product[i].prodDelYn

    const table = document.querySelector(".table-body")

    const trEl = document.createElement("tr")

    /* 1번컬럼 상품 체크 */
    const checkboxTdEl = document.createElement("td")
    const checkboxInputEl = document.createElement("input")
    checkboxInputEl.setAttribute("type", "checkbox")
    checkboxInputEl.setAttribute("name", "prodCheck")
    checkboxTdEl.appendChild(checkboxInputEl)

    /* 2번 컬럼 상품 번호 */
    const noTdEl = document.createElement("td")
    noTdEl.textContent = prodNo

    /* 3번 컬럼 상품 이름 */
    const nameTdEl = document.createElement("td")
    const prodNameAEl = document.createElement("a")
    prodNameAEl.setAttribute("href", "#")
    prodNameAEl.textContent = prodName
    nameTdEl.appendChild(prodNameAEl)

    /* 4번 컬럼 상품 카테고리 */
    const categoryTdEl = document.createElement("td")
    categoryTdEl.textContent = prodCategory

    /* 5번 컬럼 상품 가격 */
    const priceTdEl = document.createElement("td")
    priceTdEl.textContent = prodPrice+"원"

    /* 6번 컬럼 상품 등록 여부 */
    const prodDelYnEl = document.createElement("td")
    prodDelYnEl.textContent = prodDelYn

    trEl.append(checkboxTdEl, noTdEl, nameTdEl, categoryTdEl, priceTdEl, prodDelYnEl)

    table.appendChild(trEl)
}

const searchBtn = document.querySelector("#searchBtn")      /* 게시글 검색 버튼 */
const options = document.querySelectorAll("option")       /* 게시글 상세 검색 */
const searchInput = document.querySelector("#prodSearch")  /* 게시글 검색 인풋태그 */
const tableBody = document.querySelector(".table-body")

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const product = JSON.parse(localStorage.getItem("product"))

    for (let i = tableBody.children.length; i > 0; i--) {
        tableBody.childNodes[i].remove()
    }

    let optionVal = ""
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            optionVal = options[i].value
        }
    }

    if (optionVal === "prodNo") {
        for (let i = 0; i < product.length; i++) {
            if (product[i].prodNo === parseInt(searchInput.value)) {
                addProductContent(product, i);
            }
        }
    } else if (optionVal === "prodName") {
        for (let i = 0; i < product.length; i++) {
            if (product[i].prodName.includes(searchInput.value)) {
                addProductContent(product, i);
            }
        }
    } else {
        for (let i = 0; i < product.length; i++) {
            if (product[i].prodCategory.includes(searchInput.value)) {
                addProductContent(product, i);
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

const checkAll = document.querySelector("input[name=prodCheckAll]")
const prodCheckbox = document.querySelectorAll("input[name=prodCheck]")
checkAll.addEventListener("click", () => {
    if (checkAll.checked == false){
        for (let i = 0; i < prodCheckbox.length; i++) {
            prodCheckbox[i].checked = false
        }
    } else {
        for (let i = 0; i < prodCheckbox.length; i++) {
            prodCheckbox[i].checked = true
        }
    }
})

const unRegisterProdBtn = document.querySelector("#unRegisterProd")

unRegisterProdBtn.addEventListener("click", () => {

    const prodList = JSON.parse(localStorage.getItem("product"))

    for (let i = 0; i < prodCheckbox.length; i++) {
        if (prodCheckbox[i].checked == true){
            let checkedProdNo = prodCheckbox[i].parentElement.nextSibling.textContent
            for (let j = 0; j < prodList.length; j++) {
                if (prodList[j].prodNo == checkedProdNo){
                    if (prodList[j].prodDelYn === "Y"){
                        prodCheckbox[i].focus()
                        alert(prodList[j].prodNo + "번 상품은 등록되어 있지 않은 상태입니다.")
                        return;
                    } else {
                        prodList[j].prodDelYn = "Y"
                    }
                }
            }
        }
    }

    localStorage.setItem("product", JSON.stringify(prodList))

    location.href = location.href;

})

document.querySelector("#reRegisterProd").addEventListener("click", (e) => {
    const prodList = JSON.parse(localStorage.getItem("product"))

    for (let i = 0; i < prodCheckbox.length; i++) {
        if (prodCheckbox[i].checked == true){
            let checkedProdNo = prodCheckbox[i].parentElement.nextSibling.textContent
            for (let j = 0; j < prodList.length; j++) {
                if (prodList[j].prodNo == checkedProdNo){
                    if (prodList[j].prodDelYn === "N"){
                        prodCheckbox[i].focus()
                        alert(prodList[j].prodNo + "번 상품은 등록되어 있는 상태입니다.")
                        return;
                    } else {
                        prodList[i].prodDelYn = "N"
                    }
                }
            }
        }
    }

    localStorage.setItem("product", JSON.stringify(prodList))

    location.href = location.href;
})