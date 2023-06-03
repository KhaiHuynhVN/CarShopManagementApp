let X$ = document.querySelector.bind(document)
let X$$ = document.querySelectorAll.bind(document)
let body = X$('body')
let blurTabLogOut = X$('.tab-Logout__blur')
blurTabLogOut.remove()
// API
let API = (function getAPI() {
    let API = 'http://localhost:3000/cars'
    return {
        getAPI() {
            return API
        }
    }
})()

function hideBlur(element) {
    if (element) {
        element.classList.remove('active')
        setTimeout(() => { element.remove() }, 500)
    }
    blurTabLogOut.classList.remove('active')
    setTimeout(() => { blurTabLogOut.remove() }, 500)
}
function showBlur(element) {
    if (element) {
        element.classList.add('active')
    }
    body.appendChild(blurTabLogOut)
    setTimeout(() => { blurTabLogOut.classList.add('active') }, 1)
}
function checkOnline() {
    fetch('http://localhost:3000/account/1')
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        if (response.online === false) {
            body.style.display = 'none'
        }
    })
}

function hideNshowTabLogOut() {
    let logOutBtn = X$('.header-main__search-box__log-out')
    let tabLogOut = X$('.tab-Logout')
    let cancelBtn = X$('.tab-Logout__button-cancel')
    let okBtn = X$('.tab-Logout__button-ok')

    logOutBtn.addEventListener('click', () => {
        showBlur(tabLogOut)
    })

    cancelBtn.addEventListener('click', () => {
        tabLogOut.classList.remove('active')
        hideBlur()
    })

    okBtn.addEventListener('click', () => {
        let account = {
            name: '123456',
            password: '123456',
            online: false,
        }
        fetch('http://localhost:3000/account/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        })
    })
}

function searchBar() {
    let inputSearch = X$('.header-main__search-box__input-search')

    inputSearch.oninput = () => {
        X$('.menu-container .item.active').classList.remove('active')
        let btnsFirstly = X$('.menu-container .item:first-child')
        let line = X$('.menu-container__line')

        if (X$('.menu-container .item').innerText == 'All') {
            X$('.menu-container .item').classList.add('active')
        }
        line.style.width = X$('.menu-container .item.active').offsetWidth + 'px'
        line.style.left = (X$('.menu-container .item.active').offsetLeft - btnsFirstly.offsetLeft) + 'px'

        handleSearchBar(inputSearch)
    }
}
function handleSearchBar(inputSearch) {
    fetch(API.getAPI())
    .then((response) => { return response.json()})
    .then((response) => {
        let value = inputSearch.value.toLowerCase().trim()
        let datas = response.filter((data) => {  
            if (data.carName.toLowerCase().includes(value)) {
                return data
            }
        })
        getHTMLcarContainerBox(datas)
    })
}

function btnMenu() {
    let btns = X$$('.menu-container .item')
    let btnsFirstly = X$('.menu-container .item:first-child')
    let line = X$('.menu-container__line')

    line.style.width = X$('.menu-container .item.active').offsetWidth + 'px'
    line.style.left = (X$('.menu-container .item.active').offsetLeft - btnsFirstly.offsetLeft) + 'px'
    setInterval(() => {
        line.style.width = X$('.menu-container .item.active').offsetWidth + 'px'
        line.style.left = (X$('.menu-container .item.active').offsetLeft - btnsFirstly.offsetLeft) + 'px'
    }, 1000)

    btns.forEach(function(btn) {
        btn.addEventListener('click', () => {
            let ripples = document.createElement('span')
            btn.appendChild(ripples)
            setTimeout(() => {
                ripples.remove()
            }, 1000)
            X$('.menu-container .item.active').classList.remove('active')
            btn.classList.add('active')
            line.style.left = (X$('.menu-container .item.active').offsetLeft - btnsFirstly.offsetLeft) + 'px'

            handleBtnMenu(btn)
        })
    })
}
function handleBtnMenu(btn) {
    let carContainerBox = X$('.car-container__box')
    if (btn.innerText != 'All') {
        if (btn.innerText != 'Khác') {
            handleBtnMenuDefault(btn)
            return
        }
        handleBtnMenuKhac()
        return
    }
    handleBtnMenuAll()
}
function handleBtnMenuKhac() {
    fetch(API.getAPI())
        .then(function (response) { return response.json() })
        .then(function (response) {
            let datas = response.filter(function (data) {
                if (data.carName.toLowerCase().includes('Mercedes'.toLowerCase()) === false
                    && data.carName.toLowerCase().includes('Honda'.toLowerCase()) === false
                    && data.carName.toLowerCase().includes('Toyota'.toLowerCase()) === false) {
                    return data.carName
                }
            })
            getHTMLcarContainerBox(datas)
        })
}
function handleBtnMenuDefault(btn) {
    fetch(API.getAPI()) 
    .then(function (response) { return response.json() })
    .then(function (response) {
        let datas = response.filter(function(data) {
            return data.carName.toLowerCase().includes(btn.innerText.toLowerCase())
        })
        getHTMLcarContainerBox(datas)
    })
}
function handleBtnMenuAll() {
    fetch(API.getAPI())
        .then((response) => { return response.json() })
        .then((response) => {
            getHTMLcarContainerBox(response)
        })
}

function formAddCar() {
    let cardImg = X$('.form-add-car__img')
    let plus = X$('.form-add-car__img__plus i')
    let inputFile = X$('.form-add-car__img__file')
    let btnAddCar = X$('.btn-add')
    let formAddCar = X$('.form-add-car')
    let removeFormAddCar = X$('.form-add-car__info__btn-cancel')
    let img = X$('.form-add-car__img img')
    let inputCard = X$$('.form-add-car__info .item input')  
    let saveBtn = X$('.form-add-car__info__btn-save')
    let okBtn = X$('.form-add-car__info__btn-ok')
    let decribeTextarea = X$('.form-add-car__decribe textarea')

    cardImg.addEventListener('mouseover', () => {
        plus.style.color = 'rgb(180, 180, 180)'
        plus.style.backgroundColor = 'rgb(91, 91, 91)'
    })
    cardImg.addEventListener('mouseout', () => {
        plus.style.color = 'rgb(109, 109, 109)'
        plus.style.backgroundColor = 'rgb(223, 223, 223)'
    })
    cardImg.addEventListener('mousedown', () => {
        plus.style.color = 'rgb(109, 109, 109)'
        plus.style.backgroundColor = 'rgb(223, 223, 223)'
    })
    cardImg.addEventListener('mouseup', () => {
        plus.style.color = 'rgb(180, 180, 180)'
        plus.style.backgroundColor = 'rgb(91, 91, 91)'
    })
    cardImg.addEventListener('click', () => {
        inputFile.click()
    })

    btnAddCar.addEventListener('click', () => {
        btnAddCarEventClick(plus, inputFile, img, okBtn, saveBtn, decribeTextarea, formAddCar, inputCard)
    })
    removeFormAddCar.addEventListener('click', () => {
        formAddCar.classList.remove('active')
        hideBlur()
    })
    saveBtn.addEventListener('click', handleSaveBtn)
}
function handleSaveBtn() {
    let img = X$('.form-add-car__img img')
    let formAddCar = X$('.form-add-car')
    let carData = {}
    let inputCard = X$$('.form-add-car__info .item input')
    let decribeTextarea = X$('.form-add-car__decribe textarea')

    carData.carImg = img.src
    carData.carName = inputCard[0].value.trim()
    carData.dateOfManufacture = inputCard[1].value.trim()
    carData.whereProduction = inputCard[2].value.trim()
    carData.importDate = inputCard[3].value.trim()
    carData.price = inputCard[4].value.trim()
    carData.amount = inputCard[5].value.trim()
    carData.decribe = decribeTextarea.value

    if (carData.carName
        || carData.dateOfManufacture
        || carData.carImg
        || carData.whereProduction
        || carData.importDate
        || carData.price
        || carData.amount) {
        addCar(carData)
        formAddCar.classList.remove('active')
        hideBlur()
    }
}
function addCar(carData) {
    fetch(API.getAPI(), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(carData),
    })
    .then(renderHTMLcarContainerBox)
}
function getImgSrc() {
    let inputFile = X$('.form-add-car__img__file')
    let plusBox = X$('.form-add-car__img__plus i')
    let img = X$('.form-add-car__img img')
    let saveBtn = X$('.form-add-car__info__btn-save')

    inputFile.addEventListener('change', () => {
        plusBox.style.opacity = '0'
        plusBox.style.pointerEvents = 'none'
        img.style.opacity = '1'
        let file = inputFile.files[0]
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result
            }
            reader.readAsDataURL(file)
        }
    })
}
function btnAddCarEventClick(plus, inputFile, img, okBtn, saveBtn, decribeTextarea, formAddCar, inputCard) {
    plus.style.opacity = '1'
    plus.style.pointerEvents = 'all'
    inputFile.value = ''
    img.style.opacity = '0'
    img.removeAttribute('src')
    okBtn.style.opacity = '0'
    okBtn.style.pointerEvents = 'none'
    saveBtn.style.opacity = '1'
    saveBtn.style.pointerEvents = 'all'
    decribeTextarea.value = ''
    showBlur(formAddCar)
    for (let i = 0; i < inputCard.length; i++) {
        inputCard[i].value = ''
    }
}

