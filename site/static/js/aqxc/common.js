// api 根地址
let aqxcApiUrl = 'https://api.jzeg.net/api/aqxc/v1/'

let storageTokenKey = 'aqxcToken'
let storageAccountKey = 'aqxcAccount'

const getStorageAqxcToken = () => localStorage.getItem(storageTokenKey)
const getStorageAqxcAccount = () => localStorage.getItem(storageAccountKey)
const setStorageAqxcToken = (token) => localStorage.setItem(storageTokenKey, token)
const setStorageAqxcAccount = (account) => localStorage.setItem(storageAccountKey, account)
const removeStorageAqxcToken = () => localStorage.removeItem(storageTokenKey)
const removeStorageAqxcAccount = () => localStorage.removeItem(storageAccountKey)
