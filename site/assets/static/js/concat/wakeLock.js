let isSupportedWakeLock = 'wakeLock' in navigator
let wakeLock = null

/**
 * 禁止 设备系统休眠
 */
const requestWakelock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
    console.log(new Date().toLocaleString(), ' 获取锁成功')
  } catch (err) {
    console.log(new Date().toLocaleString(), ' 获取锁失败 ' + err.message)
  }
}

/**
 * 允许 设备系统休眠
 */
const releaseWakelock = () => {
  if (wakeLock) {
    wakeLock.release()
      .then(() => {
        wakeLock = null
        console.log(new Date().toLocaleString(), ' 释放锁成功')
      })
  } else {
    console.log(new Date().toLocaleString(), ' 释放锁失败,wakeLock不存在')
  }
}

/**
 * 根据页面可见性，控制设备系统休眠锁
 */
const handleVisibilityChangeWakelock = () => (
  document.visibilityState === 'hidden'
    ? releaseWakelock()
    : requestWakelock()
)
