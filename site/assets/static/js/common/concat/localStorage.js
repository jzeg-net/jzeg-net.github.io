const clearLocalStorage = () => localStorage.clear()

const removeLocalStorage = (key) => localStorage.removeItem(key)

const setLocalStorage = (key, value) => localStorage.setItem(key, value)

const getLocalStorage = (key) => localStorage.getItem(key) ? localStorage.getItem(key) : false
