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
      start: 'multiMonthYear,multiMonths,multiMonth dayGridYear,dayGridMonth,dayGridWeek,dayGridDay,dayGrid listYear,listMonth,listWeek,listDay,list timeGridWeek,timeGridDay,timeGrid',
      center: 'title',
      end: 'myToday myPrev,myNext',
    },
    customButtons: {
      multiMonths: {
        text: '多月',
        click: () => prompt('xxx'),
      },
      myToday: {
        text: '今天',
        icon: '',
        click: () => todayCustomClick(),
      },
      myPrev: {
        text: '上月',
        icon: 'chevron-left',
        click: () => prevMonthCustomClick(),
      },
      myNext: {
        text: '下月',
        icon: 'chevron-right',
        click: () => nextMonthCustomClick(),
      },
      myPrevYear: {
        text: '去年',
        icon: 'chevrons-left',
        click: () => prevYearCustomClick(),
      },
      myNextYear: {
        text: '明年',
        icon: 'chevrons-right',
        click: () => nextYearCustomClick(),
      },
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

  let weekTableTbody = document.querySelector('#calendar table thead table thead')
  let dateTableTbody = document.querySelector('#calendar table tbody table tbody')
  if (dateTableTbody) {
    let dateTableTrs = dateTableTbody.querySelectorAll('tr')
    // console.log(dateTableTrs)
    let dateTableTrTds

    for (let i = 0; i < dateTableTrs.length; i++) {
      dateTableTrTds = dateTableTrs[i].querySelectorAll('td')
      for (let j = 0; j < dateTableTrTds.length; j++) {
        let date = dateTableTrTds[j].dataset['date']
        let dateArray = date.split('-')
        let dateEL = dateTableTrTds[j].querySelector('.fc-daygrid-day-top')

        let lunarSpan = document.createElement('span')
        let lunarDayChinese = Solar.fromYmd(dateArray[0], dateArray[1], dateArray[2]).getLunar().getDayInChinese()
        let lunarMonthChinese = Solar.fromYmd(dateArray[0], dateArray[1], dateArray[2]).getLunar().getMonthInChinese()
        if (lunarDayChinese === '初一') {
          lunarSpan.textContent = lunarMonthChinese + '月'
          lunarSpan.className = 'text-success-emphasis fw-bolder'
        } else {
          lunarSpan.textContent = lunarDayChinese
          lunarSpan.className = 'text-success fw-lighter'
        }

        let holiday = HolidayUtil.getHoliday(date)
        let holidaySpan = document.createElement('span')
        let holidaySpan2 = document.createElement('span')
        if (holiday) {
          let holidaySpanBadge = holiday.isWork() ? 'text-bg-danger' : 'text-bg-success'
          holidaySpan.className = 'position-absolute top-0 start-0 badge'
          holidaySpan.classList.add(holidaySpanBadge)
          holidaySpan.textContent = holiday.isWork() ? '班' : '休'

          holidaySpan2.textContent = holiday.isWork() ? '' : holiday.getName()
          holidaySpan2.style.color = 'LimeGreen'
        }

        dateEL.append(lunarSpan, holidaySpan, holidaySpan2)

      }
    }

    // 日期点击事件
    function dateClick (info) {
      console.log(info)
    }

    // 上一年点击
    function prevYearCustomClick () {
      calendar.prevYear()
      renderCalendar()
    }

    // 上月点击
    function prevMonthCustomClick () {
      calendar.prev()
      renderCalendar()
    }

    // 下月点击
    function nextMonthCustomClick () {
      calendar.next()
      renderCalendar()
    }

    // 下一年点击
    function nextYearCustomClick () {
      calendar.nextYear()
      renderCalendar()
    }

    // 今日点击
    function todayCustomClick () {
      calendar.today()
      renderCalendar()
    }

    // 刷新Calendar的数据
    function renderCalendar () {
      // TODO：调用接口获取数据,这里定义为空数组
      let events = []
      calendar.setOption('events', events)
    }

  }

})
