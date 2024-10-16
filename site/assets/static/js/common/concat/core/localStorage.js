/**
 * 清空 localStorage 中的所有数据
 * 该函数没有参数和返回值
 */
const clearLocalStorage = () => localStorage.clear()

/**
 * 从 localStorage 中移除指定 key 的数据
 * @param {string} key - 要移除的键名
 * 该函数没有返回值
 */
const removeLocalStorage = (key) => localStorage.removeItem(key)

/**
 * 将数据保存到 localStorage 中
 * @param {string} key - 要保存的键名
 * @param {string} value - 要保存的键值
 * 该函数没有返回值
 */
const setLocalStorage = (key, value) => localStorage.setItem(key, value)

/**
 * 从 localStorage 中获取指定 key 的数据
 * @param {string} key - 要获取的键名
 * @return {string|null} - 返回获取到的键值，如果键不存在则返回 null
 */
const getLocalStorage = (key) => localStorage.getItem(key)

/**
 * 清除 localStorage 中符合特定条件的所有项
 *
 * @param {function(string): boolean} matchFunction - 匹配函数，用于确定哪些键需要被移除
 */
const clearLocalStorageByMatch = matchFunction => {
  // 获取localStorage中所有键名
  const keys = Object.keys(localStorage)

  // 遍历所有键名，检查是否符合匹配条件
  keys.forEach(key => {
    // 如果键名符合匹配条件，则移除该项
    if (matchFunction(key)) removeLocalStorage(key)
  })
}

/**
 * 创建一个匹配函数，用于匹配以特定字符串结尾的键名
 *
 * @param {string} $endWithKey - 储存键名的后缀，用于匹配要清除的项
 * @returns {function(string): boolean} - 匹配函数
 */
const createEndsWithMatcher = $endWithKey => key => key.endsWith($endWithKey)

/**
 * 创建一个匹配函数，用于匹配以特定字符串开头的键名
 *
 * @param {string} $startWithKey - 储存键名的前缀，用于匹配要清除的项
 * @returns {function(string): boolean} - 匹配函数
 */
const createStartsWithMatcher = $startWithKey => key => key.startsWith($startWithKey)
