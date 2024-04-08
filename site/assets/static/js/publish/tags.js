const chineseArticleTags = {
  'cn': {
    category: 'Category 1',
    tags: [
      {
        tag: '标签 1',
        count: 5,
        iconUrl: './icon1.png', // 将图标地址改为相对路径
        description: '这是标签 1 的中文描述'
      },
      {
        tag: '标签 2',
        count: 2,
        iconUrl: './icon2.png', // 将图标地址改为相对路径
        description: '这是标签 2 的中文描述'
      }
    ]
  }
}
const englishArticleTags = {
  'en': {
    category: 'Category 2',
    tags: [
      {
        tag: 'Tag 3 en',
        count: 10,
        iconUrl: './icon3.png', // 将图标地址改为相对路径
        description: 'This is the description of Tag 3 in English'
      },
      {
        tag: 'Tag 4 en',
        count: 3,
        iconUrl: './icon4.png', // 将图标地址改为相对路径
        description: 'This is the description of Tag 4 in English'
      }
    ]
  }
}
const articleTags = [chineseArticleTags, englishArticleTags]

class TagManager {
  constructor (container) {
    this.init(container)

    // 标签列表
    this.tags = []
    // 标签按钮列表
    this.tagButtons = []
    // 标签列表最大数量阈值
    this.maxQuantity = 5

    // 按类别加载标签元素到DOM
    this._render_tabNav()
  }

  init (container) {
    this.container = document.querySelector(container)
    this.tagsSelectedList = this.container.querySelector('#tagsSelectedList')
    this.tagsSelectedBtnList = this.container.querySelector('#tagsSelectedBtnList')
    this.tagCategoryList = this.container.querySelector('#tagCategoryList')
    this.tagList = this.container.querySelector('#tagList')
  }

  // 向标签列表末尾添加指定的标签
  add (tag) {
    if (this._isCanAdd(tag)) {
      console.log('拒绝添加新标签，数量已经达到' + this.maxQuantity)
      return false
    }

    const result = this._addTags(tag)
    console.log(this.tagButtons)
    console.log(this.tags)

    this._render_selected(tag)
    return result
  }

  // 从标签列表中删除指定的标签
  remove (tag) {
    const indexOfTag = this.tags.indexOf(tag)
    if (indexOfTag === -1) {
      console.log('删除没有执行，当前不包含要删除的标签')
      return false
    }

    return [] !== this._removeTagsFromIndex(indexOfTag)
  }

  // 清空已选择标签列表中的所有标签
  clearAll () {
    this.tags = []
    console.log('已经清除所有已选择的标签')
  }

  // 渲染已选择的标签
  _render_selected (tagName) {
    this._create_tagsSelectedList(tagName)
    this._create_tagsSelectedBtnList(tagName)
  }

  // 渲染标签tab导航
  _render_tabNav () {
    this._create_categoryList('类别')
    this._create_tagList('类别', '标签1')
  }

  // 在已选择的标签列表添加标签
  _create_tagsSelectedList (tagName = 'tagName') {
    this.tagsSelectedList.append(tagName)
  }

  // 在标签按钮列表创建已选择的标签按钮
  _create_tagsSelectedBtnList (tagName = 'tagName') {
    const button = document.createElement('button')
    const span = document.createElement('span')
    const svg = document.createElement('svg')
    const use = document.createElement('use')

    button.className = 'btn btn-sm btn-outline-secondary'
    button.type = 'button'
    button.dataset['tagName'] = tagName
    button.ariaLabel = '删除 ' + tagName

    svg.className = 'bi'
    use.setAttribute('href', '#bi-x-lg')

    span.textContent = tagName
    svg.append(use)
    button.appendChild(span, svg)

    this.tagsSelectedBtnList.append(button)
  }

