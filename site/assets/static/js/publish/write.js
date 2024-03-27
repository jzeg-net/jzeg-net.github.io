(() => {
  'use strict'

  const autoSaveTitleKey = 'autoSaveTitle'
  const autoSaveContentKey = 'autoSaveContent'
  const autoSaveTagsKey = 'autoSaveTags'
  const autoSaveLanguageKey = 'autoSaveLanguage'
  const autoSaveTypeKey = 'autoSaveType'
  const autoSaveCoverKey = 'autoSaveCover'

  let title = document.querySelector('#title')
  let clearDraft = document.querySelector('#clearDraft')
  let submit = document.querySelector('#sureSubmitBtn')

  const autoSaveTitle = () => localStorage.setItem(autoSaveTitleKey, title.value)
  const autoSaveContent = () => localStorage.setItem(autoSaveContentKey, title.value)
  const autoSaveTags = () => localStorage.setItem(autoSaveTagsKey, title.value)
  const autoSaveCover = () => localStorage.setItem(autoSaveCoverKey, title.value)

  const clearStorage = () => {
    localStorage.removeItem(autoSaveTitleKey)
    localStorage.removeItem(autoSaveTagsKey)
    localStorage.removeItem(autoSaveContentKey)
    localStorage.removeItem(autoSaveCoverKey)
  }

  const write_submit = () => {
    console.log(title)
    console.log(event)
  }

  const beforeUnloadHandler = (event) => {
    event.preventDefault()
    event.returnValue = true
  }

  submit.addEventListener('click', event => {
    event.preventDefault()
    write_submit()
  })

  title.addEventListener('change', autoSaveTitle)

  title.addEventListener('input', (event) => {
    if (event.target.value !== '') {
      window.addEventListener('beforeunload', beforeUnloadHandler)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  })

  clearDraft.addEventListener('click', () => {
    clearStorage()
    let tip = bootstrap.Tooltip.getOrCreateInstance(clearDraft, { title: 0 })
    tip.setContent({ '.tooltip-inner': '已经清除' })
    tip.show()
    setTimeout(() => tip.dispose(), 2500)
  })

  window.addEventListener('DOMContentLoaded', () => {
    title.value = localStorage.getItem(autoSaveTitleKey)
  })

})()
