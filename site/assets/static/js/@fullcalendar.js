document.addEventListener('DOMContentLoaded', () => {
  let localeLang = document.querySelector('html').lang.toLowerCase()

  let sign_record = document.querySelector('#sign_record')
  let calendar = new FullCalendar.Calendar(sign_record, {
    themeSystem: 'bootstrap5',
    locale: localeLang,
    timeZone: 'local', // the default (unnecessary to specify)
    initialView: 'dayGridMonth',
    editable: true, // important for activating event interactions!
    selectable: true, // important for activating date selectability!
    headerToolbar: {
      start: 'dayGridMonth dayGridDay',
      center: 'title',
      end: 'today prev,next',
    },
    eventMouseLeave: info => {
      info.el.style.cursor = 'default'
    },
    eventMouseEnter: info => {
      info.el.style.cursor = 'pointer'
    },
    eventClick: info => {},
    dateClick: info => {
      let dateStr = info.dateStr
      let sign_start = dateStr + ' 正在签到，马上完成'
      let sign_finish = dateStr + ' 完成签到'
      let x, y

      info.dayEl.style.backgroundColor = 'yellow'
      x = bModal('', createSmallCenterText(sign_start, 'danger'), '', 'sm', true)

      setTimeout(() => {
        bootstrap.Modal.getInstance(document.querySelector('#' + x)).hide()
      }, 2500)

      setTimeout(() => {
        y = bModal('', createSmallCenterText(sign_finish, 'success'), '', 'sm', true)
      }, 3000)

      setTimeout(() => {
        info.dayEl.style.backgroundColor = 'green'
        bootstrap.Modal.getInstance(document.querySelector('#' + y)).hide()
      }, 4500)
    }
  })

  calendar.setOption('locale', localeLang)

  calendar.render()

})
