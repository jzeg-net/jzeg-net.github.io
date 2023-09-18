let xxxApiURL = 'https://api.xxxxxx.jzeg.net'
let contact = document.querySelector('#contact')
if (contact) {

  contact.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(contact)
    let formData = getFormData(contact)

    let fetchData = {
      type: formData['type'],
      title: formData['title'],
      content: formData['content'],
      attachment: formData['attachment'],
      captcha: formData['captcha'],
      userAgent: navigator.userAgent,
    }

    wretch()
      // .errorType('json')
      .catcher(404, () => {
        bModal('', createSmallCenterText('服务器404错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .catcher(502, () => {
        bModal('', createSmallCenterText('服务器502错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .catcherFallback(() => {
        bModal('', createSmallCenterText('服务器未知错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .post(fetchData, `${xxxApiURL}/contact/index.php`)
      .json((response) => {
        console.log(response.result)
        clearFormSpinner(contact)
      })
      .catch((error) => {
        console.error('contact_error', error)
        clearFormSpinner(contact)
      })
  })
}
