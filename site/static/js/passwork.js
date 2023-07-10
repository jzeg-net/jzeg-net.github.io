
let newTabPage = document.querySelector('#newTabPage')
if (newTabPage) {
  newTabPage.href = location.origin + location.pathname
}

let level = document.querySelector('#level')
let levels_range = document.querySelector('#levels_range')
if (level && levels_range) {
  level.addEventListener('input', () => {
    levels_range.value = level.value
  })
  levels_range.addEventListener('input', () => {
    level.value = levels_range.value
  })
}

let passwork_login = document.querySelector('#passwork_login')
if (passwork_login) {
  passwork_login.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(passwork_login)
    submitTimerInterval(passwork_login)

    let formData = getFormData(passwork_login)

    let fetchData = {
      type: formData['type'],
      account: formData['account'],
      password: formData['password'],
      throughNum: formData['throughNum'],
      level: formData['level'],
      userAgent: navigator.userAgent,
      captcha: formData['captcha'],
    }
    let fetchOptions = getFetchOptions(fetchData)

    fetch('/api/passwork/answer_questions.php', fetchOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        response = JSON.parse(JSON.stringify(response))
        if (response["errorMsg"]) {
          alert(response['errorMsg'])
        } else {
          resultTable.rows.add([
            response["passwork"]['right'],
            response["passwork"]['wrong'],
            response["passwork"]['time'],
            response["passwork"]['score']
          ])
        }
        clearFormSpinner(passwork_login)
        clearTimeout(submitTimerIntervalID)
      })
      .catch(error => {
        console.error('passwork_error:', error)
        clearFormSpinner(passwork_login)
        clearTimeout(submitTimerIntervalID)
      })
  })
}


let simpleDatatables_classes_bootstrap = {
  active: "active",
  disabled: "disabled",
  selector: "form-select",
  paginationList: "pagination",
  paginationListItem: "page-item",
  paginationListItemLink: "page-link"
}
let simpleDatatables_labels_zh_CN = {
  placeholder: "搜索...",
  searchTitle: "表内搜索",
  perPage: "每页条目数",
  noRows: "没有找到条目",
  info: "显示 {start} 到 {end}（共 {rows} 条）",
  noResults: "没有结果与您的搜索查询匹配",
}
let resultTableOptions = {}
let resultTable = new simpleDatatables.DataTable('#resultTable', {
  columns: [
    {}
  ],
  classes: simpleDatatables_classes_bootstrap,
  labels: simpleDatatables_labels_zh_CN,
  fixedHeight: true,
  searchable: false,
  paging: false,
  data: {
    'headings': ['正确', '错误', '用时', '得分']
  }
})


let submitTimerIntervalID

function submitTimerInterval(formEL) {
  let submit_timer = formEL.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  submitTimerIntervalID = setInterval(() => {
    submit_timer.textContent++
  }, 1000)
}


let throughSelect = document.querySelector('#throughSelect')
if (throughSelect) {
  throughSelect.addEventListener('click', () => {
    let fetchOptions = getFetchOptions([])

    fetch('/api/type_of_work/index.php', fetchOptions)
      .then(response => response.json())
      .then(response => {
        Object.keys(response).forEach(xx => {
          let data = {
            value: xx,
            text: response[xx]['name']
          }
          throughSelect.append(createOption(data))
        })
      })
      .catch(error => console.error('type_of_work_error', error))
  }, {once: true})
}

function createOption(data) {
  let opt = document.createElement('option')
  opt.value = data.value
  opt.innerText = data.text

  return opt
}
