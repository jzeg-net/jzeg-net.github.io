class Write {
  autoSaveTitleKey = 'autoSaveTitle'
  autoSaveContentKey = 'autoSaveContent'
  autoSaveTagsKey = 'autoSaveTags'
  autoSaveLanguageKey = 'autoSaveLanguage'
  autoSaveTypeKey = 'autoSaveType'
  autoSaveCoverKey = 'autoSaveCover'

  constructor (title, submit, clearDraft) {
    this.init(title, submit, clearDraft)
    this.listener()
  }

  init = (title, submit, clearDraft) => {
    this.title = title
    this.submit = submit
    this.clearDraft = clearDraft
    this.type = 'write'
    this.cover = 'cover_url'
    this.tags = ['t_aaa', 't_bbb', 't_ccc', 't_ddd']
    this.language = this._documentLanguage()
  }

  listener = () => {
    window.addEventListener('DOMContentLoaded', () => {
      this.title.value = localStorage.getItem(this.autoSaveTitleKey)
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

  autoSaveTitle = () => localStorage.setItem(this.autoSaveTitleKey, this.title.value)
  autoSaveContent = () => localStorage.setItem(this.autoSaveContentKey, this.title.value)
  autoSaveTags = () => localStorage.setItem(this.autoSaveTagsKey, this.title.value)
  autoSaveCover = () => localStorage.setItem(this.autoSaveCoverKey, this.title.value)

  clearStorage = () => {
    localStorage.removeItem(this.autoSaveTitleKey)
    localStorage.removeItem(this.autoSaveTagsKey)
    localStorage.removeItem(this.autoSaveContentKey)
    localStorage.removeItem(this.autoSaveCoverKey)
  }

  clearStorageTip = () => {
    let tip = bootstrap.Tooltip.getOrCreateInstance(clearDraft, { title: 0 })
    tip.setContent({ '.tooltip-inner': '已经清除' })
    tip.show()
    setTimeout(() => tip.dispose(), 2500)
  }

  write_submit = () => {
    this.content = localStorage.getItem(this.autoSaveContentKey)
    console.log(this.title.value)
    console.log(this.content)
    console.log(this.language)
    console.log(this.tags)
    console.log(this.type)
    console.log(this.cover)
  }

  beforeUnloadHandler = (event) => {
    event.preventDefault()
    event.returnValue = true
  }

  _documentLanguage = () => document.documentElement.lang
}

let title = document.querySelector('#title')
let clearDraft = document.querySelector('#clearDraft')
let submit = document.querySelector('#sureSubmitBtn')

let w = new Write(title, submit, clearDraft)
