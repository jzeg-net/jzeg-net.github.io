const chineseArticleTags = [
  {
    category: '类别_1',
    tags: [
      {
        tag: '标签_1',
        count: 42,
        icon: true,
        description: '这是标签 1 的中文描述'
      },
      {
        tag: '标签_2',
        count: 76,
        icon: false,
        description: '这是标签 2 的中文描述'
      }
    ]
  },
  {
    category: '类别_2',
    tags: [
      {
        tag: '标签_3',
        count: 28,
        icon: true,
        description: '这是标签 3 的中文描述'
      },
      {
        tag: '标签_4',
        count: 63,
        icon: false,
        description: '这是标签 4 的中文描述'
      }
    ]
  },
  {
    category: '类别_3',
    tags: [
      {
        tag: '标签_5',
        count: 87,
        icon: true,
        description: '这是标签 5 的中文描述'
      },
      {
        tag: '标签_6',
        count: 54,
        icon: false,
        description: '这是标签 6 的中文描述'
      }
    ]
  },
  {
    category: '类别_4',
    tags: [
      {
        tag: '标签_7',
        count: 31,
        icon: true,
        description: '这是标签 7 的中文描述'
      },
      {
        tag: '标签_8',
        count: 98,
        icon: false,
        description: '这是标签 8 的中文描述'
      }
    ]
  },
  {
    category: '类别_5',
    tags: [
      {
        tag: '标签_9',
        count: 23,
        icon: true,
        description: '这是标签 9 的中文描述'
      },
      {
        tag: '标签_10',
        count: 72,
        icon: false,
        description: '这是标签 10 的中文描述'
      }
    ]
  },
  {
    category: '类别_6',
    tags: [
      {
        tag: '标签_11',
        count: 67,
        icon: true,
        description: '这是标签 11 的中文描述'
      },
      {
        tag: '标签_12',
        count: 45,
        icon: false,
        description: '这是标签 12 的中文描述'
      }
    ]
  },
  {
    category: '类别_7',
    tags: [
      {
        tag: '标签_13',
        count: 56,
        icon: true,
        description: '这是标签 13 的中文描述'
      },
      {
        tag: '标签_14',
        count: 81,
        icon: false,
        description: '这是标签 14 的中文描述'
      }
    ]
  },
  {
    category: '类别_8',
    tags: [
      {
        tag: '标签_15',
        count: 39,
        icon: true,
        description: '这是标签 15 的中文描述'
      },
      {
        tag: '标签_16',
        count: 69,
        icon: false,
        description: '这是标签 16 的中文描述'
      }
    ]
  }
]
const englishArticleTags = [
  {
    category: 'Category_1',
    tags: [
      {
        tag: 'Tag1',
        count: 48,
        icon: true,
        description: 'This is the description of Tag 1 in English'
      },
      {
        tag: 'Tag2',
        count: 79,
        icon: false,
        description: 'This is the description of Tag 2 in English'
      }
    ]
  },
  {
    category: 'Category_2',
    tags: [
      {
        tag: 'Tag3',
        count: 26,
        icon: true,
        description: 'This is the description of Tag 3 in English'
      },
      {
        tag: 'Tag4',
        count: 64,
        icon: false,
        description: 'This is the description of Tag 4 in English'
      }
    ]
  },
  {
    category: 'Category_3',
    tags: [
      {
        tag: 'Tag5',
        count: 83,
        icon: true,
        description: 'This is the description of Tag 5 in English'
      },
      {
        tag: 'Tag6',
        count: 57,
        icon: false,
        description: 'This is the description of Tag 6 in English'
      }
    ]
  },
  {
    category: 'Category_4',
    tags: [
      {
        tag: 'Tag7',
        count: 35,
        icon: true,
        description: 'This is the description of Tag 7 in English'
      },
      {
        tag: 'Tag8',
        count: 94,
        icon: false,
        description: 'This is the description of Tag 8 in English'
      }
    ]
  },
  {
    category: 'Category_5',
    tags: [
      {
        tag: 'Tag9',
        count: 29,
        icon: true,
        description: 'This is the description of Tag 9 in English'
      },
      {
        tag: 'Tag10',
        count: 71,
        icon: false,
        description: 'This is the description of Tag 10 in English'
      }
    ]
  },
  {
    category: 'Category_6',
    tags: [
      {
        tag: 'Tag11',
        count: 62,
        icon: true,
        description: 'This is the description of Tag 11 in English'
      },
      {
        tag: 'Tag12',
        count: 38,
        icon: false,
        description: 'This is the description of Tag 12 in English'
      }
    ]
  }
]
const articleTags = [chineseArticleTags, englishArticleTags]

class TagManager {
  constructor (container) {
    this.init(container)

    // 标签列表
    this.tags = []
    // 已经选中的标签列表
    this.tagSelected = []
    // 标签列表最大数量阈值
    this.maxQuantity = 5
  }

  init (container) {
    this.container = document.querySelector(container)
    this.tagsSelectedList = this.container.querySelector('#tagSelectedList')
    this.tagsSelectedBtnList = this.container.querySelector('#tagSelectedBtnList')
    this.tagCategoryList = this.container.querySelector('#tagCategoryList')
    this.tagList = this.container.querySelector('#tagList')
    this.tagCount = this.container.querySelector('#remainingTagCount')
    this.tagSearchResult = this.container.querySelector('#tagSearchResult')
  }

