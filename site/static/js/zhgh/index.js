const zhgh_login = document.querySelector('#zhgh_login')
const member_information = document.querySelector('#member_information')

const getMemberInformation = () => {
  const url = `${zhghApiUrl}/member/information`

  const fetchData = {
    'account': getStorageZhghAccount(),
    'password': getStorageZhghPassword(),
    'userAgent': navigator.userAgent
  }

  fetch(url, fetchPostOptions(fetchData))
    .then(r => {
      if (!r.ok) {
        r.json().then(error => {
          bModal('', createSmallCenterText(error.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(r.statusText))
      }
      return r.json()
    })
    .then(r => {
      const {
        level,
        level_name,
        id,
        group,
        add_time,
        login_num,
        login_ip,
        login_time,
        old_login_ip,
        old_login_time,
        min_zu,
        birthday,
        mobile,
        phone,
        points,
        exp_points,
        ranking,
        true_name,
        xueli,
        zhiwei,
        zzmm,
      } = r

      member_information.innerHTML = `
          <div class="card">
            <div class="card-body">
              <div>姓名：${true_name}</div>
              <div>账号：${id}</div>
              <div>单位：${group}</div>
              <div>等级编号：${level}</div>
              <div>等级：${level_name}</div>
              <div>积分：${points}</div>
              <div>经验积分：${exp_points}</div>
              <div>排行：${ranking}</div>
              <div>生日：${birthday}</div>
              <div>加入时间：${add_time}</div>
              <div>民族：${min_zu}</div>
              <div>手机：${mobile}</div>
              <div>电话：${phone}</div>
              <div>学历：${xueli}</div>
              <div>职位：${zhiwei}</div>
              <div>政治面貌：${zzmm}</div>
              <div>登录次数：${login_num}</div>
              <div>登录IP：${login_ip}</div>
              <div>登录时间：${login_time}</div>
              <div>上次登录IP：${old_login_ip}</div>
              <div>上次登录时间：${old_login_time}</div>
            </div>
          </div>
        `
    })
    .finally(() => {
    })

}

if (member_information) getMemberInformation()

if (zhgh_login) {
  listenerPasswordInputType(zhgh_login)
  const zhgh_account = document.querySelector('#zhgh_account')
  const password = document.querySelector('#password')
  const account_display = document.querySelector('#account_display')

  const refreshAccountDisplay = () => {
    const phoneNumber = getStorageZhghAccount()
    account_display.innerText = hidePhoneNumber(phoneNumber)
  }

  if (getStorageZhghAccount()) refreshAccountDisplay()

  zhgh_login.addEventListener('submit', event => {
    event.preventDefault()

    if (!zhgh_account.value) {
      bModal('', createSmallCenterText('请输入账号', 'danger'), '', 'sm', true)
    }
    if (!password.value) {
      bModal('', createSmallCenterText('请输入密码', 'danger'), '', 'sm', true)
    }
    if (zhgh_account.value) {
      setStorageZhghAccount(zhgh_account.value)
      refreshAccountDisplay()
    }

    if (password.value) setStorageZhghPassword(password.value)

    bModal('', createSmallCenterText('已更新账号信息', 'success'), '', 'sm', true)
  })

  zhgh_login.addEventListener('reset', event => {
    if (!confirm('确定要删除当前账号信息吗？')) return

    removeStorageZhghAccount()
    removeStorageZhghPassword()
    // refreshAccountDisplay()
    account_display.innerText = getStorageZhghAccount() || '已删除'

    bModal('', createSmallCenterText('已删除当前账号信息', 'success'), '', 'sm', true)
  })
}
