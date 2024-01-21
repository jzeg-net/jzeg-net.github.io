let solarDate = document.querySelector('#solarDate')
let holidaysList = document.querySelector('#holidaysList')
let solarFestivalsList = document.querySelector('#solarFestivalsList')
let solarOtherFestivalsList = document.querySelector('#solarOtherFestivalsList')
let lunarDate = document.querySelector('#lunarDate')
let lunarJieQi = document.querySelector('#lunarJieQi')
let lunarHou = document.querySelector('#lunarHou')
let lunarFu = document.querySelector('#lunarFu')
let lunarShuJiu = document.querySelector('#lunarShuJiu')
let lunarFestivalsList = document.querySelector('#lunarFestivalsList')
let lunarOtherFestivalsList = document.querySelector('#lunarOtherFestivalsList')

if (lunarDate) {
  let date = new Date()
  let solar = Solar.fromDate(date)
  let lunar = Lunar.fromDate(date)
  let holidays = HolidayUtil.getHolidays(2024,2)
  let solarFestivals = solar.getFestivals()
  let solarOtherFestivals = solar.getOtherFestivals()
  let lunarFestivals = lunar.getFestivals()
  let lunarOtherFestivals = lunar.getOtherFestivals()

  let lunarYearInChinese = lunar.getYearInChinese()
  let lunarMonthInChinese = lunar.getMonthInChinese()
  let lunarWeekInChinese = lunar.getWeekInChinese()
  let lunarDayInChinese = lunar.getDayInChinese()
  let lunarTimeGan = lunar.getTimeGan()
  let lunarTimeZhi = lunar.getTimeZhi()
  let lunarTimeInGanZhi = lunar.getTimeInGanZhi()
  let lunarTimeShengXiao = lunar.getTimeShengXiao()
  let jieQi = lunar.getJieQi()
  let hou = lunar.getHou()
  let fu = lunar.getFu()
  let shuJiu = lunar.getShuJiu()

  let lunarMonthDayInChinese = lunarMonthInChinese + '月' + lunarDayInChinese

  solarDate.textContent = solar + ' 星期' + lunarWeekInChinese + '（' + lunarMonthDayInChinese + '）'
  holidaysList.textContent = holidays
  lunarDate.textContent = lunar
  solarFestivalsList.textContent = [...solarFestivals]
  solarOtherFestivalsList.textContent = [...solarOtherFestivals]

  lunarJieQi.textContent = jieQi
  lunarHou.textContent = hou
  lunarFu.textContent = fu ? fu.toFullString() : ''
  lunarShuJiu.textContent = shuJiu ? shuJiu.toFullString() : ''
  lunarFestivalsList.textContent = [...lunarFestivals]
  lunarOtherFestivalsList.textContent = [...lunarOtherFestivals]

}
