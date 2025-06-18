const accountApiUrl = 'https://api.jzeg.net'

const isLoggedIn = () => Cookies.get('login')

const freshCaptcha = captchaEl => {
  let currentSrc = captchaEl.dataset['src']
  let now = Date.now()
  captchaEl.src = accountApiUrl + currentSrc + now
}

const resetCaptchaInputValue = captchaEl => {
  captchaEl.parentElement.nextElementSibling.querySelector('input').value = ''
}

const updateCaptcha = formEl => {
  let captcha = formEl.querySelector('.lazyCaptcha')

  freshCaptcha(captcha)
  resetCaptchaInputValue(captcha)
}

const changeIddCodeValue = (formEl, iddCodeIndex, value = '+86') => {
  let idd_code = formEl.querySelectorAll('[name=idd_code]')[iddCodeIndex]
  let span = idd_code.nextElementSibling

  idd_code.value = value
  span.innerHTML = value
}

const create_idd_code_list = (formEl, iddCodeIndex) => {
  let listGroup = document.createElement('ul')
  listGroup.className = 'list-group text-center'
  listGroup.id = 'idd_code_list'
  listGroup.style.maxHeight = '50vh'

  let cList = [
    ['+86', '中国', 'cn'],
    ['+852', '中国香港', 'cn'],
  ]

  cList.forEach(function (currentC) {
    let listGroupItem = document.createElement('a')
    let div = document.createElement('div')
    let i = document.createElement('i')
    let span = document.createElement('span')

    listGroupItem.className = 'list-group-item list-group-item-action list-group-item-light d-flex justify-content-between'
    listGroupItem.href = 'javascript:'
    listGroupItem.style.fontSize = '1.4em'

    listGroupItem.setAttribute('data-n', currentC[0])
    listGroupItem.setAttribute('data-bs-dismiss', 'modal')

    i.className = 'me-1 fi fi-' + currentC[2]

    span.className = 'mx-1'
    span.innerText = currentC[1]

    div.append(i, span)
    listGroupItem.append(div, currentC[0])
    listGroupItem.addEventListener('click', () => {
      changeIddCodeValue(formEl, iddCodeIndex, listGroupItem.dataset['n'])
    })
    listGroup.appendChild(listGroupItem)
  })

  return listGroup
}

const newCountdown = (number = 60) => {
  let countdown = document.createElement('span')
  countdown.className = 'countdown'
  countdown.innerHTML = number

  return countdown
}

const sendBtnText = btn => {
  let text = btn.querySelector('.text-reset')

  switch (text.innerHTML) {
    case '发送验证码':
      text.innerText = '秒后重新发送'
      break
    case '秒后重新发送':
      text.innerText = '发送验证码'
      break
    default:
  }
}

const sendBtnTimer = sendBtn => {
  let countdown = sendBtn.querySelector('.countdown')
  let number = countdown.innerHTML

  let x = setInterval(() => {
    number = number - 1
    countdown.innerHTML = number
    if (number <= 0) {
      clearInterval(x)
      sendBtnText(sendBtn)
      btnDisabledStatus(sendBtn)
      countdown.remove()
    }
  }, 1000)
}

const sendBtnStatus = sendBtn => {
  insertNewElement(sendBtn, newCountdown(60))
  sendBtnText(sendBtn)
  sendBtnTimer(sendBtn)
}

const sendBtnFetch = sendBtn => {
  let type = sendBtn.dataset['type']
  let action = sendBtn.dataset['action']
  let to = sendBtn.previousElementSibling.querySelector('input').value
  let idd_code = sendBtn.parentElement.querySelector('[name=idd_code]')

  let fetchData = {
    action: action,
    type: type,
    to: to,
  }
  if (idd_code) fetchData['idd_code'] = idd_code.value

  let fetchOptions = getFetchOptions(fetchData)

  fetch(accountApiUrl + '/captcha_send.php', fetchOptions)
    .then(response => response.json())
    .then(response => {
      if (response['code']) {
        btnDisabledStatus(sendBtn)
        bModal('', createSmallCenterText(response['msg'], 'danger'), '', 'sm', true)
      } else {
        sendBtnStatus(sendBtn)
        bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
      }
    })
    .catch(error => console.error('captcha_send_error:', error))

}

const listenSendBtn = formEl => {
  let sendBtnList = formEl.querySelectorAll('.sendCaptcha')

  sendBtnList.forEach((currentSendBtn, index) => {
    currentSendBtn.addEventListener('click', () => {
      btnDisabledStatus(currentSendBtn)
      sendBtnFetch(currentSendBtn)
    })
  })
}

const submitBtnTimer = submitBtn => {
  let spinner = submitBtn.querySelector('.spinner-border')
  let timeout = 2e3

  let x = setTimeout(() => {
    clearTimeout(x)
    btnDisabledStatus(submitBtn)
    spinner.remove()
  }, timeout)
}

const btnStatus = button => {
  insertNewElement(button, newSpinner())
  btnDisabledStatus(button)
  submitBtnTimer(button)
}

const submitBtnStatus = formEl => {
  let submitBtn = formEl.querySelector('button[type=submit]')

  insertNewElement(submitBtn, newSpinner())
  btnDisabledStatus(submitBtn)
  submitBtnTimer(submitBtn)
}

const listenCaptcha = formEl => {
  let captcha = formEl.querySelector('.lazyCaptcha')

  captcha.addEventListener('click', function () {
    updateCaptcha(formEl)
  })
}

const responseCode = (response, formEl) => {
  let code = response['code']
  let msg = response['msg']
  let errors = response['errors']
  bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)

  if (code === 4005 || code === 4004 || code === 4006) {
    updateCaptcha(formEl)
  } else if (code === 1002) {
    //需要在表单上对应位置显示出错误信息
    let errKey = Object.keys(errors)
    let errVal = Object.values(errors)
    console.log(errKey)
    console.log(...errVal)
    console.log({ ...errVal })
  } else {
  }
}

const getFetchOptions = fetchData => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  body: JSON.stringify(fetchData),
})

const setToken = token => {
}

const getToken = () => '1234567890123456789012345678901234567890123456789012345678901234567890'

const listenIdd_code = formEl => {
  let btnList = formEl.querySelectorAll('.idd_code')

  btnList.forEach((currentBtn, index) => {
    currentBtn.addEventListener('click', () => {
      bModal('', create_idd_code_list(formEl, index), '', 'sm', true, true)
    })
  })
}

// 懒加载
const lazyLoadCaptcha = (selector = '', captchaBaseUrl = 'https://api.jzeg.net') => {
  const observer = lozad(selector, {
    load: (el) => {
      let dataSrc = el.dataset['src']
      if (dataSrc) el.src = captchaBaseUrl + dataSrc
    }
  })
  observer.observe()
}
// 懒加载验证码
lazyLoadCaptcha('.lazyCaptcha')
