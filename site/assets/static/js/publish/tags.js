const chineseArticleTags = [
  {
    category: '科技',
    tags: [
      {
        tag: '人工智能',
        count: 42,
        icon: true,
        description: '这是人工智能的中文描述'
      },
      {
        tag: '大数据',
        count: 76,
        icon: false,
        description: '这是大数据的中文描述'
      },
      {
        tag: '云计算',
        count: 35,
        icon: true,
        description: '这是云计算的中文描述'
      },
      {
        tag: '物联网',
        count: 68,
        icon: false,
        description: '这是物联网的中文描述'
      }
    ]
  },
  {
    category: '娱乐',
    tags: [
      {
        tag: '电影',
        count: 28,
        icon: true,
        description: '这是电影的中文描述'
      },
      {
        tag: '音乐',
        count: 63,
        icon: false,
        description: '这是音乐的中文描述'
      },
      {
        tag: '游戏',
        count: 45,
        icon: true,
        description: '这是游戏的中文描述'
      },
      {
        tag: '综艺',
        count: 87,
        icon: false,
        description: '这是综艺的中文描述'
      }
    ]
  },
  {
    category: '生活',
    tags: [
      {
        tag: '美食',
        count: 87,
        icon: true,
        description: '这是美食的中文描述'
      },
      {
        tag: '旅行',
        count: 54,
        icon: false,
        description: '这是旅行的中文描述'
      },
      {
        tag: '家居',
        count: 32,
        icon: true,
        description: '这是家居的中文描述'
      },
      {
        tag: '宠物',
        count: 76,
        icon: false,
        description: '这是宠物的中文描述'
      }
    ]
  },
  {
    category: '教育',
    tags: [
      {
        tag: '语文',
        count: 31,
        icon: true,
        description: '这是语文的中文描述'
      },
      {
        tag: '数学',
        count: 98,
        icon: false,
        description: '这是数学的中文描述'
      },
      {
        tag: '英语',
        count: 56,
        icon: true,
        description: '这是英语的中文描述'
      },
      {
        tag: '物理',
        count: 23,
        icon: false,
        description: '这是物理的中文描述'
      }
    ]
  },
  {
    category: '健康',
    tags: [
      {
        tag: '健身',
        count: 23,
        icon: true,
        description: '这是健身的中文描述'
      },
      {
        tag: '养生',
        count: 72,
        icon: false,
        description: '这是养生的中文描述'
      },
      {
        tag: '心理健康',
        count: 45,
        icon: true,
        description: '这是心理健康的中文描述'
      },
      {
        tag: '疾病预防',
        count: 67,
        icon: false,
        description: '这是疾病预防的中文描述'
      }
    ]
  },
  {
    category: '时尚',
    tags: [
      {
        tag: '服装',
        count: 67,
        icon: true,
        description: '这是服装的中文描述'
      },
      {
        tag: '美容',
        count: 45,
        icon: false,
        description: '这是美容的中文描述'
      },
      {
        tag: '饰品',
        count: 39,
        icon: true,
        description: '这是饰品的中文描述'
      },
      {
        tag: '发型',
        count: 81,
        icon: false,
        description: '这是发型的中文描述'
      }
    ]
  },
  {
    category: '财经',
    tags: [
      {
        tag: '股票',
        count: 56,
        icon: true,
        description: '这是股票的中文描述'
      },
      {
        tag: '基金',
        count: 81,
        icon: false,
        description: '这是基金的中文描述'
      },
      {
        tag: '债券',
        count: 63,
        icon: true,
        description: '这是债券的中文描述'
      },
      {
        tag: '期货',
        count: 28,
        icon: false,
        description: '这是期货的中文描述'
      }
    ]
  },
  {
    category: '体育',
    tags: [
      {
        tag: '足球',
        count: 39,
        icon: true,
        description: '这是足球的中文描述'
      },
      {
        tag: '篮球',
        count: 69,
        icon: false,
        description: '这是篮球的中文描述'
      },
      {
        tag: '网球',
        count: 54,
        icon: true,
        description: '这是网球的中文描述'
      },
      {
        tag: '高尔夫',
        count: 98,
        icon: false,
        description: '这是高尔夫的中文描述'
      }
    ]
  }
]
const englishArticleTags = [
  {
    category: 'Technology',
    tags: [
      {
        tag: 'Artificial Intelligence',
        count: 42,
        icon: true,
        description: 'This is the English description of artificial intelligence'
      },
      {
        tag: 'Big Data',
        count: 76,
        icon: false,
        description: 'This is the English description of big data'
      },
      {
        tag: 'Cloud Computing',
        count: 35,
        icon: true,
        description: 'This is the English description of cloud computing'
      },
      {
        tag: 'Internet of Things',
        count: 68,
        icon: false,
        description: 'This is the English description of the Internet of Things'
      }
    ]
  },
  {
    category: 'Entertainment',
    tags: [
      {
        tag: 'Movies',
        count: 28,
        icon: true,
        description: 'This is the English description of movies'
      },
      {
        tag: 'Music',
        count: 63,
        icon: false,
        description: 'This is the English description of music'
      },
      {
        tag: 'Games',
        count: 45,
        icon: true,
        description: 'This is the English description of games'
      },
      {
        tag: 'Variety Shows',
        count: 87,
        icon: false,
        description: 'This is the English description of variety shows'
      }
    ]
  },
  {
    category: 'Life',
    tags: [
      {
        tag: 'Food',
        count: 87,
        icon: true,
        description: 'This is the English description of food'
      },
      {
        tag: 'Travel',
        count: 54,
        icon: false,
        description: 'This is the English description of travel'
      },
      {
        tag: 'Home Furnishing',
        count: 32,
        icon: true,
        description: 'This is the English description of home furnishing'
      },
      {
        tag: 'Pets',
        count: 76,
        icon: false,
        description: 'This is the English description of pets'
      }
    ]
  },
  {
    category: 'Education',
    tags: [
      {
        tag: 'Chinese',
        count: 31,
        icon: true,
        description: 'This is the English description of Chinese'
      },
      {
        tag: 'Mathematics',
        count: 98,
        icon: false,
        description: 'This is the English description of mathematics'
      },
      {
        tag: 'English',
        count: 56,
        icon: true,
        description: 'This is the English description of English'
      },
      {
        tag: 'Physics',
        count: 23,
        icon: false,
        description: 'This is the English description of physics'
      }
    ]
  },
  {
    category: 'Health',
    tags: [
      {
        tag: 'Fitness',
        count: 23,
        icon: true,
        description: 'This is the English description of fitness'
      },
      {
        tag: 'Health Preservation',
        count: 72,
        icon: false,
        description: 'This is the English description of health preservation'
      },
      {
        tag: 'Mental Health',
        count: 45,
        icon: true,
        description: 'This is the English description of mental health'
      },
      {
        tag: 'Disease Prevention',
        count: 67,
        icon: false,
        description: 'This is the English description of disease prevention'
      }
    ]
  },
  {
    category: 'Fashion',
    tags: [
      {
        tag: 'Clothing',
        count: 67,
        icon: true,
        description: 'This is the English description of clothing'
      },
      {
        tag: 'Beauty',
        count: 45,
        icon: false,
        description: 'This is the English description of beauty'
      },
      {
        tag: 'Accessories',
        count: 39,
        icon: true,
        description: 'This is the English description of accessories'
      },
      {
        tag: 'Hair Style',
        count: 81,
        icon: false,
        description: 'This is the English description of hair style'
      }
    ]
  },
  {
    category: 'Finance',
    tags: [
      {
        tag: 'Stocks',
        count: 56,
        icon: true,
        description: 'This is the English description of stocks'
      },
      {
        tag: 'Funds',
        count: 81,
        icon: false,
        description: 'This is the English description of funds'
      },
      {
        tag: 'Bonds',
        count: 63,
        icon: true,
        description: 'This is the English description of bonds'
      },
      {
        tag: 'Futures',
        count: 28,
        icon: false,
        description: 'This is the English description of futures'
      }
    ]
  },
  {
    category: 'Sports',
    tags: [
      {
        tag: 'Football',
        count: 39,
        icon: true,
        description: 'This is the English description of football'
      },
      {
        tag: 'Basketball',
        count: 69,
        icon: false,
        description: 'This is the English description of basketball'
      },
      {
        tag: 'Tennis',
        count: 54,
        icon: true,
        description: 'This is the English description of tennis'
      },
      {
        tag: 'Golf',
        count: 98,
        icon: false,
        description: 'This is the English description of golf'
      }
    ]
  }
]

