document.addEventListener('DOMContentLoaded', () => {
  let localeLang = document.querySelector('html').lang.toLowerCase()

  let calendar = new FullCalendar.Calendar(document.querySelector('#calendar'), {
    themeSystem: 'bootstrap5',
    aspectRatio: 2,
    locale: localeLang,
    timeZone: 'local', // the default (unnecessary to specify)
    initialView: 'dayGridMonth',
    editable: true, // important for activating event interactions!
    selectable: true, // important for activating date selectability!
    headerToolbar: {
      start: 'multiMonthYear multiMonths multiMonth dayGridYear dayGridMonth dayGridWeek dayGridDay dayGrid listYear listMonth listWeek listDay list timeGridWeek timeGridDay timeGrid',
      center: 'title',
      end: 'today prev,next',
    },
    customButtons: {
      multiMonths: {
        text: '多月',
        click: () => {
          prompt('xxx')
        },
      }
    },
    buttonText: {
      listYear: '年日程',
      listMonth: '月日程',
      listWeek: '周日程',
      listDay: '天日程',
      timeGridWeek: '周时间线',
      timeGridDay: '日时间线',
    },
    views: {
      multiMonthYear: {},
      multiMonth: {},
      dayGridYear: {},
      dayGridMonth: {},
      dayGridWeek: {},
      dayGridDay: {},
      dayGrid: {},
      listYear: {},
      listMonth: {},
      listWeek: {},
      listDay: {},
      list: {},
      timeGridWeek: {},
      timeGridDay: {},
      timeGrid: {},
    },
    eventMouseLeave: info => {
      info.el.style.cursor = 'default'
    },
    eventMouseEnter: info => {
      info.el.style.cursor = 'pointer'
    },
    eventClick: info => {
      prompt('aa')
      console.log(info)
    },
    dateClick: info => {}
  })

  calendar.setOption('locale', localeLang)

  let events = [
    {
      title: 'date',
      start: '2024-01-26',
      allDay: true,
    },
    {
      title: 'date',
      start: '2024-01-16',
      allDay: true,
    },
  ]

  calendar.setOption('events', events)

  calendar.render()

})
