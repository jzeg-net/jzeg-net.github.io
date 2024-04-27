class TagManager {
  constructor (container) {
    this.lang = this._documentLanguage()
    this.cdn = '/static/json/publish/'

    this.initContainer(container)

    this.parseLocale()

    // 标签列表
    this.tags = []
    // 已经选中的标签列表
    this.tagSelected = []
    // 标签列表最大数量阈值
    this.maxQuantity = 5

    // 打开时获取标签信息
    this.container.addEventListener('toggle', event => {
      if (event.target.open) {
        // 请求所有的标签
        this.requestCategoryTagData().then(() => this._render_tabNav(this.tags))
      }
    }, { once: true })

    this._remainingTagCount()
    this._create_clearAllBtn()

    // 点击标题框删除按钮时，清空标题栏，并获取焦点
    this.titleReset.addEventListener('click', event => {
      event.preventDefault()
      this.titleInput.value = ''
      this.titleInput.focus()
    })

    // 点击标签搜索栏删除按钮时，清空搜索栏，并获取焦点
    this.tagSearchReset.addEventListener('click', event => {
      event.preventDefault()
      this.tagSearchInput.value = ''
      this.tagSearchInput.focus()

      const collapse = this.tagSearchResult_collapse()
      collapse.hide()
    })

    // 在标签搜索栏输入内容时，每次输入时，立刻执行搜索
    this.tagSearchInput.addEventListener('keyup', event => {
      event.preventDefault()
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
    if (this._hasExceededAdded(tagName)) {
      this.tagMessage_collapse('已达到' + this.maxQuantity + '个，请先删除部分已有标签')
      return false
    }

    if (this._hasSameAdded(tagName)) {
      this.tagMessage_collapse('重复标签 ' + tagName)
      return false
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

  // 返回已选择的标签
  getSelectedTags () {
    return this.tagSelected
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
   * 根据语言请求标签数据
   **/
  async requestCategoryTagData () {
    let url = `${this.cdn}tags/${this.lang}.json`

    await fetch(url)
      .then(response => response.json())
      .then(data => this.tags = data)
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

    msg.className = 'text-nowrap'
    msg.classList.add('text-' + msgType)
    msg.innerText = msgText

    this._tagMessage_collapse(msg)
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
    const collapse = bootstrap.Collapse.getOrCreateInstance(this.tagMessage, { toggle: false })

    this.tagMessage.addEventListener('hidden.bs.collapse', () => msgEl.remove())
    msgEl.addEventListener('click', () => collapse.hide())

    this.tagMessage.innerHTML = ''
    this.tagMessage.append(msgEl)
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
    if (searchResultData.length < 1) return

    const tagSearchResultList = document.createElement('div')

    tagSearchResultList.className = 'list-group list-group-flush overflow-hidden overflow-y-scroll tagSearchResultList'
    tagSearchResultList.style.maxHeight = '12em'

    searchResultData.forEach((tags) => {
      const tagName = tags['name']
      const tagCount = tags['count']
      const button = document.createElement('button')
      const count = document.createElement('span')

      button.className = 'list-group-item list-group-item-action list-group-item-dark'
      button.type = 'button'
      button.dataset['bsToggle'] = 'button'
      button.dataset['tagName'] = tagName
      button.ariaPressed = false
      button.style.setProperty('--bs-list-group-active-bg', '#485860')
      button.style.setProperty('--bs-list-group-active-border-color', '#485860')
      button.textContent = tagName
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
          if (!this.add(tagName)) this._inactive_searchResultBtn(tagName)
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
      const tagName = tags['name']
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
          if (!this.add(tagName)) this._inactive_navTabBtn(tagName)
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

  // 检查是否已经存在相同的tag
  _hasSameAdded (tag) {
    return this.tagSelected.includes(tag)
  }

  // 检查标签列表是否已经达到最大数量阈值
  _hasExceededAdded () {
    return this.tagSelected.length >= this.maxQuantity
  }

  // 在本地标签数据中搜索
  tagSearch (searchValue) {
    if (searchValue < 1) return

    const searchResult = []

    this.tags.forEach(category => {
      category.tags.forEach(targetTag => {
        if (targetTag.name.includes(searchValue)) {
          searchResult.push(targetTag)
        }
      })
    })

    if (searchResult.length > 0) {
      const collapse = this.tagSearchResult_collapse()
      collapse.show()
      this.tagMessage_collapse(`搜索到${searchResult.length}条结果`, 'success')

      this._create_tagSearchResultList(searchResult)
    }
  }

  tagSearchResult_collapse () {
    return bootstrap.Collapse.getOrCreateInstance(this.tagSearchResult, { toggle: false })
  }

  // 动态设置界面语言
  async setLocaleLang (languageCode) {
    this.lang = languageCode
    await this.parseLocale()
  }

  async parseLocale () {
    let url = `${this.cdn}locale/${this.lang}.json`

    await fetch(url)
      .then(response => response.json())
      .then(data => this.locale = data)
  }

  i18n (textKey) {
    return this.T(textKey)
  }

  T (textKey) {
    return this.locale[textKey]
  }

}

window.addEventListener('DOMContentLoaded', () => {
  let tagManager = new TagManager('#a-tags')
  // tagManager.setLocaleLang('zh-CN')
})
