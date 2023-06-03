let X$ = document.querySelector.bind(document)
let X$$ = document.querySelectorAll.bind(document)

function animateInfor() {
    let inforItem = X$$('.info-main .info-item .icon')
    let inforItemBefore = X$$('.info-main .info-item .before')
    let phoneIconText = X$('.info-main .info-item:nth-child(4) .text')
    let phoneIcon = X$('.info-main .info-item:nth-child(4) i')
    
    for (let i = 0; i < inforItem.length; i++) {
        inforItem[i].addEventListener('mouseover', () => {
            inforItemBefore[i].style.width = '100%'
        })
        inforItem[i].addEventListener('mouseout', () => {
            inforItemBefore[i].style.width = '0%'
            inforItem[i].style.color = 'white'
        })
    }

    phoneIconText.addEventListener('mouseover', () => {
        phoneIcon.style.transform = 'scale(1)'
        phoneIcon.style.transition = '0.2s'
        inforItemBefore[3].style.width = '100%'
    })
    phoneIconText.addEventListener('mouseout', () => {
        phoneIcon.style.transform = 'scale(0.7)'
        phoneIcon.style.transition = '0.2s'
        inforItemBefore[3].style.width = '0%'
    })
    phoneIcon.addEventListener('mouseover', () => {
        phoneIcon.style.transform = 'scale(1)'
        phoneIcon.style.transition = '0.2s'
        inforItemBefore[3].style.width = '100%'
    })
    phoneIcon.addEventListener('mouseout', () => {
        phoneIcon.style.transform = 'scale(0.7)'
        phoneIcon.style.transition = '0.2s'
        inforItemBefore[3].style.width = '0%'
    })
}

function animateAdress() {
    let container = X$('.info-main .info-item:nth-child(5)')
    let iconAdress = X$('.info-main .info-item:nth-child(5) i')
    let iconBackground = X$('.info-main__info-item__background-i')

    let delayA
    let delayB
    let delayC
    let delayD
    let isHover

    container.addEventListener('mouseover', () => {
        clearTimeout(delayD)
        iconAdress.style.transform = 'scale(1)'
        delayA = setTimeout(() => {
            iconBackground.style.width = '50px'
            iconBackground.style.height = '50px'
        }, 500)

        delayB = setTimeout(() => {
            container.style.backgroundPosition = '0'
        }, 1000)

        delayC = setTimeout(() => {
            isHover = true
        }, 1500)
    })
    container.addEventListener('mouseout', () => {
        console.log(isHover)
        clearTimeout(delayA)
        clearTimeout(delayB)
        clearTimeout(delayC)
        iconAdress.style.transform = 'scale(0.7)'
        container.style.backgroundPosition = '100%'

        if (isHover === true) {
            delayD = setTimeout(() => {
                iconBackground.style.width = '0'
                iconBackground.style.height = '0'
                isHover = false
            }, 1000)
        } else {
            clearTimeout(delayD)
            iconBackground.style.width = '0'
            iconBackground.style.height = '0'
        }
    })
}

function forgotPassword() {
    let forgot_password = X$('.Forgot-Password')
    let tabForgotPassword = X$('.tabForgotPassword')
    let blur = X$('.blur')

    forgot_password.addEventListener('click', () => {
        tabForgotPassword.classList.toggle('active')
        blur.classList.toggle('active')
    })
}

function buttonConfirmForgotPassword() {
    let btnConfirm = X$('.tabForgotPassword .buttonLogin')
    let tabNewPassword = X$('.getNewPassword')

    btnConfirm.addEventListener('click', () => {
        if (X$('.tabForgotPassword.active')) {
            X$('.tabForgotPassword.active').classList.remove('active')
            tabNewPassword.classList.add('active')
        }
    })
}

function tabSubmitNewPassword() {
    let btnSubmitNewPassword = X$('.getNewPassword .buttonLogin a') 

    btnSubmitNewPassword.addEventListener('.click', () => {
        btnSubmitNewPassword.classList.remove('active')
        X$('.blur').classList.remove('active')
        location.reload()
    })
}

function accountAdmin() {
    let AccountName = X$('.form .Account')
    let Password = X$('.form .Password')
    let btnLogin = X$('.form .buttonLogin a')

    btnLogin.addEventListener('click', () => {
        let valueAccount = AccountName.value.trim()
        if (valueAccount == '123456' && Password.value == 123456) {
            let account = {
                name: valueAccount,
                password: Password.value,
                online: true,
            }

            fetch('http://localhost:3000/account/1', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(account)
            })
                .then(function () {
                    btnLogin.setAttribute('href', 'file:///E:/C%C3%A0y_FrontEnd/%C4%90o_An_Khoi_Le/Project/Home/Home.html')
                    btnLogin.click()
                })
        } else {
            btnLogin.removeAttribute('href')
        }
    })
}

function hideNshowPassword() {
    let eyeOpen = X$('.form__form-item__eyeOpen')
    let eyeClose = X$('.form__form-item__eyeClose')
    let passwordInput = X$('.form__form-item__password')

    eyeOpen.addEventListener('click', () => {
        eyeClose.style.display = 'flex'
        eyeOpen.style.display = 'none'
        passwordInput.setAttribute('type', 'password')
    })

    eyeClose.addEventListener('click', () => {
        eyeOpen.style.display = 'flex'
        eyeClose.style.display = 'none'
        passwordInput.setAttribute('type', 'text')
    })
}

function start() {
    animateInfor()
    animateAdress()
    forgotPassword()
    buttonConfirmForgotPassword()
    tabSubmitNewPassword()
    accountAdmin()
    hideNshowPassword()
}
start()


