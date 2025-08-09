const sign_in = document.querySelector('#sign_in')

const storageKey = 'aqxcSignIn'
const storageDate = getLocalStorage(storageKey)
const today = dayjs().format('YYYY-MM-DD')

if (storageDate && storageDate === today) {
  sign_in?.classList.add('disabled')
  sign_in && (sign_in.innerHTML = '今日已签到')
}

const request = () => {
  const path = 'profile/signIn'
  const data = {}

  aqxcAxios.post(path, data)
    .then(res => {
      const { add_power, total_power } = res
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
      const msg = err?.message || '签到失败'
      bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)
    })
}

sign_in?.addEventListener('click', request)