class TagManager {
  constructor (container) {
    this.initContainer(container)

    // 标签列表
    this.tags = []
    // 已经选中的标签列表
    this.tagSelected = []
    // 标签列表最大数量阈值
    this.maxQuantity = 5
    // 请求所有的标签
    this.requestCategoryTagData()

    this._remainingTagCount()
    this.clear()
    this._render_tabNav(this.tags)

    this.titleReset.addEventListener('click', event => {
      event.preventDefault()
      this.titleInput.value = ''
      this.titleInput.focus()
    })

    this.tagSearchReset.addEventListener('click', event => {
      event.preventDefault()
      this.tagSearchInput.value = ''
      this.tagSearchInput.focus()

      const collapse = this.tagSearchResult_collapse()
      collapse.hide()
    })

    this.tagSearchInput.addEventListener('keyup', event => {
      event.preventDefault()
      // if (event.keyCode !== 13) return
      const searchValue = event.target.value
      this.tagSearch(searchValue)
    })
  }

  // 各个容器元素的初始化
  initContainer (container) {
    this.container = document.querySelector(container)
    this.tagSelectedList = this.container.querySelector('#tagSelectedList')
    this.tagSelectedBtnList = this.container.querySelector('#tagSelectedBtnList')
    this.tagNavCategoryList = this.container.querySelector('#tagNavCategoryList')
    this.tagNavTabList = this.container.querySelector('#tagNavTabList')
    this.tagCount = this.container.querySelector('#remainingTagCount')
    this.titleInput = document.querySelector('#titleInput')
    this.titleReset = document.querySelector('#titleReset')
    this.tagSearchInput = this.container.querySelector('#tagSearchInput')
    this.tagSearchReset = this.container.querySelector('#tagSearchReset')
    this.tagSearchResult = this.container.querySelector('#tagSearchResult')
    this.tagMessage = this.container.querySelector('#tagMessage')
  }

