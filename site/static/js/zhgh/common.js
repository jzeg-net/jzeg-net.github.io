const zhghApiUrl = 'https://api.jzeg.net/api/zhgh/v1/'

const storageAccountKey = 'zhghAccount'
const storagePasswordKey = 'zhghPassword'

const getStorageZhghAccount = () => getLocalStorage(storageAccountKey)
const getStorageZhghPassword = () => getLocalStorage(storagePasswordKey)
const setStorageZhghAccount = (account) => setLocalStorage(storageAccountKey, account)
const setStorageZhghPassword = (password) => setLocalStorage(storagePasswordKey, password)
const removeStorageZhghAccount = () => removeLocalStorage(storageAccountKey)
const removeStorageZhghPassword = () => removeLocalStorage(storagePasswordKey)

const zhghAxios = axiosInstance.create({
  baseURL: zhghApiUrl,
  adapter: 'fetch',
  timeout: 10000,
})

// 请求成功拦截器
const requestOnFulfilled = config => {
  if (config.method === 'post') {
    config.data = config.data || {}
    const password = getStorageZhghPassword()
    const account = getStorageZhghAccount()

    // 只有当config.data中没有对应的认证信息且本地存储中有相应信息时才添加
    if (typeof config.data.password === 'undefined' && password) {
      config.data.password = password
    }
    if (typeof config.data.account === 'undefined' && account) {
      config.data.account = account
    }

    return config
  }

  return config
}

zhghAxios.interceptors.request.use(
  requestOnFulfilled,
  error => Promise.reject(error)
)

zhghAxios.interceptors.response.use(
  responseOnFulfilled,
  responseOnRejected
)

// 检查是否为微信浏览器
if (navigator.userAgent.includes('MicroMessenger')) {
  bModal('', createSmallCenterText('不允许在微信内置浏览器中使用，<br>请在其他浏览器中打开本页面', 'danger'), '', 'sm', true)
}

// 选择工种
const throughSelect = document.querySelector('#throughSelect')
throughSelect?.addEventListener('click', () => {
  const path = 'job/index'
  const data = {
    'userAgent': navigator.userAgent
  }

  zhghAxios.post(path, data)
    .then(res => {
      Object.keys(res).forEach(value => {
        const data = {
          value: value,
          text: res[value]
        }
        throughSelect.append(createOption(data))
      })
    })
    .catch(err => {
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)
    })
}, { once: true })
