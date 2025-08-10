const storageAqxcTesterCategoryKey = 'aqxcTesterCategory'

const getStorageAqxcTesterCategory = () => getLocalStorage(storageAqxcTesterCategoryKey)

const setStorageAqxcTesterCategory = (value) => setLocalStorage(storageAqxcTesterCategoryKey, value)

const removeStorageAqxcTesterCategory = () => removeLocalStorage(storageAqxcTesterCategoryKey)

const categorySelect = document.querySelector('#categorySelect')

const populateSelectWithOptions = data => {
  const fragment = document.createDocumentFragment()
  const selectorType = categorySelect?.dataset.type

  Object.keys(data).forEach(key => {
    const id = selectorType === 'exam'
      ? data[key]['exam_list'][0]['exam_id']
      : data[key]['exam_list'][0]['category_id']
    const name = data[key]['exam_list'][0]['exam_title']
    const count = data[key]['exam_list'][0]['question_count']

    const optionData = {
      value: id,
      text: name + `『 ${count} 』`,
    }
    const option = createOption(optionData)
    fragment.appendChild(option)
  })

  return fragment
}

const getTesterCategory = () => {
  const cachedCategory = JSON.parse(getStorageAqxcTesterCategory())

  // 判断缓存是否可用
  if (cachedCategory && (Date.now() < cachedCategory.expires)) {
    // 使用缓存
    categorySelect.append(populateSelectWithOptions(cachedCategory.data))
    return
  }

  const path = 'category/tester'

  aqxcAxios.post(path)
    .then(res => {
      setStorageAqxcTesterCategory(buildStorageString(res))

      categorySelect.append(populateSelectWithOptions(res))
    })
    .catch(err => {
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)
    })
}

categorySelect?.addEventListener('click', getTesterCategory, { once: true })
