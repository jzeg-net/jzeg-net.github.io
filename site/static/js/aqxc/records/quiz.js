let result = document.querySelector('#result')
if (result) {
  const typeList = [
    { key: '2', value: '个人赛' },
    { key: '5', value: 'PK对战' },
    { key: '6', value: '四人赛' },
    { key: '7', value: '闯关赛' },
    { key: '1', value: '练习赛' },
  ]
  const request = (typeKey, tabPanel) => {
    const url = aqxcApiExtendUrl + 'record/quiz'
    const data = {
      account: getStorageAqxcAccount(),
      token: getStorageAqxcToken(),
      type: typeKey,
      page: 1,
      page_size: 20,
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then(r => {
        if (!r.ok) {
          r.json().then(data => {
            return bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          })
          return Promise.reject(new Error(r.statusText))
        }
        return r.json()
      })
      .then(r => {
        if (r.data.length === 0) {
          tabPanel.innerHTML = `<h6 class="card-title text-center">今日暂无记录</h6>`
          return
        }

        tabPanel.innerHTML = r.data.map(item => {
          return `<div class="card-body border-bottom">
                  <h5 class="card-title">${item['category_name']}</h5>
                  <p class="card-text">${item['created_at']}</p>
                </div>`
        }).join('')
      })
      .finally()
  }

  // 页面加载完成后执行
  window.addEventListener('load', () => {
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

    typeList.forEach((item, index) => {
      const tab = document.createElement('button')
      tab.className = 'nav-link'
      index === 0 && tab.classList.add('active')
      tab.id = 'nav-' + item.key + '-tab'
      tab.type = 'button'
      tab.role = 'tab'
      tab.dataset['bsToggle'] = 'tab'
      tab.textContent = item.value
      tab.dataset['bsTarget'] = '#nav-' + item.key
      tab.ariaSelected = index === 0
      tab.ariaSelected === 'false' && (tab.tabIndex = -1)

      tabList.append(tab)

      const tabPanel = document.createElement('section')
      tabPanel.className = 'tab-pane fade'
      index === 0 && tabPanel.classList.add('show', 'active')
      tabPanel.id = 'nav-' + item.key
      tabPanel.role = 'tabpanel'
      tabPanel.ariaLabelledby = 'nav-' + item.key + '-tab'
      tabPanel.innerHTML = `<h6 class="card-title text-center">加载中...</h6>`

      if (index !== 0) {
        tab.addEventListener('show.bs.tab', () => {
          request(item.key, tabPanel)
        }, { once: true })
      } else {
        request(item.key, tabPanel)
      }

      tabContent.append(tabPanel)
    })

    nav.append(tabList)
    cardBody.append(nav)
    cardBody.append(hr)
    cardBody.append(tabContent)
    fragment.append(cardBody)

    result.append(fragment)
  })
}
