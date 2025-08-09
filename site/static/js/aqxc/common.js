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

// 响应成功拦截器
const responseOnFulfilled = response => {
  // 对响应数据做些统一处理，直接返回data.data
  // 如果data.data不存在，则返回data
  return response.data.data || response.data
}

// 响应错误拦截器 - 适配 Laravel 错误响应格式
const responseOnRejected = error => {
  if (error.response) {
    // 服务器返回了错误状态码 (HTTP 4xx, 5xx)
    const errorResponse = error.response.data

    // Laravel 验证错误通常包含 'message' 和 'errors' 字段
    // 格式示例: { message: "The given data was invalid.", errors: { field: ["error message"] } }
    if (errorResponse.errors) {
      // 提取第一条验证错误信息用于显示
      const firstErrorField = Object.keys(errorResponse.errors)[0]
      const firstErrorMessage = errorResponse.errors[firstErrorField][0]

      return Promise.reject({
        message: firstErrorMessage,
        errors: errorResponse.errors,
        status: error.response.status
      })
    }

    // 其他 Laravel 错误格式，通常包含 'message' 字段
    // 格式示例: { message: "Error description" }
    if (errorResponse.message) {
      return Promise.reject({
        message: errorResponse.message,
        status: error.response.status
      })
    }

    // 如果没有特定的 Laravel 错误格式，返回原始错误
    return Promise.reject(error.response.data)
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
