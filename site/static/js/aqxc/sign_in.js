let sign_in = document.querySelector('#sign_in')
if (sign_in) {
  let storageKey = 'aqxcSignIn'
  let storageDate = getLocalStorage(storageKey)
  let today = new Date().toLocaleDateString({
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }, { locale: 'zh-CN' }).replace(/\//g, '-')

  if (storageDate === today) {
    sign_in.classList.add('disabled')
    sign_in.innerHTML = '今日已签到'
  }

  sign_in.addEventListener('click', () => {
    const url = aqxcApiExtendUrl + 'profile/signIn'
    const token = getStorageAqxcToken()
    const account = getStorageAqxcAccount()

    const data = { token, account }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(r => {
        if (!r.ok) {
          r.json().then(data => {
            bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          })
          return Promise.reject(new Error(r.statusText))
        }
        return r.json()
      })
      .then(res => {
        const { add_power, total_power } = res.data
        const message = `获得 ${add_power} 个安全B，当前安全B为 ${total_power}`

        setLocalStorage(storageKey, today)
        sign_in.classList.add('disabled')
        sign_in.innerHTML = '今日已签到'

        if (add_power === 0) {
          bModal('', createSmallCenterText('切勿重复签到，' + message, 'danger'), '', 'sm', true)
          return
        }

        bModal('', createSmallCenterText('签到成功，' + message, 'success'), '', 'sm', true)
      })

  })

}
