let aqxc_form = document.querySelector('#aqxc_form')
if (aqxc_form) {
  let token = document.querySelector('#token')
  let account = document.querySelector('#aqxc_account')
  let token_display = document.querySelector('#token_display')
  let account_display = document.querySelector('#account_display')

  /**
   * 刷新当前的 token 的显示
   */
  const refreshTokenDisplay = () => {
    token_display.innerText = getStorageAqxcToken()
  }
  /**
   * 刷新当前的 账号 的显示
   */
  const refreshAccountDisplay = () => {
    account_display.innerText = getStorageAqxcAccount()
  }

  // 如果有本地存储的 token，则刷新显示
  if (getStorageAqxcToken()) refreshTokenDisplay()
  // 如果有本地存储的账号，则刷新显示
  if (getStorageAqxcAccount()) refreshAccountDisplay()

  aqxc_form.addEventListener('submit', event => {
    event.preventDefault()
    // let formData = new FormData(aqxc_form)
    // let token = formData.get('token')

    if (!account.value) {
      bModal('', createSmallCenterText('请输入账号', 'danger'), '', 'sm', true)
      return
    }

    if (!token.value) {
      bModal('', createSmallCenterText('请输入 Token', 'danger'), '', 'sm', true)
      return
    }

    if (token.value) {
      setStorageAqxcToken(token.value)
      refreshTokenDisplay()
    }
    if (account.value) {
      setStorageAqxcAccount(account.value)
      refreshAccountDisplay()
    }

    bModal('', createSmallCenterText('已更新 数据', 'success'), '', 'sm', true)
  })

  // 监听本地存储中token键值变化
  window.addEventListener('storage', event => {
    // if (event.storageArea === localStorage) return
    // if (event.source !== window) return
    // if (event.url !== document.URL) return

    if (event.key === 'token') {
      token_display.innerText = event.newValue
      refreshTokenDisplay()
      token.value = ''
      bModal('', createSmallCenterText('本页面已经同步更新 Token', 'success'), '', 'sm', true)
    }
    if (event.key === 'account') {
      account_display.innerText = event.newValue
      refreshAccountDisplay()
      account.value = ''
      bModal('', createSmallCenterText('本页面已经同步更新 账号', 'success'), '', 'sm', true)
    }
  })

  aqxc_form.addEventListener('reset', () => {
    removeStorageAqxcToken()
    removeStorageAqxcAccount()
    refreshTokenDisplay()
    refreshAccountDisplay()
    token_display.innerText = getStorageAqxcToken() || '已清空'
    account_display.innerText = getStorageAqxcAccount() || '已清空'
    bModal('', createSmallCenterText('已清空 数据', 'success'), '', 'sm', true)
  })

}

// 刷新信息
let refreshInfo = document.querySelectorAll('.refreshInfo')

refreshInfo.forEach((item) => {
  item.addEventListener('click', event => {
    event.preventDefault()
    let refreshType = item.dataset['refresh']
    let urlPath

    if (refreshType === 'profile') urlPath = 'profile/detail'
    if (refreshType === 'video') urlPath = 'profile/videoStat'

    let url = aqxcApiUrl + urlPath
    let token = getStorageAqxcToken()
    let account = getStorageAqxcAccount()

    if (!account) {
      bModal('', createSmallCenterText('请先设置 账号', 'danger'), '', 'sm', true)
      return
    }

    if (!token) {
      bModal('', createSmallCenterText('请先设置 Token', 'danger'), '', 'sm', true)
      return
    }

    let data = { refreshType, account, token }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          response.json()
            .then(data => {
              return bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
            })
          return
        }

        return response.json()
      })
      .then(data => {
        if (data.code) {
          bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          return
        }

        if (refreshType === 'profile') updateProfile(data.data)
        if (refreshType === 'video') updateVideoStat(data.data)
      })
  })
})

function updateProfile (data) {
  const elements = [
    { element: document.querySelector('#user_nickname'), key: 'nickname' },
    { element: document.querySelector('#user_real_name'), key: 'real_name' },
    { element: document.querySelector('#user_mobile'), key: 'mobile' },
    { element: document.querySelector('#user_avatar'), key: 'avatar' },
    { element: document.querySelector('#user_power'), key: 'power' },
    { element: document.querySelector('#user_points'), key: 'points' },
    { element: document.querySelector('#user_total_points'), key: 'total_points' }
  ]

  elements.forEach(({ element, key }) => {
    if (key === 'avatar') {
      element.src = data[key]
      return
    }
    element.textContent = data[key]
  })
}

function updateVideoStat (data) {
  const elements = [
    { element: document.querySelector('#user_totalTime'), key: 'totalTime' },
    { element: document.querySelector('#user_studyStats'), key: 'studyStats' },
    { element: document.querySelector('#user_visitStats'), key: 'visitStats' },
  ]

  elements.forEach(({ element, key }) => {
    if (key === 'totalTime') {
      element.textContent = formatSecondsToHMS(data[key])
      return
    }
    element.textContent = data[key]
  })
}

function formatSecondsToHMS (seconds) {
  // 计算小时数
  const hours = Math.floor(seconds / 3600)
  // 计算分钟数
  const minutes = Math.floor((seconds % 3600) / 60)
  // 计算秒数
  const remainingSeconds = seconds % 60

  // 返回格式化的字符串
  return `${hours} 小时 ${minutes} 分 ${remainingSeconds} 秒`
}
