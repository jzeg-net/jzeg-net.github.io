const donateTab = () => {
    let donateContent = document.createElement('div')
    let navTabs = document.createElement('div')
    let tabContent = document.createElement('div')

    let navBtnOpt = {
        btnId: ['tab-donate-alipay', 'tab-donate-weixin'],
        btnClass: ['btn btn-outline-primary', 'btn btn-outline-success'],
        svgClass: ['fa-lg bi bi-alipay', 'fa-lg bi bi-wechat'],
        spanText: ['支付宝', '微信'],
        qrcode_dark: ['#0d6efd', '#198754'],
        qrcode_light: ['#ffffff', '#ffffff']
    }
    let paneOpt = {
        paneId: ['tab-pane-donate-alipay', 'tab-pane-donate-weixin'],
        donateImg: ['https://qr.alipay.com/tsx16078baveyad9duuls03', 'wxp://f2f0J5D4PIpy1JQWkQ9cdHgv-bEyfLPCZS9QMPALq0Stt9A']
    }
    let {btnId, btnClass, svgClass, spanText, qrcode_dark, qrcode_light} = navBtnOpt
    let {paneId, donateImg} = paneOpt

    navTabs.className = 'px-1 py-2 nav btn-group btn-group'
    navTabs.id = 'nav-tab-donate'

    tabContent.className = 'my-3 tab-content text-center'

    for (let i = 0, length = btnId.length; i < length; i++) {
        let btn = document.createElement('button')
        let svg = document.createElement('svg')
        let span = document.createElement('span')

        btn.className = i ? btnClass[i] : btnClass[i] + ' active'
        btn.id = btnId[i]
        btn.dataset['bsToggle'] = 'tab'
        btn.dataset['bsTarget'] = '#' + paneId[i]

        svg.className = svgClass[i]

        span.className = 'ms-2'
        span.textContent = spanText[i]

        btn.append(svg)
        btn.append(span)
        navTabs.append(btn)
    }

    for (let i = 0, length = paneId.length; i < length; i++) {
        let tabPane = document.createElement('div')
        let tips = document.createElement('div')

        tabPane.className = i ? 'tab-pane fade' : 'tab-pane fade active show'
        tabPane.id = paneId[i]

        tips.className = 'my-2 small'
        tips.textContent = spanText[i] + '捐赠二维码'

        tabPane.append(qrcodeImg(donateImg[i], spanText[i], qrcode_dark[i], qrcode_light[i]))
        tabPane.append(tips)
        tabContent.append(tabPane)
    }

    donateContent.append(navTabs)
    donateContent.append(tabContent)

    return donateContent
}

const qrcodeImg = (imgContent, imgAlt, dark, light) => {
    let qrcodeOption = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        margin: 2,
        width: 300,
        quality: 0.3,
        color: {dark, light}
    }

    let img = document.createElement('img')

    QRCode.toDataURL(imgContent, qrcodeOption, (err, imgBase64) => {
        if (err) {
            throw err
        }
        img.src = imgBase64
    })
    img.className = 'border-secondary img-thumbnail'
    img.alt = imgAlt + '二维码'
    img.title = img.alt

    return img
}
