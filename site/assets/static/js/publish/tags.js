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
    // 标签按钮列表
    this.tagButtons = []
    // 标签列表最大数量阈值
    this.maxQuantity = 5

    // 按类别加载标签元素到DOM
    // this._render_tabNav()
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

    const result = [] !== this._removeTagsFromIndex(indexOfTag)

    if (result) {
      console.log('已经删除标签：' + tag)
    } else {
      console.log('删除标签失败：' + tag)
    }

    return result
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
  _render_tabNav (data = []) {
    // console.log(data)

    const category = []
    const categoryTag = []
    data.forEach((current, index) => {
      category[index] = current['category']
      categoryTag[index] = current['tags']
    })
    // console.log(category)
    // console.log(categoryTag)

    category.forEach((current, index) => {
      this._create_navCategory(current, !index)
    })

    categoryTag.forEach((tagData, index) => {
      // console.log(tagData)
      let categoryName = category[index]
      let isActive = !index
      console.log(categoryName)
      this._create_navTag(categoryName, tagData, isActive)
      console.log('')
    })

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
  _create_navCategory (categoryName, isActive = false) {
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
      const tag_name = document.createElement('span')
      const count = document.createElement('span')

      button.className = 'btn btn-sm bg-secondary bg-opacity-10 tags-tag-name'
      button.type = 'button'
      button.dataset['bsToggle'] = 'button'

      tag_name.textContent = tagName

      count.className = 'ms-1 discourse-tag-count badge rounded-pill bg-secondary bg-opacity-25 small'
      count.textContent = tagCount ?? 0

      button.append(tag_name, count)
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


// tagManager.add(tags[0])
// tagManager.add(tags[1])
// tagManager.add(tags[2])
// tagManager.add(tags[3])
// tagManager.clearAll()
// tagManager.add(tags[4])
// console.log(tagManager.remove(tags[4]))
// console.log(tagManager.remove(tags[4]))
// tagManager.add(tags[5])
// tagManager.add(tags[6])
// tagManager.add(tags[7])
// tagManager.clearAll()

tagManager._render_tabNav(chineseArticleTags)
// tagManager._render_tabNav(englishArticleTags)
