const abortController = new AbortController()

const { signal } = abortController

const timeout = 5000

/**
 * 通用axios实例
 *
 * 配置了默认的请求超时时间、中止信号等参数
 * 超时时间设置为5000毫秒，超时后会返回'请求超时'错误信息
 *
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
  signal,
  timeout,
  timeoutErrorMessage: '请求超时',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // }
})

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