function renderHTMLcarContainerBox() {
    fetch(API.getAPI()) 
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            let inputSearch = X$('.header-main__search-box__input-search')

            if (X$('.menu-container .item.active').innerText != 'All') {
                if (X$('.menu-container .item.active').innerText == 'Khác') {
                    handleBtnMenuKhac()
                    return
                }
                handleBtnMenuDefault(X$('.menu-container .item.active'))
            } else
            if (inputSearch.value.trim() != '') {
                handleSearchBar(inputSearch)
            } else {
                getHTMLcarContainerBox(response)
            }         
        })
}
function getHTMLcarContainerBox(response) {
    let carContainerBox = X$('.car-container__box')

    let htmls = response.map(function(data, index) {
        return `
            <div style="--delay:${index/10}s" class="car-container__box-item">
                <div data-id="${data.id}" class="car-container__car-item">
                    <div class="car-container__car-item__car-img">
                        <img src="${data.carImg}" alt="carItem">
                    </div>
                    <div class="car-container__car-item__car-description">
                        <div class="text">
                            <p class="text-first">Tên xe: </p>
                            <p class="text-last">${data.carName}</p>
                        </div>
                        <div class="text">
                            <p class="text-first">Ngày sản xuất: </p>
                            <p class="text-last">${data.dateOfManufacture}</p>
                        </div>
                        <div class="text">
                            <p class="text-first">Nơi sản xuất: </p>
                            <p class="text-last">${data.whereProduction}</p>
                        </div>
                        <div class="text">
                            <p class="text-first">Ngày nhập hàng: </p>
                            <p class="text-last">${data.importDate}</p>
                        </div>
                        <div class="text">
                            <p class="text-first">Giá: </p>
                            <p class="text-last">${data.price}</p>
                        </div>
                        <div class="text">
                            <p class="text-first">Số lượng còn: </p>
                            <p class="text-last">${data.amount}</p>
                        </div>
                    </div>
                    <div class="car-container__car-item__btn-change">Sửa</div>
                    <div class="car-container__car-item__btn-delete">Xóa</div>
                    <div class="car-container__arrow">
                        <i style="--animation-delay: 0.4s" class="fa-solid fa-angle-down"></i>
                        <i style="--animation-delay: 0.2s" class="fa-solid fa-angle-down"></i>
                        <i style="--animation-delay: 0s" class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
                <div class="car-container__car-item__decribe">
                    ${data.decribe && JSON.stringify(data.decribe)
                        .replace(/\\n/g, `<br\>`)
                        .replace(/\"/g, '')
                        .replace(/ /g, '&nbsp;')
                        || 'Chưa có thông tin...'}
                </div>
            </div>
        `
    }).join('')
    carContainerBox.innerHTML = htmls
    deleteCarContainerBox()
    revisionCarContainerBox(response)
    arrowScrollDownAnimate()
    dropdownCarItem()
}