  // 向标签列表末尾添加指定的标签
  add (tag) {
    if (!this._isCanAdd(tag)) {
      return false
    }

    const result = this.tagSelected.push(tag)
    console.log(this.tagSelected)

    this._create_tagsSelectedList()
    this._create_tagsSelectedBtnList(tag)
    // 显示剩余的可以选择标签的数量
    this.tagCount.textContent = this._remainingTagCount()

    return result
  }

  // 从已选择的标签列表中删除指定的标签
  remove (tag) {
    const indexOfTag = this.tagSelected.indexOf(tag)
    if (indexOfTag === -1) {
      console.log('删除没有执行，当前不包含要删除的标签')
      return false
    }

    // 根据指定的索引值，从已选择标签的列表中删除标签
    const deleteTagSelected = this.tagSelected.splice(indexOfTag, 1)
    const result = [] !== deleteTagSelected

    if (result) {
      this._create_tagsSelectedList()
      // this._create_tagsSelectedBtnList(tag)
      // 显示剩余的可以选择标签的数量
      this.tagCount.textContent = this._remainingTagCount()
      console.log('已经删除标签：' + tag)
    } else {
      console.log('删除标签失败：' + tag)
    }

    return result
  }

  // 清空已选择标签列表中的所有标签
  clearAllTagSelected () {
    this.tagSelected = []
    console.log('已经清除所有已选择的标签')
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
      this._create_navTag(categoryName, tagData, isActive)
    })
  }

  // 剩余的可以选择的标签数量
  _remainingTagCount () {
    return this.maxQuantity - this.tagSelected.length
  }

  // 在已选择的标签列表添加标签
  _create_tagsSelectedList () {
    this.tagsSelectedList.textContent = this.tagSelected.join(', ')
  }

  // 在标签按钮列表创建已选择的标签按钮
  _create_tagsSelectedBtnList (tagName) {
    const button = document.createElement('button')
    const span = document.createElement('span')
    const svg = document.createElement('svg')
    const use = document.createElement('use')

    button.className = 'btn btn-sm btn-outline-secondary'
    button.type = 'button'
    button.dataset['tagName'] = tagName
    button.ariaLabel = '删除 ' + tagName
    button.addEventListener('click', () => {
      this.remove(button.dataset['tagName'])
      button.remove()
    })

    svg.className = 'bi'
    use.setAttribute('href', '#bi-x-lg')

    span.textContent = tagName
    svg.append(use)
    button.append(span, svg)

    this.tagsSelectedBtnList.append(button)
  }

  // 在标签搜索结果种创建可选的标签按钮列表
  _create_tagSearchResultList (tags = ['searchResult-1', 'searchResult-2', 'searchResult-3', 'searchResult-4', 'searchResult-5', 'searchResult-6', 'searchResult-7', 'searchResult-8']) {
    const tagSearchResultList = document.createElement('div')

    tagSearchResultList.className = 'list-group list-group-flush overflow-hidden overflow-y-scroll tagSearchResultList'
    tagSearchResultList.style.maxHeight = '12em'

    tags.forEach((tag) => {
      const button = document.createElement('button')
      const span = document.createElement('span')

      button.className = 'list-group-item list-group-item-dark list-group-item-action'
      button.type = 'button'
      button.dataset['bsToggle'] = 'button'
      button.ariaPressed = false
      button.style.setProperty('--bs-list-group-active-bg', '#485860')
      button.style.setProperty('--bs-list-group-active-border-color', '#485860')
      button.textContent = tag
      button.addEventListener('click', () => this.add(tag))

      span.className = 'badge text-bg-secondary bg-opacity-25 rounded-pill'
      span.textContent = Math.round(Math.random() * 100)

      button.append(span)
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

    this.tagCategoryList.append(li)
  }

  // 在指定的标签类别下创建对应的标签列表
  _create_navTag (categoryName, tagData = [], isActive = false, isFade = true) {
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
      button.innerText = tagName
      button.addEventListener('click', () => this.add(tagName))

      count.className = 'ms-1 discourse-tag-count badge rounded-pill bg-secondary bg-opacity-25'
      count.textContent = tagCount ?? 0

      button.append(count)
      tagCategoryContent.append(button)
    })

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
    this.tagSelected = []
  }

  // 检查是否可以添加标签
  _isCanAdd (tag) {
    if (this._hasLimitExceeded(tag)) {
      console.log('拒绝添加新标签，数量已经达到' + this.maxQuantity)
      return false
    }
    if (this._hasSameAdded(tag)) {
      console.log('拒绝添加新标签，标签已存在 ' + tag)
      return false
    }
    return true
  }

  // 检查是否已经存在相同的tag
  _hasSameAdded (tag) {
    return this.tagSelected.includes(tag)
  }

  // 检查标签列表是否已经达到最大数量阈值
  _hasLimitExceeded () {
    return this.tagSelected.length >= this.maxQuantity
  }

}

let tagManager = new TagManager('#a-tags')

tagManager._render_tabNav(chineseArticleTags)
// tagManager._render_tabNav(englishArticleTags)
tagManager._create_tagSearchResultList()
