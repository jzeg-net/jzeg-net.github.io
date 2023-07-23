let wakeLock = null

/**
 * 禁止 设备系统休眠
 */
const acquireLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
    console.log(new Date().toLocaleString(), ' 获取锁')
  } catch (err) {
    console.log(new Date().toLocaleString(), ' 获取锁失败')
    console.log(`${err.name}, ${err.message}`)
  }
}
/**
 * 允许 设备系统休眠
 */
const releaseLock = () => {
  if (wakeLock) {
    wakeLock.release()
      .then(() => wakeLock = null)
    console.log(new Date().toLocaleString(), ' 释放锁')
  }
}
/**
 * 根据页面可见性，控制设备系统休眠锁
 */
const handleVisibilityChange = () => (
  document.visibilityState === 'hidden'
    ? releaseLock()
    : acquireLock()
)
