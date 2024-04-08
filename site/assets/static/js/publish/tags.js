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
  }

  init (container) {
    this.container = document.querySelector(`${container}`)
    this.tagsSelectedList = this.container.querySelector('#tagsSelectedList')
    this.tagsSelectedBtnList = this.container.querySelector('#tagsSelectedBtnList')
    this.tagCategoryList = this.container.querySelector('#tagCategoryList')
    this.tagList = this.container.querySelector('#tagList')

  }

  _create_tagsSelectedList (tag = 'tag_1') {
    this.tagsSelectedList.append(tag)
  }

  _create_tagsSelectedBtnList (btn = 'btnList_1') {
    const button = document.createElement('button')
    const span = document.createElement('span')
    const svg = document.createElement('svg')
    const use = document.createElement('use')

    button.className = 'btn btn-sm btn-outline-secondary'
    button.type = 'button'
    button.dataset['tagName'] = btn
    button.ariaLabel = '删除 ' + btn

    svg.className = 'bi'
    use.setAttribute('href', '#bi-x-lg')

    span.textContent = btn
    svg.append(use)
    button.appendChild(span, svg)

    this.tagsSelectedBtnList.append(button)
  }

  _create_tagCategoryList () {
    const li = document.createElement('li')
    const button = document.createElement('button')

    li.className = 'nav-item'
    li.role = 'presentation'

    button.className = 'nav-link'
    button.type = 'button'
    button.id = 'tab'
    button.role = 'tab'
    button.dataset['bsToggle'] = 'tab'
    button.dataset['bsTarget'] = '#contact-tab-pane-xxx'
    button.setAttribute('aria-controls', 'nav-contact')
    button.ariaSelected = false
    button.style.marginBottom = '-1px'
    button.textContent = 'categoryName'

    li.append(button)

    this.tagCategoryList.append(li)
  }

  _create_tagList () {
    const tabPane = document.createElement('div')
    const tagCategoryContent = document.createElement('div')

    tabPane.className = 'tab-pane fade'
    tabPane.id = 'contact-tab-pane-xxx'
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

    tag_name.textContent = 'tagName'

    count_badge.className = 'ms-1 discourse-tag-count badge rounded-pill bg-secondary bg-opacity-25 small'
    count_badge.textContent = Math.floor(Math.random() * 100)

    button.append(tag_name, count_badge)
    tagCategoryContent.append(button)
    tabPane.append(tagCategoryContent)

    this.tagList.append(tabPane)
  }

  _getData (language) {
    if (language === 'all') {
      this.tags = articleTags
    } else if (language === 'cn') {
      this.tags = chineseArticleTags
    } else if (language === 'en') {
      this.tags = englishArticleTags
    } else {
      throw new Error('Unsupported language')
    }
  }

  /**
   * 模拟请求外部的标签数据
   * 最终实际需要使用 fetch 实现外部请求，但是获取到的数据格式不变
   */
  requestCategoryTagData (lang) {
    this._getData(lang)
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

  // 清空标签列表中的所有标签
  clearAll () {
    this.tags = []
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

tagManager._create_tagsSelectedList()
tagManager._create_tagsSelectedBtnList()
tagManager._create_tagCategoryList()
tagManager._create_tagList()

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