function deleteCarContainerBox() {
    let carItem = X$$('.car-container__car-item')
  
    carItem.forEach(function(item) {
        let getIDcar = item.getAttribute('data-id')

        item.addEventListener('click', function(e) {
            if (e.target.closest('.car-container__car-item__btn-delete')) {
                e.stopPropagation()
                let formDeleteCar = document.createElement('div')

                formDeleteCar.classList.add('form-delete-car')
                formDeleteCar.innerHTML = `
                    <div class="form-delete-car__text">Bạn có chắc muốn xóa?</div>
                    <div class="form-delete-car__button-main">
                        <div class="form-delete-car__button-ok">Yes</div>
                        <div class="form-delete-car__button-cancel">No</div>
                    </div>
                `
                body.appendChild(formDeleteCar)
                setTimeout(function() { showBlur(formDeleteCar) }, 1)
     
                formDeleteCar.onclick = (e) => {
                    if (e.target.closest('.form-delete-car__button-cancel')) {
                        hideBlur(formDeleteCar)
                    }
                    if (e.target.closest('.form-delete-car__button-ok')) {
                        hideBlur(formDeleteCar)
                        fetch(API.getAPI() + '/' + getIDcar, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                        })
                            .then(renderHTMLcarContainerBox)
                    }
                }      
            }
        })
    })
}

