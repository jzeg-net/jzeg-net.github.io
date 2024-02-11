let share = document.querySelector('.share')
if (share) {
  copy_page_url('.copy_link')
  link_qrcode('.link_qrcode')
}

function copy_page_url (selector) {
  document.querySelector(selector).addEventListener('click', event => {
    event.preventDefault()
    let clipboard = ClipboardJS.copy(window.location.href)

    if (clipboard) {
      bModal('', createSmallCenterText('复制本页网址成功', 'success'), '', 'sm', true)
    } else {
      bModal('', createSmallCenterText('复制本页网址失败', 'danger'), '', 'sm', true)
    }
  })
}

function link_qrcode (selector) {
  let text = '本页地址'
  let url = window.location.href

  document.querySelector(selector).addEventListener('click', event => {
    event.preventDefault()
    let img = qrcodeImg(url, text, '#980098', '#c7c7c7')
    bModal('', img, url, 'sm', true)
  })
}