  // 在标签类别区域中列出所有的标签类别
  _create_categoryList (categoryName, isActive = false) {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const activeClassName = 'active'

    li.className = 'nav-item'
    li.role = 'presentation'

    button.className = 'nav-link'
    isActive ? button.classList.add(activeClassName) : ''
    button.type = 'button'
    button.id = 'tab'
    button.role = 'tab'
    button.dataset['bsToggle'] = 'tab'
    button.dataset['bsTarget'] = '#contact-tab-pane-' + categoryName
    button.setAttribute('aria-controls', 'nav-contact')
    button.ariaSelected = false
    button.style.marginBottom = '-1px'
    button.textContent = categoryName

    li.append(button)

    this.tagCategoryList.append(li)
  }

  // 在指定的标签类别下创建对应的标签列表
  _create_tagList (categoryName, tagName, isActive = false, isFade = true) {
    const tabPane = document.createElement('div')
    const tagCategoryContent = document.createElement('div')
    const activeClassName = 'show active'
    const fadeClassName = 'fade'

    tabPane.className = 'tab-pane'
    isFade ? tabPane.classList.add(fadeClassName) : ''
    isActive ? tabPane.classList.add(activeClassName) : ''
    tabPane.id = 'contact-tab-pane-' + categoryName
    tabPane.role = 'tabPanel'
    tabPane.setAttribute('aria-labelledby', 'contact-tab')
    tabPane.tabIndex = 0

    tagCategoryContent.className = 'd-flex flex-wrap gap-1 overflow-hidden overflow-y-scroll tag-category-content'
    tagCategoryContent.style.maxHeight = '9em'

    const button = document.createElement('button')
    const tag_name = document.createElement('span')
    const count_badge = document.createElement('span')

    button.className = 'btn btn-sm bg-secondary bg-opacity-10 tags-tag-name'
    button.type = 'button'
    button.dataset['bsToggle'] = 'button'

    tag_name.textContent = tagName

    count_badge.className = 'ms-1 discourse-tag-count badge rounded-pill bg-secondary bg-opacity-25 small'
    count_badge.textContent = Math.floor(Math.random() * 100)

    button.append(tag_name, count_badge)
    tagCategoryContent.append(button)
    tabPane.append(tagCategoryContent)

    this.tagList.append(tabPane)
  }

  _setData (language) {
    this.tags = chineseArticleTags

    if (language === 'all') this.tags = articleTags
    if (language === 'cn') this.tags = chineseArticleTags
    if (language === 'en') this.tags = englishArticleTags
  }

  /**
   * 模拟请求外部的标签数据
   * 最终实际需要使用 fetch 实现外部请求，但是获取到的数据格式不变
   */
  requestCategoryTagData (lang) {
    this._setData(lang)
  }

  // 清空标签列表中的所有标签
  _clearAllTags () {
    this.tags = []
  }

  // 向标签列表中添加指定标签
  _addTags (tag) {
    return this.tags.push(tag)
  }

  // 根据指定的索引值，从标签列表中删除标签
  _removeTagsFromIndex (indexOfTag) {
    return this.tags.splice(indexOfTag, 1)
  }

  // 检查是否可以添加标签
  _isCanAdd (tag) {
    return this._hasSameAdded(tag) && this._hasLimitExceeded()
  }

  // 检查是否已经存在相同的tag
  _hasSameAdded (tag) {
    return !this.tags.includes(tag)
  }

  // 检查标签列表是否已经达到最大数量阈值
  _hasLimitExceeded () {
    return this.tags.length >= this.maxQuantity
  }

}

let tagManager = new TagManager('#tags')

let tags = ['tag_1', 'tag_2', 'tag_3', 'tag_4', 'tag_5', 'tag_6', 'tag_7', 'tag_8', 'tag_9', 'tag_10', 'tag_11', 'tag_12', 'tag_13', 'tag_14', 'tag_15']

tagManager.add(tags[0])
tagManager.add(tags[1])
tagManager.add(tags[2])
tagManager.add(tags[3])
tagManager.clearAll()
tagManager.add(tags[4])
console.log(tagManager.remove(tags[4]))
console.log(tagManager.remove(tags[4]))
tagManager.add(tags[5])
tagManager.add(tags[6])
tagManager.add(tags[7])
tagManager.clearAll()
