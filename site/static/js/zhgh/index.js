const zhgh_login = document.querySelector('#zhgh_login')
const member_tips = document.querySelector('#member_tips')
const zhgh_auto_login = document.querySelector('#zhgh_auto_login')
const member_information = document.querySelector('#member_information')

const storageKeyZhghAutoLogin = 'zhgh_auto_login'
const setStorageZhghAutoLogin = (boolean) => setLocalStorage(storageKeyZhghAutoLogin, boolean)
const getStorageZhghAutoLogin = () => getLocalStorage(storageKeyZhghAutoLogin)

const tips = {
  'notLoggedIn': `<div class="card-body text-center">登录后可查看更多信息</div>`,
  'loggingIn': `<div class="card-body text-center">信息加载中，请稍后。</div>`,
  'loggingFailed': `<div class="card-body text-center">信息加载失败。</div>`,
  'loggedIn': ``,
}

const getMemberInformation = () => {
  member_tips.innerHTML = tips['loggingIn']
  const path = '/member/information'
  const data = {
    'userAgent': navigator.userAgent
  }

  zhghAxios.post(path, data)
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
        exp_points_2,
        ranking,
        true_name,
        xueli,
        zhiwei,
        zzmm,
        native,
        study_time,
      } = r

      member_tips.innerHTML = tips['loggedIn']
      member_information.innerHTML = `
        <div><span>姓名：</span><span>${true_name}</span></div>
        <div><span>账号：</span><span>${id}</span></div>
        <div><span>单位：</span><span>${group}</span></div>
        <div><span>学历：</span><span>${xueli}</span></div>
        <div><span>职位：</span><span>${zhiwei}</span></div>
        <div><span>政治面貌：</span><span>${zzmm}</span></div>
        <div><span>民族：</span><span>${min_zu}</span></div>
        <div><span>籍贯：</span><span>${native}</span></div>
        <div><span>手机：</span><span>${mobile}</span></div>
        <div><span>电话：</span><span>${phone}</span></div>
        <hr>
        <div><span>等级编号：</span><span>${level}</span></div>
        <div><span>等级：</span><span>${level_name}（ ${exp_points_2} ）</span></div>
        <div><span>排行：</span><span class="text-danger-emphasis">${ranking}</span></div>
        <div><span>今日闯关时长：</span><span class="text-danger-emphasis">${study_time}</span></div>
        <div><span>积分：</span><span>${points}</span></div>
        <div><span>经验积分：</span><span>${exp_points}</span></div>
        <div><span>生日：</span><span>${formattedTime(birthday)}</span></div>
        <div><span>加入时间：</span><span>${formattedTime(add_time)}</span></div>
        <hr>
        <div><span>登录次数：</span><span>${login_num}</span></div>
        <div><span>登录IP：</span><span>${login_ip}</span></div>
        <div><span>登录时间：</span><span>${formattedTime(login_time)}</span></div>
        <div><span>上次IP：</span><span>${old_login_ip}</span></div>
        <div><span>上次时间：</span><span>${formattedTime(old_login_time)}</span></div>
      `

    })
    .catch(err => {
      member_tips.innerHTML = tips['loggingFailed']
    })
}

if (zhgh_login) {
  listenerPasswordInputType(zhgh_login)
  const zhgh_account = zhgh_login.querySelector('#zhgh_account')
  const password = zhgh_login.querySelector('#password')
  const account_display = zhgh_login.querySelector('#account_display')

  const refreshAccountDisplay = () => {
    const phoneNumber = getStorageZhghAccount()
    account_display.innerText = hidePhoneNumber(phoneNumber)
  }

  if (getStorageZhghAccount()) refreshAccountDisplay()

  zhgh_login.addEventListener('submit', event => {
    event?.preventDefault()

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
    getMemberInformation()
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

zhgh_auto_login?.addEventListener('change', (event) => {
  event?.preventDefault()
  const targetStatus = event.target.checked

  setStorageZhghAutoLogin(targetStatus)
  zhgh_auto_login.checked = targetStatus

  if (targetStatus) getMemberInformation()
})

zhgh_auto_login.checked = getStorageZhghAutoLogin() === 'true'
member_tips.innerHTML = tips['notLoggedIn']

// 监听页面加载完成后，判断是否需要发出请求
const executeAutoLogin = () => {
  if (zhgh_auto_login.checked) getMemberInformation()
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', executeAutoLogin)
} else {
  // DOM 已经加载完成，直接执行
  executeAutoLogin()
}
