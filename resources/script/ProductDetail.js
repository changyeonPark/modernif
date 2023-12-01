const product = JSON.parse(localStorage.getItem("product"))
const productName = sessionStorage.getItem("prodName")

const prodNameEl = document.querySelector(".prodName")
const prodPriceEl = document.querySelector(".prodPrice")
const mainImgEl = document.querySelector(".header-img")
const sizeCartEl = document.querySelector("tbody")
const detailImgEl = document.querySelector(".detail-body-img")
const sizeSelect = document.querySelector("select[name=sizeSelect]")
const colorSelect = document.querySelector("select[name=colorSelect]")

function totalPriceWrite() {
    const selectListAll = document.querySelectorAll(".selectList")

    let result = 0;
    for (let i = 0; i < selectListAll.length; i++) {
        if (selectListAll[i].style.display === "flex") {
            const selectTotalPriceP = selectListAll[i].querySelector(".selectTotalPrice")
            let priceReplace1 = selectTotalPriceP.textContent.replace("KRW ", "")
            let selectFinalPrice = parseInt(priceReplace1.replace(",", ""))
            result += selectFinalPrice
        }
    }

    document.querySelector(".total").textContent = result.toLocaleString('ko-KR') + " 원"
}

colorSelect.addEventListener("change", () => {
    if (sizeSelect.value !== "none" && colorSelect.value !== "none") {
        if (colorSelect.options[0].selected == true){
            return
        }
        const selectList = document.querySelector(".selectList")

        const copySelectList = selectList.cloneNode(true)

        const userSelectList = document.querySelector(".user-select-list")

        copySelectList.querySelector("strong[name=selectName]").textContent = productName
        copySelectList.querySelector("p[name=selectSize-selectColor]").textContent = "- " + sizeSelect.value.toUpperCase() + " / " + colorSelect.value

        copySelectList.style.display = "flex"
        userSelectList.appendChild(copySelectList)

        colorSelect.options[0].selected = true


        const delBtn = copySelectList.querySelector(".delSelectList")

        delBtn.addEventListener("click", () => {
            delBtn.parentElement.parentElement.remove()
            totalPriceWrite();
        })

        const plusCountBtn = copySelectList.querySelector(".plusCount")
        plusCountBtn.addEventListener("click", () => {

            const cnt = plusCountBtn.parentElement.parentElement.firstElementChild

            const selectTotalPrice = plusCountBtn.parentElement.parentElement.nextElementSibling.firstElementChild

            cnt.value = parseInt(cnt.value)+1

            for (let i = 0; i < product.length; i++) {
                if (product[i].prodName === productName) {
                    const prodPriceNumber = product[i].prodPrice.replace(",", "")

                    selectTotalPrice.textContent = "KRW " + (cnt.value * prodPriceNumber).toLocaleString('ko-KR')

                }
            }

            const selectListAll = document.querySelectorAll(".selectList")

            totalPriceWrite();

        })

        const minusCountBtn = copySelectList.querySelector(".minusCount")

        minusCountBtn.addEventListener("click", () => {

            const cnt = plusCountBtn.parentElement.parentElement.firstElementChild

            if (cnt.value === "1"){
                alert("최소 주문 수량은 1개 입니다.")
                return;
            }

            const selectTotalPrice = plusCountBtn.parentElement.parentElement.nextElementSibling.firstElementChild

            cnt.value = parseInt(cnt.value)-1

            for (let i = 0; i < product.length; i++) {
                if (product[i].prodName === productName) {
                    const prodPriceNumber = product[i].prodPrice.replace(",", "")

                    selectTotalPrice.textContent = "KRW " + (cnt.value * prodPriceNumber).toLocaleString('ko-KR')

                }
            }

            totalPriceWrite();
        })

        totalPriceWrite();
    }
})




for (let i = 0; i < product.length; i++) {
    const prodNo = product[i].prodNo
    const prodName = product[i].prodName
    const prodPrice = product[i].prodPrice
    const prodCategory = product[i].prodCategory
    const mainImgUrl = product[i].mainImgUrl
    const prodColor = product[i].color
    const prodSize = product[i].prodSize /* 2중 배열임 */
    const detailImgUrl = product[i].detailImgUrl /* 배열임 */
    const prodDelYn = product[i].prodDelYn

    if (productName === prodName) {
        prodNameEl.textContent = prodName
        prodPriceEl.textContent = prodPrice + "원"

        mainImgEl.setAttribute("src", mainImgUrl)

        for (let j = 0; j < prodColor.length; j++) {
            const colorOption = document.createElement("option")

            colorOption.setAttribute("value", prodColor[j])
            colorOption.textContent = prodColor[j]
            document.querySelector(".selectTotalPrice").textContent = "KRW " + prodPrice

            colorSelect.appendChild(colorOption)
        }

        for (let j = 0; j < prodSize.length; j++) {

            const sizeTr = document.createElement("tr")
            const sizeTd = document.createElement("td")
            const shoulderTd = document.createElement("td")
            const chestTd = document.createElement("td")
            const totalLengthTd = document.createElement("td")

            const sizeOption = document.createElement("option")

            sizeOption.setAttribute("value", prodSize[j][0])
            sizeOption.textContent = prodSize[j][0].toUpperCase()

            sizeSelect.appendChild(sizeOption)

            sizeTd.tagName = "size"
            sizeTd.textContent = prodSize[j][0].toUpperCase()

            shoulderTd.tagName = "size1"
            shoulderTd.textContent = prodSize[j][1] + "cm"

            chestTd.tagName = "size2"
            chestTd.textContent = prodSize[j][2] + "cm"

            totalLengthTd.tagName = "size3"
            totalLengthTd.textContent = prodSize[j][3] + "cm"

            sizeTr.append(sizeTd, shoulderTd, chestTd, totalLengthTd)

            sizeCartEl.appendChild(sizeTr)
        }

        for (let j = 0; j < detailImgUrl.length; j++) {
            const imgEl = document.createElement("img")
            imgEl.setAttribute("src", detailImgUrl[j])
            imgEl.setAttribute("alt", j + " 번째 디테일 이미지")

            detailImgEl.appendChild(imgEl)
        }
    }
}