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
})

// 请求成功拦截器
const requestOnFulfilled = config => {
  if (config.method === 'post') {
    config.data = config.data || {}
    const token = getStorageAqxcToken()
    const account = getStorageAqxcAccount()

    // 只有当config.data中没有对应的认证信息且本地存储中有相应信息时才添加
    if (typeof config.data.token === 'undefined' && token) {
      config.data.token = token
    }
    if (typeof config.data.account === 'undefined' && account) {
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
