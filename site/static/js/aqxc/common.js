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
  if(config.method === 'post'){
    config.data = config.data || {}
    const token = getStorageAqxcToken()
    const account = getStorageAqxcAccount()

    if(!config.data.token && token){
      config.data.token = token
    }
    if(!config.data.account && account){
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

// 响应成功拦截器
const responseOnFulfilled = response => {
  // 对响应数据做些统一处理，直接返回data.data
  // 如果data.data不存在，则返回data
  return response.data.data || response.data
}

// 响应错误拦截器
const responseOnRejected = error => {
  // 统一处理各种错误响应
  if (error.response) {
    // 服务器返回了错误状态码 (HTTP 4xx, 5xx)
    // 直接返回错误响应的数据部分，便于在业务代码中处理
    return Promise.reject(error.response.data.message || error.response)
  } else if (error.request) {
    // 请求已发出但没有收到响应 (网络错误)
    return Promise.reject({
      message: '网络连接失败，请检查网络设置'
    })
  } else {
    // 其他错误 (请求配置错误等)
    return Promise.reject({
      message: error.message || '请求配置错误'
    })
  }
}

// 添加响应拦截器
aqxcAxios?.interceptors.response.use(
  responseOnFulfilled,
  responseOnRejected
)
