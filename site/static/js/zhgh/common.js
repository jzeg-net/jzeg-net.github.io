const zhghApiUrl = 'https://api.jzeg.net/api/zhgh/v1'

const storageAccountKey = 'zhghAccount'
const storagePasswordKey = 'zhghPassword'

const getStorageZhghAccount = () => getLocalStorage(storageAccountKey)
const getStorageZhghPassword = () => getLocalStorage(storagePasswordKey)
const setStorageZhghAccount = (account) => setLocalStorage(storageAccountKey, account)
const setStorageZhghPassword = (password) => setLocalStorage(storagePasswordKey, password)
const removeStorageZhghAccount = () => removeLocalStorage(storageAccountKey)
const removeStorageZhghPassword = () => removeLocalStorage(storagePasswordKey)

// 检查是否为微信浏览器
if (navigator.userAgent.includes('MicroMessenger')) {
  bModal('', createSmallCenterText('不允许在微信内置浏览器中使用，<br>请在其他浏览器中打开本页面', 'danger'), '', 'sm', true)
}

// 选择工种
const throughSelect = document.querySelector('#throughSelect')
throughSelect?.addEventListener('click', () => {
  const url = `${zhghApiUrl}/job/index`
  const fetchData = {
    'account': getStorageZhghAccount(),
    'password': getStorageZhghPassword(),
    'userAgent': navigator.userAgent
  }

  fetch(url, fetchPostOptions(fetchData))
    .then(r => {
      if (!r.ok) {
        r.json().then(error => {
          bModal('', createSmallCenterText(error.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(r.statusText))
      }
      return r.json()
    })
    .then(res => {
      Object.keys(res).forEach(value => {
        const data = {
          value: value,
          text: res[value]
        }
        throughSelect.append(createOption(data))
      })
    })
    .catch(error => console.error('type_of_work_error', error))
}, { once: true })

const zhghAxios = axiosInstance.create({
  baseURL: zhghApiUrl,
  adapter: 'fetch',
  // timeout: 10000,
})

// 请求成功拦截器
const requestOnFulfilled = config => {
  if (config.method === 'post') {
    config.data = config.data || {}
    const password = getStorageZhghPassword()
    const account = getStorageZhghAccount()

    if (!config.data.password && password) {
      config.data.password = password
    }
    if (!config.data.account && account) {
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

