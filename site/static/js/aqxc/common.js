// api 根地址
const aqxcApiUrl = 'https://api.jzeg.net/api/aqxc/v1/'
const aqxcApiExtendUrl = 'https://api.jzeg.net/api/aqxc/extend/'

const storageTokenKey = 'aqxcToken'
const storageAccountKey = 'aqxcAccount'

const getStorageAqxcToken = () => getLocalStorage(storageTokenKey)
const getStorageAqxcAccount = () => getLocalStorage(storageAccountKey)
const setStorageAqxcToken = (token) => setLocalStorage(storageTokenKey, token)
const setStorageAqxcAccount = (account) => setLocalStorage(storageAccountKey, account)
const removeStorageAqxcToken = () => removeLocalStorage(storageTokenKey)
const removeStorageAqxcAccount = () => removeLocalStorage(storageAccountKey)

const aqxcAxios = axiosInstance.create({
  baseURL: aqxcApiExtendUrl,
  adapter: 'fetch',
})

// 请求成功拦截器
const requestOnFulfilled = config => {
  if (config.method === 'post') {
    config.data = config.data || {}
    const token = getStorageAqxcToken()
    const account = getStorageAqxcAccount()

    if (!config.data.token && token) {
      config.data.token = token
    }
    if (!config.data.account && account) {
      config.data.account = account
    }

    return config
  }

  return config
}

// 添加请求拦截器
aqxcAxios?.interceptors.request.use(
  requestOnFulfilled,
  error => Promise.reject(error)
)

// 添加响应拦截器
aqxcAxios?.interceptors.response.use(
  responseOnFulfilled,
  responseOnRejected
)
