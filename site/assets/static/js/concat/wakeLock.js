let isSupportedWakeLock = 'wakeLock' in navigator
let wakeLock = null

/**
 * 禁止 设备系统休眠
 */
const requestWakelock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
    console.log(new Date().toLocaleString(), ' 请求锁成功')

    wakeLock.addEventListener('release', () => {
      console.log(new Date().toLocaleString(), ' 发生释放')
    })

    return true
  } catch (err) {
    console.log(new Date().toLocaleString(), ' 请求锁出错 ' + err.message)
  }

  return false
}

/**
 * 允许 设备系统休眠
 */
const releaseWakelock = async () => {
  try {
    wakeLock = await wakeLock.release().then(() => {
      wakeLock = null
      console.log(new Date().toLocaleString(), ' 释放锁成功')
      return true
    })
  } catch (err) {
    console.log(new Date().toLocaleString(), err.name, err.message)
  }

  return false
}

/**
 * 根据页面可见性，控制设备系统休眠锁
 */
const handleVisibilityChangeWakelock = () => (
  document.visibilityState === 'hidden'
    ? releaseWakelock()
    : requestWakelock()
)
