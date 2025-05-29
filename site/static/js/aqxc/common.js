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
