const formattedTime = (time) => {
  return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
}

const dayjs_timestamp = () => dayjs().unix()
const dayjs_year = () => dayjs().format('YYYY')
const dayjs_month = () => dayjs().format('MM')
const dayjs_week = () => dayjs().format('dddd')
const dayjs_day = () => dayjs().format('DD')

const dayjs_year_month = () => dayjs().format('YYYY-MM')

// 时间格式化常量
const dayjs_date = () => dayjs().format('YYYY-MM-DD')
const dayjs_time = () => dayjs().format('HH:mm:ss')
const dayjs_datetime = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
const dayjs_date_time_millisecond = () => dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')

// 注意：以下格式依赖于dayjs的高级格式化插件
const dayjs_date_time_microsecond = () => dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
const dayjs_date_time_nanosecond = () => dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS')
