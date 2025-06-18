let contact = document.querySelector('#contact')
if (contact) {

  contact.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(contact)

    let formData = getFormData(contact)

    wretch()
      // .errorType('json')
      .catcher(404, () => {
        bModal('', createSmallCenterText('服务器404错误', 'danger'), '', 'sm', true)
        clearSubmitStatus(contact)
      })
      .catcher(502, () => {
        bModal('', createSmallCenterText('服务器502错误', 'danger'), '', 'sm', true)
        clearSubmitStatus(contact)
      })
      .catcherFallback(() => {
        bModal('', createSmallCenterText('服务器未知错误', 'danger'), '', 'sm', true)
        clearSubmitStatus(contact)
      })
      .post(formData, `${xxxApiURL}/contact/index.php`)
      .json((response) => {
        response.result === 1
          ? bModal('', createSmallCenterText('提交成功', 'success'), '', 'sm', true)
          : bModal('', createSmallCenterText('提交失败', 'success'), '', 'sm', true)
        clearSubmitStatus(contact)
      })
      .catch((error) => {
        console.log('contact_error', error)
        clearSubmitStatus(contact)
      })
  })
}

(() => {

  let searchParams = new URL(document.URL).searchParams

  if (!searchParams.size) return

  document.addEventListener('DOMContentLoaded', () => {
    let paramsArray = []

    for (const [key, value] of searchParams.entries()) {
      paramsArray[key] = value

      document.querySelectorAll('input').forEach((triggerInput) => {
        switch (triggerInput.type) {
          case 'text':
            if (triggerInput.name === key) triggerInput.value = value
            break
          case 'checkbox':
          case 'radio':
            if (triggerInput.name === key && triggerInput.value === value) triggerInput.checked = true
            break
          case 'password':
          case 'color':
          case 'range':
          default:
            break
        }
      })
    }
  })
})()
