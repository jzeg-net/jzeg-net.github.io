const questions_form = document.querySelector('#questions_form')

const buildQuestionBankLayout = (data) => {
  const fragment = document.createDocumentFragment()

  data.forEach((item, index) => {
    const { question_type, question_title, answer_list } = item
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const questionIndex = index + 1

    const question_card = document.createElement('article')
    question_card.className = 'question-card mb-2'

    const p = document.createElement('p')
    p.className = 'question-title mb-0'
    p.innerHTML = questionIndex + '.  ' + question_title

    const div = document.createElement('div')
    div.className = 'question-options row row-cols-auto ms-3'

    answer_list.forEach((item, index) => {
      const is_right = item['is_right'] === '1'
      const a = document.createElement('a')
      is_right
        ? a.className = 'answer-option fw-bolder link-success link-offset-3'
        : a.className = 'answer-option text-reset text-decoration-none'
      a.innerHTML = letters[index] + '. ' + item['answer_content']

      div.appendChild(a)
    })

    question_card.appendChild(p)
    question_card.appendChild(div)
    fragment.appendChild(question_card)
  })

  return fragment
}

const openPreview = (data) => {
  const newWindow = window.open('', '_blank')

  newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <title>题库</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
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

const getQuestions = event => {
  event.preventDefault()
  setSubmitStatus(questions_form)

  let formData = new FormData(questions_form)
  let data = Object.fromEntries(formData.entries())
  data.account = getStorageAqxcAccount()
  data.token = getStorageAqxcToken()

  let url = aqxcApiUrl + 'questions/questions'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => {
    if (!r.ok) {
      r.json().then(data => {
        bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
      })
      return Promise.reject(new Error(data.message))
    }
    return r.json()
  }).then(r => {
    openPreview(r)
  }).finally(() => {
    clearSubmitStatus(questions_form)
  })
}

questions_form?.addEventListener('submit', getQuestions)
