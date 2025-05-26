let storageKey_aqxcStudyIndustryCategory = 'aqxcStudyIndustryCategory'
let storageKey_aqxcStudySpecialCategory = 'aqxcStudySpecialCategory'

const getStorageAqxcStudyIndustryCategory = () => getLocalStorage(storageKey_aqxcStudyIndustryCategory)
const getStorageAqxcStudySpecialCategory = () => getLocalStorage(storageKey_aqxcStudySpecialCategory)
const setStorageAqxcStudyIndustryCategory = value => setLocalStorage(storageKey_aqxcStudyIndustryCategory, value)
const setStorageAqxcStudySpecialCategory = value => setLocalStorage(storageKey_aqxcStudySpecialCategory, value)
const removeStorageAqxcStudyIndustryCategory = () => removeLocalStorage(storageKey_aqxcStudyIndustryCategory)
const removeStorageAqxcStudySpecialCategory = () => removeLocalStorage(storageKey_aqxcStudySpecialCategory)

let category_radioBtns = document.querySelectorAll('input[type=radio][name=category]')
let videoSelect = document.querySelector('#videoSelect')

// 缓存有效期
const cacheExpirationTime = 3600 * 1e3

// 用于存储初始内容
let initialVideoSelectInnerHTML = videoSelect.innerHTML

const createOption = data => {
  let opt = document.createElement('option')
  opt.value = data.value
  opt.textContent = data.text

  return opt
}

const populateSelectWithOptions = data => {
  let fragment = document.createDocumentFragment()

  Object.keys(data).forEach(key => {
    let category_name = data[key]['category_name']
    let category_id = data[key]['category_id']

    let optionData = {
      value: category_id,
      text: category_name,
    }
    let option = createOption(optionData)
    fragment.appendChild(option)
  })

  return fragment
}

category_radioBtns.forEach(categoryID_radioBtn => {
  categoryID_radioBtn.addEventListener('change', function () {
    let category_id_value = document.querySelector('input[type=radio][name=category]:checked').value

    let cachedCategory = category_id_value === '1'
      ? JSON.parse(getStorageAqxcStudyIndustryCategory())
      : JSON.parse(getStorageAqxcStudySpecialCategory())

    if (cachedCategory && Date.now() < cachedCategory.expires) {
      // 如果有缓存，并且缓存未过期，则直接使用缓存数据
      let cachedCategoryData = cachedCategory.data
      videoSelect.innerHTML = ''
      videoSelect.appendChild(populateSelectWithOptions(cachedCategoryData))

      return
    }

    videoSelect.innerHTML = ''
    videoSelect.append(populateSelectWithOptions([
      {
        category_name: '加载中。。。',
      }
    ]))

    const baseUrl = aqxcApiUrl + 'video/category'
    const queryParams = {
      token: getStorageAqxcToken(),
      account: getStorageAqxcAccount(),
      category_id: category_id_value,
    }
    const url = addQueryParams(baseUrl, queryParams)

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(r => {
        if (!r.ok) {
          r.json().then(data => {
            bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          })
          return Promise.reject(new Error(data.message))
        }
        return r.json()
      })
      .then(res => {
        let videoData = res.data

        let newCachedCategory = {
          expires: Date.now() + cacheExpirationTime,
          data: videoData,
        }
        category_id_value === '1'
          ? setStorageAqxcStudyIndustryCategory(JSON.stringify(newCachedCategory))
          : setStorageAqxcStudySpecialCategory(JSON.stringify(newCachedCategory))

        // 清空 videoSelect
        videoSelect.innerHTML = ''

        // 添加新数据
        videoSelect.appendChild(populateSelectWithOptions(videoData))
      })
  })
})

const getStudyCategory = () => {
}
