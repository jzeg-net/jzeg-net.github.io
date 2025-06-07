let videoStat = document.querySelector('#videoStat')

// 处理排行信息
const handleRanking = (data) => {
  const fragment = document.createDocumentFragment()
  const hr = document.createElement('hr')

  const section = document.createElement('section')
  section.className = 'card-body row justify-content-around row-gap-1 text-center'

  const titleList = [
    { key: 'totalTime', title: '学习时长' },
    { key: 'studyStats', title: '观看数量' },
    { key: 'visitStats', title: '观看次数' },
    { key: 'ranking', title: '排名' },
    { key: 'regionRanking', title: '地区排名' },
  ]

  Object.entries(data).forEach(([key, value]) => {
    const article = document.createElement('article')

    if (key === 'totalTime') {
      article.classList.add('col-12', 'row')
      value = formatSecondsToHMS(value)
    } else {
      article.classList.add('col-6', 'row')
    }

    const span_title = document.createElement('span')
    const span_value = document.createElement('span')
    span_title.classList.add('fw-bolder')
    span_value.classList.add('fs-5')

    span_title.textContent = titleList.find(item => item.key === key).title
    span_value.textContent = value

    article.appendChild(span_title)
    article.appendChild(span_value)
    section.appendChild(article)
  })
  fragment.appendChild(section)
  fragment.appendChild(hr)

  return fragment
}

// 生成进度条
const createProgressBar = (valuenow) => {
  // 去除非数字字符，但是不要影响浮点数
  valuenow = valuenow.replace(/[^0-9.]/ig, '')

  const progress = document.createElement('div')
  const progress_bar = document.createElement('div')

  progress.className = 'progress'
  progress.role = 'progressbar'
  progress.ariaLabel = 'Progress'
  progress.setAttribute('aria-valuenow', Math.max(0, Math.min(100, valuenow)))
  progress.setAttribute('aria-valuemin', 0)
  progress.setAttribute('aria-valuemax', 100)

  progress_bar.className = 'progress-bar progress-bar-striped progress-bar-animated'
  progress_bar.style.width = valuenow + '%'
  progress_bar.textContent = valuenow + '%'

  if (valuenow === '100') {
    progress_bar.classList.add('text-bg-success')
    progress_bar.textContent = '已完成'
  } else {
    progress_bar.classList.add('text-bg-warning')
  }

  progress.appendChild(progress_bar)

  return progress
}

// 处理进度列表
const progressList = (data) => {
  const fragment = document.createDocumentFragment()

  const cardBody = document.createElement('div')
  cardBody.className = 'card-body'
  const nav = document.createElement('nav')
  nav.className = 'mb-1'

  const tabList = document.createElement('div')
  tabList.className = 'nav nav-underline justify-content-around'
  tabList.role = 'tablist'

  const hr = document.createElement('hr')

  // tabContent
  const tabContent = document.createElement('div')
  tabContent.className = 'tab-content mb-3'

  data.forEach((item, index) => {
    const { category_name, category_id, sub_list } = item
    const btn = document.createElement('button')
    btn.className = 'nav-link'
    index === 0 && btn.classList.add('active')
    btn.id = 'nav-' + category_id + '-tab'
    btn.type = 'button'
    btn.role = 'tab'
    btn.dataset['bsToggle'] = 'tab'
    btn.dataset['bsTarget'] = '#nav-' + category_id
    btn.setAttribute('aria-controls', 'nav-' + category_id)
    btn.ariaSelected = index === 0
    btn.ariaSelected === 'false' && (btn.tabIndex = -1)
    btn.textContent = category_name

    tabList.appendChild(btn)

    const tabPane = document.createElement('section')
    tabPane.className = 'tab-pane fade'
    index === 0 && tabPane.classList.add('show', 'active')
    tabPane.id = 'nav-' + category_id
    tabPane.role = 'tabpanel'
    tabPane.setAttribute('aria-labelledby', 'nav-' + category_id + '-tab')
    tabPane.tabIndex = 0

    sub_list.forEach(item => {
      const { name, learned, percent, total } = item
      const article = document.createElement('article')
      const div = document.createElement('div')
      const span_title = document.createElement('span')
      const span_value = document.createElement('span')
      article.className = 'mb-2'
      div.className = 'd-flex justify-content-between'
      span_title.textContent = name
      span_value.textContent = '「 ' + learned + '/' + total + ' 」'

      div.appendChild(span_title)
      div.appendChild(span_value)
      article.appendChild(div)
      article.appendChild(createProgressBar(percent))
      tabPane.appendChild(article)
    })
    tabContent.appendChild(tabPane)
  })

  nav.appendChild(tabList)
  cardBody.appendChild(nav)
  cardBody.appendChild(hr)
  cardBody.appendChild(tabContent)
  fragment.appendChild(cardBody)

  return fragment
}

const xxx = (data) => {
  const { ranking, regionRanking, studyStats, totalTime, visitStats, progress } = data
  const result = document.querySelector('#result')
  const rankingFragment = handleRanking({ totalTime, studyStats, visitStats, ranking, regionRanking })
  const processFragment = progressList(progress)

  // 将result 元素下除了第一个元素，其他的元素都清除
  while (result.childElementCount > 1) {
    result.removeChild(result.lastElementChild)
  }

  result.appendChild(rankingFragment)
  result.appendChild(processFragment)
}

const request = (event) => {
  const target = event.target
  setInsertNewElement(target, createNewSpinner())
  setBtnDisabledStatus(target)

  const data = {
    account: getStorageAqxcAccount(),
    token: getStorageAqxcToken(),
  }
  const url = aqxcApiExtendUrl + 'profile/videoStat'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(r => {
      if (!r.ok) {
        r.json().then(data => {
          return bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(data.message))
      }
      return r.json()
    })
    .then(r => {
      xxx(r.data)
    })
    .finally(() => {
      clearSubmitSpinner(target)
      setBtnDisabledStatus(target)
    })
}

videoStat?.addEventListener('click', request)
