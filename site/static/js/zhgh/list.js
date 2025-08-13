// 表单
const list_form = document.querySelector('#list_form')

const buildQuestionBankLayout = (data) => {
  const fragment = document.createDocumentFragment()

  data.forEach((item, index) => {
    let { question, type, answer, o_a, o_b, o_c, o_d, o_e, o_f, o_g, o_h } = item
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const questionIndex = index + 1
    const answer_list = [
      { option: o_a },
      { option: o_b },
      { option: o_c },
      { option: o_d },
      { option: o_e },
      { option: o_f },
      { option: o_g },
      { option: o_h }
    ]

    answer = type !== 3
      ? answer
      : answer === 'A'
        ? '正确'
        : '错误'

    const question_card = document.createElement('article')
    question_card.className = 'question-card mb-2'

    const p = document.createElement('p')
    p.className = 'question-title mb-0'
    p.innerHTML = questionIndex + '.  ' + question

    const answer_p = document.createElement('p')
    answer_p.className = 'answer mb-0'
    answer_p.innerHTML = '答案：' + answer

    const div = document.createElement('div')
    div.className = 'question-options row row-cols-auto ms-3'

    answer_list.forEach((item, index) => {
      if (item['option'] === null) return
      if (type === 3) return

      const a = document.createElement('a')
      const is_right = answer.includes(letters[index])
      is_right
        ? a.className = 'answer-option fw-bolder link-success link-offset-3'
        : a.className = 'answer-option text-reset text-decoration-none'
      a.innerHTML = letters[index] + '. ' + item['option']

      div.appendChild(a)
    })

    question_card.appendChild(p)
    question_card.appendChild(answer_p)
    question_card.appendChild(div)
    fragment.appendChild(question_card)
  })

  return fragment
}

const openPreview = (data) => {
  const newWindow = window.open('', '_blank')

  newWindow.document.open()
  newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <title>题库</title>
          <link href="/static/vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=6, user-scalable=yes, interactive-widget=resizes-visual">
          <style>
          body {
            overscroll-behavior-y: contain;
          }
          /* 通用打印样式 */
          @media print {
            .no-print { display: none !important; }
            .question-card { break-inside: avoid; }
            /* 定义页脚 */
            @page {
              @bottom-right {
                content: "杰格网【jzeg.net】 倾情奉献";
                font-size: 12px;
                color: #888888;
              }
            }
          }
          </style>
        </head>
        <body class="container-fluid px-4">
          <div class="fixed-bottom d-grid">
            <button class="no-print btn btn-lg btn-success" type="button" onclick="window.print()">打印</button>
          </div>
          <div class="pb-5" id="content"></div>
        </body>
        </html>
      `)
  const contentNode = newWindow.document.getElementById('content')
  const questionsDOM = buildQuestionBankLayout(data)
  contentNode.appendChild(questionsDOM)
  newWindow.document.close()
}

const submitForm = event => {
  event.preventDefault()
  submitStatus(list_form)
  submitTimerInterval(list_form)

  const path = 'answer/index'
  const formData = new FormData(list_form)
  const fetchData = Object.fromEntries(formData.entries())
  fetchData.account = getStorageZhghAccount()
  fetchData.password = getStorageZhghPassword()
  fetchData.userAgent = navigator.userAgent

  zhghAxios.post(path, fetchData)
    .then(res => {
      console.log(res)
      openPreview(res)
    })
    .finally(() => {
      clearSubmitStatus(list_form)
      clearInterval(submitTimerIntervalID)
    })
    .catch(err => {
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)
    })
}

list_form?.addEventListener('submit', submitForm)
