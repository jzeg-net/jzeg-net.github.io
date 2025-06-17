let storageAqxcTesterCategoryKey = 'aqxcTesterCategory'

const getStorageAqxcTesterCategory = () => getLocalStorage(storageAqxcTesterCategoryKey)

const setStorageAqxcTesterCategory = (value) => setLocalStorage(storageAqxcTesterCategoryKey, value)

const removeStorageAqxcTesterCategory = () => removeLocalStorage(storageAqxcTesterCategoryKey)

let categorySelect = document.querySelector('#categorySelect')

const populateSelectWithOptions = data => {
  let fragment = document.createDocumentFragment()

  Object.keys(data).forEach(key => {
    const name = data[key]['exam_list'][0]['exam_title']
    const id = data[key]['exam_list'][0]['exam_id']
    const count = data[key]['exam_list'][0]['question_count']

    let optionData = {
      value: id,
      text: name + `『 ${count} 』`,
    }
    let option = createOption(optionData)
    fragment.appendChild(option)
  })

  return fragment
}

const getTesterCategory = () => {
  let cachedCategory = JSON.parse(getStorageAqxcTesterCategory())

  // 判断缓存是否可用
  if (cachedCategory && (Date.now() < cachedCategory.expires)) {
    // 使用缓存
    categorySelect.append(populateSelectWithOptions(cachedCategory.data))
    return
  }

  // 从API获取数据
  let baseUrl = aqxcApiUrl + 'tester/category'
  const queryParams = {
    token: getStorageAqxcToken(),
    account: getStorageAqxcAccount(),
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
      // 如果有 code 和 message，则显示错误信息，并且后面不再执行后续代码
      if (res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)

        return
      }
      if (!res.hasOwnProperty('data')) {
        bModal('', createSmallCenterText('没有从服务器获取到数据', 'danger'), '', 'sm', true)

        return
      }

      let categoryData = res.data

      let newCachedCategory = {
        expires: Date.now() + (3600 * 1e3), // 缓存1小时
        data: categoryData,
      }
      setStorageAqxcTesterCategory(JSON.stringify(newCachedCategory))

      categorySelect.append(populateSelectWithOptions(categoryData))
    })
}

categorySelect.addEventListener('click', () => {
  getTesterCategory()
}, { once: true })
