const donateTab = () => {
  let donateContent = document.createElement('div')
  let navTabs = document.createElement('div')
  let tabContent = document.createElement('div')

  let navBtnOpt = {
    btnId: ['tab-donate-alipay', 'tab-donate-weixin'],
    btnClass: ['btn btn-outline-primary', 'btn btn-outline-success'],
    svgClass: ['fa-lg fab fa-alipay', 'fa-lg fab fa-weixin'],
    spanText: ['支付宝', '微信']
  }
  let paneOpt = {
    paneId: ['tab-pane-donate-alipay', 'tab-pane-donate-weixin'],
    donateImg: ['HTTPS://QR.ALIPAY.COM/FKX15775Y9K2OJJELTYUQ20', 'wxp://f2f0H7xW3hJst1JoX3lEdTm8ZYjfkZPKQo5XSe57dnbv11g=']
  }
  let { btnId, btnClass, svgClass, spanText } = navBtnOpt
  let { paneId, donateImg } = paneOpt

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

    tabPane.append(qrcodeImg(donateImg[i], spanText[i]))
    tabPane.append(tips)
    tabContent.append(tabPane)
  }

  donateContent.append(navTabs)
  donateContent.append(tabContent)

  return donateContent
}

const qrcodeImg = (imgContent, imgAlt) => {
  let qrcodeOption = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    margin: 2,
    width: 300,
    quality: 0.3,
    color: {
      dark: '#ff5555',
      light: '#ffffff'
    }
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