  // 向标签列表末尾添加指定的标签
  add (tagName) {
    if (this._isAdd(tagName)) {
      return true
    }

    const result = this.tagSelected.push(tagName)

    this.refreshTagSelectedListContent()
    this._create_tagsSelectedBtnList(tagName)
    // 显示剩余的可以选择标签的数量
    this._remainingTagCount()

    return result > 0
  }

  // 从已选择的标签列表中删除指定的标签
  removeTagSelected (tagName) {
    const indexOfTag = this.tagSelected.indexOf(tagName)
    if (indexOfTag === -1) {
      this.tagMessage_collapse('当前没有要删除的标签 ' + tagName)
      return false
    }

    // 根据指定的索引值，从已选择标签的列表中删除标签
    const deleteTagSelected = this.tagSelected.splice(indexOfTag, 1)
    const result = [] !== deleteTagSelected

    if (result) {
      this.refreshTagSelectedListContent()
      // 显示剩余的可以选择标签的数量
      this._remainingTagCount()
      this.tagMessage_collapse('已删除标签：' + tagName, 'success')
    } else {
      this.tagMessage_collapse('删除标签失败：' + tagName)
    }

    return result
  }

  clear () {
    this._create_clearAllBtn()
  }

  // 返回已选择的标签
  getSelectedTags () {
    return this.tagSelected
  }

  // 根据语言设置所有标签数据
  _setData (language) {
    this.tags = chineseArticleTags

    if (language === 'zh') this.tags = chineseArticleTags
    if (language === 'en') this.tags = englishArticleTags
  }

  // 输出当前页面的语言
  _documentLanguage (toLowerCase = false, onlyLanguage = false, isReplaceAll = false) {
    let lang = document.documentElement.lang

    toLowerCase ? lang = lang.toLowerCase() : ''

    onlyLanguage ? lang = lang.split('-')[0] : ''

    isReplaceAll ? lang = lang.replaceAll('-', '_') : ''

    return lang
  }

  /**
   * 模拟请求外部的标签数据
   *
   * 最终实际需要使用 fetch 实现外部请求，但是获取到的数据格式不变
   **/
  requestCategoryTagData () {
    let lang = this._documentLanguage(1, 1)

    this._setData(lang)
  }

  // 渲染标签tab导航
  _render_tabNav (data = []) {
    const category = []
    const categoryTag = []
    data.forEach((current, index) => {
      category[index] = current['category']
      categoryTag[index] = current['tags']
    })

    category.forEach((categoryName, index) => {
      this._create_navCategory(categoryName, !index)
    })

    categoryTag.forEach((tagData, index) => {
      let categoryName = category[index]
      let isActive = !index
      this._create_navTab(categoryName, tagData, isActive)
    })
  }

  // 剩余的可以选择的标签数量
  _remainingTagCount () {
    this.tagCount.textContent = this.maxQuantity - this.tagSelected.length
  }

  tagMessage_collapse (msgText, msgType = 'danger') {
    const msg = document.createElement('span')

    msg.className = 'text-' + msgType
    msg.innerText = msgText
    this._tagMessage_collapse(msg)

    this.tagMessage.innerHTML = ''
    this.tagMessage.append(msg)
  }

