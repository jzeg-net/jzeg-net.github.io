// api 根地址
let aqxcApiUrl = 'https://api.jzeg.net/api/aqxc/v1/'
let aqxcApiExtendUrl = 'https://api.jzeg.net/api/aqxc/extend/'

let storageTokenKey = 'aqxcToken'
let storageAccountKey = 'aqxcAccount'

const getStorageAqxcToken = () => getLocalStorage(storageTokenKey)
const getStorageAqxcAccount = () => getLocalStorage(storageAccountKey)
const setStorageAqxcToken = (token) => setLocalStorage(storageTokenKey, token)
const setStorageAqxcAccount = (account) => setLocalStorage(storageAccountKey, account)
const removeStorageAqxcToken = () => removeLocalStorage(storageTokenKey)
const removeStorageAqxcAccount = () => removeLocalStorage(storageAccountKey)

// 缓存有效期 9 小时
const cacheExpirationTime = 1e3 * 3600 * 9

const buildStorageString = (cacheData, expires= Date.now() + cacheExpirationTime) => {
  return JSON.stringify({
    expires: expires,
    data: cacheData,
  })
}
