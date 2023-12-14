(() => {
  'use strict'

  if (dayjs().isAfter('2023-12-13')) return
  if (dayjs().isBefore('2023-11-30')) return

  const redEnvelopes = () => {
    let div = document.createElement('div')
    let tip = document.createElement('div')

    div.className = 'text-center'

    tip.className = 'pt-4 small'
    tip.innerHTML = '支付宝识别二维码后领取每日消费红包，<br>每天红包金额全部消费完，第二天可以再次领取红包。'

    let qrcodeText = 'dJw19610361cu7x6wjd2jh1uc2CZl'
    let imgAlt = '支付宝赚钱红包'

    let qrcodeOpt = {
      qrcode_dark: '#ff1818',
      qrcode_light: '#ffffff'
    }

    let { qrcode_dark, qrcode_light } = qrcodeOpt

    div.append(qrcodeImg(qrcodeText, imgAlt, qrcode_dark, qrcode_light), tip)

    return div
  }

  const qrcodeImg = (imgContent, imgAlt, dark, light) => {
    let qrcodeOption = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      width: 300,
      quality: 0.3,
      color: { dark, light }
    }

    let img = document.createElement('img')

    QRCode.toDataURL(imgContent, qrcodeOption, (err, imgBase64) => {
      if (err) {
        throw err
      }
      img.src = imgBase64
    })
    img.className = 'p-2 img-thumbnail'
    img.alt = imgAlt + '二维码'
    img.title = img.alt

    return img
  }

  bModal('支付宝双12无门槛消费红包开启', redEnvelopes, createSmallCenterText('长按二维码可以保存成图片，可以反复使用。', 'danger'), '', true)
})()