  // 刷新已选择标签列表的内容
  refreshTagSelectedListContent () {
    this.tagSelectedList.textContent = this.tagSelected.join(', ')
  }

  // 从已选择标签按钮列表删除指定标签的按钮
  removeTagSelectedBtnList (tagName) {
    let btn = this.tagSelectedBtnList.querySelector(`button[data-tag-name=${tagName}]`)
    if (btn) {
      btn.remove()
    }
  }

  // 清空已选择标签列表中的所有标签，并且重新计数
  _clearAll () {
    this.tagSelected = []
    this.tagSelectedList.innerHTML = ''
    this.tagSelectedBtnList.innerHTML = ''
    this.tagMessage_collapse('已经清除所有的标签', 'success')
    this._remainingTagCount()
    this._create_clearAllBtn()
  }

  // 创建清除所有已经选中标签列表的按钮
  _create_clearAllBtn () {
    const button = document.createElement('button')

    button.className = 'btn-close border border-dark position-absolute top-0 end-0 tagClearAll'
    button.type = 'button'
    button.addEventListener('click', () => this._clearAll())

    this.tagSelectedBtnList.append(button)
  }

  _tagMessage_collapse (msgEl) {
    msgEl.dataset['bsToggle'] = 'collapse'
    msgEl.dataset['bsTarget'] = '#' + this.tagMessage.id
    const collapse = bootstrap.Collapse.getOrCreateInstance(this.tagMessage)
    this.tagMessage.addEventListener('hidden.bs.collapse', () => msgEl.remove())
    this.tagMessage.addEventListener('shown.bs.collapse', () => setTimeout(() => collapse.hide(), 4000))

    collapse.show()
  }

  // 在标签按钮列表创建已选择的标签按钮
  _create_tagsSelectedBtnList (tagName) {
    const button = document.createElement('button')
    const span = document.createElement('span')
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    const title = document.createElementNS(ns, 'title')
    const use = document.createElementNS(ns, 'use')

    button.className = 'btn btn-sm btn-outline-secondary d-flex align-items-center'
    button.type = 'button'
    button.dataset['tagName'] = tagName
    button.title = '删除标签 ' + tagName
    button.ariaLabel = '删除标签 ' + tagName
    button.addEventListener('click', () => {
      this.removeTagSelected(tagName)
      this._inactive_btn(tagName)
      button.remove()
    })

    svg.classList.add('fs-6', 'ps-1', 'bi')
    title.textContent = '删除标签 ' + tagName
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#bi-x-lg')

    span.textContent = tagName
    svg.append(title, use)
    button.append(span, svg)

    this.tagSelectedBtnList.append(button)
  }

  // 在标签搜索结果种创建可选的标签按钮列表
  _create_tagSearchResultList (searchResultData) {
    this.tagSearchResult.innerHTML = ''
    const tagSearchResultList = document.createElement('div')

    tagSearchResultList.className = 'list-group list-group-flush overflow-hidden overflow-y-scroll tagSearchResultList'
    tagSearchResultList.style.maxHeight = '12em'

    searchResultData.forEach((tags) => {
      const tagName = tags['tag']
      const tagCount = tags['count']
      const button = document.createElement('button')
      const count = document.createElement('span')

      button.className = 'list-group-item list-group-item-dark list-group-item-action'
      button.type = 'button'
      button.dataset['bsToggle'] = 'button'
      button.dataset['tagName'] = tagName
      button.ariaPressed = false
      button.style.setProperty('--bs-list-group-active-bg', '#485860')
      button.style.setProperty('--bs-list-group-active-border-color', '#485860')
      button.textContent = tagName
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
          if (this.add(tagName)) this._inactive_searchResultBtn(tagName)
        } else {
          this.removeTagSelected(tagName)
          this.removeTagSelectedBtnList(tagName)
        }
      })

      count.className = 'badge text-bg-secondary bg-opacity-25 rounded-pill'
      count.textContent = tagCount

