let storageAqxcQuizCategoryKey = 'aqxcQuizCategory'

const getStorageAqxcQuizCategory = () => localStorage.getItem(storageAqxcQuizCategoryKey)

const setStorageAqxcQuizCategory = (value) => localStorage.setItem(storageAqxcQuizCategoryKey, value)

const removeStorageAqxcQuizCategory = () => localStorage.removeItem(storageAqxcQuizCategoryKey)

let categorySelect = document.querySelector('#categorySelect')

const createOption = data => {
  let opt = document.createElement('option')
  opt.value = data.value
  opt.innerText = data.text

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

const addQueryParams = (url, params) => {
  const queryString = new URLSearchParams(params)

  return `${url}?${queryString.toString()}`
}

const getQuizCategory = () => {
  let cachedCategory = JSON.parse(getStorageAqxcQuizCategory())

  // 判断缓存是否可用
  if (cachedCategory && (Date.now() < cachedCategory.expires)) {
    // 使用缓存
    categorySelect.append(populateSelectWithOptions(cachedCategory.data))
  } else {
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
      .then(res => res.json())
      .then(res => {
        // 如果有 code 和 message，则显示错误信息，并且后面不再执行后续代码
        if (res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
          bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)
          return
        }

        let categoryData = res.data

        let newCachedCategory = {
          expires: Date.now() + (3600 * 1e3), // 缓存1小时
          data: categoryData,
        }
        setStorageAqxcQuizCategory(JSON.stringify(newCachedCategory))

        categorySelect.append(populateSelectWithOptions(categoryData))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

categorySelect.addEventListener('click', () => {
  getQuizCategory()
}, { once: true })
