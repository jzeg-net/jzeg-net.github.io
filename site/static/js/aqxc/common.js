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
