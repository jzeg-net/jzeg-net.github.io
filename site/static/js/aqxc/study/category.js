const storageKey_aqxcStudyIndustryCategory = 'aqxcStudyIndustryCategory'
const storageKey_aqxcStudySpecialCategory = 'aqxcStudySpecialCategory'

const getStorageAqxcStudyIndustryCategory = () => getLocalStorage(storageKey_aqxcStudyIndustryCategory)
const getStorageAqxcStudySpecialCategory = () => getLocalStorage(storageKey_aqxcStudySpecialCategory)
const setStorageAqxcStudyIndustryCategory = value => setLocalStorage(storageKey_aqxcStudyIndustryCategory, value)
const setStorageAqxcStudySpecialCategory = value => setLocalStorage(storageKey_aqxcStudySpecialCategory, value)
const removeStorageAqxcStudyIndustryCategory = () => removeLocalStorage(storageKey_aqxcStudyIndustryCategory)
const removeStorageAqxcStudySpecialCategory = () => removeLocalStorage(storageKey_aqxcStudySpecialCategory)

const category_radioBtns = document.querySelectorAll('input[type=radio][name=category]')
const videoSelect = document.querySelector('#videoSelect')

// 用于存储初始内容
const initialVideoSelectInnerHTML = videoSelect.innerHTML

const populateSelectWithOptions = data => {
  const fragment = document.createDocumentFragment()

  Object.keys(data).forEach(key => {
    const category_name = data[key]['category_name']
    const category_id = data[key]['category_id']
    const video_count = data[key]['video_count'] ? `『 ${data[key]['video_count']} 』` : ''

    const optionData = {
      value: category_id,
      text: category_name + video_count,
    }
    const option = createOption(optionData)
    fragment.appendChild(option)
  })

  return fragment
}

category_radioBtns.forEach(categoryID_radioBtn => {
  categoryID_radioBtn.addEventListener('change', function () {
    const category_id_value = document.querySelector('input[type=radio][name=category]:checked').value

    const cachedCategory = category_id_value === '1'
      ? JSON.parse(getStorageAqxcStudyIndustryCategory())
      : JSON.parse(getStorageAqxcStudySpecialCategory())

    if (cachedCategory && Date.now() < cachedCategory.expires) {
      // 如果有缓存，并且缓存未过期，则直接使用缓存数据
      const cachedCategoryData = cachedCategory.data
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
          return Promise.reject(new Error(r.statusText))
        }
        return r.json()
      })
      .then(res => {
        const videoData = res.data

        category_id_value === '1'
          ? setStorageAqxcStudyIndustryCategory(buildStorageString(videoData))
          : setStorageAqxcStudySpecialCategory(buildStorageString(videoData))

        // 清空 videoSelect
        videoSelect.innerHTML = ''

        // 添加新数据
        videoSelect.appendChild(populateSelectWithOptions(videoData))
      })
  })
})

const getStudyCategory = () => {
}
