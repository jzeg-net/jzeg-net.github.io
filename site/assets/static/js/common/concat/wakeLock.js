let isSupportedWakeLock = 'wakeLock' in navigator
let wakeLock = null

/**
 * 获取本地存储中休眠锁状态的布尔值
 */
const getStored_wakeLock = () => JSON.parse(localStorage.getItem('wakeLock'))

/**
 * 设置本地存储中休眠状态的布尔值
 */
const setStored_wakeLock = (wakeLockStatus) => localStorage.setItem('wakeLock', JSON.stringify(wakeLockStatus))

/**
 * 禁止 设备系统休眠
 * 成功禁止休眠，将会返回 true，没有成功禁止休眠，将会返回 false
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
    console.log(new Date().toLocaleString(), ' 请求锁出错 ', err.message)
  }

  return false
}

/**
 * 允许 设备系统休眠
 * 成功释放将会返回 true，释放不成功将会返回 false
 */
const releaseWakelock = async () => {
  try {
    wakeLock = await wakeLock.release()
    wakeLock = null
    console.log(new Date().toLocaleString(), ' 释放锁成功')

    return true
  } catch (err) {
    console.log(new Date().toLocaleString(), ' 释放锁出错 ', err.message)
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

/**
 * 根据本地存储的状态，控制设备系统休眠锁
 */
const handleStoryChangeWakelock = () => {
  getStored_wakeLock() === true
    ? releaseWakelock()
    : requestWakelock()
}

const notSupportedWakeLock = () => {
  bModal('', createSmallCenterText('当前浏览器环境不支持本操作'), '', 'sm', true)
}

let screenStatus = document.querySelector('#screenStatus')
if (screenStatus) {
  window.addEventListener('storage', () => {
    if (isSupportedWakeLock) {
      screenStatus.checked = getStored_wakeLock()
    }
  })

  screenStatus.addEventListener('change', (event) => {
    event.preventDefault()
    if (!isSupportedWakeLock) {
      screenStatus.checked = false
      notSupportedWakeLock()
      return
    }

    screenStatus.checked
      ? requestWakelock().then((result) => {screenStatus.checked = result})
      : releaseWakelock().then((result) => {screenStatus.checked = !result})
  })
}
