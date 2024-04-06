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

    this.articleTags = []
    this.tagButtons = []
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

  getData (language) {
    if (language === 'all') {
      this.articleTags = articleTags
    } else if (language === 'cn') {
      this.articleTags = chineseArticleTags
    } else if (language === 'en') {
      this.articleTags = englishArticleTags
    } else {
      throw new Error('Unsupported language')
    }
  }

  // 拆分后的 addTag 方法
  addTag (tag, data) {
    if (!this.canAddTag(tag, this.tagButtons.length)) {
      console.log('最多只能设置 5 个标签或该标签已存在')
      return
    }

    const button = this.createButton(tag)
    this.addButtonListener(button, this.onButtonClick)
    this.tagButtons.push(button)
  }

  // 检查是否可以添加标签的辅助方法
  canAddTag (tag, buttonCount) {
    return this.articleTags.indexOf(tag) === -1 && buttonCount < 5
  }

  // 创建按钮的辅助方法
  createButton (tag) {
    const button = document.createElement('button')
    button.textContent = tag
    return button
  }

  // 添加按钮监听事件的辅助方法
  addButtonListener (button, listener) {
    button.addEventListener('click', listener)
  }

  onButtonClick (event) {
    this.removeTag(event.target.textContent)
  }

  removeTag (tag) {
    const index = this.articleTags.indexOf(tag)
    if (index !== -1) {
      this.articleTags.splice(index, 1)
      this.tagButtons.splice(index, 1)
    }
  }

  clearAllTags () {
    this.articleTags = []
    this.tagButtons.forEach(button => button.remove())
    this.tagButtons = []
  }
}

let tagManager = new TagManager('#tags')

tagManager._create_tagsSelectedList()
tagManager._create_tagsSelectedBtnList()
tagManager._create_tagCategoryList()
tagManager._create_tagList()
