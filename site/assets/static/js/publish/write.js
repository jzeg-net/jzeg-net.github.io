class Write {
  autoSaveTitleKey = 'autoSaveTitle'
  autoSaveContentKey = 'autoSaveContent'
  autoSaveTagsKey = 'autoSaveTags'
  autoSaveLanguageKey = 'autoSaveLanguage'
  autoSaveTypeKey = 'autoSaveType'
  autoSaveCoverKey = 'autoSaveCover'

  constructor (title, tags, submit, clearDraft) {
    this.init(title, tags, submit, clearDraft)
    this.listener()
  }

  init = (title, tags, submit, clearDraft) => {
    this.title = title
    this.tags = tags
    this.submit = submit
    this.clearDraft = clearDraft
    this.type = ''
    this.cover = ''
    this.language = ''
  }

  listener = () => {
    window.addEventListener('DOMContentLoaded', () => {
      this.title.value = getLocalStorage(this.autoSaveTitleKey)
    })

    this.title.addEventListener('change', this.autoSaveTitle)

    this.title.addEventListener('input', (event) => {
      if (event.target.value !== '') {
        window.addEventListener('beforeunload', this.beforeUnloadHandler)
      } else {
        window.removeEventListener('beforeunload', this.beforeUnloadHandler)
      }
    })

    this.clearDraft.addEventListener('click', () => {
      this.clearStorage()
      this.clearStorageTip()
    })

    this.submit.addEventListener('click', event => {
      event.preventDefault()
      this.write_submit()
    })

  }

  autoSaveTitle = () => setLocalStorage(this.autoSaveTitleKey, this.title.value)
  autoSaveContent = () => setLocalStorage(this.autoSaveContentKey, this.title.value)
  autoSaveTags = () => setLocalStorage(this.autoSaveTagsKey, this.title.value)
  autoSaveCover = () => setLocalStorage(this.autoSaveCoverKey, this.title.value)

  clearStorage = () => {
    removeLocalStorage(this.autoSaveTitleKey)
    removeLocalStorage(this.autoSaveTagsKey)
    removeLocalStorage(this.autoSaveContentKey)
    removeLocalStorage(this.autoSaveCoverKey)
  }

  clearStorageTip = () => {
    let tip = bootstrap.Popover.getOrCreateInstance(this.clearDraft)
    tip.show()
    setTimeout(() => tip.dispose(), 3600)
  }

  write_submit = () => {
    this.content = getLocalStorage(this.autoSaveContentKey)

    const xx = {
      title: this.getTitle(),
      tags: this.getTags(),
      content: this.content,
      lang: this.getLanguage(),
      type: this.getArticleType(),
      cover: this.getCover(),
    }
    console.log(xx)
  }

  // 获取标题值
  getTitle () {
    return this.title.value
  }

  // 获取标签数组
  getTags () {
    return this.tags.textContent.split(',')
  }

  // 获取内容语言类型
  getLanguage () {
    return this._documentLanguage()
  }

  // 获取写作类型
  getArticleType () {
    let type
    let types = document.querySelector('#publish-dropdown').querySelectorAll('input[name=articleType]')
    types.forEach(inputType => {
      if (inputType.checked) type = inputType.value
    })

    return type
  }

  // 获取写作类型
  getCover () {
    return 'cover_url'
  }

  beforeUnloadHandler = (event) => {
    event.preventDefault()
    event.returnValue = true
  }

  _documentLanguage = () => document.documentElement.lang
}

let title = document.querySelector('#titleInput')
let tags = document.querySelector('#tagSelectedList')
let sureClearDraft = document.querySelector('#sureClearDraft')
let submit = document.querySelector('#sureSubmitBtn')

let w = new Write(title, tags, submit, sureClearDraft)

const popoverTriggerList = document.querySelector('#publish-dropdown').querySelectorAll('[data-bs-toggle="popover"]')

const getPopoverTitle = (event) => {
  let title
  let titleEl = event.nextElementSibling.querySelector('.popoverTitle')
  if (titleEl) {
    title = titleEl.innerHTML
  }

  return title
}

const getPopoverContent = (event) => {
  let content
  let contentEL = event.nextElementSibling.querySelector('.popoverContent')
  if (contentEL) {
    content = contentEL.innerHTML
  }

  return content
}

const popoverList = [...popoverTriggerList].map(popoverTriggerEl => bootstrap.Popover.getOrCreateInstance(popoverTriggerEl, {
  html: true,
  trigger: 'hover focus',
  placement: 'bottom',
  title: getPopoverTitle,
  content: getPopoverContent,
}))

const tooltipTriggerList = document.querySelector('#publish-dropdown').querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => bootstrap.Tooltip.getOrCreateInstance(tooltipTriggerEl))