      button.append(count)
      tagSearchResultList.append(button)
    })

    this.tagSearchResult.append(tagSearchResultList)
  }

  // 在标签类别区域中列出所有的标签类别
  _create_navCategory (categoryName, isActive = false) {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const activeClassName = 'active'

    li.className = 'nav-item'
    li.role = 'presentation'

    button.className = 'nav-link text-nowrap'
    isActive ? button.classList.add(activeClassName) : ''
    button.type = 'button'
    button.id = 'tab'
    button.role = 'tab'
    button.dataset['bsToggle'] = 'tab'
    button.dataset['bsTarget'] = '#contact-tab-pane-' + categoryName
    button.setAttribute('aria-controls', 'nav-contact')
    button.ariaSelected = isActive
    button.style.marginBottom = '-1px'
    button.textContent = categoryName

    li.append(button)

    this.tagNavCategoryList.append(li)
  }

  // 在指定的类别下创建对应的标签列表
  _create_navTab (categoryName, tagData, isActive = false, isFade = true) {
    const tabPane = document.createElement('div')
    const tagCategoryContent = document.createElement('div')
    const activeClassName = ['show', 'active']
    const fadeClassName = 'fade'

    tabPane.className = 'tab-pane'
    isFade ? tabPane.classList.add(fadeClassName) : ''
    isActive ? tabPane.classList.add(...activeClassName) : ''
    tabPane.id = 'contact-tab-pane-' + categoryName
    tabPane.role = 'tabPanel'
    tabPane.setAttribute('aria-labelledby', 'contact-tab')
    tabPane.tabIndex = 0

    tagCategoryContent.className = 'd-flex flex-wrap gap-1 overflow-hidden overflow-y-scroll tag-category-content'
    tagCategoryContent.style.maxHeight = '9em'

    tagData.forEach((tags) => {
      const tagName = tags['tag']
      const tagCount = tags['count']
      const button = document.createElement('button')
      const count = document.createElement('span')

      button.className = 'btn btn-sm bg-secondary bg-opacity-10 tags-tag-name'
      button.type = 'button'
      button.dataset['bsToggle'] = 'button'
      button.dataset['tagName'] = tagName
      button.textContent = tagName
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
          if (this.add(tagName)) this._inactive_navTabBtn(tagName)
        } else {
          this.removeTagSelected(tagName)
          this.removeTagSelectedBtnList(tagName)
        }
      })

      count.className = 'ms-1 discourse-tag-count badge rounded-pill bg-secondary bg-opacity-25'
      count.textContent = tagCount

      button.append(count)
      tagCategoryContent.append(button)
    })

    tabPane.append(tagCategoryContent)

    this.tagNavTabList.append(tabPane)
  }

  // 将标签按钮的样式状态转变为不活跃
  _inactive_btn (tagName) {
    this._inactive_searchResultBtn(tagName)
    this._inactive_navTabBtn(tagName)
  }

  // 将搜索结果中的标签按钮的样式状态转变为不活跃
  _inactive_searchResultBtn (tagName) {
    let tagBtn = this.tagSearchResult.querySelector(`button[data-tag-name=${tagName}]`)
    if (tagBtn) {
      tagBtn.classList.remove('active')
      tagBtn.setAttribute('aria-pressed', false)
    }
  }

  // 将Tab中的标签按钮的样式状态转变为不活跃
  _inactive_navTabBtn (tagName) {
    let tagBtn = this.tagNavTabList.querySelector(`button[data-tag-name=${tagName}]`)
    if (tagBtn) {
      tagBtn.classList.remove('active')
      tagBtn.setAttribute('aria-pressed', false)
    }
  }

  // 检查是否已经添加指定的标签
  _isAdd (tag) {
    if (this._hasLimitExceeded(tag)) {
      this.tagMessage_collapse('已达到' + this.maxQuantity + '个，请先删除部分已有标签')
      return true
    }
    if (this._hasSameAdded(tag)) {
      this.tagMessage_collapse('重复标签 ' + tag)
      return true
    }
    return false
  }

  // 检查是否已经存在相同的tag
  _hasSameAdded (tag) {
    return this.tagSelected.includes(tag)
  }

  // 检查标签列表是否已经达到最大数量阈值
  _hasLimitExceeded () {
    return this.tagSelected.length >= this.maxQuantity
  }

  tagSearch (searchValue) {
    const collapse = this.tagSearchResult_collapse()
    collapse.show()

    const searchResult = []

    this.tags.forEach(category => {
      category.tags.forEach(targetTag => {
        if (targetTag.tag.includes(searchValue)) {
          searchResult.push(targetTag)
        }
      })
    })

    if (searchResult.length < 1) return

    this.tagMessage_collapse(`搜索到${searchResult.length}条结果`, 'success')

    this._create_tagSearchResultList(searchResult)
  }

  tagSearchResult_collapse () {
    return bootstrap.Collapse.getOrCreateInstance(this.tagSearchResult, { toggle: false })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let tagManager = new TagManager('#a-tags')
})
