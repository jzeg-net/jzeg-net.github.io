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
    const apiPath = 'profile/signIn'
    const token = getStorageAqxcToken()
    const account = getStorageAqxcAccount()
    const data = { token, account }

    aqxcAxios.post(apiPath, data)
      .then(res => {
        const { add_power, total_power } = res.data.data
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
      .catch(err => {
        const msg = err?.response?.data?.message || err.message || '签到失败'
        bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)
      })

  })

}
