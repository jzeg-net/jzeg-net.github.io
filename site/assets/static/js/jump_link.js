(() => {
  let targetLink = new URLSearchParams(window.location.search).get('target')
  let linkInput = document.querySelector('#link_input')
  let toBack = document.querySelector('#to_back')
  let toExternal = document.querySelector('#to_external')

  toBack.addEventListener('click', () => {
    open(document.referrer, '_parent') // history.go(-1)
  })

  if (!targetLink) return

  let result = decodeURIComponent(targetLink)

  linkInput.value = result
  toExternal.href = result
})()
