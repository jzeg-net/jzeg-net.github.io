// 缓存有效期 9 小时
const cacheExpirationTime = 1e3 * 3600 * 9

const buildStorageString = (cacheData, expires= Date.now() + cacheExpirationTime) => {
  return JSON.stringify({
    expires: expires,
    data: cacheData,
  })
}
