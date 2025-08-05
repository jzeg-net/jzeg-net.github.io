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
