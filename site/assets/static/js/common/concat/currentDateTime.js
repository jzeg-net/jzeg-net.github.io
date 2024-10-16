(() => {
  'use strict'

  let now
  const pageLanguageCode = document.querySelector('html').getAttribute('lang').toLowerCase()

  window.addEventListener('DOMContentLoaded', () => {
    const currentDateTime = document.querySelectorAll('.currentDateTime')

    currentDateTime.forEach((dtEL) => {
      setInterval(() => {
        now = dayjs()
        dtEL.innerHTML = now.locale(pageLanguageCode).format('YYYY-MM-DD HH:mm:ss dddd')
      }, 1000)
    })
  })

  window.addEventListener('beforeunload', function () {
    setLocalStorage('last_visited', dayjs(now).unix())
  })

})()