function revisionCarContainerBox(response) {
    let carItem = X$$('.car-container__car-item')
    let formAddCar = X$('.form-add-car')
    let saveBtn = X$('.form-add-car__info__btn-save')
    let inputCard = X$$('.form-add-car__info .item input')
    let img = X$('.form-add-car__img img')
    let plusBox = X$('.form-add-car__img__plus i')
    let okBtn = X$('.form-add-car__info__btn-ok')
    let decribeTextarea = X$('.form-add-car__decribe textarea')

    carItem.forEach(function(item) {
        item.addEventListener('click', function(e) {
            let getIDcar = item.getAttribute('data-id')
            let carData = {}

            if (e.target.closest('.car-container__car-item__btn-change')) {
                e.stopPropagation()
                for (let i = 0; i < response.length; i++) {
                    if (getIDcar == response[i].id) {
                        showBlur(formAddCar)

                        plusBox.style.opacity = '0'
                        plusBox.style.pointerEvents = 'none'
                        img.style.opacity = '1'

                        img.src = response[i].carImg
                        inputCard[0].value = response[i].carName
                        inputCard[1].value = response[i].dateOfManufacture
                        inputCard[2].value = response[i].whereProduction
                        inputCard[3].value = response[i].importDate
                        inputCard[4].value = response[i].price
                        inputCard[5].value = response[i].amount
                        if (response[i].decribe) {
                            decribeTextarea.value = response[i].decribe
                        } else {
                            decribeTextarea.value = ''
                        }
                       
                        saveBtn.style.opacity = '0'
                        saveBtn.style.pointerEvents = 'none'
                        okBtn.style.opacity = '1'
                        okBtn.style.pointerEvents = 'all'   
                        
                        okBtn.onclick = () => {
                            handleRevisionBtn(getIDcar, carData, img, inputCard, formAddCar, decribeTextarea)
                        }
                    }
                }
            }
        })
    })
}
function handleRevisionBtn(getIDcar, carData, img, inputCard, formAddCar, decribeTextarea) {
    carData.carImg = img.src
    carData.carName = inputCard[0].value.trim()
    carData.dateOfManufacture = inputCard[1].value.trim()
    carData.whereProduction = inputCard[2].value.trim()
    carData.importDate = inputCard[3].value.trim()
    carData.price = inputCard[4].value.trim()
    carData.amount = inputCard[5].value.trim()
    carData.decribe = decribeTextarea.value

    formAddCar.classList.remove('active')
    hideBlur()

    fetch(API.getAPI() + '/' + getIDcar, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
        .then((response) => { return response.json() })
        .then(function (response) { 
            // console.log(JSON.stringify(response.decribe).replace(/\\n/g, '<br/>')) 
        })
        .then(renderHTMLcarContainerBox)
}

function arrowScrollDownAnimate() {
    let carItems = X$$('.car-container__car-item')

    carItems.forEach((carItem) => {
        let arrow = carItem.children[4].querySelectorAll('.car-container__arrow i')

        carItem.onmouseover = () => {
            arrow.forEach((arrowItem) => {
                arrowItem.classList.add('car-container__arrow__i-animate')
            })
        }
        carItem.onmouseout = () => {
            arrow.forEach((arrowItem) => {
                arrowItem.classList.remove('car-container__arrow__i-animate')
            })
        }
    })
}

function dropdownCarItem() {
    let carBoxItems = X$$('.car-container__box-item')
    
    carBoxItems.forEach((carBoxItem) => {
        carBoxItem.onclick = function(e) {
            let arrowBox = carBoxItem.children[0].querySelector('.car-container__arrow')
            let arrow = carBoxItem.children[0].children[4].querySelectorAll('.car-container__arrow i')

            // if (e.target.closest('.car-container__car-item__car-description')) { return }

            if (carBoxItem.classList.contains('active')) {
                handleCarBoxItemClassList_REMOVE(carBoxItem, arrowBox ,arrow)
            } else {
                handleCarBoxItemClassList_ADD(carBoxItem, arrowBox ,arrow)
            }
        }
    })
}
function handleCarBoxItemClassList_ADD(carBoxItem, arrowBox ,arrow) {
    let delayA
    if (X$('.car-container__box-item.active')) {
        X$('.car-container__box-item.active').classList.remove('active')
        X$$('.fa-angle-down.car-container__arrow__i-animate').forEach((item) => {
            item.classList.remove('car-container__arrow__i-animate')
        })
        X$('.car-container__arrow.rotate').classList.remove('rotate')
        X$('.car-container__car-item.active').classList.remove('active')
        arrowScrollDownAnimate()
    }
    arrow.forEach((arrowItem) => { arrowItem.classList.add('car-container__arrow__i-animate') })
    arrowBox.classList.add('rotate')
    carBoxItem.classList.add('active')
    carBoxItem.children[0].classList.add('active')
    carBoxItem.children[0].onmouseout = () => {}
    clearTimeout(delayA)
    delayA = setTimeout(() => {
        document.documentElement.scrollTop = carBoxItem.offsetTop - X$('.car-container').offsetTop
    }, 300)

    X$('.btn-add').style.right = -X$('.btn-add').offsetWidth + 'px'
}
function handleCarBoxItemClassList_REMOVE(carBoxItem, arrowBox ,arrow) {
    arrow.forEach((arrowItem) => { arrowItem.classList.remove('car-container__arrow__i-animate') })
    arrowBox.classList.remove('rotate')
    carBoxItem.classList.remove('active')
    carBoxItem.children[0].classList.remove('active')
    arrowScrollDownAnimate()
    X$('.btn-add').style.right = '10px'
}

function start() { 
    // checkOnline()
    hideNshowTabLogOut()
    searchBar()
    btnMenu()
    formAddCar()
    getImgSrc()
    setTimeout(() => {
        renderHTMLcarContainerBox()
    }, 2000)
}
start()

