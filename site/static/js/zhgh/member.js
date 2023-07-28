let userInfo = document.querySelector('#userInfo')
let result = document.querySelector('#result')
if (userInfo) {
  listenerPasswordInputTye(userInfo)
  userInfo.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(userInfo)

  let formData = getFormData(userInfo)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = getFetchOptions(fetchData)

  fetch(`${zhghApiUrl}/member/index.php`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      if (response['errorMsg']) {
        bModal('', response['errorMsg'], '', 'sm', true)
      } else {
        result.appendChild(create_member_result(response))
      }
      clearFormSpinner(userInfo)
    })
    .catch(error => {
      console.error('userInfo_error:', error)
      clearFormSpinner(userInfo)
    })
}

// 结果表格
function create_member_result (memberInfo) {
  let memberInfoName = {
    'id': '编号',
    'account': '账户',
    'realName': '姓名',
    'birthday': '生日',
    'sex': '性别',
    'mobile': '手机号码',
    'qq': 'QQ',
    'alipay': '支付宝',
    'login': {
      'numberOfTimes': '登录次数',
      'addTime': '添加时间',
      'ip': {
        'new': {
          'time': '登录时间',
          'ip': 'IP地址'
        },
        'old': {
          'time': '登录时间',
          'ip': 'IP地址'
        }
      }
    },
    'points': '积分',
    'experiencePoints': '经验',
    'companyUnit': '单位',
    'ethnicity': '民族',
    'zzmm': '面貌',
    'companyPosition': '职位',
    'companyPhone': '单位电话',
    'education': '学历',
    'idCard': '身份证号码',
    'native': '籍贯',
    'studyTime': '今日学习时长',
    'ranking': '排名',
    'level': '等级',
    'levelName': '等级名称'
  }
  let ul = document.createElement('ul')
  ul.className = 'list-group list-group-flush'

  Object.keys(memberInfo).forEach(function (index) {
    let InfoName = memberInfoName[index]
    let InfoValue = memberInfo[index]

    if (InfoValue === '') return
    if (index === 'login') return

    if (index === 'birthday') {
      InfoValue = dayjs.unix(InfoValue).format('YYYY-MM-DD')
    }
    if (index === 'sex') {
      switch (InfoValue) {
        case 0:
          InfoValue = '男'
          break
        case 1:
          InfoValue = '女'
          break
        default:
          InfoValue = '未知'
      }
    }

    let li = document.createElement('li')
    let span = document.createElement('span')
    let spanClone = document.createElement('span')

    li.className = 'list-group-item list-group-item-action'
    span.className = 'd-inline-block pe-3 text-end'
    span.style.minWidth = '7rem'

    span.textContent = InfoName
    spanClone.textContent = InfoValue

    li.append(span, spanClone)
    ul.appendChild(li)
  })

  return ul
}
